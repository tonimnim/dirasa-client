import Link from "next/link";
import type { InfoPageEntry } from "@/config/site";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";

/** Shell for footer pages whose content is still being written (privacy, terms, about, …). */
export function InfoPage({ page }: { page: InfoPageEntry }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main id="main" className="flex-1 px-4 py-20 sm:px-6">
        <article className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm font-semibold text-primary">{page.section}</p>
          <h1 className="text-4xl font-bold tracking-tight text-balance">{page.title}</h1>
          <p className="text-lg text-pretty text-muted-foreground">{page.summary}</p>
          <Alert>
            <Clock />
            <AlertTitle>This page is being prepared</AlertTitle>
            <AlertDescription>
              We&apos;re finalising it and will publish it before launch. If your school already uses Dirasa, your
              school administrator can help in the meantime.
            </AlertDescription>
          </Alert>
          <Button variant="outline" render={<Link href="/" />} nativeButton={false}>
            <ArrowLeft data-icon="inline-start" className="rtl:rotate-180" /> Back to home
          </Button>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
