"use client";

import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryGrid = dynamic(
  () => import("./CategoryGrid"),
  {
    ssr: false,
    loading: () => (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-48 mb-6 shimmer-bg" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl shimmer-bg" />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const LatestAuctions = dynamic(
  () => import("./LatestAuctions"),
  {
    ssr: false,
    loading: () => (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-48 mb-6 shimmer-bg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl shimmer-bg" />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const TrendingItems = dynamic(
  () => import("./TrendingItems"),
  {
    ssr: false,
    loading: () => (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-48 mb-6 shimmer-bg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl shimmer-bg" />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

export default function HomePageClient() {
  return (
    <>
      <Separator className="bg-border/30" />
      <CategoryGrid />
      <Separator className="bg-border/30" />
      <LatestAuctions />
      <Separator className="bg-border/30" />
      <TrendingItems />
    </>
  );
}