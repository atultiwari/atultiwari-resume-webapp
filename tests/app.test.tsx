import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '../src/App';

afterEach(cleanup);

describe('App', () => {
  it('renders the hero heading and every section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Reading slides.');
    for (const id of ['about', 'path', 'work', 'research', 'contact']) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it('has no contact form — details only', () => {
    const { container } = render(<App />);
    expect(container.querySelector('form')).toBeNull();
    expect(container.querySelector('input, textarea')).toBeNull();
  });

  it('links to LinkedIn, GitHub and email in the contact section', () => {
    render(<App />);
    const contact = within(document.getElementById('contact') as HTMLElement);
    const hrefs = contact.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('https://www.linkedin.com/in/dr-atul-tiwari/');
    expect(hrefs).toContain('https://github.com/atultiwari');
    expect(hrefs).toContain('mailto:atultiwari.in@gmail.com');
  });

  it('opens external links safely', () => {
    const { container } = render(<App />);
    for (const a of container.querySelectorAll('a[target="_blank"]')) {
      expect(a.getAttribute('rel')).toContain('noopener');
    }
  });

  it('classifies the white cell the visitor selects', () => {
    render(<App />);
    const cells = screen.getAllByRole('button', { name: /White cell/ });
    act(() => {
      fireEvent.click(cells[2]);
    });
    expect(screen.getByText('Cell 3/5')).toBeTruthy();
    expect(cells[2].getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: /Resume scan/ })).toBeTruthy();
  });

  it('toggles the colour theme', () => {
    render(<App />);
    const before = document.documentElement.dataset.theme;
    fireEvent.click(screen.getByRole('button', { name: /Switch to (dark|light) theme/ }));
    expect(document.documentElement.dataset.theme).not.toBe(before);
  });
});
