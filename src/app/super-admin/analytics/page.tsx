import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkline } from "@/components/admin/Sparkline";
import { requireSuperAdmin } from "@/lib/data/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildSeries(dates: string[], createdAts: string[]) {
  const counts = new Map<string, number>();
  createdAts.forEach((c) => {
    const k = c.slice(0, 10);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  });
  return dates.map((d) => counts.get(d) ?? 0);
}

export const metadata = {
  title: "Analytics"
};

export default async function AdminAnalyticsPage() {
  await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const days = Array.from({ length: 30 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - idx));
    return dayKey(d);
  });
  const start = `${days[0]}T00:00:00.000Z`;

  const [users, stores, products, subscriptions] = await Promise.all([
    admin.from("profiles").select("created_at").gte("created_at", start).limit(5000),
    admin.from("stores").select("created_at").gte("created_at", start).limit(5000),
    admin.from("products").select("created_at").gte("created_at", start).limit(5000),
    admin
      .from("subscriptions")
      .select("created_at")
      .gte("created_at", start)
      .limit(5000)
  ]);

  const userSeries = buildSeries(days, (users.data ?? []).map((r) => r.created_at as string));
  const storeSeries = buildSeries(
    days,
    (stores.data ?? []).map((r) => r.created_at as string)
  );
  const productSeries = buildSeries(
    days,
    (products.data ?? []).map((r) => r.created_at as string)
  );
  const subSeries = buildSeries(
    days,
    (subscriptions.data ?? []).map((r) => r.created_at as string)
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Analytics
        </h1>
        <p className="text-sm text-neutral-600">
          Trends over the last 30 days.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "User growth", series: userSeries },
          { title: "Store growth", series: storeSeries },
          { title: "Product growth", series: productSeries },
          { title: "Subscription events", series: subSeries }
        ].map((c) => (
          <Card key={c.title}>
            <CardHeader>
              <p className="text-sm font-semibold text-neutral-900">{c.title}</p>
              <p className="text-sm text-neutral-600">Daily counts</p>
            </CardHeader>
            <CardContent>
              <div className="text-brand-700">
                <Sparkline values={c.series} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

