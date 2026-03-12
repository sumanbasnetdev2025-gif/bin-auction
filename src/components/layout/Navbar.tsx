"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  User,
  Gavel,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user, signOut, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/listings?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  const navLinks = [
    { href: "/listings", label: "Browse" },
    { href: "/categories/electronics", label: "Electronics" },
    { href: "/categories/mobiles", label: "Mobiles" },
    { href: "/categories/bikes", label: "Bikes" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: "rgba(18,14,12,0.88)", backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bin-gradient rounded-lg flex items-center justify-center">
              <Gavel className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-800 text-xl tracking-tight">
              <span className="bin-gradient-text">{APP_NAME}</span>
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search auctions..."
                className="pl-9 bg-secondary/50 border-border/50 focus:border-primary/50 h-9"
              />
            </div>
          </form>

          {/* Nav Links - hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <>
                <Button
                  asChild
                  size="sm"
                  className="hidden sm:flex bin-gradient border-0 text-white gap-1.5"
                >
                  <Link href="/listings/new">
                    <Plus className="w-4 h-4" />
                    List Item
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full ring-2 ring-border hover:ring-primary/50 transition-all">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar_url ?? undefined} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                          {getInitials(user?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    style={{
                      width: "13rem",
                      background: "#161210",
                      border: "1px solid #2a2220",
                      borderRadius: "0.75rem",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                      padding: "0.25rem",
                    }}
                  >
                    <div className="px-3 py-2.5">
                      <p className="text-sm font-semibold">{user?.full_name || "User"}</p>
                      <p className="text-xs truncate" style={{ color: "#7a6f6a" }}>{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator style={{ background: "#2a2220" }} />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer" style={{ color: "#e8ddd8" }}>
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer" style={{ color: "#e8ddd8" }}>
                        <User className="w-4 h-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator style={{ background: "#2a2220" }} />
                    <DropdownMenuItem
                      onClick={signOut}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer"
                      style={{ color: "#e74c3c" }}
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild size="sm" className="bin-gradient border-0 text-white">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50"
            style={{
              background: "rgba(18, 14, 12, 0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="px-4 py-4 space-y-2">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search auctions..."
                    className="pl-9 bg-secondary/50"
                  />
                </div>
              </form>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  href="/listings/new"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-primary font-medium"
                >
                  <Plus className="w-4 h-4" /> List an Item
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}