"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, User, Package, ChevronLeft, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AuctionTimer from "./AuctionTimer";
import BidForm from "@/components/bids/BidForm";
import BidHistory from "@/components/bids/BidHistory";
import BidBadge from "@/components/bids/BidBadge";
import CategoryBadge from "@/components/shared/CategoryBadge";
import { formatCurrency, formatDateTime, isAuctionEnded } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeBids } from "@/hooks/useRealtimeBids";
import type { Listing } from "@/types";

interface ListingDetailProps {
  listing: Listing;
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  const { user } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const ended = isAuctionEnded(listing.auction_end_time);
  const isSeller = user?.id === listing.seller_id;
  const isSold = listing.status === "sold";
  // Show sold banner only within 6 hours of sold_at
  const soldRecently = isSold && listing.sold_at
    ? (new Date().getTime() - new Date(listing.sold_at).getTime()) < 6 * 60 * 60 * 1000
    : false;

  // Subscribe to real-time bid updates
  useRealtimeBids(listing.id);

  const currentBid = listing.current_highest_bid ?? listing.starting_price;

  const prevImage = () =>
    setActiveImage((i) => (i === 0 ? listing.image_urls.length - 1 : i - 1));
  const nextImage = () =>
    setActiveImage((i) => (i === listing.image_urls.length - 1 ? 0 : i + 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      {/* Left: Images + Details */}
      <div className="lg:col-span-3 space-y-6">
        {/* Image Gallery */}
        <div className="relative bg-secondary/30 rounded-2xl overflow-hidden aspect-[4/3] border border-border">
          {listing.image_urls.length > 0 ? (
            <>
              <Image
                src={listing.image_urls[activeImage]}
                alt={listing.title}
                fill
                className="object-contain"
                priority
              />
              {listing.image_urls.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {listing.image_urls.length > 1 && (
          <div className="flex gap-2">
            {listing.image_urls.map((url, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeImage ? "border-primary" : "border-border opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={url} alt={`Thumb ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-lg">Description</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {listing.description}
          </p>
        </div>

        {/* Seller info */}
        <div className="p-4 bg-secondary/30 rounded-xl border border-border">
          <h3 className="font-display font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Seller
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
              {listing.seller?.full_name?.[0] ?? "?"}
            </div>
            <div>
              <p className="font-medium text-sm">{listing.seller?.full_name ?? "Unknown"}</p>
              {listing.seller?.location && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {listing.seller.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Bid Panel */}
      <div className="lg:col-span-2 space-y-5">
        {/* Title & Meta */}
        <div>
          {listing.category && <CategoryBadge category={listing.category} />}
          <h1 className="font-display font-bold text-2xl mt-3 mb-2">{listing.title}</h1>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            Listed {formatDateTime(listing.created_at)}
          </div>
        </div>

        {/* Bid Badge */}
        <BidBadge
          currentBid={currentBid}
          hasHighestBid={!!listing.current_highest_bid}
          bidCount={listing.bid_count ?? 0}
        />

        {/* Timer */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {ended ? "Auction Ended" : "Time Remaining"}
          </p>
          <AuctionTimer endTime={listing.auction_end_time} variant="detail" />
        </div>

        <Separator />

        {/* Sold Banner */}
        {soldRecently && (
          <div className="flex items-center gap-3 p-4 rounded-xl"
            style={{ background: "#10b98115", border: "1px solid #10b98130" }}>
            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#10b981" }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: "#10b981" }}>
                Item Claimed — Sold!
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#7a6f6a" }}>
                The seller has confirmed this item has been claimed by the winner.
              </p>
            </div>
          </div>
        )}

        {/* Bid Form or Status */}
        {isSold ? (
          <div className="p-4 rounded-xl text-sm text-center"
            style={{ background: "#10b98110", border: "1px solid #10b98128" }}>
            <CheckCircle2 className="w-5 h-5 mx-auto mb-1" style={{ color: "#10b981" }} />
            <p className="font-medium" style={{ color: "#10b981" }}>Auction Sold</p>
            <p className="mt-0.5" style={{ color: "#7a6f6a" }}>This item has been claimed by the winner.</p>
          </div>
        ) : isSeller ? (
          <div className="p-4 rounded-xl border text-sm text-center"
            style={{ background: "#0f0d0c", borderColor: "#1e1a18", color: "#7a6f6a" }}>
            You are the seller of this item.{" "}
            <Link href="/dashboard/listings" className="text-primary hover:underline">
              Manage listings →
            </Link>
          </div>
        ) : !ended ? (
          <BidForm listing={listing} />
        ) : (
          <div className="p-4 rounded-xl border text-sm text-center"
            style={{ background: "#0f0d0c", borderColor: "#1e1a18", color: "#7a6f6a" }}>
            <Clock className="w-5 h-5 mx-auto mb-1" style={{ color: "#f97316" }} />
            This auction has ended.
          </div>
        )}

        {/* Bid History */}
        <BidHistory listingId={listing.id} />
      </div>
    </div>
  );
}