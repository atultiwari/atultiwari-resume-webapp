import { ArrowDown } from '../components/Icons';
import { SmearViewer } from '../components/smear/SmearViewer';
import { profile } from '../data/profile';
import './hero.css';

const LINES = [
  { text: 'Reading slides.', em: false },
  { text: 'Training models.', em: true },
  { text: 'Teaching doctors.', em: false },
] as const;

export function Hero() {
  return (
    <section className="hero container" id="top" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          {profile.name} · MD, MS (ML &amp; AI)
        </p>
        <h1 id="hero-title" className="hero__title">
          {LINES.map((l, i) => (
            <span key={l.text} className="hero__line" style={{ '--i': i } as React.CSSProperties}>
              <span>{l.em ? <em>{l.text}</em> : l.text}</span>
            </span>
          ))}
        </h1>
        <p className="hero__intro">{profile.intro}</p>
        <div className="hero__cta">
          <a className="btn btn--solid" href="#work">
            See the work <ArrowDown />
          </a>
          <a className="btn" href="#contact">
            Get in touch
          </a>
        </div>
        <ul className="hero__creds mono" aria-label="Qualifications">
          {profile.credentials.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="hero__visual">
        <SmearViewer />
      </div>
    </section>
  );
}
