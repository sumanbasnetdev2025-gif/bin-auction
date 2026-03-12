import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Camera, FileText, DollarSign, Clock, PackagePlus, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function SellerGuidePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "#10b98118", color: "#10b981", border: "1px solid #10b98128" }}>
            <PackagePlus className="w-3.5 h-3.5" /> Seller Guide
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl">Sell with Confidence</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#7a6f6a" }}>
            Turn your unused items into cash. Here's how to create listings that sell.
          </p>
        </div>

        {/* Best Practices */}
        <section>
          <h2 className="font-display font-bold text-2xl mb-5">Listing Best Practices</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Camera, title: "Great Photos Sell", desc: "Upload clear, well-lit photos from multiple angles. Show any defects or wear honestly. Listings with 3+ photos get significantly more bids.", color: "#f59e0b" },
              { icon: FileText, title: "Detailed Descriptions", desc: "Include brand, model, age, condition, and any accessories included. Be honest about flaws — buyers appreciate transparency.", color: "#3b82f6" },
              { icon: DollarSign, title: "Smart Starting Price", desc: "Set a starting price low enough to attract attention but reasonable for the item's value. Research similar sold items for reference.", color: "#10b981" },
              { icon: Clock, title: "Optimal Duration", desc: "7-day auctions typically attract the most bidders. Shorter auctions work well for hot items; longer for rare or niche products.", color: "#8b5cf6" },
              { icon: TrendingUp, title: "Timing Matters", desc: "List items to end on weekday evenings (7-9 PM) when most buyers are browsing. Avoid ending during holidays.", color: "#e74c3c" },
              { icon: PackagePlus, title: "Multiple Listings", desc: "List related items separately rather than bundled. Individual listings get more focused bidders and often achieve better total prices.", color: "#f97316" },
            ].map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="rounded-2xl border p-5" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: tip.color + "18", border: `1px solid ${tip.color}28` }}>
                    <Icon className="w-4 h-4" style={{ color: tip.color }} />
                  </div>
                  <h3 className="font-display font-semibold mb-1.5">{tip.title}</h3>
                  <p className="text-sm" style={{ color: "#7a6f6a" }}>{tip.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Seller Rules */}
        <section>
          <h2 className="font-display font-bold text-2xl mb-5">Seller Responsibilities</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#1e1a18" }}>
            {[
              ["Accurate Listings", "Only list items you own and are ready to sell. Misrepresentation is grounds for account suspension."],
              ["Honour Winning Bids", "You must complete the sale with the winning bidder. Refusing to sell after auction close is prohibited."],
              ["Respond Promptly", "Reply to buyer messages within 24 hours. Quick communication builds trust and positive reviews."],
              ["Safe Handover", "Arrange safe, public meeting places for in-person transactions. Never share your home address publicly."],
              ["Prohibited Items", "Do not list illegal items, counterfeit goods, weapons, or hazardous materials. Violators will be banned."],
            ].map(([rule, detail], i, arr) => (
              <div key={i} className="flex gap-4 px-5 py-4"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #1e1a18" : "none", background: i % 2 === 0 ? "#0f0d0c" : "#111009" }}>
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: "#10b981" }} />
                <div>
                  <p className="font-medium text-sm">{rule}</p>
                  <p className="text-sm mt-0.5" style={{ color: "#7a6f6a" }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link href="/listings/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bin-gradient">
            List Your First Item
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}