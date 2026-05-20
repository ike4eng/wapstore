"use client";

import * as React from "react";
import Link from "next/link";
import type { Product } from "@/lib/db/types";
import { createProductAction, updateProductAction } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CloudinaryUpload } from "@/components/uploads/CloudinaryUpload";
import { Modal } from "@/components/ui/modal";

type CreateState =
  | { ok: true }
  | { ok: false; code?: string; message?: string }
  | undefined;

type UpdateState = { ok: boolean; message?: string } | undefined;

export function ProductForm({
  storeId,
  product
}: {
  storeId: string;
  product?: Product | null;
}) {
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    product?.image_url ?? null
  );
  const [showUpgrade, setShowUpgrade] = React.useState(false);

  const isEdit = !!product?.id;

  const [createState, createAction, creating] = React.useActionState<
    CreateState,
    FormData
  >(async (_prev, formData) => {
    formData.set("store_id", storeId);
    formData.set("image_url", imageUrl ?? "");
    const res = await createProductAction(formData);
    if (!res.ok && res.code === "LIMIT") setShowUpgrade(true);
    return res as any;
  }, undefined);

  const [updateState, updateAction, updating] = React.useActionState<
    UpdateState,
    FormData
  >(async (_prev, formData) => {
    formData.set("id", product?.id ?? "");
    formData.set("image_url", imageUrl ?? "");
    return await updateProductAction(formData);
  }, undefined);

  const state = isEdit ? updateState : createState;
  const pending = isEdit ? updating : creating;
  const action = isEdit ? updateAction : createAction;

  return (
    <>
      <Modal
        open={showUpgrade}
        title="Upgrade to add more products"
        onClose={() => setShowUpgrade(false)}
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-700">
            Free plan allows up to 5 products. Upgrade to Premium to upload
            unlimited products and unlock premium themes.
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/subscription"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm font-semibold text-white"
            >
              Upgrade to Premium
            </Link>
            <Button type="button" variant="ghost" onClick={() => setShowUpgrade(false)}>
              Not now
            </Button>
          </div>
        </div>
      </Modal>

      <form action={action} className="space-y-6">
        {state?.ok === false ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message ?? "Something went wrong."}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="name"
            label="Product name"
            placeholder="Black Hoodie"
            defaultValue={product?.name ?? ""}
            required
          />
          <Input
            name="price"
            label="Price (ZAR)"
            placeholder="450"
            defaultValue={product?.price?.toString() ?? ""}
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="category"
            label="Category"
            placeholder="Hoodies"
            defaultValue={product?.category ?? ""}
          />
          <div className="flex items-end gap-3">
            <label className="flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm">
              <input
                name="is_active"
                type="checkbox"
                defaultChecked={product ? product.is_active : true}
                className="h-4 w-4"
              />
              Active
            </label>
          </div>
        </div>

        <Textarea
          name="description"
          label="Description"
          placeholder="Short product details..."
          defaultValue={product?.description ?? ""}
        />

        <CloudinaryUpload
          label="Product image"
          folder="wapstore/products"
          value={imageUrl}
          onChange={setImageUrl}
        />

        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : isEdit ? "Save changes" : "Add product"}
        </Button>
      </form>
    </>
  );
}

