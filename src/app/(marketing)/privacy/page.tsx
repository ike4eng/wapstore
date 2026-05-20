export const metadata = {
  title: "Privacy Policy",
  description: "Wapstore privacy policy."
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          This page describes how Wapstore handles data. Replace this content with
          your final privacy policy before launch.
        </p>
        <div className="space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            We store account and store information needed to operate the platform,
            such as your email, store details, and product information.
          </p>
          <p>
            Wapstore does not process payments. Orders happen on WhatsApp between
            customers and sellers.
          </p>
          <p>
            You can request account deletion by contacting support.
          </p>
        </div>
      </div>
    </div>
  );
}

