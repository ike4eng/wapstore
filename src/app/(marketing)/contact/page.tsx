import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Contact",
  description: "Contact the Wapstore team."
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Contact
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          Need help or want to upgrade? Reach out and we’ll respond.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Email</p>
            <p className="text-sm text-neutral-600">Best for support and billing</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              href="mailto:support@wapstore.app"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900"
            >
              <Mail className="h-4 w-4" />
              support@wapstore.app
            </Link>
            <ButtonLink href="/dashboard/support" variant="secondary">
              Open support form
            </ButtonLink>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Demo stores</p>
            <p className="text-sm text-neutral-600">See what sellers are building</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-neutral-600">
              Explore public storefronts to understand the customer experience.
            </p>
            <ButtonLink href="/explore">
              <MessageCircle className="h-4 w-4" />
              Explore stores
            </ButtonLink>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

