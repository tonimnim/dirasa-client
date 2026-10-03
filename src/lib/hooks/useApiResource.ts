"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface ApiResource<T> {
  data: T | null;
  error: unknown;
  loading: boolean;
  reload: () => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

/** Loads one API resource and ignores stale responses after its key changes. */
export function useApiResource<T>(key: string, loader: () => Promise<T>): ApiResource<T> {
  const loaderRef = useRef(loader);
  const requestRef = useRef(0);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const request = ++requestRef.current;
    setLoading(true);
    setError(null);
    try {
      const next = await loaderRef.current();
      if (request === requestRef.current) setData(next);
    } catch (cause) {
      if (request === requestRef.current) setError(cause);
    } finally {
      if (request === requestRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loaderRef.current = loader;
  }, [loader]);

  useEffect(() => {
    const timer = window.setTimeout(() => void reload(), 0);
    return () => {
      window.clearTimeout(timer);
      requestRef.current += 1;
    };
  }, [key, reload]);

  return { data, error, loading, reload, setData };
}
