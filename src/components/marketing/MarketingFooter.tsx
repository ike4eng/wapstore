import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function MarketingFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <Logo />
            <p className="max-w-md text-sm leading-relaxed text-neutral-600">
              A lightweight WhatsApp-powered mini store builder for small businesses
              and local sellers.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-neutral-600">Product</p>
            <div className="grid gap-2 text-sm">
              <Link href="/#features" className="text-neutral-700 hover:text-neutral-900">
                Features
              </Link>
              <Link href="/pricing" className="text-neutral-700 hover:text-neutral-900">
                Pricing
              </Link>
              <Link href="/explore" className="text-neutral-700 hover:text-neutral-900">
                Explore stores
              </Link>
              <Link href="/register" className="text-neutral-700 hover:text-neutral-900">
                Create store
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-neutral-600">Company</p>
            <div className="grid gap-2 text-sm">
              <Link href="/about" className="text-neutral-700 hover:text-neutral-900">
                About
              </Link>
              <Link href="/contact" className="text-neutral-700 hover:text-neutral-900">
                Contact
              </Link>
            </div>

            <p className="pt-4 text-xs font-semibold text-neutral-600">Resources</p>
            <div className="grid gap-2 text-sm">
              <Link href="/help" className="text-neutral-700 hover:text-neutral-900">
                Help Center
              </Link>
              <Link href="/faq" className="text-neutral-700 hover:text-neutral-900">
                FAQ
              </Link>
              <Link href="/login" className="text-neutral-700 hover:text-neutral-900">
                Login
              </Link>
            </div>

            <p className="pt-4 text-xs font-semibold text-neutral-600">Legal</p>
            <div className="grid gap-2 text-sm">
              <Link href="/terms" className="text-neutral-700 hover:text-neutral-900">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-neutral-700 hover:text-neutral-900">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Wapstore. All rights reserved.</p>
          <p>Built for mobile-first commerce.</p>
        </div>
      </div>
    </footer>
  );
}
