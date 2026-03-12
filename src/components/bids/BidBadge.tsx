import { TrendingUp, Gavel } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface BidBadgeProps {
  currentBid: number;
  hasHighestBid: boolean;
  bidCount: number;
}

export default function BidBadge({ currentBid, hasHighestBid, bidCount }: BidBadgeProps) {
  return (
    <div className="p-5 bg-card rounded-2xl border border-border space-y-1">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        {hasHighestBid ? (
          <>
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            Current Highest Bid
          </>
        ) : (
          <>
            <Gavel className="w-3.5 h-3.5" />
            Starting Price
          </>
        )}
      </div>
      <p className="font-display font-bold text-3xl text-primary">{formatCurrency(currentBid)}</p>
      {bidCount > 0 && (
        <p className="text-xs text-muted-foreground">
          {bidCount} bid{bidCount !== 1 ? "s" : ""} placed
        </p>
      )}
    </div>
  );
}