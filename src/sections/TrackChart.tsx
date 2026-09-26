import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../data/profile';
import type { Span, Track } from '../data/types';
import { useInView } from '../lib/hooks';
import { formatSpan, linearScale, packRows, placeLabel, toDecimal, yearTicks } from '../lib/timeline';

const START = 2005;
const END = 2027;
const today = new Date();
const NOW = Math.min(END, today.getFullYear() + today.getMonth() / 12);
const W = 960;
const LEFT = 108;
const RIGHT = 16;
const ROW_H = 26;
const ROW_GAP = 6;
const LANE_GAP = 22;
const TOP = 12;
const CHAR_W = 6.6;

/** `stack`: one row per item (a staircase), so short bars always have room for a side label. */
const LANES: readonly { readonly track: Track; readonly label: string; readonly stack: boolean }[] = [
  { track: 'medicine', label: 'Medicine', stack: false },
  { track: 'computing', label: 'Computing', stack: true },
  { track: 'career', label: 'Faculty & roles', stack: true },
];

function assignRows<T extends Bar>(bars: readonly T[], stack: boolean): readonly (T & { readonly row: number })[] {
  if (!stack) return packRows(bars);
  return [...bars].sort((a, b) => a.start - b.start || a.id.localeCompare(b.id)).map((b, row) => ({ ...b, row }));
}

interface Bar {
  readonly id: string;
  readonly track: Track;
  readonly short: string;
  readonly title: string;
  readonly where: string;
  readonly span: Span;
  readonly start: number;
  readonly end: number;
}

function buildBars(): readonly Bar[] {
  const quals = profile.qualifications.map((q) => ({
    id: q.id,
    track: q.track,
    short: q.short,
    title: q.title,
    where: q.institution,
    span: q.span,
  }));
  const roles = profile.roles.map((r) => ({
    id: r.id,
    track: 'career' as const,
    short: r.short,
    title: r.title,
    where: r.organisation,
    span: r.span,
  }));
  return [...quals, ...roles].map((b) => ({
    ...b,
    start: toDecimal(b.span.start),
    end: b.span.end ? toDecimal(b.span.end) : NOW,
  }));
}

export function TrackChart() {
  const [ref, visible] = useInView<HTMLDivElement>(0.25);
  const [hover, setHover] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // On narrow screens the chart scrolls sideways; open on the recent years, where most of the story is.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);
  const x = linearScale([START, END], [LEFT, W - RIGHT]);

  const layout = useMemo(() => {
    const bars = buildBars();
    let y = TOP;
    return LANES.map((lane) => {
      const packed = assignRows(bars.filter((b) => b.track === lane.track), lane.stack);
      const rows = Math.max(1, ...packed.map((p) => p.row + 1));
      const laneTop = y;
      y += rows * (ROW_H + ROW_GAP) + LANE_GAP;
      return { ...lane, top: laneTop, height: rows * (ROW_H + ROW_GAP) - ROW_GAP, bars: packed };
    });
  }, []);

  const last = layout[layout.length - 1];
  const H = last.top + last.height + 34;
  const all = layout.flatMap((l) => l.bars);
  const focused = all.find((b) => b.id === hover) ?? null;

  return (
    <div className={`chart ${visible ? 'is-visible' : ''}`} ref={ref}>
      <div className="chart__scroll" ref={scrollRef}>
        <svg viewBox={`0 0 ${W} ${H}`} className="chart__svg" role="group" aria-labelledby="chart-title chart-desc">
          <title id="chart-title">Timeline of training and roles, 2005 to today</title>
          <desc id="chart-desc">
            Clinical training from 2005 to 2020, four computing programmes from 2021 to 2024, and faculty and advisory
            roles from 2022 onward. Full details are listed below the chart.
          </desc>

          {yearTicks(START, END - 1, 3).map((yr) => (
            <g key={yr} className="chart__tick">
              <line x1={x(yr)} x2={x(yr)} y1={0} y2={H - 26} />
              <text x={x(yr)} y={H - 8} textAnchor="middle">
                {yr}
              </text>
            </g>
          ))}

          {layout.map((lane) => (
            <g key={lane.track} role="list" aria-label={lane.label}>
              <text className="chart__lane" x={0} y={lane.top + 17} aria-hidden="true">
                {lane.label}
              </text>
              {lane.bars.map((b, i) => {
                const bx = x(b.start);
                const bw = Math.max(6, x(b.end) - bx);
                const by = lane.top + b.row * (ROW_H + ROW_GAP);
                const label = placeLabel({ x: bx, width: bw, textWidth: b.short.length * CHAR_W, minX: LEFT, maxX: W - RIGHT, pad: 7 });
                return (
                  <g
                    key={b.id}
                    className={`chart__bar chart__bar--${lane.track} ${hover && hover !== b.id ? 'is-dim' : ''}`}
                    style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
                    tabIndex={0}
                    role="listitem"
                    aria-label={`${b.title}, ${b.where}, ${formatSpan(b.span)}`}
                    onMouseEnter={() => setHover(b.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(b.id)}
                    onBlur={() => setHover(null)}
                  >
                    <rect x={bx} y={by} width={bw} height={ROW_H} rx={5} style={{ transformOrigin: `${bx}px 0` }} />
                    <text x={label.x} y={by + 17} textAnchor={label.anchor} className={label.inside ? '' : 'is-outside'}>
                      {b.short}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}

          <g className="chart__now">
            <line x1={x(NOW)} x2={x(NOW)} y1={0} y2={H - 26} />
            <circle cx={x(NOW)} cy={4} r={3.5} />
          </g>
        </svg>
      </div>
      <p className="chart__readout mono" aria-live="polite">
        {focused ? (
          <>
            <strong>{focused.title}</strong> · {focused.where} · {formatSpan(focused.span)}
          </>
        ) : (
          <>
            <span className="chart__hint">← Scroll for earlier years. </span>Hover or tab through the bars for details.
          </>
        )}
      </p>
    </div>
  );
}
