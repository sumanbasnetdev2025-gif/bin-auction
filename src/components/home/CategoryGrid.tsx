"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, Smartphone, Bike, Sofa, Monitor,
  Shirt, WashingMachine, BookOpen, Gamepad2, Package,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const categoryStyles: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  Electronics:     { icon: Zap,          color: "#F59E0B", bg: "rgba(245,158,11,0.12)"  },
  Mobiles:         { icon: Smartphone,   color: "#3B82F6", bg: "rgba(59,130,246,0.12)"  },
  Bikes:           { icon: Bike,         color: "#10B981", bg: "rgba(16,185,129,0.12)"  },
  Furniture:       { icon: Sofa,         color: "#8B5CF6", bg: "rgba(139,92,246,0.12)"  },
  Computers:       { icon: Monitor,      color: "#06B6D4", bg: "rgba(6,182,212,0.12)"   },
  Fashion:         { icon: Shirt,        color: "#EC4899", bg: "rgba(236,72,153,0.12)"  },
  "Home Appliances":{ icon: WashingMachine, color: "#F97316", bg: "rgba(249,115,22,0.12)" },
  Books:           { icon: BookOpen,     color: "#84CC16", bg: "rgba(132,204,22,0.12)"  },
  Gaming:          { icon: Gamepad2,     color: "#EF4444", bg: "rgba(239,68,68,0.12)"   },
  Others:          { icon: Package,      color: "#94A3B8", bg: "rgba(148,163,184,0.12)" },
};

export default function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-display font-bold text-3xl mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">Find exactly what you&apos;re looking for</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.map((cat, i) => {
            const style = categoryStyles[cat.name] ?? categoryStyles["Others"];
            const Icon = style.icon;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/categories/${cat.slug}`}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 text-center"
                  style={{
                    background: "hsl(20 10% 11%)",
                    borderColor: "hsl(20 10% 18%)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = style.color + "55";
                    (e.currentTarget as HTMLElement).style.background = style.bg;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${style.color}22`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(20 10% 18%)";
                    (e.currentTarget as HTMLElement).style.background = "hsl(20 10% 11%)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: style.bg }}
                  >
                    <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: style.color }} />
                  </div>
                  <span className="text-sm font-medium leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}