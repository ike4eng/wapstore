export function requireEnv(name: keyof NodeJS.ProcessEnv) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function publicEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl)
    throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");

  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseAnonKey)
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    "http://localhost:3000";

  return {
    appUrl,
    supabaseUrl,
    supabaseAnonKey
  };
}

export function payfastEnv() {
  const env = (process.env.PAYFAST_ENV ?? "sandbox").toLowerCase();
  const mode = env === "live" ? "live" : "sandbox";

  return {
    mode,
    merchantId: requireEnv("PAYFAST_MERCHANT_ID"),
    merchantKey: requireEnv("PAYFAST_MERCHANT_KEY"),
    passphrase: process.env.PAYFAST_PASSPHRASE ?? "",
    itemName: process.env.PAYFAST_ITEM_NAME ?? "Wapstore Premium (Monthly)"
  };
}
