import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Smartphone, Building2, Banknote, ShieldCheck, AlertTriangle, HelpCircle } from "lucide-react";

export default function PaymentInfoPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "#10b98118", color: "#10b981", border: "1px solid #10b98128" }}>
            <ShieldCheck className="w-3.5 h-3.5" /> Payment Info
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl">Payment Information</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#7a6f6a" }}>
            BIN facilitates peer-to-peer transactions. Payments are made directly between buyer and seller.
          </p>
        </div>

        {/* Accepted Methods */}
        <section>
          <h2 className="font-display font-bold text-2xl mb-5">Accepted Payment Methods</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Smartphone, title: "eSewa", desc: "Nepal's most popular digital wallet. Instant transfers between accounts.", color: "#10b981" },
              { icon: Smartphone, title: "Khalti", desc: "Digital payment platform widely accepted across Nepal.", color: "#8b5cf6" },
              { icon: Building2, title: "Bank Transfer", desc: "Direct transfer to the seller's bank account. Suitable for larger transactions.", color: "#3b82f6" },
              { icon: Smartphone, title: "IME Pay", desc: "Mobile wallet with wide network coverage across Nepal.", color: "#f59e0b" },
              { icon: Banknote, title: "Cash on Meetup", desc: "Pay in cash when collecting the item in person. Recommended for local transactions.", color: "#e74c3c" },
              { icon: Building2, title: "ConnectIPS", desc: "Interbank payment system for direct Nepal bank transfers.", color: "#06b6d4" },
            ].map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="rounded-2xl border p-5 text-center" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: method.color + "18", border: `1px solid ${method.color}28` }}>
                    <Icon className="w-5 h-5" style={{ color: method.color }} />
                  </div>
                  <h3 className="font-display font-semibold mb-1">{method.title}</h3>
                  <p className="text-xs" style={{ color: "#7a6f6a" }}>{method.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How Payment Works */}
        <section>
          <h2 className="font-display font-bold text-2xl mb-5">How Payment Works</h2>
          <div className="space-y-3">
            {[
              ["1. Auction Ends", "When an auction closes, the highest bidder is declared the winner and both parties are notified by email."],
              ["2. Buyer Contacts Seller", "The winning buyer contacts the seller through BIN's messaging system to arrange payment and collection."],
              ["3. Agree on Method", "Buyer and seller agree on a payment method from the options listed above."],
              ["4. Payment Transfer", "Buyer sends payment to seller via the agreed method. Always get a transaction receipt."],
              ["5. Item Handover", "Once payment is confirmed, arrange a safe meetup or delivery to transfer the item."],
            ].map(([step, detail], i) => (
              <div key={i} className="flex gap-4 rounded-xl border p-5"
                style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-display font-bold text-xs"
                  style={{ background: "#e74c3c18", color: "#e74c3c", border: "1px solid #e74c3c28" }}>
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-sm">{step}</p>
                  <p className="text-sm mt-0.5" style={{ color: "#7a6f6a" }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section>
          <div className="rounded-2xl border p-6" style={{ background: "#1a0e08", borderColor: "#f97316" + "30" }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5" style={{ color: "#f97316" }} />
              <h2 className="font-display font-bold text-lg" style={{ color: "#f97316" }}>Safety Tips</h2>
            </div>
            <ul className="space-y-2">
              {[
                "Never pay in advance before inspecting the item for high-value purchases.",
                "Always get a digital transaction receipt — screenshot eSewa/Khalti confirmations.",
                "Meet in public places (banks, malls, police stations) for cash transactions.",
                "Do not share your eSewa/Khalti PIN or OTP with anyone.",
                "Report suspicious sellers or payment requests to BIN support immediately.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#e8c8a0" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f97316" }} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="rounded-2xl border p-6 text-center" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
          <HelpCircle className="w-8 h-8 mx-auto mb-3" style={{ color: "#7a6f6a" }} />
          <h3 className="font-display font-semibold mb-1">Have a payment issue?</h3>
          <p className="text-sm mb-3" style={{ color: "#7a6f6a" }}>Contact us at hello@binnepal.com and we'll help resolve it.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}