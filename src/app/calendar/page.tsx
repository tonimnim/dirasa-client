"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarCog, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { academicsApi } from "@/lib/api/academics";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";
import type { components } from "@/types/generated/school";

type SchoolDay = components["schemas"]["SchoolDayInfo"];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function monthRange(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const from = new Date(first);
  from.setDate(first.getDate() - first.getDay());
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const to = new Date(last);
  to.setDate(last.getDate() + (6 - last.getDay()));
  return { from: toDateKey(from), to: toDateKey(to) };
}

function readableDayType(day: SchoolDay) {
  if (day.breaks.length) return day.breaks.map((item) => item.displayName).join(", ");
  if (day.overrides.length) return day.overrides.map((item) => item.displayName).join(", ");
  return day.dayType.replaceAll(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

export default function CalendarPage() {
  const { activeTenant, hasPermission } = useAuth();
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const range = useMemo(() => monthRange(month), [month]);
  const resource = useApiResource(
    `${activeTenant?.id}:calendar:${range.from}:${range.to}`,
    () => academicsApi.calendarDays(range),
  );
  const today = toDateKey(new Date());

  const moveMonth = (offset: number) => {
    setMonth((value) => new Date(value.getFullYear(), value.getMonth() + offset, 1));
  };

  return (
    <AppShell
      header={{
        title: "School calendar",
        subtitle: "Evaluated from academic years, terms, working weeks, breaks, and day overrides",
        actionButton: hasPermission("academics.manage") ? (
          <Button render={<Link href="/calendar/new" />}><CalendarCog /> Configure</Button>
        ) : undefined,
      }}
    >
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>{month.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</CardTitle>
              <CardDescription>{resource.data ? `School time zone: ${resource.data.timeZone}` : "Loading the school calendar"}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" aria-label="Previous month" onClick={() => moveMonth(-1)}><ChevronLeft /></Button>
              <Button variant="outline" onClick={() => setMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}>Today</Button>
              <Button variant="outline" size="icon" aria-label="Next month" onClick={() => moveMonth(1)}><ChevronRight /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {resource.loading ? <ResourceLoading label="Evaluating the school calendar…" /> : resource.error || !resource.data ? (
            <ResourceError error={resource.error} retry={() => void resource.reload()} />
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-7 border-x border-t bg-muted/50">
                  {weekdays.map((weekday) => <div key={weekday} className="border-r px-3 py-2 text-xs font-medium text-muted-foreground last:border-r-0">{weekday}</div>)}
                </div>
                <div className="grid grid-cols-7 border-l border-t">
                  {resource.data.days.map((day) => {
                    const date = new Date(`${day.date}T12:00:00`);
                    const inMonth = date.getMonth() === month.getMonth();
                    return (
                      <div key={day.date} className={`min-h-32 border-b border-r p-2 ${inMonth ? "bg-card" : "bg-muted/25 text-muted-foreground"}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`grid size-7 place-items-center rounded-full text-xs font-medium ${day.date === today ? "bg-primary text-primary-foreground" : ""}`}>{date.getDate()}</span>
                          <Badge variant={day.isSchoolDay ? "default" : "secondary"}>{day.isSchoolDay ? "Open" : "Closed"}</Badge>
                        </div>
                        <p className="mt-2 line-clamp-2 text-xs font-medium">{readableDayType(day)}</p>
                        {day.period && <p className="mt-1 truncate text-xs text-muted-foreground">{day.period.displayName}</p>}
                        {day.isSchoolDay && day.start && day.end && <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />{day.start}–{day.end}</p>}
                        {day.deliveryMode && day.deliveryMode !== "inPerson" && <Badge className="mt-2" variant="outline">{day.deliveryMode}</Badge>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
