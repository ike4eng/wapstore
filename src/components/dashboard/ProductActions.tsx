"use client";

import * as React from "react";
import Link from "next/link";
import { Pencil, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { deleteProductAction, toggleProductActiveAction } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";

export function ProductActions({
  productId,
  isActive
}: {
  productId: string;
  isActive: boolean;
}) {
  const [pending, startTransition] = React.useTransition();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/dashboard/products/${productId}/edit`}
        className="inline-flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </Link>

      <Button
        type="button"
        size="sm"
        variant="ghost"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const fd = new FormData();
            fd.set("id", productId);
            fd.set("is_active", (!isActive).toString());
            await toggleProductActiveAction(fd);
          });
        }}
      >
        {isActive ? (
          <>
            <ToggleRight className="h-4 w-4" />
            Active
          </>
        ) : (
          <>
            <ToggleLeft className="h-4 w-4" />
            Inactive
          </>
        )}
      </Button>

      <Button
        type="button"
        size="sm"
        variant="danger"
        disabled={pending}
        onClick={() => {
          if (!confirm("Delete this product?")) return;
          startTransition(async () => {
            const fd = new FormData();
            fd.set("id", productId);
            await deleteProductAction(fd);
          });
        }}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}

