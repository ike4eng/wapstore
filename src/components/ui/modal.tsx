"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  title,
  children,
  onClose,
  className
}: {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative mx-auto mt-20 w-[92%] max-w-md">
        <div
          className={cn(
            "rounded-2xl border border-neutral-200 bg-white shadow-soft",
            className
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-neutral-100 p-5">
            <div className="min-w-0">
              {title ? (
                <h3 className="truncate text-base font-semibold text-neutral-900">
                  {title}
                </h3>
              ) : null}
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-neutral-100"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
