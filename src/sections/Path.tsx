import { Reveal } from '../components/Reveal';
import { profile } from '../data/profile';
import { formatSpan } from '../lib/timeline';
import { TrackChart } from './TrackChart';
import './path.css';

export function Path() {
  return (
    <section className="section" id="path" aria-labelledby="path-title">
      <div className="container section__grid">
        <div className="section__index">
          <span className="section__num">02</span>
          <span className="eyebrow">Path</span>
        </div>
        <div>
          <Reveal>
            <h2 id="path-title" className="section__title">
              Two tracks, <em>one practice.</em>
            </h2>
            <p className="lede">
              Medicine first — MBBS in 2005 through an MD in Pathology in 2020. Then four computing programmes in three
              years, alongside clinical and teaching work. The overlap is the point.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <TrackChart />
          </Reveal>

          <div className="path__lists">
            <Reveal as="div" className="path__col">
              <h3 className="path__h">Roles</h3>
              <ol className="path__list">
                {profile.roles.map((r) => (
                  <li key={r.id}>
                    <span className="mono path__when">{formatSpan(r.span)}</span>
                    <div>
                      <p className="path__what">{r.title}</p>
                      <p className="path__where">
                        {r.organisation} <span className="path__tag">{r.commitment}</span>
                      </p>
                      {r.summary && <p className="path__note">{r.summary}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal as="div" className="path__col" delay={120}>
              <h3 className="path__h">Education</h3>
              <ol className="path__list">
                {[...profile.qualifications].reverse().map((q) => (
                  <li key={q.id}>
                    <span className="mono path__when">{formatSpan(q.span)}</span>
                    <div>
                      <p className="path__what">{q.title}</p>
                      <p className="path__where">{q.institution}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
