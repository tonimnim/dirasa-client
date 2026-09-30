import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

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
    <html lang="en" dir="ltr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
