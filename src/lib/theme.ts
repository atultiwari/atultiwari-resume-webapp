export type Theme = 'light' | 'dark';

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const KEY = 'theme';

/** Storage can throw (private mode, blocked cookies) — treat that as "no preference". */
export function readStoredTheme(store: KeyValueStore): Theme | null {
  try {
    const v = store.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function writeStoredTheme(store: KeyValueStore, theme: Theme): boolean {
  try {
    store.setItem(KEY, theme);
    return true;
  } catch {
    return false;
  }
}

export function resolveTheme(stored: Theme | null, prefersDark: boolean): Theme {
  return stored ?? (prefersDark ? 'dark' : 'light');
}
