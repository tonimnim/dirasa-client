"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { DASHBOARD_PATH } from "@/lib/auth/routes";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * "Open dashboard" for a restored session, otherwise "Sign in".
 * `tone="inverted"` is for coloured or dark backgrounds such as the call-to-action band.
 */
export function AuthActions({
  size = "default",
  layout = "row",
  tone = "default",
}: {
  size?: "default" | "lg";
  layout?: "row" | "stacked";
  tone?: "default" | "inverted";
}) {
  const { status } = useAuth();
  const large = size === "lg" ? "h-11 px-5" : undefined;
  const container = layout === "stacked" ? "flex flex-col gap-2" : "flex flex-wrap items-center gap-2";

  if (status === "authenticated") {
    return (
      <div className={container}>
        <Button
          size={size}
          variant={tone === "inverted" ? "secondary" : "default"}
          className={large}
          render={<Link href={DASHBOARD_PATH} />}
          nativeButton={false}
        >
          Open dashboard <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />
        </Button>
      </div>
    );
  }

  return (
    <div className={container}>
      <Button
        size={size}
        variant={tone === "inverted" ? "secondary" : "default"}
        className={large}
        render={<Link href="/login" />}
        nativeButton={false}
      >
        Sign in
        {tone === "inverted" && <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />}
      </Button>
    </div>
  );
}
