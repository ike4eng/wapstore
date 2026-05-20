import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env";

export function createSupabaseBrowserClient() {
  const { supabaseUrl, supabaseAnonKey } = publicEnv();
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

