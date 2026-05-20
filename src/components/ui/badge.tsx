import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "brand";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-neutral-100 text-neutral-800",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-900",
  danger: "bg-red-100 text-red-800",
  brand: "bg-brand-100 text-brand-900"
};

export function Badge({
  variant = "neutral",
  className,
  children
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

