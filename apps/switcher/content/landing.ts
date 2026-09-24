/**
 * Copy for the landing page at `/`. Sections render in the order of
 * `sections`; each id doubles as the in-page anchor used by the navbar.
 */

export type SectionId = 'idea' | 'designs' | 'compare' | 'how-its-built' | 'explore';

export const site = {
  name: 'ZENBYTE Design Lab',
  wordmark: 'ZENBYTE',
  author: 'morz mamun',
  authorUrl: 'https://github.com/morz-mamun',
  repoUrl: 'https://github.com/morz-mamun/Zenbyte-Design-Lab',
} as const;

/** Navbar links, in page order. */
export const sections: { id: SectionId; label: string }[] = [
  { id: 'idea', label: 'The idea' },
  { id: 'designs', label: 'Designs' },
  { id: 'compare', label: 'Compare' },
  { id: 'how-its-built', label: "How it's built" },
  { id: 'explore', label: 'Explore' },
];

export const hero = {
  eyebrow: 'ZENBYTE Design Lab',
  /** Rendered as two lines: the first in Classic's serif, the second in Motion's display face. */
  titleLead: 'One site.',
  titleTail: [{ text: 'Two design ' }, { text: 'directions.', accent: true }],
  intro:
    'The same ZENBYTE website, with the same pages and the same words, designed twice. One is calm and editorial. The other is driven by motion. Open either one as its own complete site.',
  primaryCta: { label: 'View the designs', href: '#designs' },
  secondaryCta: { label: "See how it's built", href: '#how-its-built' },
} as const;

export const idea = {
  heading: 'Same content. A different voice.',
  statements: [
    {
      title: 'Nothing but the design changes',
      body: 'Both sites carry identical pages, copy, case studies and blog posts. Only typography, color, layout and motion differ.',
    },
    {
      title: 'Each one is a real website',
      body: 'No mockups. Every page works: navigation, deep links, the start-a-project form and a proper not-found page.',
    },
    {
      title: 'Switch whenever you like',
      body: 'A small pill in the corner of every page takes you back here or straight to the same site in the other design.',
    },
  ],
  stats: [
    { value: 2, label: 'Design directions' },
    { value: 9, label: 'Page templates in each' },
    { value: 0, label: 'Lines of shared code' },
  ],
} as const;

export type Design = {
  id: 'classic' | 'motion';
  name: string;
  href: string;
  summary: string;
  traits: string[];
};

export const designs: Design[] = [
  {
    id: 'classic',
    name: 'Classic',
    href: '/classic',
    summary: 'Editorial layout on warm paper, serif headlines, calm and static.',
    traits: ['Instrument Serif', 'Warm paper', 'Static'],
  },
  {
    id: 'motion',
    name: 'Motion',
    href: '/motion',
    summary: 'Motion-led: smooth scrolling, intro loader, custom cursor, dark and light themes.',
    traits: ['Anton display', 'Dark and light', 'Smooth scroll'],
  },
];

export const designsSection = {
  heading: 'Pick a direction',
  intro: 'Each design opens as its own site. Browse as long as you like, then use the corner switch to come back.',
} as const;

export const compare = {
  heading: 'Side by side',
  intro: 'Five choices shape how the same page feels.',
  rows: [
    {
      attribute: 'Type',
      classic: 'Instrument Serif headlines with Hanken Grotesk body text. Literary and quiet.',
      motion: 'Condensed Anton in capitals with Geist body text. Loud and graphic.',
    },
    {
      attribute: 'Color',
      classic: 'Ink on warm paper, with a single red-orange accent used sparingly.',
      motion: 'Near-black canvas with a bright orange-red accent that carries the page.',
    },
    {
      attribute: 'Layout',
      classic: 'Editorial columns, generous margins and hairline rules.',
      motion: 'Full-bleed sections, oversized type, sticky and horizontal scroll stories.',
    },
    {
      attribute: 'Motion',
      classic: 'Static by design. Content is simply there.',
      motion: 'Intro loader, smooth scrolling, scroll-driven reveals and a custom cursor.',
    },
    {
      attribute: 'Theme',
      classic: 'One light, paper-toned theme.',
      motion: 'Dark by default, with a light theme behind a water-drop toggle.',
    },
  ],
} as const;

export const build = {
  heading: "How it's built",
  intro:
    'Each design is its own Next.js app with its own dependencies, styles, fonts and assets. A small entry app serves this page and routes each path prefix to the right app, so switching designs is a full page load, exactly like visiting a different website.',
  diagram: {
    entry: { label: 'Lab', detail: ':3000  /' },
    zones: [
      { id: 'classic', label: 'Classic', detail: ':3001  /classic/**' },
      { id: 'motion', label: 'Motion', detail: ':3002  /motion/**' },
    ],
    caption: 'Next.js Multi-Zones: the entry app rewrites /classic/** and /motion/** to two independent apps.',
  },
  stack: [
    { name: 'Next.js 16', note: 'App Router, Multi-Zones' },
    { name: 'React 19', note: 'Server components' },
    { name: 'TypeScript', note: 'End to end' },
    { name: 'Tailwind CSS 4', note: 'Tokens per design' },
    { name: 'Motion', note: 'Reveals and scroll effects' },
    { name: 'Lenis', note: 'Smooth scrolling' },
    { name: 'View Transitions', note: 'Theme ripple' },
    { name: 'pnpm workspaces', note: 'One repo, three apps' },
  ],
} as const;

export const explore = {
  heading: 'How to explore',
  steps: [
    { title: 'Open a design', body: 'Pick Classic or Motion above. It loads as its own complete website.' },
    { title: 'Browse it', body: 'Every page is live: case studies, blog posts, industries and the project form.' },
    {
      title: 'Switch or come back',
      body: 'Use the pill in the bottom-left corner to jump to the other design or return to the lab.',
    },
  ],
} as const;

export const footer = {
  heading: 'Two directions. Pick one.',
  cta: { label: 'View the designs', href: '#designs' },
  credit: 'Designed & built by',
  repoLabel: 'Source on GitHub',
} as const;
