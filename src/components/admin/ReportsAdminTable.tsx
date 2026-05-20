"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import type { Report } from "@/lib/db/types";
import { resolveReportAction } from "@/lib/actions/admin";
import { EmptyState } from "@/components/ui/empty-state";
import { ShieldAlert } from "lucide-react";

export function ReportsAdminTable({ reports }: { reports: Report[] }) {
  const [pending, startTransition] = React.useTransition();
  const [status, setStatus] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    if (status === "all") return reports;
    return reports.filter((r) => r.status === status);
  }, [reports, status]);

  return (
    <div className="space-y-4">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      >
        <option value="all">All statuses</option>
        <option value="open">open</option>
        <option value="in_review">in_review</option>
        <option value="resolved">resolved</option>
      </select>

      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-soft">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900">{r.reason}</p>
                <p className="text-xs text-neutral-500">Reporter: {r.reporter_id}</p>
                {r.reported_store_id ? (
                  <p className="text-xs text-neutral-500">Store: {r.reported_store_id}</p>
                ) : null}
                {r.reported_user_id ? (
                  <p className="text-xs text-neutral-500">User: {r.reported_user_id}</p>
                ) : null}
                {r.description ? (
                  <p className="mt-2 text-sm text-neutral-600">{r.description}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    r.status === "resolved"
                      ? "success"
                      : r.status === "in_review"
                        ? "warning"
                        : "neutral"
                  }
                >
                  {r.status}
                </Badge>
                <select
                  defaultValue={r.status}
                  disabled={pending}
                  className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800"
                  onChange={(e) => {
                    const fd = new FormData();
                    fd.set("report_id", r.id);
                    fd.set("status", e.target.value);
                    startTransition(async () => {
                      await resolveReportAction(fd);
                    });
                  }}
                >
                  <option value="open">open</option>
                  <option value="in_review">in_review</option>
                  <option value="resolved">resolved</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {!filtered.length ? (
          <EmptyState
            icon={ShieldAlert}
            title="No reports"
            description="When users submit reports, they will show here for review."
          />
        ) : null}
      </div>
    </div>
  );
}
