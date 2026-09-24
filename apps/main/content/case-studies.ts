import type { CaseStudy, Link } from './types';

export const meta = {
  title: 'Case studies',
  description:
    'Six deployments across accounting, healthcare, logistics, real estate, legal and field services, each one shaped by an engineer embedded with the team, then handed over to run day to day.',
};

export const listing = {
  eyebrow: 'Proof',
  heading: 'Live in production, inside the teams that depend on it.',
  lead: meta.description,
};

export const cta = {
  heading: 'Your system could be next on this page.',
  action: { label: 'Talk to an engineer', href: '/start-a-project' } satisfies Link,
};

/**
 * All six studies are placeholder content from the design canvas. Replace
 * them with real, approved client work before launch.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'ledgerly',
    name: 'Ledgerly',
    industry: 'Accounting',
    image: { alt: 'Ledgerly deadline board', caption: 'Ledgerly deadline board' },
    summary:
      'Replaced five spreadsheets and a shared inbox with one system for deadlines, reviews and client documents.',
    metric: '0',
    metricLabel: 'dropped deadlines this busy season',
    placeholder: true,
    detail: {
      tags: ['Accounting', 'Workflow automation'],
      headline: 'Ledgerly: from five spreadsheets to zero dropped deadlines.',
      intro:
        'Ledgerly is a 40-person bookkeeping and tax practice serving small businesses across three states. Deadlines, reviews and client documents used to live in a shared inbox and a color-coded spreadsheet that only one person fully understood.',
      facts: [
        { label: 'Industry', value: 'Accounting' },
        { label: 'Engagement', value: '11 weeks' },
        { label: 'Engineer', value: 'Sam Alavi' },
      ],
      hero: {
        alt: 'Ledgerly deadline board, showing filings by client and status',
        caption: 'Screenshot: Ledgerly deadline board, showing filings by client and status',
      },
      metrics: [
        { value: '0', label: 'dropped deadlines this busy season, down from an average of 6' },
        { value: '31%', label: 'less time spent on status updates and chasing documents' },
        { value: '19', label: 'days from kickoff to the first working version in staging' },
      ],
      challenge: {
        heading: "Busy season ran on one spreadsheet and one person's memory.",
        paragraphs: [
          'Every filing deadline, every client document request, and every review status lived in a shared spreadsheet that got emailed around as an attachment. During busy season, two versions would drift apart within a day, and the office manager was the only person who could say with confidence what was actually overdue.',
          "Off-the-shelf practice management tools assumed a firm that reviewed work the way a template expected, not the way Ledgerly's partners actually signed off: informally, over Slack, often after hours. Nothing fit without forcing the firm to change how it worked.",
        ],
      },
      approach: [
        {
          n: '01',
          title: 'Two weeks shadowing busy season',
          body: 'The engineer sat with the office manager and two partners through a live review cycle, mapping exactly where the spreadsheet broke and who worked around it, and how.',
        },
        {
          n: '02',
          title: 'A deadline board, not a full platform',
          body: "One lean core: deadlines, review routing, and a client upload portal. No time tracking, no invoicing module Ledgerly didn't ask for and wouldn't use.",
        },
        {
          n: '03',
          title: 'Trained the team, then stepped back',
          body: "Runbooks, a recorded walkthrough, and two weeks of office hours after go-live. Ledgerly's ops lead now owns the system day to day.",
        },
      ],
      result: {
        heading: 'Busy season came and went without a dropped filing.',
        paragraph:
          'The deadline board is now the one place anyone at Ledgerly checks. Reviews route automatically to the right partner, clients upload documents straight into the system instead of email threads, and the office manager spends busy season managing exceptions instead of maintaining a spreadsheet.',
        outcomes: [
          'Every filing deadline tracked in one board, visible to the whole firm',
          'Client documents arrive through a portal instead of email threads',
          'Review sign-off now takes minutes instead of a hallway conversation',
        ],
      },
      quote: {
        quote:
          'Our engineer sat with the billing team for two weeks before writing a line of code. The system we got actually matches how we work.',
        name: 'Dana Okafor',
        role: 'COO, Ledgerly',
        initials: 'DO',
        placeholder: true,
      },
    },
  },
  {
    slug: 'fenwick-health',
    name: 'Fenwick Health',
    industry: 'Healthcare',
    image: { alt: 'Fenwick Health intake screen', caption: 'Fenwick Health intake screen' },
    summary:
      'An AI receptionist and patient portal cut hold times and no-shows across four clinic locations.',
    metric: '62%',
    metricLabel: 'fewer missed appointments',
    placeholder: true,
  },
  {
    slug: 'northline-logistics',
    name: 'Northline Logistics',
    industry: 'Logistics',
    image: { alt: 'Northline dispatch dashboard', caption: 'Northline dispatch dashboard' },
    summary:
      'Migrated a 15-year-old order system to a modern core with zero lost orders during cutover.',
    metric: '3 wks',
    metricLabel: 'parallel run to full cutover',
    placeholder: true,
  },
  {
    slug: 'havenly',
    name: 'Havenly',
    industry: 'Real Estate',
    image: { alt: 'Havenly buyer journey screen', caption: 'Havenly buyer journey screen' },
    summary:
      'One platform now carries a home buyer from pre-approval through search, financing and closing.',
    metric: '1',
    metricLabel: 'platform for the whole buyer journey',
    placeholder: true,
  },
  {
    slug: 'practico',
    name: 'Practico',
    industry: 'Legal Services',
    image: { alt: 'Practico matter intake screen', caption: 'Practico matter intake screen' },
    summary:
      'Matter intake, document generation and deadline tracking replaced a patchwork of templates and reminders.',
    metric: '40%',
    metricLabel: 'faster matter intake',
    placeholder: true,
  },
  {
    slug: 'meridian-trades',
    name: 'Meridian Trades',
    industry: 'Field Services',
    image: { alt: 'Meridian dispatch and quoting screen', caption: 'Meridian dispatch and quoting screen' },
    summary:
      "Scheduling, quoting and invoicing close the loop on site instead of in a truck at day's end.",
    metric: '18 hrs',
    metricLabel: 'saved weekly on dispatch',
    placeholder: true,
  },
];

export type PublishedCaseStudy = CaseStudy & { detail: NonNullable<CaseStudy['detail']> };

export function caseStudyHref(study: CaseStudy): string | undefined {
  return study.detail ? `/case-studies/${study.slug}` : undefined;
}

export function getCaseStudy(slug: string): PublishedCaseStudy | undefined {
  const study = caseStudies.find((s) => s.slug === slug);
  return study?.detail ? (study as PublishedCaseStudy) : undefined;
}

export function getCaseStudiesWithDetail(): PublishedCaseStudy[] {
  return caseStudies.filter((s): s is PublishedCaseStudy => Boolean(s.detail));
}

/** The study after `slug` in listing order, wrapping around to the first. */
export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  if (caseStudies.length < 2) return undefined;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}
