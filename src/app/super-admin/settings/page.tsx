import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireSuperAdmin } from "@/lib/data/admin";

export const metadata = {
  title: "Settings"
};

export default async function AdminSettingsPage() {
  await requireSuperAdmin();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Platform settings
        </h1>
        <p className="text-sm text-neutral-600">
          High-level configuration for pricing and limits.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Pricing</p>
            <p className="text-sm text-neutral-600">Plans available</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Free</p>
                <p className="text-sm text-neutral-600">R0</p>
              </div>
              <Badge>Default</Badge>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Premium</p>
                <p className="text-sm text-neutral-600">Unlimited</p>
              </div>
              <Badge variant="brand">Available</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Limits</p>
            <p className="text-sm text-neutral-600">Current product limits</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-neutral-900">
                Free plan products
              </p>
              <Badge>5</Badge>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-neutral-900">
                Premium plan products
              </p>
              <Badge variant="brand">Unlimited</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Maintenance mode</p>
            <p className="text-sm text-neutral-600">
              Recommended during major updates
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-neutral-900">Status</p>
              <Badge variant="success">Off</Badge>
            </div>
            <p className="text-sm text-neutral-600">
              This is a UI placeholder. Add a database-backed setting if you want
              to control maintenance mode from here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

