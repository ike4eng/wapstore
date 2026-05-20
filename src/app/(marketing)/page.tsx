import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  CheckCircle2,
  Link2,
  MessageCircle,
  Package,
  PhoneCall,
  Search,
  Smartphone,
  Store,
  Upload
} from "lucide-react";
import { Hero } from "@/components/marketing/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { DEMO_STORES, DEMO_PRODUCTS } from "@/lib/demo";

const steps = [
  {
    title: "Create Your Store",
    description: "Pick a name, link (slug), and WhatsApp number in minutes.",
    icon: Store
  },
  {
    title: "Upload Products",
    description: "Add items with photos, prices, and categories — from your phone.",
    icon: Upload
  },
  {
    title: "Receive Orders On WhatsApp",
    description: "Customers tap “Order on WhatsApp” and you get a prefilled message.",
    icon: MessageCircle
  }
];

const features = [
  {
    title: "WhatsApp ordering",
    description: "Prefilled order messages using the official wa.me format.",
    icon: MessageCircle
  },
  {
    title: "Mobile-friendly stores",
    description: "Designed for small screens and low-end Android devices.",
    icon: Smartphone
  },
  {
    title: "Shareable store link",
    description: "Copy, share, and promote your storefront anywhere.",
    icon: Link2
  },
  {
    title: "Product management",
    description: "Add, edit, delete, and activate/deactivate products.",
    icon: Package
  },
  {
    title: "Fast setup",
    description: "Create your store and upload your first products in minutes.",
    icon: Bolt
  },
  {
    title: "Low data usage",
    description: "Lightweight pages and optimized images for slow networks.",
    icon: PhoneCall
  }
];

const demoStores = DEMO_STORES.map((s) => ({
  slug: s.slug,
  name: s.store_name,
  type: s.location ?? "Demo store",
  logo: s.logo_url,
  banner: s.banner_url,
  products: (DEMO_PRODUCTS[s.slug] ?? []).slice(0, 3)
}));

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

export default function LandingPage() {
  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { k: "Active stores", v: "2,400+" },
            { k: "Sellers joined", v: "12,000+" },
            { k: "Products uploaded", v: "85,000+" }
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-3xl border border-black/10 bg-white p-5 shadow-soft"
            >
              <p className="text-2xl font-semibold tracking-tight text-neutral-900">
                {s.v}
              </p>
              <p className="mt-1 text-sm text-neutral-600">{s.k}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold text-neutral-600">HOW IT WORKS</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Start selling in 3 simple steps
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Beginner-friendly setup designed for small businesses and local sellers.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.title} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white">
                      <s.icon className="h-5 w-5 text-neutral-900" />
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900">
                      {s.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {s.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-neutral-600">FEATURES</p>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Built for WhatsApp commerce
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
              A lightweight storefront that helps customers browse and order instantly.
            </p>
          </div>
          <div className="flex md:justify-end">
            <ButtonLink href="/register" variant="secondary">
              Start Free <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white">
                    <f.icon className="h-5 w-5 text-neutral-900" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">
                    {f.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="demos" className="scroll-mt-24 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-neutral-600">DEMO STOREFRONTS</p>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                See what you can build
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
                Clean, mobile-first storefronts that help customers order fast.
              </p>
            </div>
            <div className="flex">
              <ButtonLink href="/explore" variant="secondary">
                Explore Stores <Search className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {demoStores.map((s) => (
              <div
                key={s.name}
                className="rounded-3xl border border-black/10 bg-white p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-black/10 bg-neutral-50">
                      {s.logo ? (
                        <Image
                          src={s.logo}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="44px"
                          quality={70}
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-neutral-900">
                        {s.name}
                      </p>
                      <p className="text-xs text-neutral-500">{s.type}</p>
                    </div>
                  </div>
                  <ButtonLink href={`/store/${s.slug}`} variant="ghost" size="sm">
                    View demo <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                </div>

                {s.banner ? (
                  <div className="relative mt-4 aspect-[16/6] w-full overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
                    <Image
                      src={s.banner}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 92vw, 520px"
                      quality={70}
                    />
                  </div>
                ) : null}

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {s.products.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl border border-black/10 bg-neutral-50 p-3"
                    >
                      <div className="relative h-16 w-full overflow-hidden rounded-xl bg-neutral-200/50">
                        {p.image_url ? (
                          <Image
                            src={p.image_url}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 28vw, 160px"
                            quality={70}
                          />
                        ) : null}
                      </div>
                      <p className="mt-2 truncate text-xs font-semibold text-neutral-900">
                        {p.name}
                      </p>
                      <div className="mt-2 h-8 rounded-xl border border-black/10 bg-white" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-11 rounded-2xl border border-black/10 bg-white" />
                  <div className="h-11 rounded-2xl border border-black/10 bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="benefits"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <div className="rounded-3xl border border-black/10 bg-neutral-50 p-6 shadow-soft">
              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900">
                    Your storefront link
                  </p>
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
                    wapstore.app/store/your-shop
                  </span>
                </div>
                <div className="mt-4 grid gap-3">
                  <div className="h-12 rounded-2xl bg-neutral-100" />
                  <div className="h-12 rounded-2xl bg-neutral-100" />
                  <div className="h-12 rounded-2xl bg-neutral-100" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-11 rounded-2xl border border-black/10 bg-white" />
                  <div className="h-11 rounded-2xl border border-black/10 bg-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-5 md:order-2">
            <p className="text-xs font-semibold text-neutral-600">BENEFITS</p>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Sell without building a full website
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              Wapstore is made for small businesses that want a simple, fast online
              catalog and direct WhatsApp communication.
            </p>
            <ul className="space-y-3 text-sm text-neutral-700">
              {[
                "Share your store link on WhatsApp, Instagram, or SMS",
                "Customers order with one tap — message is prefilled",
                "Mobile-first browsing on slow connections",
                "Simple for resellers, salons, food vendors, and hustlers"
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-neutral-900" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/register" size="lg">
                Create Your Store <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/explore" size="lg" variant="ghost">
                Explore Demo Stores
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold text-neutral-600">PRICING</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Simple plans for every stage
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Start free. Upgrade when you need unlimited products and premium customization.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <h3 className="text-base font-semibold text-neutral-900">Free</h3>
                <p className="text-sm text-neutral-600">For new sellers</p>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold tracking-tight text-neutral-900">
                  R0
                </p>
                <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                  <li>5 products</li>
                  <li>Basic storefront</li>
                  <li>Wapstore branding</li>
                </ul>
                <div className="mt-6">
                  <ButtonLink href="/register" className="w-full">
                    Start Free
                  </ButtonLink>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/15 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-neutral-900">Premium</h3>
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-neutral-800">
                    <BadgeCheck className="h-4 w-4" />
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-neutral-600">For growing brands</p>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold tracking-tight text-neutral-900">
                  Unlimited
                </p>
                <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                  <li>Unlimited products</li>
                  <li>Remove branding</li>
                  <li>Premium customization</li>
                  <li>Featured listings</li>
                </ul>
                <div className="mt-6">
                  <ButtonLink href="/register" variant="secondary" className="w-full">
                    Upgrade later
                  </ButtonLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold text-neutral-600">TESTIMONIALS</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Loved by local businesses
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Real feedback from sellers who want simple WhatsApp commerce.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              quote:
                "My customers just click and order. I stopped sending 30 pictures every day.",
              name: "Thabo",
              role: "Sneaker seller",
              location: "Soweto"
            },
            {
              quote:
                "I can run everything from my phone. Orders come in with the product details already typed.",
              name: "Amina",
              role: "Food vendor",
              location: "Lagos"
            },
            {
              quote:
                "The storefront looks clean and professional. Clients trust me more and bookings are up.",
              name: "Lerato",
              role: "Salon owner",
              location: "Pretoria"
            }
          ].map((t) => (
            <Card key={t.name} className="shadow-soft">
              <CardContent className="pt-5">
                <p className="text-sm leading-relaxed text-neutral-700">“{t.quote}”</p>
                <div className="mt-4 text-sm">
                  <p className="font-semibold text-neutral-900">{t.name}</p>
                  <p className="text-neutral-600">
                    {t.role} • {t.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-neutral-600">FAQ</p>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                Common questions
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Everything you need to know before you start.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((i) => (
                <details
                  key={i.q}
                  className="group rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-soft"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-neutral-900">
                    <span>{i.q}</span>
                    <span className="text-neutral-400 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {i.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft md:p-10">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-neutral-600">READY TO START?</p>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                Start selling online with WhatsApp orders today
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Create your storefront, upload products, and share your link in minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <ButtonLink href="/register" size="lg">
                Create Your Store <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/explore" size="lg" variant="ghost">
                Explore Demo Stores
              </ButtonLink>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "No customer accounts needed",
              "Orders go straight to WhatsApp",
              "Built for mobile and low data"
            ].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-800"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs text-neutral-500">
            <Link href="/pricing" className="font-semibold text-neutral-800">
              View pricing
            </Link>{" "}
            or{" "}
            <Link href="/explore" className="font-semibold text-neutral-800">
              explore stores
            </Link>{" "}
            first.
          </div>
        </div>
      </section>
    </div>
  );
}
