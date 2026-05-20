import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Wapstore."
};

const faqs = [
  {
    q: "Do customers need accounts?",
    a: "No. Customers browse your storefront and order directly on WhatsApp."
  },
  {
    q: "How do WhatsApp orders work?",
    a: "Customers tap “Order on WhatsApp” and WhatsApp opens with a prefilled message including product name, price, and store."
  },
  {
    q: "Can I use my phone only?",
    a: "Yes. Wapstore is mobile-first. You can manage your store and products from your phone."
  },
  {
    q: "Is Wapstore free?",
    a: "Yes. The Free plan includes up to 5 products and a basic storefront."
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. Upgrade any time to unlock unlimited products, remove branding, and get premium customization."
  }
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          FAQ
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          Quick answers to common questions from sellers and customers.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-3">
        {faqs.map((i) => (
          <details
            key={i.q}
            className="group rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-soft"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-neutral-900">
              <span>{i.q}</span>
              <span className="text-neutral-400 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{i.a}</p>
          </details>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <Card className="shadow-soft">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-neutral-900">Still stuck?</p>
            <p className="mt-2 text-sm text-neutral-600">
              Contact support from your dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

