import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryBadgeProps {
  category: Pick<Category, "name" | "slug">;
  asLink?: boolean;
  className?: string;
}

export default function CategoryBadge({ category, asLink = true, className }: CategoryBadgeProps) {
  const badge = (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs font-medium bg-secondary/80 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors",
        asLink && "cursor-pointer",
        className
      )}
    >
      {category.name}
    </Badge>
  );

  if (asLink) {
    return <Link href={`/categories/${category.slug}`}>{badge}</Link>;
  }

  return badge;
}