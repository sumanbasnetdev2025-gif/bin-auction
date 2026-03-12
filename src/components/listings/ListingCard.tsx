"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Gavel, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AuctionTimer from "./AuctionTimer";
import CategoryBadge from "@/components/shared/CategoryBadge";
import { formatCurrency, isAuctionEnded, truncate } from "@/lib/utils";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

export default function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const ended = isAuctionEnded(listing.auction_end_time);
  const currentBid = listing.current_highest_bid ?? listing.starting_price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/listings/${listing.id}`}>
        <div className="group relative bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 bg-secondary/40 overflow-hidden">
            {listing.image_urls[0] ? (
              <Image
                src={listing.image_urls[0]}
                alt={listing.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Gavel className="w-10 h-10 text-muted-foreground/30" />
              </div>
            )}

            {/* Status badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {!ended ? (
                <Badge className="bg-green-500/90 text-white border-0 text-xs font-semibold px-2 py-0.5">
                  LIVE
                </Badge>
              ) : (
                <Badge className="bg-muted/90 text-muted-foreground border-0 text-xs font-semibold px-2 py-0.5">
                  ENDED
                </Badge>
              )}
            </div>

            {/* Category */}
            <div className="absolute top-3 right-3">
              {listing.category && (
                <CategoryBadge category={listing.category} asLink={false} />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4">
            <h3 className="font-display font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
              {truncate(listing.title, 60)}
            </h3>

            {listing.seller?.location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <MapPin className="w-3 h-3" />
                {listing.seller.location}
              </div>
            )}

            <div className="mt-auto space-y-2.5">
              {/* Bid info */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {listing.current_highest_bid ? "Current Bid" : "Starting Price"}
                  </p>
                  <p className="font-display font-bold text-lg text-primary">
                    {formatCurrency(currentBid)}
                  </p>
                </div>
                {(listing.bid_count ?? 0) > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {listing.bid_count} bid{(listing.bid_count ?? 0) !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Timer */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-border/50">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <AuctionTimer endTime={listing.auction_end_time} variant="card" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}