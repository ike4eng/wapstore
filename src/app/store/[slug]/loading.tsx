import { Skeleton } from "@/components/ui/skeleton";

export default function StorefrontLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-16 w-16 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-72" />
            </div>
          </div>
          <Skeleton className="aspect-[16/6] w-full rounded-3xl" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-11 w-full rounded-2xl" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-soft"
          >
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

