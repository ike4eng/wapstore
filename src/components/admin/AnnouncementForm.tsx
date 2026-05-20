"use client";

import * as React from "react";
import { createAnnouncementAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = { ok: boolean; message?: string } | undefined;

export function AnnouncementForm() {
  const [state, formAction, pending] = React.useActionState<FormState, FormData>(
    async (_prev, formData) => {
      return await createAnnouncementAction(formData);
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      {state?.ok === false ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message ?? "Could not create announcement."}
        </div>
      ) : null}

      <Input name="title" label="Title" placeholder="New feature launch" required />
      <Textarea
        name="message"
        label="Message"
        placeholder="Write a short update for sellers..."
        required
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Publishing..." : "Publish announcement"}
      </Button>
    </form>
  );
}

