"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CATEGORIES } from "@/lib/constants";
import {
  Zap, Smartphone, Bike, Sofa, Monitor,
  Shirt, WashingMachine, BookOpen, Gamepad2, Package,
} from "lucide-react";

const categoryStyles: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  Electronics:       { icon: Zap,            color: "#F59E0B", bg: "rgba(245,158,11,0.12)"  },
  Mobiles:           { icon: Smartphone,     color: "#3B82F6", bg: "rgba(59,130,246,0.12)"  },
  Bikes:             { icon: Bike,           color: "#10B981", bg: "rgba(16,185,129,0.12)"  },
  Furniture:         { icon: Sofa,           color: "#8B5CF6", bg: "rgba(139,92,246,0.12)"  },
  Computers:         { icon: Monitor,        color: "#06B6D4", bg: "rgba(6,182,212,0.12)"   },
  Fashion:           { icon: Shirt,          color: "#EC4899", bg: "rgba(236,72,153,0.12)"  },
  "Home Appliances": { icon: WashingMachine, color: "#F97316", bg: "rgba(249,115,22,0.12)"  },
  Books:             { icon: BookOpen,       color: "#84CC16", bg: "rgba(132,204,22,0.12)"  },
  Gaming:            { icon: Gamepad2,       color: "#EF4444", bg: "rgba(239,68,68,0.12)"   },
  Others:            { icon: Package,        color: "#94A3B8", bg: "rgba(148,163,184,0.12)" },
};

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-display font-bold text-4xl mb-2">All Categories</h1>
          <p className="text-sm" style={{ color: "#7a6f6a" }}>Browse auctions by category</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const style = categoryStyles[cat.name] ?? categoryStyles["Others"];
            const Icon = style.icon;
            return (
              <Link key={cat.slug} href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border text-center transition-all duration-200 hover:-translate-y-1"
                style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: style.bg, border: `1px solid ${style.color}33` }}>
                  <Icon className="w-6 h-6" style={{ color: style.color }} />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">{cat.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#7a6f6a" }}>{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}