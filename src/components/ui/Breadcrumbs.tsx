import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export function Breadcrumbs({ items, className, showHomeIcon = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400", className)}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden="true" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 rounded px-1 -mx-1 cursor-pointer flex items-center gap-1"
              >
                {idx === 0 && showHomeIcon && <Home className="h-3 w-3 shrink-0" aria-hidden="true" />}
                <span className="truncate max-w-[180px] sm:max-w-none">{item.label}</span>
              </Link>
            ) : (
              <span
                className={cn(
                  "truncate max-w-[180px] sm:max-w-none",
                  isLast
                    ? "font-semibold text-slate-900 dark:text-slate-100"
                    : "text-slate-500 dark:text-slate-400"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {idx === 0 && showHomeIcon && <Home className="h-3 w-3 inline mr-1 shrink-0" aria-hidden="true" />}
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
