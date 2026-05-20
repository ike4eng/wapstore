import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export default async function SuperAdminOverviewPage() {
  await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const [
    usersCount,
    storesCount,
    productsCount,
    premiumCount,
    activeStoresCount,
    bannedUsersCount
  ] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("stores").select("id", { count: "exact", head: true }),
    admin.from("products").select("id", { count: "exact", head: true }),
    admin
      .from("subscriptions")
      .select("id", { count: "exact", head: true })
      .eq("status", "active")
      .eq("plan_type", "premium"),
    admin
      .from("stores")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    admin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("status", "banned")
  ]);

  const days = Array.from({ length: 14 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - idx));
    return dayKey(d);
  });
  const start = `${days[0]}T00:00:00.000Z`;

  const [userGrowth, storeGrowth, productGrowth, subGrowth] = await Promise.all([
    admin
      .from("profiles")
      .select("created_at")
      .gte("created_at", start)
      .limit(1000),
    admin
      .from("stores")
      .select("created_at")
      .gte("created_at", start)
      .limit(1000),
    admin
      .from("products")
      .select("created_at")
      .gte("created_at", start)
      .limit(1000),
    admin
      .from("subscriptions")
      .select("created_at")
      .gte("created_at", start)
      .limit(1000)
  ]);

  const userSeries = buildSeries(
    days,
    (userGrowth.data ?? []).map((r) => r.created_at as string)
  );
  const storeSeries = buildSeries(
    days,
    (storeGrowth.data ?? []).map((r) => r.created_at as string)
  );
  const productSeries = buildSeries(
    days,
    (productGrowth.data ?? []).map((r) => r.created_at as string)
  );
  const subSeries = buildSeries(
    days,
    (subGrowth.data ?? []).map((r) => r.created_at as string)
  );

  const { data: recentSignups } = await admin
    .from("profiles")
    .select("id,email,role,status,created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
          Platform overview
        </h1>
        <p className="text-sm text-neutral-600">Key platform metrics and growth.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Users</p>
            <p className="text-sm text-neutral-600">Total signups</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-3xl font-semibold text-neutral-900">
              {usersCount.count ?? 0}
            </p>
            <div className="text-brand-700">
              <Sparkline values={userSeries} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Stores</p>
            <p className="text-sm text-neutral-600">Created stores</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-3xl font-semibold text-neutral-900">
              {storesCount.count ?? 0}
            </p>
            <div className="text-brand-700">
              <Sparkline values={storeSeries} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Products</p>
            <p className="text-sm text-neutral-600">Total products</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-3xl font-semibold text-neutral-900">
              {productsCount.count ?? 0}
            </p>
            <div className="text-brand-700">
              <Sparkline values={productSeries} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Premium users</p>
            <p className="text-sm text-neutral-600">Active premium</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-neutral-900">
              {premiumCount.count ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Active stores</p>
            <p className="text-sm text-neutral-600">Currently live</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-neutral-900">
              {activeStoresCount.count ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Banned users</p>
            <p className="text-sm text-neutral-600">Total banned</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-neutral-900">
              {bannedUsersCount.count ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm font-semibold text-neutral-900">Recent signups</p>
          <p className="text-sm text-neutral-600">Latest profiles</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentSignups?.length ? (
            recentSignups.map((u) => (
              <div
                key={u.id}
                className="flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {u.email}
                  </p>
                  <p className="text-xs text-neutral-500">{u.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={u.role === "super_admin" ? "brand" : "neutral"}>
                    {u.role}
                  </Badge>
                  <Badge
                    variant={
                      u.status === "active"
                        ? "success"
                        : u.status === "suspended"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {u.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-600">No users yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
