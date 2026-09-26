import { useEffect, useState, type ComponentType, type SVGProps } from 'react';
import { ArrowUpRight, Check, Copy, GitHub, LinkedIn, Mail, Orcid, Phone, Pin, XLogo } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { profile } from '../data/profile';
import type { ContactLink } from '../data/types';
import './contact.css';

const ICONS: Readonly<Partial<Record<ContactLink['id'], ComponentType<SVGProps<SVGSVGElement>>>>> = {
  email: Mail,
  phone: Phone,
  linkedin: LinkedIn,
  github: GitHub,
  orcid: Orcid,
  x: XLogo,
  location: Pin,
};

type CopyState = 'idle' | 'copied' | 'failed';

function useCopy(text: string): readonly [CopyState, () => Promise<void>] {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const t = window.setTimeout(() => setState('idle'), 2200);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState('failed');
    }
  };
  return [state, copy];
}

export function Contact() {
  const email = profile.contact.find((c) => c.id === 'email');
  const others = profile.contact.filter((c) => c.id !== 'email');
  const [copyState, copy] = useCopy(email?.value ?? '');

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container section__grid">
        <div className="section__index">
          <span className="section__num">05</span>
          <span className="eyebrow">Contact</span>
        </div>
        <div>
          <Reveal>
            <h2 id="contact-title" className="section__title">
              Let’s talk about <em>AI in medicine.</em>
            </h2>
            <p className="lede">
              Open to research collaborations, invited talks, faculty-development workshops and MedTech mentoring. Email
              is the fastest way to reach me.
            </p>
          </Reveal>

          {email?.href && (
            <Reveal className="contact__email" delay={80}>
              <a href={email.href} className="contact__address serif">
                {email.value}
              </a>
              <button type="button" className="contact__copy" onClick={copy}>
                {copyState === 'copied' ? <Check /> : <Copy />}
                <span aria-live="polite">
                  {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed — select it instead' : 'Copy'}
                </span>
              </button>
            </Reveal>
          )}

          <Reveal as="ul" className="contact__grid" delay={140}>
            {others.map((c) => {
              const Icon = ICONS[c.id];
              const external = c.href?.startsWith('https://');
              const inner = (
                <>
                  <span className="contact__icon">{Icon && <Icon />}</span>
                  <span className="contact__text">
                    <span className="mono contact__label">{c.label}</span>
                    <span className="contact__value">{c.value}</span>
                  </span>
                  {external && <ArrowUpRight className="contact__arrow" />}
                </>
              );
              return (
                <li key={c.id}>
                  {c.href ? (
                    <a
                      className="contact__item"
                      href={c.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="contact__item">{inner}</div>
                  )}
                </li>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
