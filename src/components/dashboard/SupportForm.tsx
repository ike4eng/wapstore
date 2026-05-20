"use client";

import * as React from "react";
import { createSupportReportAction } from "@/lib/actions/reports";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type FormState = { ok: boolean; message?: string } | undefined;

export function SupportForm() {
  const [state, formAction, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      return await createSupportReportAction(formData);
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
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

      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-900">Reason</p>
        <select
          name="reason"
          className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          defaultValue="support"
        >
          <option value="support">Support</option>
          <option value="abusive_behavior">Abusive behavior</option>
          <option value="spam">Spam</option>
          <option value="scam">Scam</option>
          <option value="fake_products">Fake products</option>
          <option value="prohibited_products">Prohibited products</option>
        </select>
      </div>

      <Textarea
        name="description"
        label="Description"
        placeholder="Explain the issue. Include any phone numbers/order details if needed."
        required
      />

      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}

