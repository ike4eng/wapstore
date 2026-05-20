import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { requireUser } from "@/lib/data/me";

export const metadata = {
  title: "Add product"
};

export default async function NewProductPage() {
  const { supabase, user } = await requireUser();

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!store) redirect("/dashboard/store");

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-semibold text-neutral-900">Add product</h1>
        <p className="text-sm text-neutral-600">
          Upload an image and let customers order on WhatsApp.
        </p>
      </CardHeader>
      <CardContent>
        <ProductForm storeId={store.id} />
      </CardContent>
    </Card>
  );
}

