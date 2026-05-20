import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { payfastEnv } from "@/lib/env";
import { buildPayfastParamString, payfastSignature, payfastValidateUrl } from "@/lib/payfast";

export const runtime = "nodejs";

const PREMIUM_AMOUNT = 75;

function parseBody(body: string) {
  const params = new URLSearchParams(body);
  const obj: Record<string, string> = {};
  for (const [k, v] of params.entries()) obj[k] = v;
  return obj;
}

function isNumericEqual(a: string | undefined, b: number) {
  if (!a) return false;
  const n = Number(a);
  if (!Number.isFinite(n)) return false;
  return Math.abs(n - b) < 0.0001;
}

export async function POST(req: Request) {
  const raw = await req.text();
  const data = parseBody(raw);

  const { merchantId } = payfastEnv();

  if (!data.merchant_id || data.merchant_id !== merchantId) {
    return new NextResponse("BAD_REQUEST", { status: 400 });
  }

  const receivedSig = data.signature ?? "";
  const sigParams: Record<string, string> = { ...data };
  delete sigParams.signature;

  const expectedSig = payfastSignature(sigParams);
  if (!receivedSig || expectedSig !== receivedSig) {
    return new NextResponse("INVALID_SIGNATURE", { status: 400 });
  }

  const validateRes = await fetch(payfastValidateUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: buildPayfastParamString(data)
  });
  const validateText = (await validateRes.text()).trim();
  if (validateText !== "VALID") {
    return new NextResponse("INVALID", { status: 400 });
  }

  if (data.payment_status !== "COMPLETE") {
    return new NextResponse("IGNORED", { status: 200 });
  }

  if (!isNumericEqual(data.amount_gross ?? data.amount, PREMIUM_AMOUNT)) {
    return new NextResponse("INVALID_AMOUNT", { status: 400 });
  }

  let userId: string;
  try {
    userId = z.string().uuid().parse(data.custom_str1);
  } catch {
    return new NextResponse("INVALID_USER", { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data: existing } = await admin
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const now = new Date().toISOString();
  const payload: Record<string, any> = { plan_type: "premium", status: "active" };

  if (existing?.id) {
    const { error } = await admin.from("subscriptions").update(payload).eq("id", existing.id);
    if (error) return new NextResponse("DB_ERROR", { status: 500 });
  } else {
    const { error } = await admin.from("subscriptions").insert({
      user_id: userId,
      ...payload,
      created_at: now
    });
    if (error) return new NextResponse("DB_ERROR", { status: 500 });
  }

  return new NextResponse("OK", { status: 200 });
}
