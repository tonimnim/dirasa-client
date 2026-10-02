"use client";

import Link from "next/link";
import { HEADER_NAV } from "@/config/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AuthActions } from "@/components/site/AuthActions";
import { BrandMark } from "@/components/site/BrandMark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

/** Sticky header of the public site, with a sheet menu on small screens. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <BrandMark />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {HEADER_NAV.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" render={<Link href={link.href} />} nativeButton={false}>
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <ThemeToggle variant="compact" />
          <div className="hidden sm:block">
            <AuthActions />
          </div>

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Dirasa</SheetTitle>
              </SheetHeader>
              <nav aria-label="Main" className="flex flex-col gap-1 px-4">
                {HEADER_NAV.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={<Link href={link.href} />}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <AuthActions layout="stacked" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
