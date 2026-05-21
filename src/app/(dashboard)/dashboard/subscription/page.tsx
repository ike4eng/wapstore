import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { requireUser } from "@/lib/data/me";

export const metadata = {
  title: "Subscription"
};

export default async function SubscriptionPage({
  searchParams
}: {
  searchParams?: Promise<{ payfast?: string }>;
}) {
  const { supabase, user } = await requireUser();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const plan =
    subscription?.status === "active" && subscription.plan_type === "premium"
      ? "premium"
      : "free";

  const sp = await searchParams;
  const payfastStatus = sp?.payfast;
  const showPayfastSuccess = payfastStatus === "success";
  const showPayfastCancel = payfastStatus === "cancel";

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Subscription
        </h1>
        <p className="text-sm text-neutral-600">
          Manage your plan and product limits.
        </p>
      </div>

      {showPayfastSuccess ? (
        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">
              Payment received
            </p>
            <p className="text-sm text-neutral-700">
              Thanks! We’ll activate Premium once PayFast confirms your payment
              (this can take a moment). Refresh this page if you still see Free.
            </p>
          </CardHeader>
        </Card>
      ) : null}

      {showPayfastCancel ? (
        <Card className="border-amber-200 bg-amber-50/40">
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">
              Payment cancelled
            </p>
            <p className="text-sm text-neutral-700">
              You cancelled the PayFast checkout. No changes were made to your
              subscription.
            </p>
          </CardHeader>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">Current plan</p>
              <Badge variant={plan === "premium" ? "brand" : "neutral"}>
                {plan === "premium" ? "Premium" : "Free"}
              </Badge>
            </div>
            <p className="text-sm text-neutral-600">Your active subscription</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2 text-sm text-neutral-700">
              {plan === "free" ? (
                <>
                  <li>Up to 5 products</li>
                  <li>Basic storefront</li>
                  <li>Wapstore branding</li>
                </>
              ) : (
                <>
                  <li>Unlimited products</li>
                  <li>Premium themes</li>
                  <li>Remove Wapstore branding</li>
                  <li>Featured listing eligibility</li>
                </>
              )}
            </ul>
            <ButtonLink href="/dashboard/support" variant="secondary">
              Billing support
            </ButtonLink>
          </CardContent>
        </Card>

        <Card className="border-brand-200">
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Premium</p>
            <p className="text-sm text-neutral-600">
              Unlock unlimited products and premium themes
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {plan === "premium" ? (
              <>
                <p className="text-sm text-neutral-700">
                  Your Premium subscription is active.
                </p>
                <ButtonLink href="/dashboard/support" variant="secondary">
                  Need help with billing?
                </ButtonLink>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    R75 / month
                  </p>
                  <p className="text-sm text-neutral-700">
                    Pay securely with PayFast using credit card, Instant EFT, or
                    debit.
                  </p>
                </div>

                <form action="/api/payfast/subscribe" method="post">
                  <Button type="submit" className="w-full">
                    Pay R75/month with PayFast
                  </Button>
                </form>

                <p className="text-xs text-neutral-600">
                  You’ll be redirected to PayFast to complete payment.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
