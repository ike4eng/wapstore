import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About",
  description: "Learn about Wapstore and why it exists."
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          About Wapstore
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          Wapstore helps small businesses create a lightweight product catalog and
          take orders directly on WhatsApp. It’s designed to be fast, mobile-first,
          and simple for sellers who don’t want a complicated ecommerce platform.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Built for WhatsApp commerce",
            body: "Customers browse and tap “Order on WhatsApp” to message you instantly."
          },
          {
            title: "Mobile-first and low data",
            body: "Optimized layouts and images so stores feel fast on slow networks."
          },
          {
            title: "Simple, not overcomplicated",
            body: "No checkout, no payment setup. You finalize delivery and payment yourself."
          }
        ].map((c) => (
          <Card key={c.title} className="shadow-soft">
            <CardContent className="pt-5">
              <p className="text-sm font-semibold text-neutral-900">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {c.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

