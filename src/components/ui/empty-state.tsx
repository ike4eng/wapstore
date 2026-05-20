import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-black/10 bg-neutral-50 p-8 text-center",
        className
      )}
    >
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white">
        <Icon className="h-5 w-5 text-neutral-900" />
      </div>
      <p className="mt-4 text-sm font-semibold text-neutral-900">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
      ) : null}
      {primaryAction || secondaryAction ? (
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          {primaryAction ? (
            <Link
              href={primaryAction.href}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm font-semibold text-white"
            >
              {primaryAction.label}
            </Link>
          ) : null}
          {secondaryAction ? (
            <Link
              href={secondaryAction.href}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              {secondaryAction.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

