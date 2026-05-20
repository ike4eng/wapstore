"use client";

import * as React from "react";
import Link from "next/link";
import { requestPasswordResetAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = { ok: boolean; message?: string } | undefined;

export function ForgotPasswordForm() {
  const [state, formAction, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      return await requestPasswordResetAction(formData);
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
          Reset your password
        </h1>
        <p className="text-sm text-neutral-600">
          We’ll email you a secure reset link.
        </p>
      </div>

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

      <Input name="email" type="email" label="Email" placeholder="you@email.com" required />

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending..." : "Send reset link"}
      </Button>

      <p className="text-sm text-neutral-600">
        <Link href="/login" className="font-medium text-brand-700">
          Back to login
        </Link>
      </p>
    </form>
  );
}

