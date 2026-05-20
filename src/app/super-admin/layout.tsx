import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { requireSuperAdmin } from "@/lib/data/admin";

export const metadata = {
  title: "Super Admin"
};

export default async function SuperAdminLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  await requireSuperAdmin();

  return (
    <div className="min-h-dvh bg-neutral-50">
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Logo href="/super-admin" size="sm" />
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900">
              Super admin
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-neutral-800">
            <Link href="/dashboard" className="hover:text-neutral-900">
              Seller dashboard
            </Link>
          </div>
        </div>
        <div className="border-t border-neutral-100">
          <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2 text-sm font-semibold text-neutral-700">
            <Link href="/super-admin" className="rounded-xl px-3 py-2 hover:bg-neutral-50">
              Overview
            </Link>
            <Link
              href="/super-admin/stores"
              className="rounded-xl px-3 py-2 hover:bg-neutral-50"
            >
              Stores
            </Link>
            <Link
              href="/super-admin/users"
              className="rounded-xl px-3 py-2 hover:bg-neutral-50"
            >
              Users
            </Link>
            <Link
              href="/super-admin/reports"
              className="rounded-xl px-3 py-2 hover:bg-neutral-50"
            >
              Reports
            </Link>
            <Link
              href="/super-admin/announcements"
              className="rounded-xl px-3 py-2 hover:bg-neutral-50"
            >
              Announcements
            </Link>
            <Link
              href="/super-admin/analytics"
              className="rounded-xl px-3 py-2 hover:bg-neutral-50"
            >
              Analytics
            </Link>
            <Link
              href="/super-admin/settings"
              className="rounded-xl px-3 py-2 hover:bg-neutral-50"
            >
              Settings
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
