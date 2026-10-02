import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INFO_PAGES } from "@/config/site";
import { InfoPage } from "@/components/site/InfoPage";

// Only the pages listed in INFO_PAGES exist; any other top-level path is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return INFO_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = INFO_PAGES.find((candidate) => candidate.slug === slug);
  if (!page) return {};
  // Placeholders stay out of search results until their content is published.
  return { title: `${page.title} — Dirasa`, description: page.summary, robots: { index: false } };
}

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = INFO_PAGES.find((candidate) => candidate.slug === slug);
  if (!page) notFound();
  return <InfoPage page={page} />;
}
