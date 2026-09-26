import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { scatterErythrocytes, topPrediction, type LeukocyteKind } from '../../lib/cellField';
import { useReducedMotion } from '../../lib/hooks';
import { createRng } from '../../lib/rng';
import { Pause, Play } from '../Icons';
import { CLASS_LABELS, FIELD, LEUKOCYTES } from './fieldData';
import { Leukocyte } from './Leukocyte';
import './smear.css';

const DWELL_MS = 2800;
const BRACKET = 40;
const CLASS_ORDER: readonly LeukocyteKind[] = ['neutrophil', 'lymphocyte', 'monocyte', 'eosinophil'];

function usePlatelets() {
  return useMemo(() => {
    const rng = createRng(99);
    return Array.from({ length: 14 }, () => {
      const a = rng() * Math.PI * 2;
      const d = Math.sqrt(rng()) * (FIELD.radius - 20);
      return { x: FIELD.cx + Math.cos(a) * d, y: FIELD.cy + Math.sin(a) * d, r: 2 + rng() * 2 };
    });
  }, []);
}

/** Pauses auto-advance while the viewer is off-screen or the tab is hidden. */
function useOnScreen(ref: React.RefObject<Element | null>): boolean {
  const [onScreen, setOnScreen] = useState(typeof IntersectionObserver === 'undefined');
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setOnScreen(Boolean(e?.isIntersecting)));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return onScreen;
}

export function SmearViewer() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(rootRef);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reducedMotion);
  const [showCam, setShowCam] = useState(true);

  const rbcs = useMemo(
    () =>
      scatterErythrocytes({
        cx: FIELD.cx,
        cy: FIELD.cy,
        radius: FIELD.radius,
        seed: 2024,
        count: 95,
        minR: 17,
        maxR: 21,
        leukocytes: LEUKOCYTES,
      }),
    [],
  );
  const platelets = usePlatelets();

  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  useEffect(() => {
    if (!playing || !onScreen) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % LEUKOCYTES.length), DWELL_MS);
    return () => window.clearInterval(id);
  }, [playing, onScreen]);

  const cell = LEUKOCYTES[active];
  const top = topPrediction(cell.scores);
  const scale = (cell.r + 10) / BRACKET;
  const labelBelow = cell.y - cell.r < 90;

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };
  const onCellKey = (e: KeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(i);
    }
  };

  return (
    <figure className="smear" ref={rootRef}>
      <div className="smear__frame">
        <span className="smear__hud smear__hud--tl mono">Peripheral smear · Leishman</span>
        <span className="smear__hud smear__hud--tr mono">100× oil</span>
        <span className="smear__hud smear__hud--bl mono">EfficientNetV2-S</span>
        <span className="smear__hud smear__hud--br mono" aria-hidden="true">
          <i className="smear__scalebar" /> 10 µm
        </span>

        <svg
          className="smear__svg"
          viewBox={`0 0 ${FIELD.size} ${FIELD.size}`}
          role="group"
          aria-label="Illustrated blood smear. Select a white cell to see its classification."
        >
          <defs>
            <clipPath id="fov">
              <circle cx={FIELD.cx} cy={FIELD.cy} r={FIELD.radius} />
            </clipPath>
            <radialGradient id="rbc-fill">
              <stop offset="0%" style={{ stopColor: 'var(--rbc-core)' }} />
              <stop offset="45%" style={{ stopColor: 'var(--rbc-core)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--rbc-rim)' }} />
            </radialGradient>
            <radialGradient id="nucleus-fill" cx="45%" cy="40%">
              <stop offset="0%" stopColor="#6a45a8" />
              <stop offset="100%" style={{ stopColor: 'var(--wbc-nucleus)' }} />
            </radialGradient>
            <radialGradient id="gradcam">
              <stop offset="0%" stopColor="#fff3a0" stopOpacity="0.95" />
              <stop offset="35%" style={{ stopColor: 'var(--gradcam-hot)' }} stopOpacity="0.75" />
              <stop offset="70%" stopColor="#e2415f" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5b2a86" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vignette">
              <stop offset="78%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
            </radialGradient>
            <linearGradient id="scanline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.55" />
            </linearGradient>
            <filter id="chromatin" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="3.2" numOctaves="2" seed="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.14" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          <g clipPath="url(#fov)">
            <rect width={FIELD.size} height={FIELD.size} style={{ fill: 'var(--smear-bg)' }} />
            {rbcs.map((c, i) => (
              <ellipse
                key={i}
                cx={c.x}
                cy={c.y}
                rx={c.r}
                ry={c.r * c.squash}
                transform={`rotate(${c.rotation} ${c.x} ${c.y})`}
                fill="url(#rbc-fill)"
                style={{ stroke: 'var(--rbc-rim)' }}
                strokeWidth={0.8}
              />
            ))}
            {platelets.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={p.r} style={{ fill: 'var(--platelet)' }} opacity={0.75} />
            ))}

            {LEUKOCYTES.map((c, i) => (
              <g
                key={c.id}
                className={`smear__cell ${i === active ? 'is-active' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`White cell ${i + 1}`}
                aria-pressed={i === active}
                onClick={() => select(i)}
                onKeyDown={(e) => onCellKey(e, i)}
              >
                <Leukocyte cell={c} />
                <circle cx={c.x} cy={c.y} r={c.r + 6} className="smear__hit" />
              </g>
            ))}

            {showCam && (
              <circle
                key={`cam-${active}`}
                className="smear__cam"
                cx={cell.x}
                cy={cell.y}
                r={cell.r * 1.35}
                fill="url(#gradcam)"
              />
            )}

            {!reducedMotion && (
              // SVG-native animation: CSS transforms + blend modes escape the clip path on mobile Safari.
              <rect className="smear__scan" x={0} y={-80} width={FIELD.size} height={80} fill="url(#scanline)">
                <animate attributeName="y" from={-80} to={FIELD.size} dur="5.6s" repeatCount="indefinite" />
              </rect>
            )}
            <circle cx={FIELD.cx} cy={FIELD.cy} r={FIELD.radius} fill="url(#vignette)" />
          </g>

          <g className="smear__reticle" style={{ transform: `translate(${cell.x}px, ${cell.y}px)` }}>
            <g style={{ transform: `scale(${scale})` }} className="smear__bracket">
              <path
                d={`M${-BRACKET},${-BRACKET + 12} V${-BRACKET} H${-BRACKET + 12} M${BRACKET - 12},${-BRACKET} H${BRACKET} V${-BRACKET + 12} M${BRACKET},${BRACKET - 12} V${BRACKET} H${BRACKET - 12} M${-BRACKET + 12},${BRACKET} H${-BRACKET} V${BRACKET - 12}`}
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g key={`label-${active}`} className="smear__label" transform={`translate(0 ${labelBelow ? cell.r + 26 : -cell.r - 22})`}>
              <rect x={-72} y={-13} width={144} height={24} rx={4} />
              <text x={0} y={4} textAnchor="middle">
                {CLASS_LABELS[top.kind].toLowerCase()} · {top.p.toFixed(2)}
              </text>
            </g>
          </g>
        </svg>
      </div>

      <div className="smear__panel">
        <div className="smear__readout" aria-live="polite">
          <span className="mono smear__count">
            Cell {active + 1}/{LEUKOCYTES.length}
          </span>
          <span className="smear__pred serif">{CLASS_LABELS[top.kind]}</span>
        </div>
        <ul className="smear__bars" aria-label="Class probabilities">
          {CLASS_ORDER.map((k) => (
            <li key={k} className={k === top.kind ? 'is-top' : ''}>
              <span className="mono">{CLASS_LABELS[k]}</span>
              <span className="smear__bar">
                <span style={{ transform: `scaleX(${cell.scores[k]})` }} />
              </span>
              <span className="mono smear__p">{(cell.scores[k] * 100).toFixed(1)}%</span>
            </li>
          ))}
        </ul>
        <div className="smear__controls">
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
            {playing ? <Pause /> : <Play />}
            <span>{playing ? 'Pause scan' : 'Resume scan'}</span>
          </button>
          <button type="button" onClick={() => setShowCam((s) => !s)} aria-pressed={showCam}>
            <span className={`smear__swatch ${showCam ? 'is-on' : ''}`} aria-hidden="true" />
            <span>Grad-CAM</span>
          </button>
        </div>
      </div>

      <figcaption className="smear__caption">
        A drawn illustration of the idea behind my white-cell classification paper: a fine-tuned EfficientNetV2 labels
        each leukocyte, and Grad-CAM highlights the region that drove the call. Tap a cell to inspect it.
      </figcaption>
    </figure>
  );
}
