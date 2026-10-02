"use client";

import React from "react";
import Link from "next/link";
import { LEGAL_LINKS, SITE } from "@/config/site";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { BrandMark } from "@/components/site/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * Split-screen frame for every authentication screen: sign-in, password reset, invitations and the session
 * gate. The form column holds the page's content; the brand showcase appears beside it on large screens.
 */
export function AuthShell({
  title,
  description,
  children,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="flex min-w-0 flex-col bg-background px-6 py-6 sm:px-10">
        <header className="flex items-center justify-between gap-3">
          <BrandMark />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false}>
              <ArrowLeft data-icon="inline-start" className="rtl:rotate-180" /> Website
            </Button>
            <ThemeToggle variant="compact" />
          </div>
        </header>

        <main id="main" className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm space-y-6">
            {(title || description) && (
              <div className="space-y-1.5">
                {title && <h1 className="text-2xl font-bold tracking-tight text-balance">{title}</h1>}
                {description && <p className="text-sm text-pretty text-muted-foreground">{description}</p>}
              </div>
            )}
            {children}
          </div>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {LEGAL_LINKS.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </div>

      <AuthShowcase />
    </div>
  );
}

function AuthShowcase() {
  return (
    <aside
      aria-label="About Dirasa"
      className="relative isolate hidden min-w-0 flex-col overflow-hidden bg-[#0d1527] p-10 text-slate-300 lg:flex xl:p-14"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_top_right,black_25%,transparent_75%)] bg-size-[48px_48px]"
      />
      <div aria-hidden className="absolute -end-32 -top-32 -z-10 size-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="my-auto space-y-12">
        <p className="max-w-md text-4xl leading-tight font-bold tracking-tight text-balance text-white">
          {SITE.statement.lead} <span className="text-slate-400">{SITE.statement.trail}</span>
        </p>
        <div className="max-w-md ps-6">
          <HeroPreview />
        </div>
      </div>
    </aside>
  );
}
