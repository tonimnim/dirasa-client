"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { DASHBOARD_PATH } from "@/lib/auth/routes";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages } from "lucide-react";

function HeroActions() {
  const { status } = useAuth();
  const arrow = <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />;

  if (status === "authenticated") {
    return (
      <Button size="lg" className="h-11 px-5" render={<Link href={DASHBOARD_PATH} />} nativeButton={false}>
        Open your dashboard {arrow}
      </Button>
    );
  }
  return (
    <>
      <Button size="lg" className="h-11 px-5" render={<Link href="/login" />} nativeButton={false}>
        Sign in to your school {arrow}
      </Button>
      <Button size="lg" variant="outline" className="h-11 px-5" render={<Link href="/#how-it-works" />} nativeButton={false}>
        See how it works
      </Button>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)] bg-size-[56px_56px]"
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
        <div className="space-y-7">
          <Badge variant="outline" className="h-6 gap-1.5 bg-background px-2.5">
            <span lang="ar" dir="rtl" className="font-semibold">
              دراسة
            </span>
            <span className="text-muted-foreground">Arabic for &ldquo;study&rdquo;</span>
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            School management with safeguarding <span className="text-primary">at its core</span>
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            Dirasa brings admissions, classes, attendance, grades and fees together for principals, teachers, parents
            and students. Every record sits behind role-based permissions and custody rules, in English, Arabic,
            French or Swahili.
          </p>
          <div className="flex flex-wrap gap-3">
            <HeroActions />
          </div>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <Languages className="size-4" />
            <span>English</span>·
            <span lang="ar" dir="rtl">
              العربية
            </span>
            ·<span lang="fr">Français</span>·<span lang="sw">Kiswahili</span>
          </p>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}
