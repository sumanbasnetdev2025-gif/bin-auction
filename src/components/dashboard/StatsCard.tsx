import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-5 space-y-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{title}</p>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <p className="font-display font-bold text-3xl">{value}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}