import { useEffect, useState } from 'react';
import { useTheme } from '../lib/hooks';
import { Moon, Sun } from './Icons';
import { Logo } from './Logo';
import './header.css';

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#path', label: 'Path' },
  { href: '#work', label: 'Work' },
  { href: '#research', label: 'Research' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Header() {
  const [theme, toggleTheme] = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', close);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', close);
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__brand" aria-label="Atul Tiwari — back to top">
          <Logo />
          <span>Atul Tiwari</span>
        </a>

        <nav id="site-nav" className="header__nav" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            type="button"
            className="icon-btn header__menu"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="header__burger" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
