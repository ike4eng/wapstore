"use client";

import * as React from "react";
import { updatePasswordAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = { ok: boolean; message?: string } | undefined;

export function ResetPasswordForm() {
  const [state, formAction, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      return await updatePasswordAction(formData);
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
          Choose a new password
        </h1>
        <p className="text-sm text-neutral-600">
          Your reset link must be opened on the same device/browser.
        </p>
      </div>

      {state?.ok === false ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message ?? "Could not update password."}
        </div>
      ) : null}

      <Input
        name="password"
        type="password"
        label="New password"
        hint="At least 8 characters"
        required
      />

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}

