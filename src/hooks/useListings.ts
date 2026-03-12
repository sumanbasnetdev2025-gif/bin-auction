"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Listing } from "@/types";
import { isAuctionEnded } from "@/lib/utils";

interface UseListingsOptions {
  categorySlug?: string;
  status?: "active" | "ended" | "sold" | "cancelled";
  sellerId?: string;
  limit?: number;
  search?: string;
  enabled?: boolean;
}

async function enrichListings(data: any[]): Promise<Listing[]> {
  if (!data || data.length === 0) return [];
  const supabase = createClient();

  const sellerIds = [...new Set(data.map((l) => l.seller_id).filter(Boolean))];
  const categoryIds = [...new Set(data.map((l) => l.category_id).filter(Boolean))];

  const [sellersRes, categoriesRes] = await Promise.all([
    sellerIds.length > 0
      ? supabase.from("users").select("id, full_name, avatar_url, location, phone").in("id", sellerIds)
      : Promise.resolve({ data: [] }),
    categoryIds.length > 0
      ? supabase.from("categories").select("id, name, slug, icon").in("id", categoryIds)
      : Promise.resolve({ data: [] }),
  ]);

  return data.map((listing) => ({
    ...listing,
    seller: sellersRes.data?.find((s: any) => s.id === listing.seller_id) ?? null,
    category: categoriesRes.data?.find((c: any) => c.id === listing.category_id) ?? null,
  })) as Listing[];
}

// Auto-end expired listings in Supabase
async function autoEndExpiredListings(listings: Listing[]) {
  const supabase = createClient();
  const expired = listings.filter(
    (l) => l.status === "active" && isAuctionEnded(l.auction_end_time)
  );
  if (expired.length === 0) return;
  await supabase
    .from("listings")
    .update({ status: "ended", updated_at: new Date().toISOString() })
    .in("id", expired.map((l) => l.id));
}

export function useListings(options: UseListingsOptions = {}) {
  const { categorySlug, status = "active", sellerId, limit = 12, search, enabled = true } = options;
  const queryClient = useQueryClient();

  return useQuery<Listing[]>({
    queryKey: ["listings", categorySlug, status, sellerId, limit, search],
    enabled,
    queryFn: async () => {
      const supabase = createClient();

      let categoryId: number | undefined;
      if (categorySlug) {
        const { data: cat } = await supabase
          .from("categories").select("id").eq("slug", categorySlug).single();
        if (cat) categoryId = cat.id;
      }

      let query = supabase
        .from("listings")
        .select("*")
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (categoryId !== undefined) query = query.eq("category_id", categoryId);
      if (sellerId) query = query.eq("seller_id", sellerId);
      if (search) query = query.ilike("title", `%${search}%`);
      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw new Error(error.message);

      const enriched = await enrichListings(data ?? []);

      // Auto-end expired active listings and invalidate cache
      if (status === "active") {
        const hasExpired = enriched.some(
          (l) => l.status === "active" && isAuctionEnded(l.auction_end_time)
        );
        if (hasExpired) {
          await autoEndExpiredListings(enriched);
          queryClient.invalidateQueries({ queryKey: ["listings"] });
        }
      }

      // Filter out any expired items from the active list (client-side guard)
      if (status === "active") {
        return enriched.filter((l) => !isAuctionEnded(l.auction_end_time));
      }

      return enriched;
    },
    staleTime: 30_000,
    retry: 1,
  });
}

export function useListing(id: string) {
  return useQuery<Listing>({
    queryKey: ["listing", id],
    enabled: !!id,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("listings").select("*").eq("id", id).single();
      if (error) throw new Error(error.message);
      const enriched = await enrichListings([data]);
      return enriched[0];
    },
    staleTime: 15_000,
    refetchInterval: 30_000, // refresh every 30s for live updates
  });
}

// Trending = auctions ending within the next 12 hours
export function useTrendingListings(limit = 4) {
  return useQuery<Listing[]>({
    queryKey: ["trending-listings", limit],
    queryFn: async () => {
      const supabase = createClient();
      const now = new Date();
      const in12Hours = new Date(now.getTime() + 12 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "active")
        .gte("auction_end_time", now.toISOString())
        .lte("auction_end_time", in12Hours.toISOString())
        .order("auction_end_time", { ascending: true })
        .limit(limit);

      if (error) throw new Error(error.message);
      return enrichListings(data ?? []);
    },
    staleTime: 60_000,
    retry: 1,
  });
}