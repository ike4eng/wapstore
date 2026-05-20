"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import type { Store } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

function StoreCard({ store }: { store: Store }) {
  return (
    <Link
      href={`/store/${store.slug}`}
      className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
          {store.logo_url ? (
            <Image
              src={store.logo_url}
              alt={store.store_name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {store.store_name}
          </p>
          {store.location ? (
            <p className="text-xs text-neutral-600">{store.location}</p>
          ) : null}
          {store.description ? (
            <p className="mt-2 max-h-10 overflow-hidden text-sm text-neutral-600">
              {store.description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-4 text-sm font-semibold text-brand-700">
        View store →
      </div>
    </Link>
  );
}

export function ExploreClient({
  featured,
  newest
}: {
  featured: Store[];
  newest: Store[];
}) {
  const [q, setQ] = React.useState("");

  const filteredNewest = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return newest;
    return newest.filter((s) => {
      return (
        s.store_name.toLowerCase().includes(query) ||
        (s.description ?? "").toLowerCase().includes(query) ||
        (s.location ?? "").toLowerCase().includes(query)
      );
    });
  }, [q, newest]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Explore stores
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
          Browse featured stores and discover new sellers.
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search stores by name, description, or location"
            className="h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {featured.length ? (
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-700" />
            <h2 className="text-base font-semibold text-neutral-900">
              Featured stores
            </h2>
          </div>
          <div className={cn("grid gap-4", featured.length > 1 ? "md:grid-cols-2" : "")}>
            {featured.map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-900">Newest stores</h2>
          <p className="text-xs text-neutral-500">{filteredNewest.length} results</p>
        </div>
        {!filteredNewest.length ? (
          <EmptyState
            icon={Search}
            title="No search results"
            description="Try a different keyword like location, store name, or product type."
            primaryAction={{ label: "Explore demos", href: "/store/kasi-kicks" }}
            secondaryAction={{ label: "Clear search", href: "/explore" }}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredNewest.map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
