"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListingGrid from "@/components/listings/ListingGrid";
import { useListings } from "@/hooks/useListings";

export default function LatestAuctions() {
  const { data: listings, isLoading, isError } = useListings({ status: "active", limit: 8 });

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">Latest Auctions</h2>
            <p className="text-muted-foreground">Fresh listings — bid before they&apos;re gone</p>
          </div>
          <Button asChild variant="ghost" className="gap-1.5 text-primary hover:text-primary">
            <Link href="/listings">View All <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
        <ListingGrid
          listings={listings || []}
          isLoading={isLoading}
          isError={isError}
          emptyTitle="No auctions yet"
          emptyDescription="Be the first to list an item!"
        />
      </div>
    </section>
  );
}