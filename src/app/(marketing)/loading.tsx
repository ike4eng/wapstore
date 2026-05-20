import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-36" />
          </div>
        </div>
        <Skeleton className="aspect-[4/5] w-full rounded-3xl" />
      </div>
    </div>
  );
}

