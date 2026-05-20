import { createClient } from "@supabase/supabase-js";
import { publicEnv, requireEnv } from "@/lib/env";

export function createSupabaseAdminClient() {
  const { supabaseUrl } = publicEnv();
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

