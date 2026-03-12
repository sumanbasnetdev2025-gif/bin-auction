import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format, isPast, differenceInSeconds } from "date-fns";
import { CURRENCY_SYMBOL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `${CURRENCY_SYMBOL} ${new Intl.NumberFormat("ne-NP").format(amount)}`;
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy");
}

export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
}

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function isAuctionEnded(endTime: string): boolean {
  return isPast(new Date(endTime));
}

export function getTimeRemaining(endTime: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  isEnded: boolean;
} {
  const total = differenceInSeconds(new Date(endTime), new Date());

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, isEnded: true };
  }

  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return { days, hours, minutes, seconds, total, isEnded: false };
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarUrl(url: string | null): string {
  return url || `https://api.dicebear.com/7.x/initials/svg?seed=${Math.random()}`;
}

export function calculateMinBid(currentHighestBid: number | null, startingPrice: number): number {
  const base = currentHighestBid ?? startingPrice;
  // Minimum increment: 5% or 50 NPR, whichever is greater
  const increment = Math.max(Math.ceil(base * 0.05), 50);
  return base + increment;
}