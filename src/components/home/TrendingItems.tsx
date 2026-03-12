
"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListingGrid from "@/components/listings/ListingGrid";
import { useTrendingListings } from "@/hooks/useListings";

export default function TrendingItems() {
  const { data: listings, isLoading, isError } = useTrendingListings(4);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: "#e74c3c18", color: "#e74c3c", border: "1px solid #e74c3c30" }}>
                <Clock className="w-3.5 h-3.5" />
                Ending Soon
              </div>
            </div>
            <h2 className="font-display font-bold text-3xl">Ending Within 12 Hours</h2>
            <p className="mt-1 text-sm" style={{ color: "#7a6f6a" }}>
              Don&apos;t miss out — these auctions close soon
            </p>
          </div>
          <Button asChild variant="ghost" className="gap-1.5 text-primary hover:text-primary">
            <Link href="/listings">See All <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
        <ListingGrid
          listings={listings || []}
          isLoading={isLoading}
          isError={isError}
          emptyTitle="No auctions ending soon"
          emptyDescription="Check back later — auctions ending within 12 hours will appear here."
        />
      </div>
    </section>
  );
}
