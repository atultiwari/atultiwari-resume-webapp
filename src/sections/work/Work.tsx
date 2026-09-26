import type { ComponentType } from 'react';
import { Reveal } from '../../components/Reveal';
import { profile } from '../../data/profile';
import type { Project } from '../../data/types';
import { CrossArt, EvalArt, TutorArt } from './Illustrations';
import './work.css';

const ART: Readonly<Record<Project['id'], ComponentType>> = {
  medtutor: TutorArt,
  medcross: CrossArt,
  medeval: EvalArt,
};

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container section__grid">
        <div className="section__index">
          <span className="section__num">03</span>
          <span className="eyebrow">Work</span>
        </div>
        <div>
          <Reveal>
            <h2 id="work-title" className="section__title">
              Small tools for how doctors <em>learn.</em>
            </h2>
            <p className="lede">
              AI tools for MBBS students, each aimed at one step of the learning loop: understand it, recall it, get
              assessed on it.
            </p>
          </Reveal>

          <ol className="work__list">
            {profile.projects.map((p, i) => {
              const Art = ART[p.id];
              return (
                <Reveal as="li" key={p.id} delay={i * 100} className="work__card">
                  <div className="work__art">
                    <Art />
                  </div>
                  <div className="work__body">
                    <p className="mono work__meta">
                      <span>0{i + 1}</span>
                      <span>{p.kind}</span>
                    </p>
                    <h3 className="work__name serif">{p.name}</h3>
                    <p className="work__summary">{p.summary}</p>
                    <p className="work__outcome">{p.outcome}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
