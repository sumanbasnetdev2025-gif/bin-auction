import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Gavel, Trophy, ShieldCheck, ArrowRight, UserPlus, PackagePlus, DollarSign } from "lucide-react";
import Link from "next/link";

const steps_buyer = [
  { icon: UserPlus, title: "Create an Account", desc: "Sign up for free in under a minute. Just your email and a password to get started.", color: "#3b82f6" },
  { icon: Search, title: "Find What You Want", desc: "Browse by category or search for specific items. Filter by price, location, or time remaining.", color: "#8b5cf6" },
  { icon: Gavel, title: "Place Your Bid", desc: "Enter your maximum bid amount. You only pay your bid if you win — bidding is free.", color: "#e74c3c" },
  { icon: Trophy, title: "Win & Pay", desc: "If you have the highest bid when the auction ends, you win! Complete payment securely to receive your item.", color: "#10b981" },
];

const steps_seller = [
  { icon: UserPlus, title: "Create an Account", desc: "Sign up and verify your email. Your account works for both buying and selling.", color: "#3b82f6" },
  { icon: PackagePlus, title: "List Your Item", desc: "Upload photos, write a description, set a starting price and auction duration.", color: "#f59e0b" },
  { icon: Gavel, title: "Receive Bids", desc: "Buyers compete for your item. Watch bids come in through your dashboard in real time.", color: "#e74c3c" },
  { icon: DollarSign, title: "Get Paid", desc: "When your auction ends, coordinate with the winning buyer to complete the sale.", color: "#10b981" },
];

function StepCard({ step, index }: { step: typeof steps_buyer[0]; index: number }) {
  const Icon = step.icon;
  return (
    <div className="flex gap-4 p-5 rounded-2xl border" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-sm"
        style={{ background: step.color + "18", color: step.color, border: `1px solid ${step.color}28` }}>
        {index + 1}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4" style={{ color: step.color }} />
          <h3 className="font-display font-semibold">{step.title}</h3>
        </div>
        <p className="text-sm" style={{ color: "#7a6f6a" }}>{step.desc}</p>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-2"
            style={{ background: "#e74c3c18", color: "#e74c3c", border: "1px solid #e74c3c28" }}>
            <ShieldCheck className="w-3.5 h-3.5" /> Trusted Marketplace
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl">How BIN Works</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#7a6f6a" }}>
            Nepal's premier auction marketplace — simple, secure, and fair for both buyers and sellers.
          </p>
        </div>

        {/* Buyer Steps */}
        <section>
          <div className="mb-6">
            <h2 className="font-display font-bold text-2xl mb-1">For Buyers</h2>
            <p className="text-sm" style={{ color: "#7a6f6a" }}>Find great deals and win auctions in 4 easy steps</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {steps_buyer.map((step, i) => <StepCard key={i} step={step} index={i} />)}
          </div>
        </section>

        {/* Seller Steps */}
        <section>
          <div className="mb-6">
            <h2 className="font-display font-bold text-2xl mb-1">For Sellers</h2>
            <p className="text-sm" style={{ color: "#7a6f6a" }}>List your items and reach thousands of buyers</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {steps_seller.map((step, i) => <StepCard key={i} step={step} index={i} />)}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-display font-bold text-2xl mb-6">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is BIN free to use?", a: "Creating an account and placing bids is completely free. Sellers can list items at no cost." },
              { q: "How does bidding work?", a: "Each bid must be higher than the current highest bid. The highest bidder at auction end wins." },
              { q: "What happens if I win?", a: "You'll be notified by email. Contact the seller to arrange payment and pickup/delivery." },
              { q: "Can I cancel a bid?", a: "Bids are binding commitments. Please only bid if you intend to complete the purchase." },
              { q: "Is my personal information safe?", a: "Yes. We use Supabase's secure infrastructure with row-level security to protect all data." },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border p-5" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
                <h3 className="font-display font-semibold mb-1.5">{faq.q}</h3>
                <p className="text-sm" style={{ color: "#7a6f6a" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1a0e0c, #1e1208)", border: "1px solid #3a2018" }}>
          <h2 className="font-display font-bold text-2xl mb-2">Ready to get started?</h2>
          <p className="text-sm mb-6" style={{ color: "#7a6f6a" }}>Join thousands of Nepali buyers and sellers on BIN</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/signup" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bin-gradient">
              Create Account
            </Link>
            <Link href="/listings" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold border"
              style={{ borderColor: "#2a2220", color: "#e8ddd8" }}>
              Browse Auctions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}