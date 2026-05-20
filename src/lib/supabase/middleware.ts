import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { publicEnv } from "@/lib/env";

export function createSupabaseMiddlewareClient(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } });
  const { supabaseUrl, supabaseAnonKey } = publicEnv();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      }
    }
  });

  return { supabase, res };
}

