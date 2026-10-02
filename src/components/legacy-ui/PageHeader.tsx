import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  backHref?: string;
  onBack?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  badge,
  actions,
  backHref,
  onBack,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 transition-colors",
        className
      )}
    >
      {/* Breadcrumbs Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumbs" className="mb-2.5 flex items-center gap-1.5 text-xs">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                )}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="font-medium text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "font-semibold",
                      isLast
                        ? "text-slate-950 dark:text-slate-100"
                        : "text-slate-700 dark:text-slate-400"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      {/* Main Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          {/* Optional Back Button */}
          {backHref ? (
            <Link
              href={backHref}
              className="mt-0.5 inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-sm"
              title="Go back"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          ) : onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="mt-0.5 inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-sm cursor-pointer"
              title="Go back"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : null}

          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                {title}
              </h1>
              {badge && <div className="shrink-0">{badge}</div>}
            </div>
            {subtitle && (
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {actions && (
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {actions}
          </div>
        )}
      </div>

      {/* Children slot for tabs, search, or filters */}
      {children && <div className="mt-4">{children}</div>}
    </header>
  );
}
