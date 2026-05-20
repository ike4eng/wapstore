"use client";

import * as React from "react";
import Image from "next/image";
import { MessageCircle, PhoneCall, Search } from "lucide-react";
import type { Product, Store } from "@/lib/db/types";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn, formatMoneyZAR, waMeLink } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export function StorefrontClient({
  store,
  products,
  showBranding
}: {
  store: Store;
  products: Product[];
  showBranding: boolean;
}) {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");
  const [query, setQuery] = React.useState("");

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const filtered = React.useMemo(() => {
    return products.filter((p) => {
      const inCategory = activeCategory === "All" || p.category === activeCategory;
      const q = query.trim().toLowerCase();
      const inQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [products, activeCategory, query]);

  const whatsappLink = waMeLink(
    store.whatsapp_number,
    `Hi ${store.store_name}, I have a question.`
  );

  return (
    <div className="min-h-dvh bg-white">
      <div
        className="relative"
        style={{
          background: store.theme_color
            ? `linear-gradient(180deg, ${store.theme_color}22, transparent)`
            : "linear-gradient(180deg, rgba(21,198,128,0.10), transparent)"
        }}
      >
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-8">
          <div className="grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  {store.logo_url ? (
                    <Image
                      src={store.logo_url}
                      alt={store.store_name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-semibold tracking-tight text-neutral-900">
                    {store.store_name}
                  </h1>
                  {store.location ? (
                    <p className="text-sm text-neutral-600">{store.location}</p>
                  ) : null}
                  {store.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                      {store.description}
                    </p>
                  ) : null}
                </div>
              </div>

              {store.banner_url ? (
                <div className="relative aspect-[16/6] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
                  <Image
                    src={store.banner_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 900px"
                    priority
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-3">
              <ButtonLink
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full"
                size="lg"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </ButtonLink>
              <ButtonLink
                href={`tel:${store.whatsapp_number}`}
                variant="ghost"
                className="w-full"
              >
                <PhoneCall className="h-4 w-4" />
                Call
              </ButtonLink>
              {showBranding ? (
                <p className="text-center text-xs text-neutral-500">
                  Powered by Wapstore
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    "whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold",
                    activeCategory === c
                      ? "border-brand-300 bg-brand-50 text-brand-900"
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="h-11 w-full rounded-2xl border border-neutral-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 md:w-[320px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-14">
        {!filtered.length ? (
          <div className="mt-10">
            <EmptyState
              icon={Search}
              title="No products found"
              description="Try another category or clear your search."
              secondaryAction={{ label: "Explore stores", href: "/explore" }}
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {filtered.map((p) => {
              const message = `Hello, I want to order:\nProduct: ${p.name}\nPrice: ${formatMoneyZAR(
                Number(p.price)
              )}\nStore: ${store.store_name}`;
              const link = waMeLink(store.whatsapp_number, message);
              return (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-soft"
                >
                  <div className="relative aspect-square w-full bg-neutral-100">
                    {p.image_url ? (
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 46vw, 280px"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {p.name}
                    </p>
                    <p className="text-sm text-neutral-700">
                      {formatMoneyZAR(Number(p.price))}
                    </p>
                    {p.description ? (
                      <p className="mt-1 max-h-10 overflow-hidden text-xs text-neutral-600">
                        {p.description}
                      </p>
                    ) : null}
                    <div className="mt-3">
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => window.open(link, "_blank")}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Order on WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
