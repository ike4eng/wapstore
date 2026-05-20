import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-neutral-50">
      <DashboardNav />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

