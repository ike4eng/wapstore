"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Sparkline({
  values,
  className
}: {
  values: number[];
  className?: string;
}) {
  const max = Math.max(1, ...values);
  const points = values
    .map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * 100;
      const y = 100 - (v / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("h-10 w-full", className)}
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        points={points}
      />
    </svg>
  );
}

