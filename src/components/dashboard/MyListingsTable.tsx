"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Package, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AuctionTimer from "@/components/listings/AuctionTimer";
import { formatCurrency, formatDate, isAuctionEnded } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Listing } from "@/types";

interface MyListingsTableProps {
  listings: Listing[];
  isLoading?: boolean;
}

function StatusBadge({ listing }: { listing: Listing }) {
  const ended = isAuctionEnded(listing.auction_end_time);

  if (listing.status === "sold") {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
        style={{ background: "#10b98118", color: "#10b981", border: "1px solid #10b98128" }}>
        <CheckCircle2 className="w-3 h-3" /> Sold
      </span>
    );
  }
  if (listing.status === "ended" || ended) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
        style={{ background: "#f9731618", color: "#f97316", border: "1px solid #f9731628" }}>
        <Clock className="w-3 h-3" /> Ended
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ background: "#10b98118", color: "#10b981", border: "1px solid #10b98128" }}>
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
    </span>
  );
}

function MarkSoldButton({ listing }: { listing: Listing }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const ended = isAuctionEnded(listing.auction_end_time);

  // Only show for ended auctions that haven't been marked sold yet
  if (listing.status !== "ended" && !ended) return null;
  if (listing.status === "sold") return null;

  const handleMarkSold = async () => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("listings")
      .update({
        status: "sold",
        sold_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", listing.id);

    if (error) {
      toast.error("Failed to mark as sold: " + error.message);
    } else {
      toast.success("Marked as sold! Visible for 6 hours.");
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["listing", listing.id] });
    }
    setLoading(false);
  };

  return (
    <Button
      size="sm"
      onClick={handleMarkSold}
      disabled={loading}
      className="h-8 text-xs font-semibold gap-1.5 border-0 text-white"
      style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
    >
      {loading
        ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
        : <><CheckCircle2 className="w-3 h-3" /> Mark Sold</>
      }
    </Button>
  );
}

export default function MyListingsTable({ listings, isLoading }: MyListingsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full shimmer-bg rounded-xl" />
        ))}
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="text-center py-16 rounded-2xl border"
        style={{ borderColor: "#1e1a18", background: "#0f0d0c" }}>
        <Package className="w-10 h-10 mx-auto mb-3" style={{ color: "#3a3330" }} />
        <p className="font-semibold mb-1">No listings yet</p>
        <p className="text-sm mb-4" style={{ color: "#7a6f6a" }}>Create your first listing to start selling</p>
        <Button asChild size="sm" className="bin-gradient border-0 text-white">
          <Link href="/listings/new">Create Listing</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#1e1a18" }}>
      {listings.map((listing, i) => (
        <div key={listing.id}
          className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
          style={{ borderBottom: i < listings.length - 1 ? "1px solid #1e1a18" : "none" }}>

          {/* Image */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0"
            style={{ background: "#1a1614" }}>
            {listing.image_urls[0] ? (
              <Image src={listing.image_urls[0]} alt={listing.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-5 h-5" style={{ color: "#3a3330" }} />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{listing.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge listing={listing} />
              <span className="text-xs" style={{ color: "#5a4f4a" }}>{formatDate(listing.created_at)}</span>
            </div>
          </div>

          {/* Bid info */}
          <div className="text-right shrink-0 hidden sm:block">
            <p className="font-display font-bold text-sm" style={{ color: "#e74c3c" }}>
              {formatCurrency(listing.current_highest_bid ?? listing.starting_price)}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#7a6f6a" }}>
              {listing.bid_count ?? 0} bid{(listing.bid_count ?? 0) !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Timer (only for active) */}
          {listing.status === "active" && !isAuctionEnded(listing.auction_end_time) && (
            <div className="hidden md:block shrink-0">
              <AuctionTimer endTime={listing.auction_end_time} variant="card" />
            </div>
          )}

          {/* Mark Sold button */}
          <MarkSoldButton listing={listing} />

          {/* View link */}
          <Button asChild size="icon" variant="ghost" className="h-8 w-8 shrink-0">
            <Link href={`/listings/${listing.id}`}>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}