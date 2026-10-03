"use client";

import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import { describeApiError } from "@/lib/api/errors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ResourceLoading({ label = "Loading…" }: { label?: string }) {
  return <div role="status" className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground"><Spinner />{label}</div>;
}

export function ResourceError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Could not load this page</AlertTitle>
      <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
        <span>{describeApiError(error)}</span>
        <Button size="sm" variant="outline" onClick={retry}><RefreshCw /> Retry</Button>
      </AlertDescription>
    </Alert>
  );
}

export function ResourceEmpty({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">
      <Inbox className="mb-3 size-8 text-muted-foreground" />
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
