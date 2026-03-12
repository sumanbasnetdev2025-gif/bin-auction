import Link from "next/link";
import { Gavel, Mail, Phone, MapPin } from "lucide-react";
import { APP_NAME, APP_FULL_NAME, CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bin-gradient rounded-lg flex items-center justify-center">
                <Gavel className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl bin-gradient-text">{APP_NAME}</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {APP_FULL_NAME} — Nepal&apos;s premier second-hand auction marketplace. Buy and sell
              with confidence.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                Kathmandu, Nepal
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" />
                hello@binnepal.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary" />
                +977-1-XXXXXXX
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/listings", label: "Browse Auctions" },
                { href: "/listings/new", label: "List an Item" },
                { href: "/dashboard", label: "My Dashboard" },
                { href: "/dashboard/bids", label: "My Bids" },
                { href: "/login", label: "Sign In" },
                { href: "/signup", label: "Create Account" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/how-it-works", label: "How It Works" },
                { href: "/buyer-guide", label: "Buyer Guide" },
                { href: "/seller-guide", label: "Seller Guide" },
                { href: "/payment-info", label: "Payment Info" },
                { href: "/terms-of-service", label: "Terms of Service" },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP_FULL_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Made with</span>
            <span className="text-primary">♥</span>
            <span>in Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}