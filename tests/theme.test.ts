import { describe, expect, it } from 'vitest';
import { readStoredTheme, resolveTheme, writeStoredTheme } from '../src/lib/theme';

const memoryStorage = (initial: Record<string, string> = {}) => {
  let data = { ...initial };
  return {
    getItem: (k: string) => data[k] ?? null,
    setItem: (k: string, v: string) => {
      data = { ...data, [k]: v };
    },
  };
};

const throwingStorage = {
  getItem: () => {
    throw new Error('blocked');
  },
  setItem: () => {
    throw new Error('blocked');
  },
};

describe('theme storage', () => {
  it('reads a valid stored theme', () => {
    expect(readStoredTheme(memoryStorage({ theme: 'dark' }))).toBe('dark');
  });

  it('ignores invalid values', () => {
    expect(readStoredTheme(memoryStorage({ theme: 'purple' }))).toBeNull();
  });

  it('survives storage that throws', () => {
    expect(readStoredTheme(throwingStorage)).toBeNull();
    expect(writeStoredTheme(throwingStorage, 'light')).toBe(false);
  });

  it('writes a theme', () => {
    const s = memoryStorage();
    expect(writeStoredTheme(s, 'light')).toBe(true);
    expect(readStoredTheme(s)).toBe('light');
  });
});

describe('resolveTheme', () => {
  it('prefers the stored choice, then the system preference', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
  });
});
