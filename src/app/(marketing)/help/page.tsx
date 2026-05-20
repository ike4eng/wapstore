import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export const metadata = {
  title: "Help Center",
  description: "Get help using Wapstore."
};

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Help Center
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          Quick guides and answers to help you create your store and start selling.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Create your store",
            body: "Go to the dashboard, set your store name, slug, and WhatsApp number.",
            href: "/dashboard/store"
          },
          {
            title: "Add products",
            body: "Upload product images, set prices, and organize categories.",
            href: "/dashboard/products"
          },
          {
            title: "Share your link",
            body: "Copy your storefront link and share it on WhatsApp or social media.",
            href: "/dashboard"
          }
        ].map((g) => (
          <Card key={g.title} className="shadow-soft">
            <CardHeader>
              <p className="text-sm font-semibold text-neutral-900">{g.title}</p>
              <p className="text-sm text-neutral-600">{g.body}</p>
            </CardHeader>
            <CardContent>
              <ButtonLink href={g.href} variant="secondary">
                Open
              </ButtonLink>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-black/10 bg-neutral-50 p-6">
        <p className="text-sm font-semibold text-neutral-900">Need support?</p>
        <p className="mt-2 text-sm text-neutral-600">
          Submit a ticket from your dashboard or read the{" "}
          <Link href="/faq" className="font-semibold text-neutral-900">
            FAQ
          </Link>
          .
        </p>
        <div className="mt-4">
          <ButtonLink href="/dashboard/support">Contact support</ButtonLink>
        </div>
      </div>
    </div>
  );
}

