import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReportsAdminTable } from "@/components/admin/ReportsAdminTable";
import { requireSuperAdmin } from "@/lib/data/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Reports"
};

export default async function AdminReportsPage() {
  await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { data: reports } = await admin
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-semibold text-neutral-900">Reports & complaints</h1>
        <p className="text-sm text-neutral-600">
          Review reports and update status.
        </p>
      </CardHeader>
      <CardContent>
        <ReportsAdminTable reports={(reports as any) ?? []} />
      </CardContent>
    </Card>
  );
}

