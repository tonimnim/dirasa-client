import Link from "next/link";
import { FOOTER_NAV, LEGAL_LINKS, SITE } from "@/config/site";
import { BrandMark } from "@/components/site/BrandMark";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { SocialLinks } from "@/components/site/SocialLinks";
import { TrustBadges } from "@/components/site/TrustBadges";
import { Mail, MapPin, Phone } from "lucide-react";

const linkClass =
  "inline-flex min-h-8 items-center rounded-sm text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400";

/**
 * Footer of the public site: brand statement, grouped navigation, trust badges, language, contact and the
 * legal strip. Links, social accounts and contact details come from `src/config/site.ts`.
 */
export function SiteFooter() {
  const { contact, statement, description } = SITE;
  const hasContact = Boolean(contact.email || contact.phone || contact.address);

  return (
    <footer className="relative isolate mt-auto overflow-hidden bg-[#0d1527] text-slate-300">
      {/* Concave top edge, cut out of the band in the page colour. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-8 w-full fill-background sm:h-14"
      >
        <path d="M0 0H1440Q720 96 0 0Z" />
      </svg>

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-8 sm:px-6 sm:pt-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <BrandMark className="text-white" />
            <p className="text-2xl font-bold leading-tight tracking-tight text-balance text-white">
              {statement.lead} <span className="text-slate-400">{statement.trail}</span>
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">{description}</p>
            <SocialLinks className="text-slate-300" />
            {hasContact && (
              <address className="space-y-2 text-sm not-italic">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className={`${linkClass} gap-2`}>
                    <Mail className="size-4 text-sky-400" /> {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className={`${linkClass} gap-2`}>
                    <Phone className="size-4 text-sky-400" /> {contact.phone}
                  </a>
                )}
                {contact.address && (
                  <p className="flex items-start gap-2 text-slate-400">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-sky-400" /> {contact.address}
                  </p>
                )}
              </address>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_NAV.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-semibold tracking-[0.14em] text-slate-400 uppercase">{group.title}</h2>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <TrustBadges />
          <LanguageSwitcher className="w-fit border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white dark:border-white/15 dark:bg-white/5" />
        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Built for schools.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${linkClass} text-xs text-slate-400`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge. */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] text-center text-[clamp(6rem,24vw,20rem)] leading-none font-black tracking-tighter text-white/[0.04] select-none"
      >
        {SITE.name}
      </p>
    </footer>
  );
}
