import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-neutral-50">
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="/" className="text-sm font-medium text-neutral-700">
            Home
          </Link>
        </div>
        <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft">
          {children}
        </div>
      </div>
    </div>
  );
}

