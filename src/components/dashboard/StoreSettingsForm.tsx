"use client";

import * as React from "react";
import { upsertMyStoreAction } from "@/lib/actions/stores";
import type { Store } from "@/lib/db/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CloudinaryUpload } from "@/components/uploads/CloudinaryUpload";
import { resetTemplateStoreAction } from "@/lib/actions/onboarding";

type FormState = { ok: boolean; message?: string } | undefined;

export function StoreSettingsForm({
  store,
  canResetTemplate
}: {
  store: Store | null;
  canResetTemplate: boolean;
}) {
  const [logoUrl, setLogoUrl] = React.useState<string | null>(store?.logo_url ?? null);
  const [bannerUrl, setBannerUrl] = React.useState<string | null>(store?.banner_url ?? null);

  const [state, formAction, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      formData.set("logo_url", logoUrl ?? "");
      formData.set("banner_url", bannerUrl ?? "");
      return await upsertMyStoreAction(formData);
    },
    undefined
  );

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-6">
        {state?.message ? (
          <div
            className={[
              "rounded-2xl px-4 py-3 text-sm",
              state.ok
                ? "border border-brand-200 bg-brand-50 text-brand-900"
                : "border border-red-200 bg-red-50 text-red-700"
            ].join(" ")}
          >
            {state.message}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="store_name"
            label="Store name"
            placeholder="Naledi Fashion"
            defaultValue={store?.store_name ?? ""}
            required
          />
          <Input
            name="slug"
            label="Store link (slug)"
            hint="Example: naledi-fashion"
            placeholder="naledi-fashion"
            defaultValue={store?.slug ?? ""}
            required
          />
        </div>

        <Textarea
          name="description"
          label="Description"
          placeholder="Tell customers what you sell..."
          defaultValue={store?.description ?? ""}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="whatsapp_number"
            label="WhatsApp number"
            hint="Use international format where possible (e.g. 27...)"
            placeholder="27821234567"
            defaultValue={store?.whatsapp_number ?? ""}
            required
          />
          <Input
            name="location"
            label="Location"
            placeholder="Johannesburg"
            defaultValue={store?.location ?? ""}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="theme_color"
            label="Theme color"
            hint="Hex (e.g. #15c680) or leave blank"
            placeholder="#15c680"
            defaultValue={store?.theme_color ?? ""}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CloudinaryUpload
            label="Logo"
            folder="wapstore/logos"
            value={logoUrl}
            onChange={setLogoUrl}
          />
          <CloudinaryUpload
            label="Banner"
            folder="wapstore/banners"
            value={bannerUrl}
            onChange={setBannerUrl}
          />
        </div>

        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save store settings"}
        </Button>
      </form>

      {store && canResetTemplate ? <TemplateReset storeId={store.id} /> : null}
    </div>
  );
}

function TemplateReset({ storeId }: { storeId: string }) {
  const [state, action, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      return await resetTemplateStoreAction(formData);
    },
    undefined
  );

  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-5">
      <p className="text-sm font-semibold text-neutral-900">Reset demo template</p>
      <p className="mt-2 text-sm text-neutral-700">
        Clears demo products and removes demo images from your store. Your store link
        stays the same.
      </p>

      {state?.message ? (
        <div
          className={[
            "mt-4 rounded-2xl px-4 py-3 text-sm",
            state.ok
              ? "border border-brand-200 bg-brand-50 text-brand-900"
              : "border border-red-200 bg-white text-red-700"
          ].join(" ")}
        >
          {state.message}
        </div>
      ) : null}

      <form
        action={action}
        className="mt-4"
        onSubmit={(e) => {
          const ok = window.confirm(
            "Clear demo content? This will delete all products in your store and remove demo images."
          );
          if (!ok) e.preventDefault();
        }}
      >
        <input type="hidden" name="store_id" value={storeId} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Clearing..." : "Clear demo content"}
        </button>
      </form>
    </div>
  );
}
