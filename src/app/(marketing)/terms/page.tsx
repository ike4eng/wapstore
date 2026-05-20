export const metadata = {
  title: "Terms of Service",
  description: "Wapstore terms of service."
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Terms of Service
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          This page provides general terms for using Wapstore. Replace this content
          with your legal terms before launch.
        </p>
        <div className="space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            Wapstore provides a storefront tool that helps sellers share product
            catalogs and receive orders through WhatsApp. Wapstore does not process
            payments or handle delivery.
          </p>
          <p>
            Sellers are responsible for product accuracy, pricing, fulfillment,
            customer communication, and compliance with local laws.
          </p>
          <p>
            Wapstore may suspend or ban accounts for prohibited products, scams, or
            abusive behavior.
          </p>
        </div>
      </div>
    </div>
  );
}

