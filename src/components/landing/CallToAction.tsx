import { AuthActions } from "@/components/site/AuthActions";

export function CallToAction() {
  return (
    <section className="px-4 pb-32 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
        <div aria-hidden className="absolute -end-24 -top-24 size-72 rounded-full bg-white/10" />
        <div aria-hidden className="absolute -start-16 -bottom-32 size-80 rounded-full bg-white/5" />
        <div className="relative space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Ready when your school is</h2>
          <p className="mx-auto max-w-xl text-pretty opacity-85">
            Invited by your school? Sign in with the email address it used and your classes, children or records will
            be waiting.
          </p>
          <div className="flex justify-center pt-2">
            <AuthActions size="lg" tone="inverted" />
          </div>
        </div>
      </div>
    </section>
  );
}
