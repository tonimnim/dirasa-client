import Link from "next/link";
import { cn } from "@/lib/utils";

/** The Dirasa logo: the "D" tile and the wordmark, linking home. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex w-fit items-center gap-2 rounded-lg text-lg font-bold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-base font-black text-primary-foreground">
        D
      </span>
      Dirasa
    </Link>
  );
}
