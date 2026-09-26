import { ArrowUpRight } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { profile } from '../data/profile';
import './research.css';

export function Research() {
  return (
    <section className="section" id="research" aria-labelledby="research-title">
      <div className="container section__grid">
        <div className="section__index">
          <span className="section__num">04</span>
          <span className="eyebrow">Research</span>
        </div>
        <div>
          <Reveal>
            <h2 id="research-title" className="section__title">
              Published &amp; <em>presented.</em>
            </h2>
          </Reveal>

          <Reveal as="div" className="research__block">
            <h3 className="research__h mono">Selected publications</h3>
            <ol className="pubs">
              {profile.publications.map((p, i) => {
                const body = (
                  <>
                    <span className="pubs__title">{p.title}</span>
                    <span className="pubs__venue">{p.venue}</span>
                  </>
                );
                return (
                  <li key={p.title} className="pubs__item">
                    <span className="mono pubs__ref">[{i + 1}]</span>
                    <span className="mono pubs__year">{p.year}</span>
                    {p.url ? (
                      <a className="pubs__link" href={p.url} target="_blank" rel="noopener noreferrer">
                        {body}
                        <ArrowUpRight className="pubs__arrow" />
                      </a>
                    ) : (
                      <span className="pubs__link">{body}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal as="div" className="research__block">
            <h3 className="research__h mono">Talks</h3>
            <ul className="talks">
              {profile.talks.map((t) => (
                <li key={t.title} className="talks__item">
                  <span className="mono talks__date">{t.date}</span>
                  <div>
                    <p className="talks__title serif">“{t.title}”</p>
                    <p className="talks__event">
                      {t.event} · <span>{t.role}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
