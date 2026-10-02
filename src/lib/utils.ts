export { cn } from "cn";

/**
 * Formats an ISO date string (YYYY-MM-DD) into a localized friendly date.
 */
export function formatDate(dateString?: string | null, locale = "en"): string {
  if (!dateString) return "—";
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Formats currency amount using exact minor units.
 */
export function formatCurrency(
  amount: number | string,
  currency = "USD",
  locale = "en"
): string {
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return "—";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  } catch {
    return `${currency} ${numericAmount.toFixed(2)}`;
  }
}

/**
 * Extracts the appropriate string from a LocalizedText object (e.g. { en: "Math", ar: "رياضيات" }).
 */
export function getLocalizedText(
  textObj?: Record<string, string> | null,
  preferredCulture = "en"
): string {
  if (!textObj) return "";
  if (textObj[preferredCulture]) return textObj[preferredCulture];
  if (textObj["en"]) return textObj["en"];
  const firstKey = Object.keys(textObj)[0];
  return firstKey ? textObj[firstKey] : "";
}
