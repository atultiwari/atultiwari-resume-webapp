import type { CSSProperties } from 'react';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

/** MedTutor: a student asks, the tutor "types", then explains with a shrinking red cell. */
export function TutorArt() {
  return (
    <svg viewBox="0 0 320 220" className="art art--tutor" aria-hidden="true">
      <g className="mt-q">
        <rect x="118" y="20" width="184" height="46" rx="12" className="art__bubble art__bubble--me" />
        <text x="132" y="39" className="art__txt art__txt--inv">Why are RBCs small in</text>
        <text x="132" y="55" className="art__txt art__txt--inv">iron deficiency?</text>
      </g>
      <circle cx="30" cy="104" r="12" className="art__avatar" />
      <path d="M25 104h10M30 99v10" className="art__avatar-mark" />
      <g className="mt-dots">
        <rect x="50" y="86" width="64" height="34" rx="12" className="art__bubble" />
        <circle cx="70" cy="103" r="3.5" className="art__dot" style={d(0)} />
        <circle cx="82" cy="103" r="3.5" className="art__dot" style={d(150)} />
        <circle cx="94" cy="103" r="3.5" className="art__dot" style={d(300)} />
      </g>
      <g className="mt-a">
        <rect x="50" y="86" width="252" height="118" rx="12" className="art__bubble" />
        <rect x="66" y="102" width="150" height="7" rx="3.5" className="art__line" style={d(0)} />
        <rect x="66" y="118" width="130" height="7" rx="3.5" className="art__line" style={d(140)} />
        <rect x="66" y="134" width="96" height="7" rx="3.5" className="art__line" style={d(280)} />
        <text x="66" y="176" className="art__txt art__mono">↓ iron → ↓ Hb</text>
        <text x="66" y="192" className="art__txt art__mono">→ extra division → ↓ MCV</text>
        <g transform="translate(262 140)">
          <circle r="24" className="art__rbc-ghost" />
          <circle r="24" className="art__rbc mt-rbc" />
        </g>
      </g>
    </svg>
  );
}

const CELL = 30;
const GRID = { cols: 6, rows: 6, x: 18, y: 16 };
const ACROSS = { word: 'AUER', row: 2, col: 1 };
const DOWN = { word: 'HEME', row: 1, col: 3 };

function crosswordCells() {
  const across = [...ACROSS.word].map((ch, i) => ({ r: ACROSS.row, c: ACROSS.col + i, ch, order: i }));
  const down = [...DOWN.word]
    .map((ch, i) => ({ r: DOWN.row + i, c: DOWN.col, ch, order: 4 + i }))
    .filter((cell) => !across.some((a) => a.r === cell.r && a.c === cell.c));
  return [...across, ...down];
}

/** MedCross: a two-word crossword fills itself in. */
export function CrossArt() {
  const letters = crosswordCells();
  const open = new Set(letters.map((l) => `${l.r}-${l.c}`));
  return (
    <svg viewBox="0 0 320 220" className="art art--cross" aria-hidden="true">
      {Array.from({ length: GRID.rows * GRID.cols }, (_, i) => {
        const r = Math.floor(i / GRID.cols);
        const c = i % GRID.cols;
        const isOpen = open.has(`${r}-${c}`);
        return (
          <rect
            key={i}
            x={GRID.x + c * CELL}
            y={GRID.y + r * CELL}
            width={CELL}
            height={CELL}
            className={isOpen ? 'art__cell' : 'art__block'}
          />
        );
      })}
      <text x={GRID.x + ACROSS.col * CELL + 3} y={GRID.y + ACROSS.row * CELL + 9} className="art__num">1</text>
      <text x={GRID.x + DOWN.col * CELL + 3} y={GRID.y + DOWN.row * CELL + 9} className="art__num">2</text>
      {letters.map((l) => (
        <text
          key={`${l.r}-${l.c}`}
          x={GRID.x + l.c * CELL + CELL / 2}
          y={GRID.y + l.r * CELL + CELL / 2 + 7}
          textAnchor="middle"
          className="art__letter"
          style={d(400 + l.order * 380)}
        >
          {l.ch}
        </text>
      ))}
      <g className="art__clues">
        <text x="214" y="50" className="art__txt art__mono art__muted">1 ACROSS</text>
        <text x="214" y="66" className="art__txt">Rods seen</text>
        <text x="214" y="81" className="art__txt">in AML (4)</text>
        <text x="214" y="118" className="art__txt art__mono art__muted">2 DOWN</text>
        <text x="214" y="134" className="art__txt">Iron-bearing</text>
        <text x="214" y="149" className="art__txt">half of Hb (4)</text>
        <rect x="214" y="170" width="84" height="22" rx="11" className="art__chip mc-done" />
        <text x="256" y="185" textAnchor="middle" className="art__txt art__mono art__chip-txt mc-done">solved ✓</text>
      </g>
    </svg>
  );
}

const SCRIBBLES = [
  'M40 50 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0',
  'M40 78 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0',
  'M40 106 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0',
  'M40 134 q10 -8 20 0 t20 0 t20 0 t20 0',
] as const;
const MARKS = ['ok', 'ok', 'miss', 'ok'] as const;

/** MedEval: an answer is written, marked against a rubric, and scored. */
export function EvalArt() {
  return (
    <svg viewBox="0 0 320 220" className="art art--eval" aria-hidden="true">
      <rect x="22" y="18" width="200" height="186" rx="6" className="art__paper" />
      <line x1="32" y1="18" x2="32" y2="204" className="art__margin" />
      {SCRIBBLES.map((p, i) => (
        <path key={p} d={p} className="art__ink" pathLength={1} style={d(i * 450)} />
      ))}
      {MARKS.map((m, i) => (
        <g key={i} transform={`translate(204 ${46 + i * 28})`} className="art__mark" style={d(2200 + i * 260)}>
          {m === 'ok' ? <path d="M-6 0 l4 4 l8 -9" className="art__tick" /> : <path d="M-5 -5 l10 10 M5 -5 l-10 10" className="art__cross" />}
        </g>
      ))}
      <g transform="translate(270 70)">
        <circle r="30" className="art__ring-bg" />
        <circle r="30" className="art__ring" pathLength={1} transform="rotate(-90)" />
        <text y="5" textAnchor="middle" className="art__score">7.5</text>
        <text y="20" textAnchor="middle" className="art__txt art__mono art__muted">/ 10</text>
      </g>
      <g className="art__feedback">
        <rect x="232" y="128" width="78" height="54" rx="8" className="art__bubble" />
        <text x="240" y="146" className="art__txt art__mono art__muted">MISSING</text>
        <text x="240" y="162" className="art__txt">role of</text>
        <text x="240" y="175" className="art__txt">hepcidin</text>
      </g>
    </svg>
  );
}
