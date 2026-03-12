"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Gavel,
  User,
  Plus,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { getInitials, cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/listings", label: "My Listings", icon: Package },
  { href: "/dashboard/bids", label: "Bids Received", icon: Gavel },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-border/50 bg-card/30 min-h-[calc(100vh-4rem)]">
      {/* User Info */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 ring-2 ring-primary/30">
            <AvatarImage src={user?.avatar_url ?? undefined} />
            <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
              {getInitials(user?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm truncate">{user?.full_name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>

        <Button asChild size="sm" className="w-full mt-4 bin-gradient border-0 text-white gap-1.5">
          <Link href="/listings/new">
            <Plus className="w-4 h-4" />
            New Listing
          </Link>
        </Button>
      </div>

      <Separator className="bg-border/50" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-border/50" />

      {/* Bottom */}
      <div className="p-4">
        <Link
          href="/listings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all mb-1"
        >
          <TrendingUp className="w-4 h-4" />
          Browse Auctions
        </Link>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}