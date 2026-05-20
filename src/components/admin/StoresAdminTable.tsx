"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Store } from "@/lib/db/types";
import { deleteStoreAction, setStoreFeaturedAction, setStoreStatusAction } from "@/lib/actions/admin";
import { EmptyState } from "@/components/ui/empty-state";
import { Store as StoreIcon } from "lucide-react";

export function StoresAdminTable({ stores }: { stores: Store[] }) {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<string>("all");
  const [pending, startTransition] = React.useTransition();

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    return stores.filter((s) => {
      const matchStatus = status === "all" || s.status === status;
      const matchQuery =
        !query ||
        s.store_name.toLowerCase().includes(query) ||
        s.slug.toLowerCase().includes(query) ||
        (s.location ?? "").toLowerCase().includes(query);
      return matchStatus && matchQuery;
    });
  }, [stores, q, status]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, slug, location"
          className="h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="all">All statuses</option>
          <option value="active">active</option>
          <option value="pending_review">pending_review</option>
          <option value="suspended">suspended</option>
          <option value="banned">banned</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-soft"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-neutral-900">
                  {s.store_name}
                </p>
                <p className="text-xs text-neutral-500">/store/{s.slug}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      s.status === "active"
                        ? "success"
                        : s.status === "pending_review"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {s.status}
                  </Badge>
                  {s.is_featured ? <Badge variant="brand">featured</Badge> : null}
                  {s.location ? <Badge>{s.location}</Badge> : null}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/store/${s.slug}`}
                  target="_blank"
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  View
                </Link>

                <select
                  defaultValue={s.status}
                  disabled={pending}
                  className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800"
                  onChange={(e) => {
                    const fd = new FormData();
                    fd.set("store_id", s.id);
                    fd.set("status", e.target.value);
                    startTransition(async () => {
                      await setStoreStatusAction(fd);
                    });
                  }}
                >
                  <option value="active">active</option>
                  <option value="pending_review">pending_review</option>
                  <option value="suspended">suspended</option>
                  <option value="banned">banned</option>
                </select>

                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  disabled={pending}
                  onClick={() => {
                    const fd = new FormData();
                    fd.set("store_id", s.id);
                    fd.set("is_featured", (!s.is_featured).toString());
                    startTransition(async () => {
                      await setStoreFeaturedAction(fd);
                    });
                  }}
                >
                  {s.is_featured ? "Unfeature" : "Feature"}
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  disabled={pending}
                  onClick={() => {
                    if (!confirm("Delete this store?")) return;
                    const fd = new FormData();
                    fd.set("store_id", s.id);
                    startTransition(async () => {
                      await deleteStoreAction(fd);
                    });
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}

        {!filtered.length ? (
          <EmptyState
            icon={StoreIcon}
            title="No stores found"
            description="Try a different keyword or status filter."
          />
        ) : null}
      </div>
    </div>
  );
}
