import type {
  DiagramContent,
  ImageSlot,
  Link,
  NumberedItem,
  Phase,
  Stat,
  StatusPanel,
  Testimonial,
} from './types';

const rows = (items: [label: string, state: string, open: boolean][]) =>
  items.map(([label, state, open]) => ({ label, state, open }));

export const hero = {
  eyebrow: 'Forward-deployed engineering',
  headline: { before: 'The demo works. The ', emphasis: 'deployment', after: ' is where it breaks.' },
  lead: 'ZenByte embeds forward-deployed engineers inside your operation to deploy our platform, wire it into your systems, and adapt it to how your teams really work. A first version goes live in weeks, not quarters.',
  primary: { label: 'Talk to an engineer', href: '/start-a-project' } satisfies Link,
  secondary: { label: 'See where we deploy', href: '/industries' } satisfies Link,
  stats: [
    { value: '34', label: 'Deployments live', placeholder: true },
    { value: '21', label: 'Days to first deploy', placeholder: true },
    { value: '19', label: 'Engineers embedded', placeholder: true },
  ] satisfies Stat[],
  diagram: {
    before: {
      title: 'Your operation',
      meta: '4 workarounds',
      rows: rows([
        ['CRM', 'duplicate entry', true],
        ['Email', 'manual step', true],
        ['Billing', 'integration gap', true],
        ['Approvals', 'blocked', true],
      ]),
    },
    badge: 'FDE',
    pillTitle: 'Embedded engineer',
    pillMeta: 'on-site from week 1',
    after: {
      title: 'Deployed',
      meta: '0 workarounds',
      rows: rows([
        ['Account provisioning', 'automated', false],
        ['CRM and billing sync', 'connected', false],
        ['Approval routing', 'one click', false],
      ]),
    },
  } satisfies DiagramContent,
};

export const approach = {
  eyebrow: 'Our approach',
  heading: 'We deploy inside the business first, then we build.',
  steps: [
    {
      n: '1',
      title: 'We start where the work actually happens',
      body: 'No 40-page requirements doc. Your engineer sits with the team, watches the real workflow, and finds the gap between what your tools promise and what people do by hand at 4pm on a Friday.',
      panel: {
        title: 'field-log.md',
        rows: rows([
          ['Provisioning done in a spreadsheet', 'Mon', true],
          ['Three accounts created by hand', 'Mon', true],
          ['Approvals wait in an inbox', 'Tue', true],
        ]),
      },
    },
    {
      n: '2',
      title: 'We deploy a lean core, shaped to the work',
      body: 'Not a 200-feature rollout where most of it sits unused. We configure and extend the platform around your actual process, and build the integrations and edge cases nobody else will touch.',
      panel: {
        title: 'core / 3 modules',
        rows: rows([
          ['Access provisioning', 'live', false],
          ['CRM and billing sync', 'live', false],
          ['Approval routing', 'staging', true],
        ]),
      },
    },
    {
      n: '3',
      title: 'We stay until it runs, then hand it over',
      body: "Your team is trained, runbooks are written, and access is yours. Keep an engineer embedded if you want one. If you don't, nothing breaks the day we leave.",
      panel: {
        title: 'handover checklist',
        rows: rows([
          ['Runbooks and docs', 'done', false],
          ['Access and credentials', 'done', false],
          ['Engineer stays embedded', 'optional', true],
        ]),
      },
    },
  ] satisfies (NumberedItem & { panel: StatusPanel })[],
};

export const logoStrip = {
  label: 'Deployed inside teams at',
  /** Placeholder client names — replace with real logos (ImageSlot) before launch. */
  logos: [
    'Ledgerly',
    'Fenwick Health',
    'Northline Logistics',
    'Havenly',
    'Practico',
    'Meridian Trades',
  ],
  placeholder: true,
};

export const whatWeDeploy = {
  eyebrow: 'What we deploy',
  heading: 'Software that fits the way your business actually runs.',
  cta: { label: 'See everything we deploy', href: '/industries' } satisfies Link,
  items: [
    {
      tag: 'Automation',
      title: 'Run operations without the spreadsheet sprawl.',
      body: "Workflow automation, client portals and approval routing, deployed around how your team already works, so busywork stops being someone's job.",
      rows: rows([
        ['Client intake', 'live', false],
        ['Deadline reminders', 'live', false],
        ['Status reports', 'staging', true],
      ]),
    },
    {
      tag: 'Integrations',
      title: 'Make your tools work as one.',
      body: 'The hard part of any deployment is where real data meets real systems. Our engineers wire your CRM, billing, email and docs into one system that holds.',
      rows: rows([
        ['CRM', 'connected', false],
        ['Billing', 'connected', false],
        ['Email', 'pending', true],
      ]),
    },
    {
      tag: 'Agents and LLMs',
      title: 'AI that holds up in production.',
      body: 'Agents, retrieval, guardrails and monitoring, deployed and tuned on your data by an engineer accountable for day 200, not just the demo.',
      rows: rows([
        ['Retrieval over your docs', 'live', false],
        ['Guardrail check', 'passed', false],
        ['Escalation to a human', 'staging', true],
      ]),
    },
    {
      tag: 'Modernization',
      title: "Replace the system you've outgrown.",
      body: 'The old platform everyone works around and nobody wants to touch. We replatform it carefully: same operation, fewer landmines, room to grow.',
      rows: rows([
        ['Data migration', 'validated', false],
        ['Parallel run', 'in progress', true],
        ['Cutover', 'planned', true],
      ]),
    },
  ],
};

export const timeline = {
  eyebrow: 'How it works',
  heading: 'Most deployments follow the same twelve-week shape.',
  lead: 'A working demo every week, in front of the people who will use it. Not status updates and a long wait.',
  cta: { label: 'See how we work', href: '/how-we-work' } satisfies Link,
  phases: [
    {
      week: 'Week 1–2',
      title: 'We move in',
      body: 'An engineer joins your team, learns the systems and the people, and agrees a clear scope before anything is built.',
    },
    {
      week: 'Week 3',
      title: 'Something real, in staging',
      body: 'Working, testable software in a real environment early. No long wait to see anything.',
    },
    {
      week: 'Week 4–10',
      title: 'Deploy, demo, repeat',
      body: 'A steady rhythm of sprints with a working demo every week, in front of the people who will use it.',
    },
    {
      week: 'Week 10–12',
      title: 'Go live and transfer',
      body: 'Live in production, your team trained and runbooks written, with the option of an engineer staying embedded.',
    },
  ] satisfies Phase[],
};

export const proof = {
  eyebrow: 'Proof',
  heading: 'Live in production, inside the teams that depend on it.',
};

export const testimonials = {
  eyebrow: 'After go-live',
  heading: 'Teams that had an engineer in the room.',
  items: [
    {
      quote:
        'Our engineer sat with the billing team for two weeks before writing a line of code. The system we got actually matches how we work.',
      name: 'Dana Okafor',
      role: 'COO, Ledgerly',
      placeholder: true,
    },
    {
      quote:
        'We stopped losing patients to hold music. Front desk staff now spend their time with the people in front of them.',
      name: 'Priya Raman',
      role: 'Practice Manager, Fenwick Health',
      placeholder: true,
    },
    {
      quote:
        "The cutover weekend was the calmest one we've had in a decade. Nothing broke, and nobody worked through the night.",
      name: 'Marcus Webb',
      role: 'VP Operations, Northline Logistics',
      placeholder: true,
    },
  ] satisfies Testimonial[],
};

export const startCta = {
  eyebrow: 'Start a project',
  heading: 'Tell us where it breaks.',
  lead: 'Describe the mess exactly as it is: the spreadsheet, the workaround, the system everyone complains about. An engineer will read it and come back within one business day.',
  image: {
    alt: 'A ZenByte engineer working alongside a client team',
    caption: '[Photo: a ZenByte engineer working alongside a client team]',
  } satisfies ImageSlot,
  primary: { label: 'Start a conversation', href: '/start-a-project' } satisfies Link,
  secondary: { label: "See if we're a fit", href: '/industries' } satisfies Link,
  steps: [
    { n: '01', title: 'Tell us where it breaks.', body: 'A short note. No prep, no spec.' },
    { n: '02', title: 'Get a scoped plan within a day.', body: "What we'd deploy, how long it takes, what it costs." },
    { n: '03', title: 'Meet your engineer.', body: 'The person who reads your note is the person who shows up.' },
  ] satisfies NumberedItem[],
};

export const vendorStrip = {
  chip: 'Vendors',
  text: 'Software vendor with a deployment bottleneck? We field embedded engineering pods under your name.',
  cta: { label: 'For vendors', href: '/for-vendors' } satisfies Link,
};
