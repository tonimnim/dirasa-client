/**
 * Site-wide marketing configuration: navigation, footer links, contact details and the informational pages.
 * Components read from here, so adding a link or a social account never means touching markup.
 */

export interface SiteLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: SiteLink[];
}

export type SocialNetwork = "linkedin" | "x" | "facebook" | "youtube";

export const SITE = {
  name: "Dirasa",
  /** Shown in the footer's brand block. */
  statement: { lead: "Every child known.", trail: "Every record protected." },
  description:
    "School management for principals, teachers, parents and students, with role-based access, custody rules and data kept in your region.",
  /** Rendered in the footer only when set. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
  },
};

/** Add the company's accounts here; the footer shows an icon for each one. */
export const SOCIAL_LINKS: { network: SocialNetwork; href: string }[] = [];

/** Header navigation (sections of the landing page). */
export const HEADER_NAV: SiteLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Who it's for", href: "/#roles" },
  { label: "Security", href: "/#security" },
  { label: "FAQ", href: "/#faq" },
];

export const FOOTER_NAV: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Who it's for", href: "/#roles" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Students & guardians", href: "/#students-guardians" },
      { label: "Academics & timetables", href: "/#academics-timetables" },
      { label: "Attendance & grades", href: "/#attendance-grades" },
      { label: "Fees & invoicing", href: "/#fees-invoicing" },
      { label: "Admissions", href: "/#admissions" },
      { label: "Staff & payroll", href: "/#staff-payroll" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Accept an invitation", href: "/accept-invitation" },
      { label: "Reset your password", href: "/forgot-password" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Dirasa", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Security & safeguarding", href: "/#security" },
      { label: "Responsible disclosure", href: "/responsible-disclosure" },
    ],
  },
];

/** The legal strip at the bottom of every marketing page. */
export const LEGAL_LINKS: SiteLink[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
];

export interface InfoPageEntry {
  slug: string;
  section: "Company" | "Legal" | "Security";
  title: string;
  /** What the page will cover; also the meta description. */
  summary: string;
}

/**
 * Pages linked from the footer whose content is still being written. Each is served by
 * `src/app/(site)/[slug]` with an honest "being prepared" notice until real content replaces it.
 */
export const INFO_PAGES: InfoPageEntry[] = [
  {
    slug: "about",
    section: "Company",
    title: "About Dirasa",
    summary:
      "Dirasa (دراسة, Arabic for “study”) is school management for principals, teachers, parents and students.",
  },
  {
    slug: "contact",
    section: "Company",
    title: "Contact",
    summary: "How to reach the Dirasa team about sales, support and partnerships.",
  },
  {
    slug: "responsible-disclosure",
    section: "Security",
    title: "Responsible disclosure",
    summary: "How to report a security vulnerability in Dirasa, and what you can expect from us in return.",
  },
  {
    slug: "privacy",
    section: "Legal",
    title: "Privacy policy",
    summary: "What personal data Dirasa processes on behalf of schools, why, where it is stored and for how long.",
  },
  {
    slug: "terms",
    section: "Legal",
    title: "Terms of service",
    summary: "The terms that govern schools' and users' use of Dirasa.",
  },
  {
    slug: "cookies",
    section: "Legal",
    title: "Cookie policy",
    summary: "The cookies Dirasa sets, what each one is for and how long it lasts.",
  },
  {
    slug: "accessibility",
    section: "Legal",
    title: "Accessibility",
    summary: "Our accessibility commitments, the standards we test against and how to report a barrier.",
  },
];
