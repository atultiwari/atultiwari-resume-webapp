import { describe, expect, it } from 'vitest';
import { profile } from '../src/data/profile';
import { toDecimal } from '../src/lib/timeline';

describe('profile data', () => {
  it('has unique ids', () => {
    const ids = [...profile.qualifications, ...profile.roles].map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has spans that end after they start', () => {
    for (const { span } of [...profile.qualifications, ...profile.roles]) {
      if (span.end) expect(toDecimal(span.end)).toBeGreaterThan(toDecimal(span.start));
    }
  });

  it('only links publications over https', () => {
    for (const p of profile.publications) {
      if (p.url) expect(p.url).toMatch(/^https:\/\//);
    }
  });

  it('lists LinkedIn and GitHub among contact details', () => {
    const ids = profile.contact.map((c) => c.id);
    expect(ids).toContain('linkedin');
    expect(ids).toContain('github');
  });
});
