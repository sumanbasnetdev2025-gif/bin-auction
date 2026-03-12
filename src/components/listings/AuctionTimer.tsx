"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

interface AuctionTimerProps {
  endTime: string;
  variant?: "card" | "detail";
  className?: string;
}

export default function AuctionTimer({ endTime, variant = "card", className }: AuctionTimerProps) {
  const { days, hours, minutes, seconds, isEnded } = useCountdown(endTime);

  if (isEnded) {
    return (
      <span
        className={cn(
          "font-mono font-semibold text-muted-foreground",
          variant === "card" ? "text-xs" : "text-sm",
          className
        )}
      >
        Auction Ended
      </span>
    );
  }

  const isUrgent = days === 0 && hours < 2;

  if (variant === "card") {
    return (
      <span
        className={cn(
          "font-mono text-xs font-semibold tabular-nums",
          isUrgent ? "text-primary animate-pulse" : "text-muted-foreground",
          className
        )}
      >
        {days > 0 ? `${days}d ${hours}h` : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
      </span>
    );
  }

  // Detail variant — shows big blocks
  const blocks = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-2">
          <div
            className={cn(
              "flex flex-col items-center justify-center w-14 h-14 rounded-xl border font-mono",
              isUrgent
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-secondary/60 border-border text-foreground"
            )}
          >
            <span className="text-xl font-bold tabular-nums leading-none">
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
              {block.label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span className={cn("font-bold text-lg", isUrgent ? "text-primary" : "text-muted-foreground")}>
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}