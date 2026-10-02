import type { Metadata } from "next";
import { CallToAction } from "@/components/landing/CallToAction";
import { Faq } from "@/components/landing/Faq";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { KeyFacts } from "@/components/landing/KeyFacts";
import { Roles } from "@/components/landing/Roles";
import { SecurityHighlights } from "@/components/landing/SecurityHighlights";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Dirasa — School management with safeguarding at its core",
  description:
    "Admissions, classes, attendance, grades and fees for principals, teachers, parents and students, with role-based permissions and custody rules, in English, Arabic, French and Swahili.",
};

/** Public landing page. The signed-in app starts at /dashboard. */
export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <KeyFacts />
        <Features />
        <Roles />
        <SecurityHighlights />
        <HowItWorks />
        <Faq />
        <CallToAction />
      </main>
      <SiteFooter />
    </div>
  );
}
