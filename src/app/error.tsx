"use client";

import * as React from "react";
import { ButtonLink } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    void error;
  }, [error]);

  return (
    <div className="grid min-h-dvh place-items-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-neutral-600">Something went wrong</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
          We couldn’t load this page
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          Try again. If the problem continues, come back later.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm font-semibold text-white"
            onClick={reset}
          >
            Retry
          </button>
          <ButtonLink href="/" variant="secondary">
            Go home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

