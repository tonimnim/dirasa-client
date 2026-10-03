export type QueryValue = string | number | boolean | null | undefined;

/** Builds a URL without sending empty filters. Arrays are encoded as repeated query parameters. */
export function withQuery<T extends object>(
  path: string,
  values?: T
): string {
  if (!values) return path;
  const query = new URLSearchParams();
  for (const [key, raw] of Object.entries(values as Record<string, QueryValue | readonly QueryValue[]>)) {
    const items = Array.isArray(raw) ? raw : [raw];
    for (const value of items) {
      if (value !== undefined && value !== null && value !== "") query.append(key, String(value));
    }
  }
  const encoded = query.toString();
  return encoded ? `${path}?${encoded}` : path;
}

export function jsonBody(value: unknown): string {
  return JSON.stringify(value);
}

export function encodePath(value: string): string {
  return encodeURIComponent(value);
}
