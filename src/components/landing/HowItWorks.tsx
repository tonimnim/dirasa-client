import { STEPS } from "@/components/landing/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t bg-muted/30 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="How it works"
        title="From sign-up to the first register"
        description="Three steps, and your staff and families do most of the second one themselves."
      />
      <ol className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <Card className="h-full">
              <CardHeader>
                <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <CardTitle role="heading" aria-level={3} className="text-base font-semibold">
                  {step.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">{step.text}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}
