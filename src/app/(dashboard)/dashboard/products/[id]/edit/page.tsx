import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { requireUser } from "@/lib/data/me";

export const metadata = {
  title: "Edit product"
};

export default async function EditProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase, user } = await requireUser();

  const { data: product } = await supabase
    .from("products")
    .select("*,stores(id,user_id)")
    .eq("id", id)
    .maybeSingle();

  const ownerId = (product as any)?.stores?.user_id as string | undefined;
  if (!product || ownerId !== user.id) redirect("/dashboard/products");

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-semibold text-neutral-900">Edit product</h1>
        <p className="text-sm text-neutral-600">Update details or deactivate.</p>
      </CardHeader>
      <CardContent>
        <ProductForm storeId={(product as any).stores.id} product={product as any} />
      </CardContent>
    </Card>
  );
}
