import { LucideIcon } from "lucide-react";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  icon: Icon = Package,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-secondary/60 border border-border flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm max-w-sm mb-6">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Button asChild size="sm" className="bin-gradient border-0 text-white">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}