import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StoreSettingsForm } from "@/components/dashboard/StoreSettingsForm";
import { requireUser } from "@/lib/data/me";
import { isDemoTemplateSlug } from "@/lib/demo";

export const metadata = {
  title: "Store settings"
};

export default async function StoreSettingsPage() {
  const { supabase, user } = await requireUser();
  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Store settings
        </h1>
        <p className="text-sm text-neutral-600">
          Update your public store profile and WhatsApp number.
        </p>
      </div>
      <Card>
        <CardHeader>
          <p className="text-sm font-semibold text-neutral-900">Your store</p>
          <p className="text-sm text-neutral-600">
            Customers will see these details on your storefront.
          </p>
        </CardHeader>
        <CardContent>
          <StoreSettingsForm
            store={(store as any) ?? null}
            canResetTemplate={!!store && isDemoTemplateSlug((store as any).slug)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
