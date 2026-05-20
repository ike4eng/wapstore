import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

function redirectTo(req: NextRequest, pathname: string) {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  url.searchParams.set("redirectTo", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {
  const { supabase, res } = createSupabaseMiddlewareClient(req);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password");

  if (user && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  const isDashboard = pathname.startsWith("/dashboard");
  const isSuperAdmin = pathname.startsWith("/super-admin");

  if ((isDashboard || isSuperAdmin) && !user) {
    return redirectTo(req, "/login");
  }

  if (user && isSuperAdmin) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role,status")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || profile.status !== "active" || profile.role !== "super_admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/unauthorized";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/super-admin/:path*",
    "/login",
    "/register",
    "/forgot-password"
  ]
};
