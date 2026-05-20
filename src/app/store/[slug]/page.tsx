import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StorefrontClient } from "@/components/storefront/StorefrontClient";
import { getDemoProductsBySlug, getDemoStoreBySlug } from "@/lib/demo";

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = createSupabaseServerClient();
  const { data: store } = await supabase
    .from("stores")
    .select("store_name,description,logo_url")
    .eq("slug", params.slug)
    .maybeSingle();

  if (store) {
    return {
      title: store.store_name,
      description: store.description ?? `Browse products from ${store.store_name}.`,
      openGraph: {
        title: store.store_name,
        description: store.description ?? undefined,
        images: store.logo_url ? [{ url: store.logo_url }] : undefined
      }
    };
  }

  const demoStore = getDemoStoreBySlug(params.slug);
  if (demoStore) {
    return {
      title: demoStore.store_name,
      description: demoStore.description ?? `Browse products from ${demoStore.store_name}.`,
      openGraph: {
        title: demoStore.store_name,
        description: demoStore.description ?? undefined,
        images: demoStore.logo_url ? [{ url: demoStore.logo_url }] : undefined
      }
    };
  }

  return { title: "Store" };
}

export default async function StorefrontPage({
  params
}: {
  params: { slug: string };
}) {
  const supabase = createSupabaseServerClient();

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!store) {
    const demoStore = getDemoStoreBySlug(params.slug);
    if (demoStore) {
      return (
        <StorefrontClient
          store={demoStore as any}
          products={getDemoProductsBySlug(params.slug) as any}
          showBranding={true}
        />
      );
    }
    notFound();
  }

  if (store.status !== "active") notFound();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", store.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan_type,status")
    .eq("user_id", store.user_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const showBranding = !(
    subscription?.status === "active" && subscription.plan_type === "premium"
  );

  return (
    <StorefrontClient
      store={store as any}
      products={(products as any) ?? []}
      showBranding={showBranding}
    />
  );
}
