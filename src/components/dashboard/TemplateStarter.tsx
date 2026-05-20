"use client";

import * as React from "react";
import Image from "next/image";
import { Store } from "lucide-react";
import { startFromDemoTemplateAction } from "@/lib/actions/onboarding";
import { DEMO_STORES } from "@/lib/demo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type TemplateSlug = "kasi-kicks" | "mamas-kitchen" | "glow-go-beauty";

type FormState = { ok: boolean; message?: string } | undefined;

export function TemplateStarter() {
  const [state, formAction, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      return (await startFromDemoTemplateAction(formData)) as any;
    },
    undefined
  );

  const templates = DEMO_STORES.filter((s) =>
    (["kasi-kicks", "mamas-kitchen", "glow-go-beauty"] as const).includes(
      s.slug as TemplateSlug
    )
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Store className="h-4 w-4 text-neutral-900" />
          <p className="text-sm font-semibold text-neutral-900">
            Start with a demo template
          </p>
        </div>
        <p className="text-sm text-neutral-600">
          Creates your store and adds a few realistic products. You can edit or
          delete anything after.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {state?.ok === false ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message ?? "Could not start template."}
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-3">
          {templates.map((t) => (
            <form key={t.slug} action={formAction} className="rounded-2xl border border-neutral-200 bg-white p-3">
              <input type="hidden" name="template" value={t.slug} />
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100">
                {t.banner_url ? (
                  <Image
                    src={t.banner_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 240px"
                    quality={70}
                  />
                ) : null}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                  {t.logo_url ? (
                    <Image src={t.logo_url} alt="" fill className="object-cover" sizes="40px" quality={70} />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {t.store_name}
                  </p>
                  <p className="text-xs text-neutral-600">{t.location}</p>
                </div>
              </div>
              <Button type="submit" className="mt-3 w-full" disabled={pending}>
                {pending ? "Creating..." : "Use template"}
              </Button>
            </form>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

