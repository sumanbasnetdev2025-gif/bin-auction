"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import LatestAuctions from "@/components/home/LatestAuctions";
import TrendingItems from "@/components/home/TrendingItems";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Separator style={{ background: "rgba(255,255,255,0.05)" }} />
        <CategoryGrid />
        <Separator style={{ background: "rgba(255,255,255,0.05)" }} />
        <LatestAuctions />
        <Separator style={{ background: "rgba(255,255,255,0.05)" }} />
        <TrendingItems />
      </main>
      <Footer />
    </>
  );
}