import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using BIN (Bid In Nepal), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. We reserve the right to update these terms at any time with notice to registered users."
  },
  {
    title: "2. User Accounts",
    content: "You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when registering."
  },
  {
    title: "3. Auction Rules",
    content: "All bids placed on BIN are binding commitments to purchase. The highest bidder at auction close is obligated to complete the transaction. Bid manipulation, shill bidding, and artificially inflating prices are strictly prohibited and will result in permanent account suspension."
  },
  {
    title: "4. Seller Obligations",
    content: "Sellers must accurately represent all items listed for auction. Items must be legally owned by the seller and available for immediate sale. Prohibited items include counterfeit goods, illegal products, weapons, and hazardous materials. BIN reserves the right to remove any listing without notice."
  },
  {
    title: "5. Buyer Obligations",
    content: "Buyers must honour winning bids and complete payment within 3 days of auction close. Failure to complete payment may result in account suspension. Buyers should thoroughly inspect items before completing payment."
  },
  {
    title: "6. Fees & Payments",
    content: "BIN currently does not charge listing or transaction fees. Payments are made directly between buyers and sellers. BIN is not responsible for payment disputes between parties. We recommend using verifiable payment methods and keeping transaction records."
  },
  {
    title: "7. Prohibited Conduct",
    content: "Users may not: harass other users, post false or misleading content, attempt to circumvent our security measures, use the platform for money laundering or fraud, create multiple accounts to manipulate auctions, or scrape or copy our platform's data."
  },
  {
    title: "8. Dispute Resolution",
    content: "BIN provides a platform for peer-to-peer transactions but is not a party to any transaction. In case of disputes, we encourage parties to resolve matters directly. BIN may, at its discretion, assist in mediating disputes but is not obligated to do so."
  },
  {
    title: "9. Limitation of Liability",
    content: "BIN is provided 'as is' without warranties of any kind. We are not liable for any damages arising from use of the platform, failed transactions, or disputes between users. Our total liability shall not exceed any fees paid by you to BIN in the preceding 12 months."
  },
  {
    title: "10. Governing Law",
    content: "These terms are governed by the laws of Nepal. Any disputes shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal."
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "#3b82f618", color: "#3b82f6", border: "1px solid #3b82f628" }}>
            <FileText className="w-3.5 h-3.5" /> Legal
          </div>
          <h1 className="font-display font-bold text-4xl">Terms of Service</h1>
          <p className="text-sm" style={{ color: "#7a6f6a" }}>Last updated: March 2026</p>
        </div>

        <div className="rounded-2xl border p-5 text-sm" style={{ background: "#0f120a", borderColor: "#1a2a14", color: "#a0c080" }}>
          Please read these terms carefully before using BIN. By creating an account or placing a bid, you acknowledge that you have read, understood, and agree to these terms.
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="rounded-2xl border p-6" style={{ background: "#0f0d0c", borderColor: "#1e1a18" }}>
              <h2 className="font-display font-semibold text-lg mb-3">{section.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#9a8f8a" }}>{section.content}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm" style={{ color: "#5a4f4a" }}>
          Questions about these terms? Email us at{" "}
          <a href="mailto:legal@binnepal.com" style={{ color: "#e74c3c" }}>legal@binnepal.com</a>
        </p>
      </main>
      <Footer />
    </>
  );
}