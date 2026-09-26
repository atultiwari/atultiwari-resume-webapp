export type Track = 'medicine' | 'computing' | 'career';

export interface MonthYear {
  readonly year: number;
  /** 1–12 */
  readonly month: number;
}

export interface Span {
  readonly start: MonthYear;
  /** `null` means ongoing. */
  readonly end: MonthYear | null;
}

export interface Qualification {
  readonly id: string;
  readonly short: string;
  readonly title: string;
  readonly institution: string;
  readonly track: Exclude<Track, 'career'>;
  readonly span: Span;
}

export interface Role {
  readonly id: string;
  readonly short: string;
  readonly title: string;
  readonly organisation: string;
  readonly commitment: 'Full-time' | 'Part-time' | 'Part-time · Remote';
  /** Optional one-liner shown under the role in the list. */
  readonly summary?: string;
  readonly span: Span;
}

export interface Project {
  readonly id: 'medtutor' | 'medcross' | 'medeval';
  readonly name: string;
  readonly kind: string;
  readonly summary: string;
  readonly outcome: string;
}

export interface Publication {
  readonly title: string;
  readonly venue: string;
  readonly year: number;
  readonly url: string | null;
}

export interface Talk {
  readonly title: string;
  readonly event: string;
  readonly role: string;
  readonly date: string;
}

export interface ContactLink {
  readonly id: 'email' | 'phone' | 'linkedin' | 'github' | 'orcid' | 'x' | 'website' | 'location';
  readonly label: string;
  readonly value: string;
  readonly href: string | null;
}

export interface Profile {
  readonly name: string;
  readonly shortName: string;
  readonly roleLine: string;
  readonly intro: string;
  readonly about: readonly string[];
  readonly credentials: readonly string[];
  readonly qualifications: readonly Qualification[];
  readonly roles: readonly Role[];
  readonly projects: readonly Project[];
  readonly publications: readonly Publication[];
  readonly talks: readonly Talk[];
  readonly toolkit: Readonly<Record<'Pathology' | 'Machine learning' | 'Building', readonly string[]>>;
  readonly contact: readonly ContactLink[];
}
