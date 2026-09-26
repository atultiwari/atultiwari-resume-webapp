import { createRng } from './rng';

export type LeukocyteKind = 'neutrophil' | 'lymphocyte' | 'monocyte' | 'eosinophil';

export type ClassScores = Readonly<Record<LeukocyteKind, number>>;

export interface Circle {
  readonly x: number;
  readonly y: number;
  readonly r: number;
}

export interface Erythrocyte extends Circle {
  /** Slight ellipse so the smear doesn't look stamped. 0.9–1. */
  readonly squash: number;
  readonly rotation: number;
}

export interface FieldSpec {
  readonly cx: number;
  readonly cy: number;
  /** Radius of the circular field of view. */
  readonly radius: number;
  readonly seed: number;
  readonly count: number;
  readonly minR: number;
  readonly maxR: number;
  readonly leukocytes: readonly Circle[];
}

const ATTEMPTS_PER_CELL = 60;
/** Red cells in a smear touch and overlap a little; allow 15 % overlap. */
const RBC_OVERLAP = 0.85;
const WBC_GAP = 4;

function validate(spec: FieldSpec): void {
  if (!Number.isFinite(spec.count) || spec.count < 0) throw new RangeError('count must be ≥ 0');
  if (spec.minR <= 0 || spec.maxR < spec.minR) throw new RangeError('radius bounds are invalid');
}

/** Rejection-samples red cells inside a circular field without covering any white cell. */
export function scatterErythrocytes(spec: FieldSpec): readonly Erythrocyte[] {
  validate(spec);
  const rng = createRng(spec.seed);
  const placed: Erythrocyte[] = [];
  const maxAttempts = spec.count * ATTEMPTS_PER_CELL;

  for (let attempt = 0; attempt < maxAttempts && placed.length < spec.count; attempt += 1) {
    const r = spec.minR + rng() * (spec.maxR - spec.minR);
    const angle = rng() * Math.PI * 2;
    const dist = Math.sqrt(rng()) * (spec.radius - r);
    if (dist < 0) continue;
    const x = spec.cx + Math.cos(angle) * dist;
    const y = spec.cy + Math.sin(angle) * dist;

    const hitsWbc = spec.leukocytes.some((w) => Math.hypot(x - w.x, y - w.y) <= r + w.r + WBC_GAP);
    const crowded = placed.some((c) => Math.hypot(x - c.x, y - c.y) < (r + c.r) * RBC_OVERLAP);
    if (hitsWbc || crowded) continue;

    placed.push({ x, y, r, squash: 0.9 + rng() * 0.1, rotation: rng() * 180 });
  }
  return placed;
}

export function topPrediction(scores: ClassScores): { readonly kind: LeukocyteKind; readonly p: number } {
  const [kind, p] = (Object.entries(scores) as [LeukocyteKind, number][]).reduce((best, cur) =>
    cur[1] > best[1] ? cur : best,
  );
  return { kind, p };
}
