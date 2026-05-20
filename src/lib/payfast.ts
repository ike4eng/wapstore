import crypto from "crypto";
import { payfastEnv, publicEnv } from "@/lib/env";

function encodePayfast(value: string) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

export function buildPayfastParamString(params: Record<string, string>) {
  return Object.keys(params)
    .sort()
    .map((k) => `${k}=${encodePayfast(params[k] ?? "")}`)
    .join("&");
}

export function payfastSignature(params: Record<string, string>) {
  const { passphrase } = payfastEnv();
  const base = buildPayfastParamString(params);
  const signed = passphrase ? `${base}&passphrase=${encodePayfast(passphrase)}` : base;
  return crypto.createHash("md5").update(signed).digest("hex");
}

export function payfastProcessUrl() {
  const { mode } = payfastEnv();
  return mode === "live"
    ? "https://www.payfast.co.za/eng/process"
    : "https://sandbox.payfast.co.za/eng/process";
}

export function payfastValidateUrl() {
  const { mode } = payfastEnv();
  return mode === "live"
    ? "https://www.payfast.co.za/eng/query/validate"
    : "https://sandbox.payfast.co.za/eng/query/validate";
}

export function payfastAmountZarCents(amountZar: number) {
  return amountZar.toFixed(2);
}

export function payfastReturnUrls() {
  const { appUrl } = publicEnv();
  return {
    returnUrl: `${appUrl}/dashboard/subscription?payfast=success`,
    cancelUrl: `${appUrl}/dashboard/subscription?payfast=cancel`,
    notifyUrl: `${appUrl}/api/payfast/itn`
  };
}

