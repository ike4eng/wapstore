import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const textareaId = id ?? React.useId();
    const hintId = hint ? `${textareaId}-hint` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className="space-y-2">
        {label ? (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-neutral-900"
          >
            {label}
          </label>
        ) : null}
        <textarea
          id={textareaId}
          ref={ref}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          aria-invalid={!!error || undefined}
          className={cn(
            "min-h-[120px] w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:bg-neutral-50",
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
Textarea.displayName = "Textarea";

