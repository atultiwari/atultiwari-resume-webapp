import { describe, expect, it } from 'vitest';
import { scatterErythrocytes, topPrediction, type FieldSpec } from '../src/lib/cellField';

const spec: FieldSpec = {
  cx: 300,
  cy: 300,
  radius: 280,
  seed: 11,
  count: 40,
  minR: 14,
  maxR: 18,
  leukocytes: [{ x: 300, y: 300, r: 30 }],
};

const dist = (ax: number, ay: number, bx: number, by: number) => Math.hypot(ax - bx, ay - by);

describe('scatterErythrocytes', () => {
  const cells = scatterErythrocytes(spec);

  it('is deterministic', () => {
    expect(scatterErythrocytes(spec)).toEqual(cells);
  });

  it('places up to the requested number of cells', () => {
    expect(cells.length).toBeGreaterThan(20);
    expect(cells.length).toBeLessThanOrEqual(spec.count);
  });

  it('keeps every cell inside the field of view', () => {
    for (const c of cells) {
      expect(dist(c.x, c.y, spec.cx, spec.cy) + c.r).toBeLessThanOrEqual(spec.radius);
    }
  });

  it('never overlaps a leukocyte', () => {
    const [w] = spec.leukocytes;
    for (const c of cells) {
      expect(dist(c.x, c.y, w.x, w.y)).toBeGreaterThan(c.r + w.r);
    }
  });

  it('keeps radii within bounds', () => {
    for (const c of cells) {
      expect(c.r).toBeGreaterThanOrEqual(spec.minR);
      expect(c.r).toBeLessThanOrEqual(spec.maxR);
    }
  });

  it('returns an empty list when nothing fits', () => {
    expect(scatterErythrocytes({ ...spec, radius: 10 })).toEqual([]);
  });

  it('rejects invalid specs', () => {
    expect(() => scatterErythrocytes({ ...spec, count: -1 })).toThrow(RangeError);
    expect(() => scatterErythrocytes({ ...spec, minR: 20, maxR: 10 })).toThrow(RangeError);
  });
});

describe('topPrediction', () => {
  it('picks the highest-probability class', () => {
    expect(topPrediction({ neutrophil: 0.1, lymphocyte: 0.8, monocyte: 0.05, eosinophil: 0.05 })).toEqual({
      kind: 'lymphocyte',
      p: 0.8,
    });
  });
});
