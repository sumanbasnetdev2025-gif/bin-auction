"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingGrid from "@/components/listings/ListingGrid";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListings } from "@/hooks/useListings";
import { CATEGORIES } from "@/lib/constants";

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState<string>("");
  const [status, setStatus] = useState<"active" | "ended">("active");

  const { data: listings, isLoading } = useListings({
    status,
    categorySlug: categorySlug || undefined,
    search: search || undefined,
    limit: 24,
  });

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl mb-2">
            Browse Auctions
          </h1>
          <p className="text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `${listings?.length ?? 0} auctions found`}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="pl-9 bg-secondary/30"
            />
          </div>

          <Select
            value={categorySlug || "all"}
            onValueChange={(v) => setCategorySlug(v === "all" ? "" : v)}
          >
            <SelectTrigger className="w-full sm:w-48 bg-secondary/30">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={status}
            onValueChange={(v) => setStatus(v as "active" | "ended")}
          >
            <SelectTrigger className="w-full sm:w-36 bg-secondary/30">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="active">Live</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ListingGrid
          listings={listings || []}
          isLoading={isLoading}
          emptyTitle="No auctions found"
          emptyDescription="Try adjusting your filters or check back later."
        />
      </main>
      <Footer />
    </>
  );
}
