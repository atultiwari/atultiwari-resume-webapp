import { describe, expect, it } from 'vitest';
import { formatSpan, linearScale, packRows, placeLabel, toDecimal, yearTicks } from '../src/lib/timeline';

describe('toDecimal', () => {
  it('converts month/year to a decimal year', () => {
    expect(toDecimal({ year: 2020, month: 1 })).toBe(2020);
    expect(toDecimal({ year: 2020, month: 7 })).toBeCloseTo(2020.5);
  });
});

describe('linearScale', () => {
  it('maps a domain onto a range', () => {
    const s = linearScale([2000, 2010], [0, 100]);
    expect(s(2000)).toBe(0);
    expect(s(2005)).toBe(50);
    expect(s(2010)).toBe(100);
  });

  it('rejects an empty domain', () => {
    expect(() => linearScale([1, 1], [0, 1])).toThrow(RangeError);
  });
});

describe('packRows', () => {
  it('puts overlapping intervals on separate rows and reuses free rows', () => {
    const rows = packRows([
      { id: 'a', start: 0, end: 5 },
      { id: 'b', start: 2, end: 4 },
      { id: 'c', start: 6, end: 8 },
    ]);
    expect(rows).toEqual([
      { id: 'a', start: 0, end: 5, row: 0 },
      { id: 'b', start: 2, end: 4, row: 1 },
      { id: 'c', start: 6, end: 8, row: 0 },
    ]);
  });

  it('does not mutate its input', () => {
    const input = Object.freeze([Object.freeze({ id: 'a', start: 3, end: 4 }), Object.freeze({ id: 'b', start: 0, end: 1 })]);
    expect(() => packRows(input)).not.toThrow();
    expect(input[0].id).toBe('a');
  });
});

describe('yearTicks', () => {
  it('returns inclusive ticks on the step', () => {
    expect(yearTicks(2004, 2011, 3)).toEqual([2005, 2008, 2011]);
  });
});

describe('formatSpan', () => {
  it('formats closed and ongoing spans', () => {
    expect(formatSpan({ start: { year: 2022, month: 2 }, end: { year: 2024, month: 3 } })).toBe('Feb 2022 – Mar 2024');
    expect(formatSpan({ start: { year: 2026, month: 2 }, end: null })).toBe('Feb 2026 – now');
  });
});

describe('placeLabel', () => {
  const bounds = { minX: 100, maxX: 900, pad: 8 };

  it('puts the label inside when it fits', () => {
    expect(placeLabel({ x: 200, width: 200, textWidth: 60, ...bounds })).toEqual({ x: 208, anchor: 'start', inside: true });
  });

  it('puts it to the right when there is room', () => {
    expect(placeLabel({ x: 200, width: 30, textWidth: 60, ...bounds })).toEqual({ x: 238, anchor: 'start', inside: false });
  });

  it('falls back to the left near the right edge', () => {
    expect(placeLabel({ x: 860, width: 30, textWidth: 60, ...bounds })).toEqual({ x: 852, anchor: 'end', inside: false });
  });
});
