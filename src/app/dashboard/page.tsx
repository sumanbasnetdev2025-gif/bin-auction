"use client";

import Link from "next/link";
import { Gavel, Package, TrendingUp, Star, Plus, ArrowRight, Clock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useListings } from "@/hooks/useListings";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function StatCard({ title, value, icon: Icon, description, color = "#e74c3c" }: {
  title: string; value: string | number; icon: any; description: string; color?: string;
}) {
  return (
    <div className="rounded-2xl p-5 border flex items-start gap-4"
      style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: color + "18" }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-sm" style={{ color: "#7a6f6a" }}>{title}</p>
        <p className="font-display font-bold text-2xl mt-0.5">{value}</p>
        <p className="text-xs mt-0.5" style={{ color: "#5a4f4a" }}>{description}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const isReady = useAuthStore((s) => s.isReady);

  const { data: listings, isLoading: listingsLoading } = useListings({
    sellerId: user?.id,
    status: "active",
    limit: 50,
    enabled: isReady && !!user?.id,
  });

  // Show skeletons only when listings are actually fetching
  const isLoading = listingsLoading && isReady && !!user?.id;

  const totalListings = listings?.length ?? 0;
  const totalBids = listings?.reduce((sum, l) => sum + (l.bid_count ?? 0), 0) ?? 0;
  const highestBid = listings?.reduce((max, l) => Math.max(max, l.current_highest_bid ?? 0), 0) ?? 0;
  const memberYear = user?.created_at ? new Date(user.created_at).getFullYear() : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl mb-1">
            Welcome back, {user?.full_name?.split(" ")[0] ?? "there"} 👋
          </h1>
          <p style={{ color: "#7a6f6a" }} className="text-sm">Here&apos;s your auction activity at a glance</p>
        </div>
        <Button asChild size="sm" className="bin-gradient border-0 text-white gap-1.5">
          <Link href="/listings/new"><Plus className="w-4 h-4" /> New Listing</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Listings" value={totalListings} icon={Package} description="Currently live" color="#3b82f6" />
        <StatCard title="Total Bids" value={totalBids} icon={Gavel} description="Across all items" color="#e74c3c" />
        <StatCard title="Highest Bid" value={highestBid ? formatCurrency(highestBid) : "—"} icon={TrendingUp} description="Best offer" color="#10b981" />
        <StatCard title="Member Since" value={memberYear ?? "—"} icon={Star} description="Account year" color="#f59e0b" />
      </div>

      {/* My Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl">My Active Listings</h2>
          <Link href="/dashboard/listings" className="text-sm flex items-center gap-1" style={{ color: "#e74c3c" }}>
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl shimmer-bg" />)}
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#1e1a18" }}>
            {listings.slice(0, 5).map((listing, i) => (
              <Link key={listing.id} href={`/listings/${listing.id}`}>
                <div className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: i < Math.min(listings.length, 5) - 1 ? "1px solid #1e1a18" : "none" }}>
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0"
                    style={{ background: "#1a1614" }}>
                    {listing.image_urls?.[0] ? (
                      <img src={listing.image_urls[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-5 h-5" style={{ color: "#5a4f4a" }} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{listing.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3" style={{ color: "#7a6f6a" }} />
                      <p className="text-xs" style={{ color: "#7a6f6a" }}>
                        Ends {formatDate(listing.auction_end_time)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display font-bold text-sm" style={{ color: "#e74c3c" }}>
                      {formatCurrency(listing.current_highest_bid ?? listing.starting_price)}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#7a6f6a" }}>
                      {listing.bid_count ?? 0} bid{(listing.bid_count ?? 0) !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Badge className="text-[10px] shrink-0"
                    style={{ background: "#10b98120", color: "#10b981", border: "1px solid #10b98130" }}>
                    LIVE
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border p-12 text-center"
            style={{ borderColor: "#1e1a18", background: "#0f0d0c" }}>
            <Package className="w-10 h-10 mx-auto mb-3" style={{ color: "#3a3330" }} />
            <p className="font-display font-semibold mb-1">No active listings</p>
            <p className="text-sm mb-4" style={{ color: "#7a6f6a" }}>Start selling by creating your first auction</p>
            <Button asChild size="sm" className="bin-gradient border-0 text-white gap-1.5">
              <Link href="/listings/new"><Plus className="w-4 h-4" /> Create Listing</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}