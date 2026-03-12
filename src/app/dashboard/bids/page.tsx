"use client";

import { useEffect, useState } from "react";
import BidsReceivedTable from "@/components/dashboard/BidsReceivedTable";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import type { BidWithBidder } from "@/types";

export default function DashboardBidsPage() {
  const { user } = useAuth();
  const [bids, setBids] = useState<BidWithBidder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!user?.id) return;

    const fetchBids = async () => {
      setIsLoading(true);
      // Get all listings by this seller, then all bids on those listings
      const { data, error } = await supabase
        .from("bids")
        .select(`
          *,
          bidder:users!bidder_id(id, full_name, avatar_url),
          listing:listings!listing_id(id, title, seller_id)
        `)
        .eq("listing.seller_id", user.id)
        .order("amount", { ascending: false });

      if (!error && data) {
        setBids(data as BidWithBidder[]);
      }
      setIsLoading(false);
    };

    fetchBids();
  }, [user?.id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl mb-1">Bids Received</h1>
        <p className="text-muted-foreground text-sm">
          All bids placed on your listings — sorted by amount
        </p>
      </div>

      <BidsReceivedTable bids={bids} isLoading={isLoading} />
    </div>
  );
}