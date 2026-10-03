"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SummaryCard({ label, value, href, detail }: { label: string; value: number | string | null | undefined; href?: string; detail?: string }) {
  const card = <Card className="h-full transition hover:ring-primary/30"><CardContent className="space-y-1"><p className="text-sm text-muted-foreground">{label}</p><p className="text-2xl font-semibold">{value ?? "—"}</p>{detail && <p className="text-xs text-muted-foreground">{detail}</p>}</CardContent></Card>;
  return href ? <Link href={href}>{card}</Link> : card;
}

export function DashboardSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle>{description && <CardDescription>{description}</CardDescription>}</CardHeader><CardContent>{children}</CardContent></Card>;
}

export function TaskLink({ href, title, description }: { href: string; title: string; description: string }) {
  return <Link href={href} className="flex items-center justify-between gap-4 rounded-lg border p-4 transition hover:border-primary/40 hover:bg-muted/30"><span><span className="block font-medium">{title}</span><span className="mt-1 block text-sm text-muted-foreground">{description}</span></span><ArrowUpRight className="size-4 shrink-0 text-muted-foreground" /></Link>;
}

export function formatSchoolDay(dayType: string) {
  return dayType.replaceAll(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
