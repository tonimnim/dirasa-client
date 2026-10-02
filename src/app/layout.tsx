import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";
import { AuthGate } from "@/components/auth/AuthGate";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Dirasa — School Management System",
  description: "Enterprise Multi-Tenant School Information & Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={cn("h-full antialiased", "font-sans", geist.variable)} suppressHydrationWarning>
      {/* Browser extensions add attributes to <body> before React hydrates; ignore those (this element only). */}
      <body
        className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <AuthGate>{children}</AuthGate>
          </AuthProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
