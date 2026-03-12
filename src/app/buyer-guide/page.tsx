import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Gavel, Bell, Star, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";

const tips = [
  { icon: Search, title: "Research Before Bidding", desc: "Check the item description carefully. Look at all photos. Ask the seller questions before committing to a bid.", color: "#3b82f6" },
  { icon: Gavel, title: "Set a Maximum Budget", desc: "Decide the most you're willing to pay before bidding. Don't get caught up in bidding wars beyond your budget.", color: "#e74c3c" },
  { icon: Bell, title: "Watch Auction End Times", desc: "Most bidding activity happens in the final minutes. Keep an eye on auctions you're interested in as they near the end.", color: "#f59e0b" },
  { icon: Star, title: "Check Seller Reputation", desc: "Review the seller's profile and history. Look at their other listings to gauge trustworthiness.", color: "#8b5cf6" },
  { icon: ShieldCheck, title: "Meet in Safe Locations", desc: "For physical item pickups, meet in public places. Bring a friend if possible when meeting unknown sellers.", color: "#10b981" },
  { icon: AlertTriangle, title: "Verify Before Paying", desc: "Inspect items thoroughly before completing payment. Confirm the item matches the listing description.", color: "#f97316" },
];

export default function BuyerGuidePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "#3b82f618", color: "#3b82f6", border: "1px solid #3b82f628" }}>
            <Gavel className="w-3.5 h-3.5" /> Buyer Guide
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl">Smart Buying on BIN</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#7a6f6a" }}>
            Everything you need to know to bid confidently and get great deals.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <div key={i} className="rounded-2xl border p-5" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: tip.color + "18", border: `1px solid ${tip.color}28` }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: tip.color }} />
                </div>
                <h3 className="font-display font-semibold mb-1.5">{tip.title}</h3>
                <p className="text-sm" style={{ color: "#7a6f6a" }}>{tip.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bidding Rules */}
        <section>
          <h2 className="font-display font-bold text-2xl mb-5">Bidding Rules</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#1e1a18" }}>
            {[
              ["Minimum Bid Increment", "Each new bid must exceed the current highest bid."],
              ["Bid Limit", "You may place up to 3 bids per listing."],
              ["Binding Commitment", "All bids are legally binding. Only bid if you intend to buy."],
              ["Auction End", "The highest bidder when the timer hits zero wins the auction."],
              ["No Shill Bidding", "Sellers cannot bid on their own items. This is strictly prohibited."],
              ["Winner Notification", "Winners receive an email notification when the auction closes."],
            ].map(([rule, detail], i, arr) => (
              <div key={i} className="flex gap-4 px-5 py-4"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #1e1a18" : "none", background: i % 2 === 0 ? "#0f0d0c" : "#111009" }}>
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: "#e74c3c" }} />
                <div>
                  <p className="font-medium text-sm">{rule}</p>
                  <p className="text-sm mt-0.5" style={{ color: "#7a6f6a" }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link href="/listings" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bin-gradient">
            Start Browsing Auctions
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}