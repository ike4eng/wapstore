import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

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
          id={inputId}
          ref={ref}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          aria-invalid={!!error || undefined}
          className={cn(
            "h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:bg-neutral-50",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "",
            className
          )}
          {...props}
        />
        {hint ? (
          <p id={hintId} className="text-xs text-neutral-600">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="text-xs text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

