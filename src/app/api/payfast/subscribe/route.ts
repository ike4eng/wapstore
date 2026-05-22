import { NextResponse } from "next/server";
import crypto from "crypto";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { payfastEnv } from "@/lib/env";
import {
  payfastAmountZarCents,
  payfastProcessUrl,
  payfastReturnUrls,
  payfastSignature
} from "@/lib/payfast";

export const runtime = "nodejs";

const PREMIUM_AMOUNT = 75;

function htmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
  }

  const { merchantId, merchantKey, itemName } = payfastEnv();
  const { returnUrl, cancelUrl, notifyUrl } = payfastReturnUrls();

  const amount = payfastAmountZarCents(PREMIUM_AMOUNT);
  const mPaymentId = crypto.randomUUID();

  const params: Record<string, string> = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: user.email?.split("@")[0] ?? "Wapstore",
    email_address: user.email ?? "",
    m_payment_id: mPaymentId,
    amount,
    item_name: itemName,
    item_description: "Monthly subscription for Wapstore Premium.",
    custom_str1: user.id,
    custom_str2: user.email ?? "",
    subscription_type: "1",
    billing_date: new Date().toISOString().slice(0, 10),
    recurring_amount: amount,
    frequency: "3",
    cycles: "0"
  };

  params.signature = payfastSignature(params);

  const formInputs = Object.entries(params)
    .map(([k, v]) => `<input type="hidden" name="${htmlEscape(k)}" value="${htmlEscape(v)}" />`)
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirecting to PayFast…</title>
  </head>
  <body>
    <form id="pf" action="${htmlEscape(payfastProcessUrl())}" method="post">
      ${formInputs}
      <noscript>
        <button type="submit">Continue</button>
      </noscript>
    </form>
    <script>
      document.getElementById("pf").submit();
    </script>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
