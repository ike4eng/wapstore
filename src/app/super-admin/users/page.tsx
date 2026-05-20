import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UsersAdminTable } from "@/components/admin/UsersAdminTable";
import { requireSuperAdmin } from "@/lib/data/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Users"
};

export default async function AdminUsersPage() {
  await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { data: users } = await admin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-semibold text-neutral-900">User management</h1>
        <p className="text-sm text-neutral-600">Suspend, ban, or delete users.</p>
      </CardHeader>
      <CardContent>
        <UsersAdminTable users={(users as any) ?? []} />
      </CardContent>
    </Card>
  );
}

