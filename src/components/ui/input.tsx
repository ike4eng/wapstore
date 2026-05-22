"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id"
> & {
  id?: string;
  label?: string;
  hint?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, id, label, hint, ...props }, ref) {
    const inputId = id;

    return (
      <div className="space-y-2">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-900"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
            className
          )}
          {...props}
        />
        {hint ? <p className="text-xs text-neutral-600">{hint}</p> : null}
      </div>
    );
  }
);

Input.displayName = "Input";
