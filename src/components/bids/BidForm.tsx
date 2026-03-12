"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Edit3, Gavel, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useMyBidOnListing, usePlaceBid, useUpdateBid } from "@/hooks/useBids";
import { placeBidSchema, type PlaceBidInput } from "@/lib/validations";
import { formatCurrency, calculateMinBid } from "@/lib/utils";
import { MAX_BIDS_PER_USER } from "@/lib/constants";
import type { Listing } from "@/types";
import Link from "next/link";

interface BidFormProps {
  listing: Listing;
}

export default function BidForm({ listing }: BidFormProps) {
  const { user, isAuthenticated } = useAuth();
  const { data: myBid, isLoading: loadingMyBid } = useMyBidOnListing(listing.id, user?.id);
  const placeBid = usePlaceBid();
  const updateBid = useUpdateBid();
  const [isEditing, setIsEditing] = useState(false);

  const minBid = calculateMinBid(listing.current_highest_bid, listing.starting_price);
  const hasBid = !!myBid;
  const canBid = !hasBid; // Each user can have max 1 bid record (editable up to 3 times)
  // Track bid_update_count on the bid record to enforce max 3 updates

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlaceBidInput>({
    resolver: zodResolver(placeBidSchema),
    defaultValues: { amount: minBid },
  });

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-secondary/30 rounded-xl border border-border text-sm text-center space-y-2">
        <p className="text-muted-foreground">Sign in to place a bid</p>
        <div className="flex gap-2 justify-center">
          <Button asChild size="sm" variant="outline">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild size="sm" className="bin-gradient border-0 text-white">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (loadingMyBid) {
    return (
      <div className="p-4 bg-secondary/30 rounded-xl border border-border flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const onSubmit = async (data: PlaceBidInput) => {
    if (data.amount < minBid) return;

    if (hasBid && myBid) {
      await updateBid.mutateAsync({
        bid_id: myBid.id,
        listing_id: listing.id,
        amount: data.amount,
      });
      setIsEditing(false);
    } else {
      await placeBid.mutateAsync({ listing_id: listing.id, amount: data.amount });
    }
    reset({ amount: minBid });
  };

  const isLoading = placeBid.isPending || updateBid.isPending;

  // Show current bid status
  if (hasBid && !isEditing) {
    return (
      <div className="space-y-3">
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-1">
          <p className="text-xs text-primary uppercase tracking-wider font-medium">Your Bid</p>
          <p className="font-display font-bold text-xl">{formatCurrency(myBid!.amount)}</p>
          {myBid!.is_highest && (
            <p className="text-xs text-green-500 font-medium flex items-center gap-1">
              🏆 You are the highest bidder!
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/30 rounded-lg px-3 py-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>
            You can update your bid up to {MAX_BIDS_PER_USER} times total.
          </span>
        </div>

        <Button
          onClick={() => {
            setIsEditing(true);
            reset({ amount: myBid!.amount + 100 });
          }}
          variant="outline"
          className="w-full gap-2 border-primary/30 hover:border-primary text-primary hover:bg-primary/5"
        >
          <Edit3 className="w-4 h-4" />
          Update My Bid
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="bid-amount" className="text-sm">
          {hasBid ? "New Bid Amount (NPR)" : "Your Bid (NPR)"}
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-mono">
            रू
          </span>
          <Input
            id="bid-amount"
            type="number"
            {...register("amount", { valueAsNumber: true })}
            min={minBid}
            className="pl-8 bg-secondary/30 font-mono"
            placeholder={minBid.toString()}
          />
        </div>
        {errors.amount && (
          <p className="text-xs text-destructive">{errors.amount.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Minimum bid: {formatCurrency(minBid)}
        </p>
      </div>

      <div className="flex gap-2">
        {isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bin-gradient border-0 text-white font-semibold h-11 auction-live-pulse"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Gavel className="w-4 h-4 mr-2" />
              {hasBid ? "Update Bid" : "Place Bid"}
            </>
          )}
        </Button>
      </div>

      {hasBid && (
        <p className="text-xs text-muted-foreground text-center">
          You are updating your existing bid
        </p>
      )}
    </form>
  );
}