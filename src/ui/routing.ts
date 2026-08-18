import type { AppPath } from "../data/catalog";

export function resolveAppHref(path: AppPath, base = import.meta.env.BASE_URL) {
  const normalizedBase = base === "/" ? "" : base.replace(/\/$/, "");
  return `${normalizedBase}${path}`;
}
