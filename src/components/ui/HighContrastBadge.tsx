import React from "react";
import { cn } from "@/lib/utils";

export type HighContrastBadgeVariant =
  | "default"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "error"
  | "info"
  | "purple";

export type HighContrastBadgeSize = "sm" | "md" | "lg";

export interface HighContrastBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: HighContrastBadgeVariant;
  size?: HighContrastBadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
}

export function HighContrastBadge({
  variant = "default",
  size = "md",
  dot = false,
  icon,
  className,
  children,
  ...props
}: HighContrastBadgeProps) {
  // WCAG AAA (contrast ratio > 7:1 in both light and dark modes)
  const variantStyles: Record<
    HighContrastBadgeVariant,
    { badge: string; dot: string }
  > = {
    default: {
      badge:
        "bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white border-slate-300 dark:border-slate-700",
      dot: "bg-slate-700 dark:bg-slate-300",
    },
    neutral: {
      badge:
        "bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white border-slate-300 dark:border-slate-700",
      dot: "bg-slate-700 dark:bg-slate-300",
    },
    success: {
      badge:
        "bg-emerald-50 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700",
      dot: "bg-emerald-600 dark:bg-emerald-400",
    },
    warning: {
      badge:
        "bg-amber-50 dark:bg-amber-950 text-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-700",
      dot: "bg-amber-600 dark:bg-amber-400",
    },
    danger: {
      badge:
        "bg-rose-50 dark:bg-rose-950 text-rose-950 dark:text-rose-200 border-rose-300 dark:border-rose-700",
      dot: "bg-rose-600 dark:bg-rose-400",
    },
    error: {
      badge:
        "bg-rose-50 dark:bg-rose-950 text-rose-950 dark:text-rose-200 border-rose-300 dark:border-rose-700",
      dot: "bg-rose-600 dark:bg-rose-400",
    },
    info: {
      badge:
        "bg-sky-50 dark:bg-sky-950 text-sky-950 dark:text-sky-200 border-sky-300 dark:border-sky-700",
      dot: "bg-sky-600 dark:bg-sky-400",
    },
    purple: {
      badge:
        "bg-indigo-50 dark:bg-indigo-950 text-indigo-950 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700",
      dot: "bg-indigo-600 dark:bg-indigo-400",
    },
  };

  const sizeStyles: Record<
    HighContrastBadgeSize,
    { badge: string; dot: string }
  > = {
    sm: {
      badge: "px-2 py-0.5 text-[11px] gap-1",
      dot: "h-1.5 w-1.5",
    },
    md: {
      badge: "px-2.5 py-0.5 text-xs gap-1.5",
      dot: "h-2 w-2",
    },
    lg: {
      badge: "px-3 py-1 text-sm gap-2",
      dot: "h-2.5 w-2.5",
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;
  const selectedSize = sizeStyles[size] || sizeStyles.md;

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full border shadow-xs transition-colors shrink-0",
        selectedVariant.badge,
        selectedSize.badge,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("rounded-full shrink-0", selectedVariant.dot, selectedSize.dot)}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
