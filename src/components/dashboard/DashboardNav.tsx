import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/brand/Logo";
import { signOutAction } from "@/lib/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function DashboardNav() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("role,status")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-4">
          <Logo href="/dashboard" size="sm" />
          {profile?.role === "super_admin" ? (
            <Badge variant="brand">Super admin</Badge>
          ) : null}
        </div>
        <nav className="hidden items-center gap-4 md:flex">
          <Link href="/dashboard" className="text-sm font-medium text-neutral-700">
            Overview
          </Link>
          <Link
            href="/dashboard/store"
            className="text-sm font-medium text-neutral-700"
          >
            Store
          </Link>
          <Link
            href="/dashboard/products"
            className="text-sm font-medium text-neutral-700"
          >
            Products
          </Link>
          <Link
            href="/dashboard/subscription"
            className="text-sm font-medium text-neutral-700"
          >
            Subscription
          </Link>
          <Link
            href="/dashboard/support"
            className="text-sm font-medium text-neutral-700"
          >
            Support
          </Link>
          {profile?.role === "super_admin" ? (
            <Link
              href="/super-admin"
              className="text-sm font-medium text-neutral-700"
            >
              Admin
            </Link>
          ) : null}
        </nav>
        <form action={signOutAction}>
          <button
            type="submit"
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
          >
            Log out
          </button>
        </form>
      </div>
      <div className="border-t border-neutral-100 md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-5 gap-1 px-2 py-2 text-xs font-semibold text-neutral-700">
          <Link href="/dashboard" className="rounded-xl px-2 py-2 text-center hover:bg-neutral-50">
            Home
          </Link>
          <Link
            href="/dashboard/store"
            className="rounded-xl px-2 py-2 text-center hover:bg-neutral-50"
          >
            Store
          </Link>
          <Link
            href="/dashboard/products"
            className="rounded-xl px-2 py-2 text-center hover:bg-neutral-50"
          >
            Products
          </Link>
          <Link
            href="/dashboard/subscription"
            className="rounded-xl px-2 py-2 text-center hover:bg-neutral-50"
          >
            Plan
          </Link>
          <Link
            href="/dashboard/support"
            className="rounded-xl px-2 py-2 text-center hover:bg-neutral-50"
          >
            Help
          </Link>
        </div>
      </div>
    </header>
  );
}
