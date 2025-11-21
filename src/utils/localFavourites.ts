const isBrowser = typeof window !== "undefined";

function readStringArray(key: string): string[] {
  if (!isBrowser) return [];

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((x) => typeof x === "string");
  } catch {
    return [];
  }
}

function writeStringArray(key: string, values: string[]) {
  if (!isBrowser) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(values));
  } catch {
    // Ignore storage errors (quota, private mode, etc)
  }
}

export function getFavouriteIds(key: string): string[] {
  return readStringArray(key);
}

export function isFavourite(key: string, id: string): boolean {
  return getFavouriteIds(key).includes(id);
}

export function toggleFavourite(key: string, id: string): string[] {
  const current = getFavouriteIds(key);
  const exists = current.includes(id);
  const next = exists
    ? current.filter((x) => x !== id)
    : [...current, id];
  writeStringArray(key, next);
  return next;
}

export const FAV_ROUTES_KEY = "solo-planner:favourite-routes";
export const FAV_PARTS_KEY = "solo-planner:favourite-parts";

