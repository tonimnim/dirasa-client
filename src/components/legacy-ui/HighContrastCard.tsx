import React from "react";
import { cn } from "@/lib/utils";

export interface HighContrastCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function HighContrastCard({
  className,
  hoverable = false,
  children,
  ...props
}: HighContrastCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs transition-all overflow-hidden",
        hoverable &&
          "hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-shadow cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function HighContrastCardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function HighContrastCardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function HighContrastCardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mt-1",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function HighContrastCardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function HighContrastCardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-6 py-3.5 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
