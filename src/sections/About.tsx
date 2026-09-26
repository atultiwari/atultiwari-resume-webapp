import { Reveal } from '../components/Reveal';
import { profile } from '../data/profile';
import { useInView } from '../lib/hooks';
import './about.css';

const REPORT = [
  { k: 'Specimen', v: 'One physician-scientist, Rajasthan, India.' },
  { k: 'History', v: 'MBBS 2011. DCP, Manipal. MD Pathology 2020. Returned to study computing in 2021.' },
  { k: 'Microscopy', v: 'Four computing programmes completed 2021–2024, culminating in an MS in ML & AI (LJMU, UK).' },
  { k: 'Impression', v: 'Positive for pathology, machine learning and teaching. No evidence of slowing down.' },
] as const;

function Stamp() {
  const [ref, visible] = useInView<SVGSVGElement>(0.6);
  return (
    <svg ref={ref} className={`stamp ${visible ? 'is-in' : ''}`} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id="stamp-arc" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="56" />
      <circle cx="60" cy="60" r="34" />
      <text>
        <textPath href="#stamp-arc" startOffset="0">
          SIGNED OUT · PATHOLOGY · AI/ML · 2026 ·
        </textPath>
      </text>
      <text x="60" y="66" textAnchor="middle" className="stamp__mid">
        AT
      </text>
    </svg>
  );
}

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container section__grid">
        <div className="section__index">
          <span className="section__num">01</span>
          <span className="eyebrow">About</span>
        </div>
        <div>
          <Reveal>
            <h2 id="about-title" className="section__title">
              A pathologist who <em>learned to build.</em>
            </h2>
          </Reveal>

          <div className="about__grid">
            <Reveal className="about__prose">
              {profile.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <Reveal as="aside" delay={120} className="report" aria-label="Case summary">
              <header className="report__head">
                <span className="mono">Case summary</span>
                <span className="mono report__ref">Ref. AT/2026</span>
              </header>
              <dl className="report__body">
                {REPORT.map((r) => (
                  <div key={r.k} className="report__row">
                    <dt className="mono">{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
              <Stamp />
            </Reveal>
          </div>

          <Reveal className="toolkit" delay={80}>
            {Object.entries(profile.toolkit).map(([group, items]) => (
              <div key={group} className="toolkit__col">
                <h3 className="toolkit__h mono">{group}</h3>
                <ul>
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
