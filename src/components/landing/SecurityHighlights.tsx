import { SECURITY } from "@/components/landing/content";
import { SectionHeading } from "@/components/site/SectionHeading";

export function SecurityHighlights() {
  return (
    <section id="security" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Security & safeguarding"
        title="Built for the data schools are trusted with"
        description="Schools hold information about children. Dirasa treats access to it as the core of the product, not an add-on."
      />
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SECURITY.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-card text-primary shadow-xs">
              <Icon className="size-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
