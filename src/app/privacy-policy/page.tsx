import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect information you provide directly: name, email address, phone number, and location when you register. We also collect transaction data including listings created, bids placed, and auction history. We automatically collect usage data such as IP address, browser type, and pages visited."
  },
  {
    title: "2. How We Use Your Information",
    content: "We use your information to: operate and improve the BIN platform, process and display your listings and bids, send transactional emails (auction wins, outbid notifications), provide customer support, detect and prevent fraud, and comply with legal obligations."
  },
  {
    title: "3. Information Sharing",
    content: "We do not sell your personal information to third parties. We share limited information with other users as necessary for transactions (e.g., your name and contact info with winning bidders). We may share data with service providers (Supabase for database hosting) who are bound by confidentiality agreements."
  },
  {
    title: "4. Data Storage & Security",
    content: "Your data is stored on Supabase's secure infrastructure with row-level security enabled. We use industry-standard encryption for data in transit and at rest. We implement access controls to limit who can access your data within our organization."
  },
  {
    title: "5. Your Rights",
    content: "You have the right to: access your personal data, correct inaccurate information, request deletion of your account and data, export your data, and opt out of marketing communications. To exercise these rights, contact us at privacy@binnepal.com."
  },
  {
    title: "6. Cookies",
    content: "We use essential cookies for authentication and session management. We do not use tracking or advertising cookies. You can disable cookies in your browser settings, though this may affect platform functionality."
  },
  {
    title: "7. Children's Privacy",
    content: "BIN is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal data, we will delete it promptly."
  },
  {
    title: "8. Changes to This Policy",
    content: "We may update this privacy policy from time to time. We will notify registered users of significant changes via email. Continued use of BIN after changes constitutes acceptance of the updated policy."
  },
  {
    title: "9. Contact Us",
    content: "For privacy-related questions or to exercise your data rights, contact us at privacy@binnepal.com or write to: BIN — Bid In Nepal, Kathmandu, Nepal."
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "#8b5cf618", color: "#8b5cf6", border: "1px solid #8b5cf628" }}>
            <Shield className="w-3.5 h-3.5" /> Privacy
          </div>
          <h1 className="font-display font-bold text-4xl">Privacy Policy</h1>
          <p className="text-sm" style={{ color: "#7a6f6a" }}>Last updated: March 2026</p>
        </div>

        <div className="rounded-2xl border p-5 text-sm" style={{ background: "#0e0a14", borderColor: "#1e1430", color: "#b090e0" }}>
          Your privacy matters to us. This policy explains what data we collect, how we use it, and your rights regarding your personal information.
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
          Privacy questions? Email{" "}
          <a href="mailto:privacy@binnepal.com" style={{ color: "#8b5cf6" }}>privacy@binnepal.com</a>
        </p>
      </main>
      <Footer />
    </>
  );
}