import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";
import { requireSuperAdmin } from "@/lib/data/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { EmptyState } from "@/components/ui/empty-state";
import { Megaphone } from "lucide-react";

export const metadata = {
  title: "Announcements"
};

export default async function AdminAnnouncementsPage() {
  await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { data: announcements } = await admin
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold text-neutral-900">Announcements</h1>
          <p className="text-sm text-neutral-600">Publish updates to sellers.</p>
        </CardHeader>
        <CardContent>
          <AnnouncementForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-sm font-semibold text-neutral-900">Recent</p>
          <p className="text-sm text-neutral-600">Latest announcements</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {announcements?.length ? (
            announcements.map((a) => (
              <div key={a.id} className="rounded-2xl border border-neutral-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-neutral-900">{a.title}</p>
                  <Badge variant="brand">live</Badge>
                </div>
                <p className="mt-2 text-sm text-neutral-600">{a.message}</p>
              </div>
            ))
          ) : (
            <EmptyState
              icon={Megaphone}
              title="No announcements yet"
              description="Create an announcement to show updates in the seller dashboard."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
