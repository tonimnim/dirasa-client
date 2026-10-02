import React from "react";
import type { LucideIcon } from "lucide-react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

/** Outcome screen inside an AuthShell: success, an unusable link, an outage. Actions go in `children`. */
export function AuthStatus({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Empty className="p-0 md:p-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle role="heading" aria-level={1} className="text-xl font-bold">
          {title}
        </EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children && (
        <EmptyContent>
          <div className="flex w-full flex-col gap-2">{children}</div>
        </EmptyContent>
      )}
    </Empty>
  );
}
