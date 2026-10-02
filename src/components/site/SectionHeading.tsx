/** Centered eyebrow, title and lead paragraph that opens each landing section. */
export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl space-y-3 text-center">
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
      <p className="text-pretty text-muted-foreground">{description}</p>
    </div>
  );
}
