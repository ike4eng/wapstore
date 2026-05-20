"use client";

import Link from "next/link";
import * as React from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/auth";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/explore", label: "Explore Stores" },
  { href: "/#faq", label: "FAQ" }
];

export function MarketingNav({
  isAuthenticated,
  userEmail,
  storeSlug
}: {
  isAuthenticated: boolean;
  userEmail: string | null;
  storeSlug: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const [activeHash, setActiveHash] = React.useState<string | null>(null);
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "text-sm font-medium transition",
                  l.href.startsWith("/#")
                    ? pathname === "/" && activeHash === l.href
                      ? "text-neutral-900"
                      : "text-neutral-700 hover:text-neutral-900"
                    : pathname === l.href
                      ? "text-neutral-900"
                      : "text-neutral-700 hover:text-neutral-900"
                ].join(" ")}
                aria-current={
                  l.href.startsWith("/#")
                    ? pathname === "/" && activeHash === l.href
                      ? "page"
                      : undefined
                    : pathname === l.href
                      ? "page"
                      : undefined
                }
                onClick={() => {
                  if (l.href.startsWith("/#")) setActiveHash(l.href);
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {!isAuthenticated ? (
            <>
              <ButtonLink href="/login" variant="ghost" size="sm">
                Login
              </ButtonLink>
              <ButtonLink href="/register" size="sm">
                Create Store
              </ButtonLink>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <ButtonLink href="/dashboard" variant="secondary" size="sm">
                Dashboard
              </ButtonLink>
              <ButtonLink
                href={storeSlug ? `/store/${storeSlug}` : "/dashboard/store"}
                variant="ghost"
                size="sm"
              >
                My Store
              </ButtonLink>
              <details className="relative">
                <summary className="list-none rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50">
                  Account
                </summary>
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-black/10 bg-white p-2 shadow-soft">
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-neutral-900">Signed in</p>
                    <p className="mt-1 truncate text-xs text-neutral-600">
                      {userEmail ?? "Account"}
                    </p>
                  </div>
                  <div className="my-2 h-px bg-black/5" />
                  <Link
                    href="/dashboard"
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/store"
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Store settings
                  </Link>
                  <form action={signOutAction} className="pt-1">
                    <button
                      type="submit"
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              </details>
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-white md:hidden">
          <div className="mx-auto max-w-6xl space-y-3 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                onClick={() => {
                  if (l.href.startsWith("/#")) setActiveHash(l.href);
                  setOpen(false);
                }}
              >
                {l.label}
              </Link>
            ))}
            <div className="grid grid-cols-1 gap-2 pt-2">
              {!isAuthenticated ? (
                <>
                  <ButtonLink href="/login" variant="ghost" className="w-full">
                    Login
                  </ButtonLink>
                  <ButtonLink href="/register" className="w-full">
                    Create Store
                  </ButtonLink>
                </>
              ) : (
                <>
                  <ButtonLink href="/dashboard" variant="secondary" className="w-full">
                    Dashboard
                  </ButtonLink>
                  <ButtonLink
                    href={storeSlug ? `/store/${storeSlug}` : "/dashboard/store"}
                    variant="ghost"
                    className="w-full"
                  >
                    My Store
                  </ButtonLink>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                    >
                      Logout
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
