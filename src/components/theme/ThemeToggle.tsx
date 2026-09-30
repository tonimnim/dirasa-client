"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, Theme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
  variant?: "segmented" | "compact";
}

export function ThemeToggle({
  className,
  size = "sm",
  variant = "segmented",
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by rendering a matching placeholder skeleton before mount
  if (!mounted) {
    if (variant === "compact") {
      return (
        <div
          className={cn(
            "rounded-lg bg-slate-800/60 border border-slate-700/50 animate-pulse",
            size === "sm" ? "h-7 w-7" : "h-9 w-9",
            className
          )}
          aria-hidden="true"
        />
      );
    }
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-lg bg-slate-800/60 border border-slate-700/50 p-0.5",
          size === "sm" ? "h-7" : "h-9",
          className
        )}
        aria-hidden="true"
      >
        <div className={cn(size === "sm" ? "w-18 h-5" : "w-24 h-7")} />
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-all cursor-pointer",
          "border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
          size === "sm" ? "h-7 w-7" : "h-9 w-9",
          className
        )}
        title={`Current theme: ${theme} (click to toggle)`}
        aria-label={`Toggle theme (current: ${theme})`}
      >
        {theme === "system" ? (
          <Monitor className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        ) : resolvedTheme === "dark" ? (
          <Moon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        ) : (
          <Sun className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        )}
      </button>
    );
  }

  const options: Array<{ value: Theme; label: string; icon: React.ElementType }> = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className={cn(
        "inline-flex items-center rounded-lg p-0.5 transition-colors",
        "bg-slate-800/90 border border-slate-700/80 shadow-sm",
        size === "sm" ? "gap-0.5" : "gap-1",
        className
      )}
    >
      {options.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(value)}
            title={`${label} theme`}
            className={cn(
              "flex items-center justify-center rounded-md font-medium transition-all cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400",
              size === "sm" ? "h-6 w-6" : "h-7 w-7",
              isActive
                ? "bg-slate-700 text-sky-400 border border-slate-600 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 border border-transparent"
            )}
          >
            <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
            <span className="sr-only">{label} theme</span>
          </button>
        );
      })}
    </div>
  );
}
