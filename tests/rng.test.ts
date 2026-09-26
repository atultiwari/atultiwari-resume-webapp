import { describe, expect, it } from 'vitest';
import { createRng } from '../src/lib/rng';

describe('createRng', () => {
  it('is deterministic for a given seed', () => {
    const a = createRng(42);
    const b = createRng(42);
    const seqA = Array.from({ length: 5 }, a);
    const seqB = Array.from({ length: 5 }, b);
    expect(seqA).toEqual(seqB);
  });

  it('produces different sequences for different seeds', () => {
    expect(createRng(1)()).not.toEqual(createRng(2)());
  });

  it('returns values in [0, 1)', () => {
    const rng = createRng(7);
    for (let i = 0; i < 1000; i += 1) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
