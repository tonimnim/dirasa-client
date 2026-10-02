"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CalendarCheck, Eye, ShieldAlert, Wallet } from "lucide-react";

function StatTile({
  icon: Icon,
  label,
  value,
  progress,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div className="space-y-2 rounded-lg border bg-background/60 p-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <Icon className="size-3.5" />
      </div>
      <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <Progress value={progress} aria-label={label} />
    </div>
  );
}

/** Illustration of the product (made of real UI components, with sample data) for the hero. */
export function HeroPreview() {
  return (
    <div className="relative" role="img" aria-label="Illustration of the Dirasa dashboard with attendance, fees, the current lesson and a student's guardians">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-linear-to-tr from-primary/25 via-teal-400/10 to-transparent blur-3xl"
      />

      <Card className="gap-0 py-0 shadow-2xl" aria-hidden>
        <div className="flex items-center gap-1.5 border-b px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-rose-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
          <span className="ms-3 text-xs text-muted-foreground">Demo School · Today</span>
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
          <StatTile icon={CalendarCheck} label="Attendance today" value="96%" progress={96} />
          <StatTile icon={Wallet} label="Term fees collected" value="82%" progress={82} />

          <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3 sm:col-span-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <BookOpen className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Now · Period 3</p>
              <p className="truncate text-sm font-medium">Grade 7 Mathematics · Room 101</p>
            </div>
            <Badge variant="secondary">28 present</Badge>
          </div>

          <div className="space-y-2.5 rounded-lg border p-3 sm:col-span-2">
            <p className="text-xs font-medium text-muted-foreground">Guardians · Yusuf Hassan, Grade 7</p>
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">AH</AvatarFallback>
              </Avatar>
              <p className="min-w-0 flex-1 truncate text-sm">
                Amina Hassan <span className="text-muted-foreground">· Mother</span>
              </p>
              <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">Verified</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">OH</AvatarFallback>
              </Avatar>
              <p className="min-w-0 flex-1 truncate text-sm">
                Omar Hassan <span className="text-muted-foreground">· Father</span>
              </p>
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <ShieldAlert data-icon="inline-start" /> No collection
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card
        size="sm"
        aria-hidden
        className="absolute -bottom-6 -start-4 hidden w-60 flex-row items-center gap-3 px-3 shadow-xl sm:flex lg:-start-10"
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-300">
          <Eye className="size-4" />
        </div>
        <div className="min-w-0 text-xs">
          <p className="font-medium">Signed in as a teacher</p>
          <p className="text-muted-foreground">Sees Grade 7 Blue only</p>
        </div>
      </Card>
    </div>
  );
}
