"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function useRealtimeBids(listingId: string) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  useEffect(() => {
    if (!listingId) return;

    const channel = supabase
      .channel(`bids:${listingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bids",
          filter: `listing_id=eq.${listingId}`,
        },
        (payload) => {
          // Invalidate queries to re-fetch fresh data
          queryClient.invalidateQueries({ queryKey: ["bids", listingId] });
          queryClient.invalidateQueries({ queryKey: ["listing", listingId] });

          if (payload.eventType === "INSERT") {
            toast.info("A new bid was placed!", { duration: 2000 });
          } else if (payload.eventType === "UPDATE") {
            toast.info("A bid was updated!", { duration: 2000 });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [listingId, queryClient, supabase]);
}