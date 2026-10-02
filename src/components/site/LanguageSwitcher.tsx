"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";

/** Same choices as the app header: the document language drives direction and the API's Accept-Language. */
const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
] as const;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  return () => observer.disconnect();
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const lang = useSyncExternalStore(
    subscribe,
    () => document.documentElement.lang || "en",
    () => "en"
  );
  const current = LANGUAGES.find((language) => language.code === lang) ?? LANGUAGES[0];

  const choose = (code: string) => {
    const language = LANGUAGES.find((candidate) => candidate.code === code);
    if (!language) return;
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm" className={cn("gap-1.5", className)} aria-label="Change language" />}
      >
        <Globe data-icon="inline-start" />
        <span lang={current.code}>{current.label}</span>
        <ChevronDown data-icon="inline-end" className="opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={current.code} onValueChange={(value) => choose(String(value))}>
            {LANGUAGES.map((language) => (
              <DropdownMenuRadioItem key={language.code} value={language.code} lang={language.code} closeOnClick>
                {language.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
