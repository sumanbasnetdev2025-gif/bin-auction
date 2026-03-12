"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gavel, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_FULL_NAME } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, hsl(var(--border)) 40px, hsl(var(--border)) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, hsl(var(--border)) 40px, hsl(var(--border)) 41px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8"
          >
            <Zap className="w-3.5 h-3.5" />
            Nepal&apos;s First Real-Time Auction Marketplace
          </motion.div>

          {/* Heading */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            Bid. Win.{" "}
            <span className="bin-gradient-text">Own It.</span>
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl text-muted-foreground font-normal">
              {APP_FULL_NAME}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Buy and sell second-hand items through live auctions. From electronics to bikes —
            place your bid, track in real time, pay your way.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bin-gradient border-0 text-white font-semibold text-base px-8 gap-2 h-12"
            >
              <Link href="/listings">
                Explore Auctions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/50 text-base px-8 h-12 gap-2"
            >
              <Link href="/listings/new">
                <Gavel className="w-4 h-4" />
                List an Item
              </Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: Shield, text: "Secure bidding" },
              { icon: Zap, text: "Real-time updates" },
              { icon: Gavel, text: "10+ categories" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-primary" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}