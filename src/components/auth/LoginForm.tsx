"use client";

import * as React from "react";
import Link from "next/link";
import { signInAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = { ok: boolean; message?: string } | undefined;

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      if (redirectTo) formData.set("redirectTo", redirectTo);
      return await signInAction(formData);
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
          Log in
        </h1>
        <p className="text-sm text-neutral-600">
          Manage your store and products.
        </p>
      </div>

      {state?.ok === false ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message ?? "Login failed."}
        </div>
      ) : null}

      <Input name="email" type="email" label="Email" placeholder="you@email.com" required />
      <Input name="password" type="password" label="Password" required />

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Logging in..." : "Log in"}
      </Button>

      <div className="flex items-center justify-between text-sm">
        <Link href="/forgot-password" className="font-medium text-brand-700">
          Forgot password?
        </Link>
        <Link href="/register" className="font-medium text-neutral-800">
          Create account
        </Link>
      </div>
    </form>
  );
}

