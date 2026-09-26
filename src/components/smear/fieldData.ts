import type { ClassScores, LeukocyteKind } from '../../lib/cellField';

export interface LeukocyteSpec {
  readonly id: string;
  readonly kind: LeukocyteKind;
  readonly x: number;
  readonly y: number;
  readonly r: number;
  readonly rotation: number;
  readonly scores: ClassScores;
}

export const FIELD = { size: 600, cx: 300, cy: 300, radius: 292 } as const;

export const CLASS_LABELS: Readonly<Record<LeukocyteKind, string>> = {
  neutrophil: 'Neutrophil',
  lymphocyte: 'Lymphocyte',
  monocyte: 'Monocyte',
  eosinophil: 'Eosinophil',
};

/** Hand-placed for composition. Scores are illustrative, not model output. */
export const LEUKOCYTES: readonly LeukocyteSpec[] = [
  {
    id: 'c1',
    kind: 'neutrophil',
    x: 178,
    y: 182,
    r: 36,
    rotation: 20,
    scores: { neutrophil: 0.97, lymphocyte: 0.01, monocyte: 0.015, eosinophil: 0.005 },
  },
  {
    id: 'c2',
    kind: 'lymphocyte',
    x: 428,
    y: 170,
    r: 25,
    rotation: 0,
    scores: { neutrophil: 0.01, lymphocyte: 0.95, monocyte: 0.035, eosinophil: 0.005 },
  },
  {
    id: 'c3',
    kind: 'monocyte',
    x: 400,
    y: 408,
    r: 42,
    rotation: -15,
    scores: { neutrophil: 0.02, lymphocyte: 0.09, monocyte: 0.88, eosinophil: 0.01 },
  },
  {
    id: 'c4',
    kind: 'eosinophil',
    x: 180,
    y: 420,
    r: 35,
    rotation: 35,
    scores: { neutrophil: 0.06, lymphocyte: 0.005, monocyte: 0.005, eosinophil: 0.93 },
  },
  {
    id: 'c5',
    kind: 'neutrophil',
    x: 305,
    y: 292,
    r: 32,
    rotation: -60,
    scores: { neutrophil: 0.91, lymphocyte: 0.01, monocyte: 0.02, eosinophil: 0.06 },
  },
];
