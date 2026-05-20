"use client";

import * as React from "react";
import Link from "next/link";
import { signUpAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = { ok: boolean; message?: string } | undefined;

export function RegisterForm() {
  const [state, formAction, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      return await signUpAction(formData);
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
          Create your account
        </h1>
        <p className="text-sm text-neutral-600">
          Start with a free store and add products.
        </p>
      </div>

      {state?.ok === false ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message ?? "Signup failed."}
        </div>
      ) : null}

      <Input name="email" type="email" label="Email" placeholder="you@email.com" required />
      <Input
        name="password"
        type="password"
        label="Password"
        hint="At least 8 characters"
        required
      />

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating..." : "Create account"}
      </Button>

      <p className="text-sm text-neutral-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-700">
          Log in
        </Link>
      </p>
    </form>
  );
}

