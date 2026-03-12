"use client";

import { use } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingCard from "@/components/listings/ListingCard";
import { useListings } from "@/hooks/useListings";
import { CATEGORIES } from "@/lib/constants";
import {
  Zap, Smartphone, Bike, Sofa, Monitor,
  Shirt, WashingMachine, BookOpen, Gamepad2, Package,
  Plus, ArrowRight, Search,
} from "lucide-react";

const categoryStyles: Record<string, { icon: React.ElementType; color: string; bg: string; glow: string }> = {
  Electronics:       { icon: Zap,            color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  glow: "rgba(245,158,11,0.15)" },
  Mobiles:           { icon: Smartphone,     color: "#3B82F6", bg: "rgba(59,130,246,0.1)",  glow: "rgba(59,130,246,0.15)" },
  Bikes:             { icon: Bike,           color: "#10B981", bg: "rgba(16,185,129,0.1)",  glow: "rgba(16,185,129,0.15)" },
  Furniture:         { icon: Sofa,           color: "#8B5CF6", bg: "rgba(139,92,246,0.1)",  glow: "rgba(139,92,246,0.15)" },
  Computers:         { icon: Monitor,        color: "#06B6D4", bg: "rgba(6,182,212,0.1)",   glow: "rgba(6,182,212,0.15)"  },
  Fashion:           { icon: Shirt,          color: "#EC4899", bg: "rgba(236,72,153,0.1)",  glow: "rgba(236,72,153,0.15)" },
  "Home Appliances": { icon: WashingMachine, color: "#F97316", bg: "rgba(249,115,22,0.1)",  glow: "rgba(249,115,22,0.15)" },
  Books:             { icon: BookOpen,       color: "#84CC16", bg: "rgba(132,204,22,0.1)",  glow: "rgba(132,204,22,0.15)" },
  Gaming:            { icon: Gamepad2,       color: "#EF4444", bg: "rgba(239,68,68,0.1)",   glow: "rgba(239,68,68,0.15)"  },
  Others:            { icon: Package,        color: "#94A3B8", bg: "rgba(148,163,184,0.1)", glow: "rgba(148,163,184,0.15)"},
};

function CardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "#0f0d0c", border: "1px solid #1e1a18" }}>
      <div className="h-48 w-full" style={{ background: "#1a1614" }} />
      <div className="p-4 space-y-3">
        <div className="h-4 rounded-lg w-3/4" style={{ background: "#1e1a18" }} />
        <div className="h-3 rounded-lg w-1/2" style={{ background: "#1a1614" }} />
        <div className="h-6 rounded-lg w-1/3" style={{ background: "#1e1a18" }} />
      </div>
    </div>
  );
}

function EmptyState({ category, style }: { category: typeof CATEGORIES[0]; style: typeof categoryStyles[string] }) {
  const Icon = style.icon;
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 4);

  return (
    <div className="py-8 space-y-12">
      {/* Hero empty state */}
      <div className="rounded-3xl border p-12 text-center relative overflow-hidden"
        style={{ background: "#0c0a09", borderColor: "#1e1a18" }}>
        {/* Glow background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: style.color }} />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: style.bg, border: `1px solid ${style.color}33` }}>
            <Icon className="w-10 h-10" style={{ color: style.color }} />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl">
              No {category.name} auctions yet
            </h2>
            <p className="text-sm max-w-sm mx-auto" style={{ color: "#7a6f6a" }}>
              Be the first to list a {category.name.toLowerCase()} item and reach thousands of buyers across Nepal.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link href="/listings/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bin-gradient">
              <Plus className="w-4 h-4" /> List an Item
            </Link>
            <Link href="/listings"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border"
              style={{ borderColor: "#2a2220", color: "#e8ddd8" }}>
              <Search className="w-4 h-4" /> Browse All Auctions
            </Link>
          </div>
        </div>
      </div>

      {/* Browse other categories */}
      <div>
        <h3 className="font-display font-semibold text-lg mb-4">Browse Other Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {otherCategories.map((cat) => {
            const s = categoryStyles[cat.name] ?? categoryStyles["Others"];
            const CatIcon = s.icon;
            return (
              <Link key={cat.slug} href={`/categories/${cat.slug}`}
                className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:-translate-y-0.5"
                style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: s.bg, border: `1px solid ${s.color}33` }}>
                  <CatIcon className="w-4.5 h-4.5" style={{ color: s.color }} />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{cat.name}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 ml-auto shrink-0" style={{ color: "#3a3330" }} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = CATEGORIES.find((c) => c.slug === slug);
  const style = category
    ? (categoryStyles[category.name] ?? categoryStyles["Others"])
    : categoryStyles["Others"];
  const Icon = style.icon;

  const { data: listings, isLoading } = useListings({
    categorySlug: slug,
    status: "active",
    enabled: !!category,
  });

  // Unknown slug → show 404-style redirect to categories
  if (!category) {
    return (
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="font-display font-bold text-2xl mb-2">Category not found</p>
          <p className="text-sm mb-6" style={{ color: "#7a6f6a" }}>This category doesn't exist.</p>
          <Link href="/categories" className="text-sm px-5 py-2.5 rounded-xl bin-gradient text-white font-semibold">
            View All Categories
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-10 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: style.bg, border: `1px solid ${style.color}33`, boxShadow: `0 0 30px ${style.glow}` }}>
              <Icon className="w-8 h-8" style={{ color: style.color }} />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl">{category.name}</h1>
              <p className="text-sm mt-1" style={{ color: "#7a6f6a" }}>{category.description}</p>
              <p className="text-sm mt-1.5 font-medium" style={{ color: style.color }}>
                {isLoading ? "Loading..." : `${listings?.length ?? 0} active auction${(listings?.length ?? 0) !== 1 ? "s" : ""}`}
              </p>
            </div>

            {/* List item CTA */}
            <Link href="/listings/new"
              className="ml-auto hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bin-gradient shrink-0">
              <Plus className="w-4 h-4" /> List Item
            </Link>
          </div>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        )}

        {/* Listings grid */}
        {!isLoading && listings && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listings.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!listings || listings.length === 0) && (
          <EmptyState category={category} style={style} />
        )}

      </main>
      <Footer />
    </>
  );
}