import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Pricing"
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="space-y-3">
        <Badge variant="brand">Simple pricing</Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Start free. Upgrade when you’re ready.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
          Wapstore is designed for small businesses who want a fast product
          catalog and WhatsApp ordering.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-neutral-900">Free</h2>
              <Badge>Most popular</Badge>
            </div>
            <p className="text-sm text-neutral-600">For new sellers</p>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold tracking-tight text-neutral-900">
              R0
            </p>
            <ul className="mt-5 space-y-2 text-sm text-neutral-700">
              <li>Maximum 5 products</li>
              <li>Basic storefront</li>
              <li>Wapstore branding</li>
              <li>WhatsApp order button</li>
            </ul>
            <div className="mt-6">
              <ButtonLink href="/register" className="w-full">
                Create Your WhatsApp Store
              </ButtonLink>
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-neutral-900">Premium</h2>
              <Badge variant="brand">Upgrade</Badge>
            </div>
            <p className="text-sm text-neutral-600">For growing brands</p>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold tracking-tight text-neutral-900">
              Unlimited
            </p>
            <ul className="mt-5 space-y-2 text-sm text-neutral-700">
              <li>Unlimited products</li>
              <li>Premium themes</li>
              <li>Remove Wapstore branding</li>
              <li>Featured listing eligibility</li>
            </ul>
            <div className="mt-6">
              <ButtonLink href="/register" variant="secondary" className="w-full">
                Get Premium
              </ButtonLink>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
        <h3 className="text-base font-semibold text-neutral-900">
          What’s included in both plans
        </h3>
        <ul className="mt-3 grid gap-2 text-sm text-neutral-700 md:grid-cols-2">
          <li>Mobile-first storefront</li>
          <li>Product categories</li>
          <li>Fast images and lazy loading</li>
          <li>Storefront link + QR code</li>
        </ul>
      </div>
    </div>
  );
}

