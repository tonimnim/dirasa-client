import { FACTS } from "@/components/landing/content";

export function KeyFacts() {
  return (
    <section aria-label="Key facts" className="border-y bg-muted/40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {FACTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
