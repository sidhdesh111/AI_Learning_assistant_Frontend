/**
 * VITE_BASE_URL is often set with a trailing slash; API paths start with "/".
 * Concatenating them yields "//uploads/..." which Express treats as "route not found".
 */
export function normalizeApiBaseUrl(raw: string | undefined): string {
  if (!raw) return "";
  return raw.trim().replace(/\/+$/u, "");
}
