"use client";

import type { ReactNode } from "react";
import { AppHeader, type AppHeaderProps } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function AppShell({ children, header }: { children: ReactNode; header?: AppHeaderProps }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <AppHeader {...header} />
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
