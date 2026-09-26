import { profile } from '../data/profile';
import './footer.css';

/** A cell dividing — the site's sign-off. */
function Mitosis() {
  return (
    <svg className="mitosis" viewBox="0 0 120 60" aria-hidden="true">
      <g className="mitosis__cell mitosis__cell--l">
        <circle cx="60" cy="30" r="18" className="mitosis__cyto" />
        <circle cx="60" cy="30" r="7" className="mitosis__nuc" />
      </g>
      <g className="mitosis__cell mitosis__cell--r">
        <circle cx="60" cy="30" r="18" className="mitosis__cyto" />
        <circle cx="60" cy="30" r="7" className="mitosis__nuc" />
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Mitosis />
        <p className="footer__line">
          © {new Date().getFullYear()} {profile.name}. Set in Instrument Serif &amp; Geist; coloured with haematoxylin
          &amp; eosin.
        </p>
        <a href="#top" className="footer__top mono">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
