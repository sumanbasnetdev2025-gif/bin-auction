"use client";

import Link from "next/link";
import { Trophy, ExternalLink, Gavel } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatRelativeTime, getInitials, truncate } from "@/lib/utils";
import type { BidWithBidder } from "@/types";

interface BidsReceivedTableProps {
  bids: BidWithBidder[];
  isLoading?: boolean;
}

export default function BidsReceivedTable({ bids, isLoading }: BidsReceivedTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full shimmer-bg rounded-xl" />
        ))}
      </div>
    );
  }

  if (!bids.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Gavel className="w-10 h-10 mx-auto mb-3 opacity-40" />
        <p className="font-medium">No bids received yet</p>
        <p className="text-sm mt-1">Bids on your listings will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bids.map((bid) => (
        <div
          key={bid.id}
          className={`flex items-center gap-4 p-4 bg-card border rounded-xl transition-colors ${
            bid.is_highest ? "border-primary/30 bg-primary/5" : "border-border"
          }`}
        >
          {/* Bidder Avatar */}
          <Avatar className="w-9 h-9 shrink-0">
            <AvatarFallback
              className={`text-xs font-bold ${
                bid.is_highest ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              }`}
            >
              {getInitials(bid.bidder?.full_name)}
            </AvatarFallback>
          </Avatar>

          {/* Bidder Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium truncate">
                {bid.bidder?.full_name ?? bid.bidder_id.slice(0, 8)}
              </p>
              {bid.is_highest && (
                <Badge className="text-[10px] px-1.5 py-0 bg-yellow-500/10 text-yellow-500 border-yellow-500/20 gap-0.5">
                  <Trophy className="w-2.5 h-2.5" /> Highest
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Bidder ID: <span className="font-mono">{bid.bidder_id.slice(0, 12)}...</span> •{" "}
              {formatRelativeTime(bid.updated_at)}
            </p>
          </div>

          {/* Amount */}
          <div className="text-right shrink-0">
            <p className={`font-display font-bold text-sm ${bid.is_highest ? "text-primary" : ""}`}>
              {formatCurrency(bid.amount)}
            </p>
          </div>

          {/* Listing Link */}
          {bid.listing && (
            <Button asChild size="icon" variant="ghost" className="h-8 w-8 shrink-0">
              <Link href={`/listings/${bid.listing_id}`} title={bid.listing.title}>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}