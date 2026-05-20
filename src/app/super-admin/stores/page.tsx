import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StoresAdminTable } from "@/components/admin/StoresAdminTable";
import { requireSuperAdmin } from "@/lib/data/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Stores"
};

export default async function AdminStoresPage() {
  await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { data: stores } = await admin
    .from("stores")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-semibold text-neutral-900">Store management</h1>
        <p className="text-sm text-neutral-600">
          Search, suspend, ban, feature, verify, or delete stores.
        </p>
      </CardHeader>
      <CardContent>
        <StoresAdminTable stores={(stores as any) ?? []} />
      </CardContent>
    </Card>
  );
}

