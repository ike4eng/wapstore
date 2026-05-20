import Link from "next/link";

export function Logo({
  href = "/",
  size = "md"
}: {
  href?: string;
  size?: "sm" | "md";
}) {
  const fontSize = size === "sm" ? "text-lg" : "text-xl";
  return (
    <Link href={href} className={`font-semibold tracking-tight ${fontSize}`}>
      <span className="text-brand-700">Wap</span>
      <span className="text-neutral-900">store</span>
    </Link>
  );
}

