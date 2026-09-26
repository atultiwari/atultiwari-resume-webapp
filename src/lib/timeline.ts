import type { MonthYear, Span } from '../data/types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export function toDecimal({ year, month }: MonthYear): number {
  return year + (month - 1) / 12;
}

export function formatMonthYear({ year, month }: MonthYear): string {
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatSpan({ start, end }: Span): string {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : 'now'}`;
}

export function linearScale(
  [d0, d1]: readonly [number, number],
  [r0, r1]: readonly [number, number],
): (v: number) => number {
  if (d0 === d1) throw new RangeError('domain must not be empty');
  const k = (r1 - r0) / (d1 - d0);
  return (v) => r0 + (v - d0) * k;
}

export interface Interval {
  readonly id: string;
  readonly start: number;
  readonly end: number;
}

/** Greedy interval packing: each interval gets the lowest row that's free when it starts. */
export function packRows<T extends Interval>(items: readonly T[]): readonly (T & { readonly row: number })[] {
  const order = [...items].sort((a, b) => a.start - b.start);
  const rowEnds: number[] = [];
  const rowOf = new Map<string, number>();
  for (const item of order) {
    const free = rowEnds.findIndex((end) => end <= item.start);
    const row = free === -1 ? rowEnds.length : free;
    rowEnds[row] = item.end;
    rowOf.set(item.id, row);
  }
  return items.map((item) => ({ ...item, row: rowOf.get(item.id) ?? 0 }));
}

/** Ticks every `step` years, anchored so the last tick lands on `to`. */
export function yearTicks(from: number, to: number, step: number): readonly number[] {
  const count = Math.floor((to - from) / step);
  return Array.from({ length: count + 1 }, (_, i) => to - (count - i) * step).filter((y) => y >= from);
}

export interface LabelInput {
  readonly x: number;
  readonly width: number;
  readonly textWidth: number;
  readonly minX: number;
  readonly maxX: number;
  readonly pad: number;
}

export interface LabelPlacement {
  readonly x: number;
  readonly anchor: 'start' | 'end';
  readonly inside: boolean;
}

/** Inside the bar if it fits, otherwise beside it — right first, then left. */
export function placeLabel({ x, width, textWidth, maxX, pad }: LabelInput): LabelPlacement {
  if (textWidth + pad * 2 <= width) return { x: x + pad, anchor: 'start', inside: true };
  const right = x + width + pad;
  if (right + textWidth <= maxX) return { x: right, anchor: 'start', inside: false };
  return { x: x - pad, anchor: 'end', inside: false };
}
