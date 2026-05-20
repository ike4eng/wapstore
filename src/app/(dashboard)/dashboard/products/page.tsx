import Image from "next/image";
import { PackageOpen, Plus, Store } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductActions } from "@/components/dashboard/ProductActions";
import { formatMoneyZAR } from "@/lib/utils";
import { requireUser } from "@/lib/data/me";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata = {
  title: "Products"
};

export default async function ProductsPage() {
  const { supabase, user } = await requireUser();

  const { data: store } = await supabase
    .from("stores")
    .select("id,store_name,slug")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!store) {
    return (
      <EmptyState
        icon={Store}
        title="Create your store first"
        description="Add your store details so you can start uploading products and receiving WhatsApp orders."
        primaryAction={{ label: "Create store", href: "/dashboard/store" }}
        secondaryAction={{ label: "View demo store", href: "/store/kasi-kicks" }}
        className="bg-white"
      />
    );
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Products
          </h1>
          <p className="text-sm text-neutral-600">
            Manage products for <span className="font-semibold">{store.store_name}</span>
          </p>
        </div>
        <ButtonLink href="/dashboard/products/new" variant="secondary">
          <Plus className="h-4 w-4" /> Add product
        </ButtonLink>
      </div>

      {!products?.length ? (
        <EmptyState
          icon={PackageOpen}
          title="No products yet"
          description="Add your first product with a photo, price, and category. Customers will be able to order on WhatsApp instantly."
          primaryAction={{ label: "Add product", href: "/dashboard/products/new" }}
          secondaryAction={{ label: "See demo products", href: "/store/mamas-kitchen" }}
          className="bg-white"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-neutral-100">
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 520px"
                  />
                ) : null}
              </div>
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {p.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {formatMoneyZAR(Number(p.price))}
                    </p>
                  </div>
                  <Badge variant={p.is_active ? "success" : "neutral"}>
                    {p.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {p.description ? (
                  <p className="mt-2 max-h-10 overflow-hidden text-sm text-neutral-600">
                    {p.description}
                  </p>
                ) : null}
                <div className="mt-4">
                  <ProductActions productId={p.id} isActive={p.is_active} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
