"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reads the values of an emailed link (`/reset-password#uid=…&token=…`, `/accept-invitation#tenant=…&token=…`)
 * from the URL fragment, then removes them from the address bar and history before anything else runs.
 * Returns null until the fragment has been read on the client.
 */
export function useEmailLinkParams(): URLSearchParams | null {
  const [params, setParams] = useState<URLSearchParams | null>(null);
  // Survives React's development double-invocation of effects, which would otherwise read the stripped URL.
  const taken = useRef<URLSearchParams | null>(null);

  useEffect(() => {
    if (!taken.current) {
      taken.current = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      if (window.location.hash) {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
      }
    }
    setParams(taken.current);
  }, []);

  return params;
}
