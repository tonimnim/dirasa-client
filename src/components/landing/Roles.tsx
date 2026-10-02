"use client";

import { ROLES, type Role } from "@/components/landing/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, KeyRound } from "lucide-react";

function RolePanel({ role }: { role: Role }) {
  const Icon = role.icon;
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">{role.title}</h3>
        <p className="text-muted-foreground">{role.text}</p>
        <ul className="space-y-2.5">
          {role.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="size-3" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>What a {role.singular} can reach</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Icon className="size-6 text-primary" /> {role.scope}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">{role.scopeText}</CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <KeyRound className="me-1.5 size-3.5" /> Checked by the API on every request
        </CardFooter>
      </Card>
    </div>
  );
}

export function Roles() {
  return (
    <section id="roles" className="scroll-mt-20 border-t bg-muted/30 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Who it's for"
        title="One school, four points of view"
        description="Everyone signs in to the same Dirasa. What they see depends on their role, and the server enforces it."
      />
      <Tabs defaultValue={ROLES[0].value} className="mx-auto mt-12 max-w-5xl items-center gap-8">
        <TabsList className="h-auto flex-wrap">
          {ROLES.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="px-3 py-1.5">
              <Icon data-icon="inline-start" /> {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {ROLES.map((role) => (
          <TabsContent key={role.value} value={role.value} className="w-full">
            <RolePanel role={role} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
