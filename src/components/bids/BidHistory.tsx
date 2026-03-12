"use client";

import { Trophy, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useBids } from "@/hooks/useBids";
import { formatCurrency, formatRelativeTime, getInitials } from "@/lib/utils";

interface BidHistoryProps {
  listingId: string;
}

export default function BidHistory({ listingId }: BidHistoryProps) {
  const { data: bids, isLoading } = useBids(listingId);

  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        Bid History
        {bids && bids.length > 0 && (
          <span className="text-xs font-normal normal-case bg-secondary px-2 py-0.5 rounded-full">
            {bids.length}
          </span>
        )}
      </h3>

      <div className="bg-secondary/20 rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full shimmer-bg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-24 shimmer-bg" />
                  <Skeleton className="h-3 w-16 shimmer-bg" />
                </div>
                <Skeleton className="h-4 w-20 shimmer-bg" />
              </div>
            ))}
          </div>
        ) : !bids?.length ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No bids yet. Be the first to bid!
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {bids.map((bid, index) => (
              <div
                key={bid.id}
                className={`flex items-center gap-3 px-4 py-3 ${
                  index === 0 ? "bg-primary/5" : ""
                }`}
              >
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback
                    className={`text-xs font-bold ${
                      index === 0
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {getInitials(bid.bidder?.full_name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium truncate">
                      {bid.bidder?.full_name ?? `Bidder ${bid.bidder_id.slice(0, 6)}`}
                    </p>
                    {index === 0 && (
                      <Trophy className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(bid.updated_at)}
                  </p>
                </div>

                <span
                  className={`font-mono font-bold text-sm shrink-0 ${
                    index === 0 ? "text-primary" : "text-foreground"
                  }`}
                >
                  {formatCurrency(bid.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}