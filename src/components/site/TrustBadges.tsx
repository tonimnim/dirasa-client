import { Globe, KeyRound, Languages, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_BADGES = [
  { icon: KeyRound, label: "Role-based access" },
  { icon: ScrollText, label: "Audit trail" },
  { icon: Globe, label: "Data hosted in region" },
  { icon: Languages, label: "Arabic & right-to-left ready" },
];

/** Pills summarising Dirasa's safeguards, styled for the dark navy brand surfaces (footer, sign-in showcase). */
export function TrustBadges({ className }: { className?: string }) {
  return (
    <ul aria-label="Why schools trust Dirasa" className={cn("flex flex-wrap gap-2", className)}>
      {TRUST_BADGES.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
        >
          <Icon className="size-3.5 text-sky-400" /> {label}
        </li>
      ))}
    </ul>
  );
}
