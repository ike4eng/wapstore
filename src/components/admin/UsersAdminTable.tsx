"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/db/types";
import { deleteUserAction, setUserStatusAction } from "@/lib/actions/admin";
import { EmptyState } from "@/components/ui/empty-state";
import { Users } from "lucide-react";

export function UsersAdminTable({ users }: { users: Profile[] }) {
  const [q, setQ] = React.useState("");
  const [pending, startTransition] = React.useTransition();

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return users;
    return users.filter((u) => u.email.toLowerCase().includes(query) || u.id.includes(query));
  }, [users, q]);

  return (
    <div className="space-y-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by email or user id"
        className="h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />

      <div className="space-y-3">
        {filtered.map((u) => (
          <div
            key={u.id}
            className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-soft"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-neutral-900">{u.email}</p>
                <p className="text-xs text-neutral-500">{u.id}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant={u.role === "super_admin" ? "brand" : "neutral"}>
                    {u.role}
                  </Badge>
                  <Badge
                    variant={
                      u.status === "active"
                        ? "success"
                        : u.status === "suspended"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {u.status}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  defaultValue={u.status}
                  disabled={pending || u.role === "super_admin"}
                  className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800"
                  onChange={(e) => {
                    const fd = new FormData();
                    fd.set("profile_id", u.id);
                    fd.set("status", e.target.value);
                    startTransition(async () => {
                      await setUserStatusAction(fd);
                    });
                  }}
                >
                  <option value="active">active</option>
                  <option value="suspended">suspended</option>
                  <option value="banned">banned</option>
                </select>

                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  disabled={pending || u.role === "super_admin"}
                  onClick={() => {
                    if (!confirm("Delete this user? This will remove auth + profile.")) return;
                    const fd = new FormData();
                    fd.set("profile_id", u.id);
                    startTransition(async () => {
                      await deleteUserAction(fd);
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
            icon={Users}
            title="No users found"
            description="Try another email or user id."
          />
        ) : null}
      </div>
    </div>
  );
}
