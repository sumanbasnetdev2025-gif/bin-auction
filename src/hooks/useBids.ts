"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { Bid, BidWithBidder } from "@/types";

export function useBids(listingId: string) {
  const supabase = createClient();

  return useQuery<BidWithBidder[]>({
    queryKey: ["bids", listingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bids")
        .select(`
          *,
          bidder:users!bidder_id(id, full_name, avatar_url, location)
        `)
        .eq("listing_id", listingId)
        .order("amount", { ascending: false });

      if (error) throw error;
      return (data as BidWithBidder[]) || [];
    },
    enabled: !!listingId,
    staleTime: 15_000,
  });
}

export function useMyBidOnListing(listingId: string, bidderId: string | undefined) {
  const supabase = createClient();

  return useQuery<Bid | null>({
    queryKey: ["my-bid", listingId, bidderId],
    queryFn: async () => {
      if (!bidderId) return null;

      const { data, error } = await supabase
        .from("bids")
        .select("*")
        .eq("listing_id", listingId)
        .eq("bidder_id", bidderId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return (data as Bid) || null;
    },
    enabled: !!listingId && !!bidderId,
  });
}

export function usePlaceBid() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ listing_id, amount }: { listing_id: string; amount: number }) => {
      const response = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing_id, amount }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to place bid");
      return result.data as Bid;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bids", variables.listing_id] });
      queryClient.invalidateQueries({ queryKey: ["listing", variables.listing_id] });
      queryClient.invalidateQueries({ queryKey: ["my-bid", variables.listing_id] });
      toast.success("Bid placed successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateBid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bid_id,
      listing_id,
      amount,
    }: {
      bid_id: string;
      listing_id: string;
      amount: number;
    }) => {
      const response = await fetch(`/api/bids/${listing_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bid_id, amount }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to update bid");
      return result.data as Bid;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bids", variables.listing_id] });
      queryClient.invalidateQueries({ queryKey: ["listing", variables.listing_id] });
      queryClient.invalidateQueries({ queryKey: ["my-bid", variables.listing_id] });
      toast.success("Bid updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}