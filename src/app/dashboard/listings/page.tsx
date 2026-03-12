"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyListingsTable from "@/components/dashboard/MyListingsTable";
import { useAuthStore } from "@/store/authStore";
import { useListings } from "@/hooks/useListings";

export default function DashboardListingsPage() {
  const user = useAuthStore((s) => s.user);
  const isReady = useAuthStore((s) => s.isReady);

  // Fetch ALL statuses so seller sees active, ended, and sold
  const { data: active, isLoading: l1 } = useListings({ sellerId: user?.id, status: "active", limit: 50, enabled: isReady && !!user?.id });
  const { data: ended, isLoading: l2 } = useListings({ sellerId: user?.id, status: "ended", limit: 50, enabled: isReady && !!user?.id });
  const { data: sold, isLoading: l3 } = useListings({ sellerId: user?.id, status: "sold", limit: 50, enabled: isReady && !!user?.id });

  const allListings = [...(active ?? []), ...(ended ?? []), ...(sold ?? [])];
  const isLoading = (l1 || l2 || l3) && isReady && !!user?.id;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl mb-1">My Listings</h1>
          <p className="text-sm" style={{ color: "#7a6f6a" }}>
            {active?.length ?? 0} active · {ended?.length ?? 0} ended · {sold?.length ?? 0} sold
          </p>
        </div>
        <Button asChild className="bin-gradient border-0 text-white gap-1.5">
          <Link href="/listings/new">
            <Plus className="w-4 h-4" /> New Listing
          </Link>
        </Button>
      </div>

      <MyListingsTable listings={allListings} isLoading={isLoading} />
    </div>
  );
}