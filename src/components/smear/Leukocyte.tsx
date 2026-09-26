import { useMemo } from 'react';
import { createRng } from '../../lib/rng';
import type { LeukocyteSpec } from './fieldData';

interface Props {
  readonly cell: LeukocyteSpec;
}

/** Unit-radius nucleus outlines, scaled by the cell radius. */
const MONOCYTE_NUCLEUS =
  'M-0.58,-0.05 C-0.6,-0.5 0.05,-0.66 0.46,-0.34 C0.24,-0.14 0.22,0.14 0.46,0.32 C0.08,0.62 -0.56,0.46 -0.58,-0.05 Z';

function Granules({ cell, count, color, size }: Props & { count: number; color: string; size: number }) {
  const dots = useMemo(() => {
    const rng = createRng(cell.x * 31 + cell.y);
    return Array.from({ length: count }, () => {
      const a = rng() * Math.PI * 2;
      const d = Math.sqrt(rng()) * 0.86;
      return { x: Math.cos(a) * d, y: Math.sin(a) * d };
    });
  }, [cell.x, cell.y, count]);
  return (
    <g fill={color}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={size} />
      ))}
    </g>
  );
}

function Nucleus({ kind }: Pick<LeukocyteSpec, 'kind'>) {
  switch (kind) {
    case 'lymphocyte':
      return <circle cx={0.07} cy={0.04} r={0.8} />;
    case 'monocyte':
      return <path d={MONOCYTE_NUCLEUS} />;
    case 'eosinophil':
      return (
        <>
          <ellipse cx={-0.34} cy={-0.06} rx={0.3} ry={0.36} />
          <ellipse cx={0.34} cy={0.04} rx={0.3} ry={0.34} />
          <path d="M-0.1,-0.02 Q0,0.1 0.1,0.0" stroke="var(--wbc-nucleus)" strokeWidth={0.1} fill="none" />
        </>
      );
    case 'neutrophil':
    default:
      return (
        <>
          <ellipse cx={-0.42} cy={0.06} rx={0.22} ry={0.26} />
          <ellipse cx={-0.02} cy={-0.3} rx={0.24} ry={0.22} />
          <ellipse cx={0.4} cy={0.02} rx={0.22} ry={0.25} />
          <ellipse cx={0.1} cy={0.38} rx={0.19} ry={0.17} />
          <path
            d="M-0.3,-0.04 L-0.12,-0.22 M0.12,-0.24 L0.3,-0.08 M0.32,0.18 L0.18,0.3"
            stroke="var(--wbc-nucleus)"
            strokeWidth={0.07}
            fill="none"
          />
        </>
      );
  }
}

const CYTOPLASM: Record<LeukocyteSpec['kind'], string> = {
  neutrophil: 'var(--wbc-cyto)',
  lymphocyte: '#c7d0f0',
  monocyte: '#d6cfe6',
  eosinophil: '#f3cfc4',
};

export function Leukocyte({ cell }: Props) {
  return (
    <g transform={`translate(${cell.x} ${cell.y}) rotate(${cell.rotation}) scale(${cell.r})`}>
      <circle r={1} fill={CYTOPLASM[cell.kind]} stroke="#b89cc9" strokeWidth={0.025} />
      {cell.kind === 'eosinophil' && <Granules cell={cell} count={70} color="var(--eos-granule)" size={0.055} />}
      {cell.kind === 'neutrophil' && <Granules cell={cell} count={40} color="#d2a8cf" size={0.03} />}
      {cell.kind === 'monocyte' && <Granules cell={cell} count={6} color="#efeaf5" size={0.07} />}
      <g fill="url(#nucleus-fill)" filter="url(#chromatin)">
        <Nucleus kind={cell.kind} />
      </g>
    </g>
  );
}
