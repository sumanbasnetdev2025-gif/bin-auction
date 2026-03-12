import ListingCard from "./ListingCard";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/shared/EmptyState";
import { Gavel } from "lucide-react";
import type { Listing } from "@/types";

interface ListingGridProps {
  listings: Listing[];
  isLoading?: boolean;
  isError?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

function ListingCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <Skeleton className="h-48 w-full shimmer-bg" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4 shimmer-bg" />
        <Skeleton className="h-3 w-1/2 shimmer-bg" />
        <Skeleton className="h-6 w-1/3 shimmer-bg" />
        <Skeleton className="h-3 w-full shimmer-bg" />
      </div>
    </div>
  );
}

export default function ListingGrid({
  listings,
  isLoading,
  isError,
  emptyTitle = "No auctions found",
  emptyDescription = "There are no active auctions here yet.",
}: ListingGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !listings.length) {
    return (
      <EmptyState
        icon={Gavel}
        title={isError ? "Failed to load auctions" : emptyTitle}
        description={isError ? "Please refresh the page or try again later." : emptyDescription}
        actionLabel="Browse All"
        actionHref="/listings"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {listings.map((listing, i) => (
        <ListingCard key={listing.id} listing={listing} index={i} />
      ))}
    </div>
  );
}