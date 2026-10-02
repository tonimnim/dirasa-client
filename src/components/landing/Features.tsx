"use client";

import { FEATURES, type Feature } from "@/components/landing/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCard({ feature }: { feature: Feature }) {
  const { id, icon: Icon, title, description, tags } = feature;
  return (
    <Card id={id} className="scroll-mt-24 transition-shadow hover:shadow-md target:ring-2 target:ring-primary">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <CardTitle role="heading" aria-level={3} className="text-base font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Features"
        title="Everything a school runs on"
        description="From the first application to the last report card, every part of the school year works from the same records."
      />
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
