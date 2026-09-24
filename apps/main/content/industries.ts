import type { ImageSlot, Link } from './types';

export type Industry = {
  n: string;
  slug: string;
  name: string;
  indexTag: string;
  tags: string[];
  headline: string;
  body: string;
  bullets: string[];
  cta: string;
  image: ImageSlot;
};

export const meta = {
  title: 'Industries',
  description:
    'Six kinds of teams where an engineer in the room changes the outcome: fintech, healthcare, logistics, professional services, field services and commerce.',
};

export const hero = {
  eyebrow: 'Where we deploy',
  heading: 'Six kinds of teams where an engineer in the room changes the outcome.',
  lead: "Embedded engineers, a lean and often AI-native core, a first version in weeks. If your industry isn't listed, the pattern matters more than the label.",
  primary: { label: 'Start a project', href: '/start-a-project' } satisfies Link,
  secondary: { label: 'See how we work', href: '/how-we-work' } satisfies Link,
  indexTitle: 'Industries',
  indexMeta: '06 / verticals',
};

export const industries: Industry[] = [
  {
    n: '01',
    slug: 'financial operations',
    name: 'Fintech and financial ops',
    indexTag: 'ops',
    tags: ['onboarding', 'reconciliation', 'audit'],
    headline: 'Compliance work runs on spreadsheets and heroics.',
    body: 'Onboarding, reviews and reconciliations stretch across five tools and one tired ops team. Generic platforms cover the average firm, not yours.',
    bullets: [
      'Onboarding and review workflows with an audit trail built in',
      'Reconciliation across ledgers, banks and billing',
      'AI that drafts, flags and chases the exceptions',
    ],
    cta: 'Talk to us about your operation →',
    image: { alt: 'An operations team in a review', caption: '[Photo: an ops team in a review]' },
  },
  {
    n: '02',
    slug: 'clinic software',
    name: 'Healthcare and clinics',
    indexTag: 'care',
    tags: ['intake', 'scheduling', 'reminders'],
    headline: 'Half the day goes to admin, not patients.',
    body: "Scheduling, intake, reminders and records pull staff away from the people they're there for. Most clinic software assumes a clinic that doesn't exist.",
    bullets: [
      'Scheduling, intake and reminders shaped to your clinic',
      'AI receptionists that answer, book and filter around the clock',
      'Patient portals for forms, updates and messages',
    ],
    cta: 'Talk to us about your clinic →',
    image: { alt: 'A clinic front desk', caption: '[Photo: a clinic front desk]' },
  },
  {
    n: '03',
    slug: 'logistics and tms',
    name: 'Logistics and supply chain',
    indexTag: 'tms',
    tags: ['orders', 'inventory', 'routing'],
    headline: 'The platform everyone works around and nobody wants to touch.',
    body: 'Orders, inventory and billing run on aging systems held together by workarounds. Replacing one is a risk nobody wants to own.',
    bullets: [
      'Migration planning, data migration and validation',
      'Parallel run and cutover with no lost days',
      'A modern, documented core your team can grow',
    ],
    cta: 'Talk to us about your system →',
    image: { alt: 'A warehouse floor', caption: '[Photo: a warehouse floor]' },
  },
  {
    n: '04',
    slug: 'professional services',
    name: 'Professional services',
    indexTag: 'matters',
    tags: ['matters', 'documents', 'deadlines'],
    headline: 'Your expertise is the product. Admin is the tax.',
    body: 'Intake, documents and deadlines eat hours that should go to the work itself, and tools built for the average firm never quite fit.',
    bullets: [
      'Matter and engagement workflows mapped to your practice',
      'Document intake, generation and retrieval over your files',
      'Deadline and obligation tracking with nothing slipping',
    ],
    cta: 'Talk to us about your practice →',
    image: { alt: 'A working session with documents', caption: '[Photo: a working session with documents]' },
  },
  {
    n: '05',
    slug: 'field service mgmt',
    name: 'Field services and construction',
    indexTag: 'dispatch',
    tags: ['dispatch', 'quotes', 'crews'],
    headline: 'Scheduling, quoting and dispatch still run on whiteboards.',
    body: "Trades lose hours to double bookings, quotes that never get sent and jobs that live in someone's truck.",
    bullets: [
      'Scheduling and dispatch around your jobs, crews and territories',
      'Quoting, invoicing and payment closed on site',
      'AI intake that answers, qualifies and books 24/7',
    ],
    cta: 'Talk to us about your operation →',
    image: { alt: 'A crew on a job site', caption: '[Photo: a crew on a job site]' },
  },
  {
    n: '06',
    slug: 'commerce ops',
    name: 'Commerce and marketplaces',
    indexTag: 'orders',
    tags: ['orders', 'returns', 'billing'],
    headline: 'Operations complexity scales faster than the storefront.',
    body: 'Orders, inventory, returns and support sprawl across tools that were never meant to talk to each other.',
    bullets: [
      'Order and inventory orchestration across channels',
      'Returns and support automation with AI in the loop',
      'Subscription and billing logic that matches your model',
    ],
    cta: 'Talk to us about your business →',
    image: { alt: 'A fulfillment or support team', caption: '[Photo: a fulfillment or support team]' },
  },
];

export const stillAFit = {
  eyebrow: 'Still a fit?',
  heading: "Don't see your industry?",
  body: "We're a fit when the work is genuinely particular, the process keeps bending to match the tools, and the hard part is where real data meets real systems. Insurance, staffing, education, energy: if a generic tool almost fits, an engineer in the room usually closes the gap.",
  action: { label: 'Tell us where it breaks', href: '/start-a-project' } satisfies Link,
};
