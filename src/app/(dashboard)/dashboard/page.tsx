import Link from "next/link";
import { ArrowRight, Plus, Store as StoreIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CopyButton } from "@/components/dashboard/CopyButton";
import { QRCodeCard } from "@/components/dashboard/QRCodeCard";
import { ShareButton } from "@/components/dashboard/ShareButton";
import { TemplateStarter } from "@/components/dashboard/TemplateStarter";
import { publicEnv } from "@/lib/env";
import { requireUser } from "@/lib/data/me";

export const metadata = {
  title: "Dashboard"
};

export default async function DashboardPage() {
  const { supabase, user } = await requireUser();
  const { appUrl } = publicEnv();

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const plan =
    subscription?.status === "active" && subscription?.plan_type === "premium"
      ? "premium"
      : "free";

  const storefrontUrl = store?.slug ? `${appUrl}/store/${store.slug}` : "";

  const { count: productCount } = store?.id
    ? await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("store_id", store.id)
    : { count: 0 };

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-neutral-700">Seller dashboard</p>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Welcome back
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={plan === "premium" ? "brand" : "neutral"}>
            {plan === "premium" ? "Premium" : "Free"}
          </Badge>
          {store?.status ? (
            <Badge
              variant={
                store.status === "active"
                  ? "success"
                  : store.status === "pending_review"
                    ? "warning"
                    : "danger"
              }
            >
              {store.status}
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Products</p>
            <p className="text-sm text-neutral-600">Total uploaded</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-neutral-900">
              {productCount ?? 0}
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              {plan === "free" ? "Free limit: 5 products" : "Unlimited products"}
            </p>
            <div className="mt-4">
              <ButtonLink href="/dashboard/products" variant="secondary">
                Manage products <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Your store</p>
            <p className="text-sm text-neutral-600">Settings and link</p>
          </CardHeader>
          <CardContent>
            {store ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <StoreIcon className="h-4 w-4 text-brand-700" />
                  {store.store_name}
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-700">
                  {storefrontUrl}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <CopyButton value={storefrontUrl} />
                  <ShareButton
                    url={storefrontUrl}
                    title={store.store_name}
                    text="Browse my products on Wapstore"
                  />
                  <ButtonLink href={`/store/${store.slug}`} variant="ghost">
                    View store
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-neutral-600">
                  Create your store to get a public link.
                </p>
                <ButtonLink href="/dashboard/store">
                  Create store <Plus className="h-4 w-4" />
                </ButtonLink>
              </div>
            )}
          </CardContent>
        </Card>

        {storefrontUrl ? <QRCodeCard url={storefrontUrl} /> : <Card />}
      </div>

      {!store ? <TemplateStarter /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Quick actions</p>
            <p className="text-sm text-neutral-600">Do the most common tasks</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/dashboard/store"
              className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Update store settings <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard/products/new"
              className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Add a product <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard/subscription"
              className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              View subscription <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Announcements</p>
            <p className="text-sm text-neutral-600">Latest updates from Wapstore</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements?.length ? (
              announcements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3"
                >
                  <p className="text-sm font-semibold text-neutral-900">
                    {a.title}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{a.message}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-600">No announcements yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
