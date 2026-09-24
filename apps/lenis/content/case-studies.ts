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
 * All six studies are placeholder content (the card copy comes from the design
 * canvas; the detail pages for studies 2–6 were written to match). Replace them
 * with real, approved client work before launch.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'ledgerly',
    name: 'Ledgerly',
    industry: 'Accounting',
    image: { src: '/images/case-studies/ledgerly.svg', alt: 'Ledgerly deadline board', caption: 'Ledgerly deadline board' },
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
        src: '/images/case-studies/ledgerly.svg',
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
    image: { src: '/images/case-studies/fenwick-health.svg', alt: 'Fenwick Health intake screen', caption: 'Fenwick Health intake screen' },
    summary:
      'An AI receptionist and patient portal cut hold times and no-shows across four clinic locations.',
    metric: '62%',
    metricLabel: 'fewer missed appointments',
    placeholder: true,
    detail: {
      tags: ['Healthcare', 'AI receptionist'],
      headline: 'Fenwick Health: hold music out, patients back in the chair.',
      intro:
        'Fenwick Health runs four outpatient clinics with one shared front desk team. Phones rang all day, patients waited on hold to book or cancel, and missed appointments quietly cost every clinic several slots a day.',
      facts: [
        { label: 'Industry', value: 'Healthcare' },
        { label: 'Engagement', value: '12 weeks' },
        { label: 'Engineer', value: 'Nadia Voss' },
      ],
      hero: {
        src: '/images/case-studies/fenwick-health.svg',
        alt: 'Fenwick Health intake screen with a new patient form and booking calendar',
        caption: 'Screenshot: Fenwick Health intake screen with a new patient form and booking calendar',
      },
      metrics: [
        { value: '62%', label: 'fewer missed appointments across all four clinics' },
        { value: '71%', label: 'shorter average hold time for patients calling in' },
        { value: '4', label: 'clinic locations on one intake and booking flow' },
      ],
      challenge: {
        heading: 'The front desk spent the day on the phone, not with patients.',
        paragraphs: [
          'Booking, rescheduling and insurance questions all came through the same phone lines. At peak hours callers waited several minutes on hold, and many simply hung up, and then did not show up for the appointment they could not change.',
          'Each clinic had drifted into its own intake paperwork. Nothing connected the phone, the calendar and the patient record, so staff re-keyed the same details two or three times a visit.',
        ],
      },
      approach: [
        {
          n: '01',
          title: 'A week on the front desk',
          body: 'The engineer worked alongside reception at the busiest clinic, logging every call type and every handoff, to find which requests could be answered without a person.',
        },
        {
          n: '02',
          title: 'An AI receptionist with a clear handoff',
          body: 'Booking, cancellations and reminders run automatically, with anything clinical or unusual routed straight to a human, along with the full context of the call.',
        },
        {
          n: '03',
          title: 'One intake flow for four clinics',
          body: 'A shared patient portal for forms, updates and messages replaced four sets of paperwork, then the front desk was trained to own it.',
        },
      ],
      result: {
        heading: 'Fewer empty chairs, and a front desk that can look up.',
        paragraph:
          'Patients now book, confirm and reschedule without waiting on hold, reminders go out automatically, and reception spends its time with the people standing in front of it instead of the phone.',
        outcomes: [
          'Routine calls handled around the clock without a queue',
          'Automatic reminders and easy rescheduling cut no-shows',
          'One patient portal for forms and messages across all clinics',
        ],
      },
      quote: {
        quote:
          'We stopped losing patients to hold music. Front desk staff now spend their time with the people in front of them.',
        name: 'Priya Raman',
        role: 'Practice Manager, Fenwick Health',
        initials: 'PR',
        placeholder: true,
      },
    },
  },
  {
    slug: 'northline-logistics',
    name: 'Northline Logistics',
    industry: 'Logistics',
    image: { src: '/images/case-studies/northline-logistics.svg', alt: 'Northline dispatch dashboard', caption: 'Northline dispatch dashboard' },
    summary:
      'Migrated a 15-year-old order system to a modern core with zero lost orders during cutover.',
    metric: '3 wks',
    metricLabel: 'parallel run to full cutover',
    placeholder: true,
    detail: {
      tags: ['Logistics', 'Modernization'],
      headline: 'Northline Logistics: a 15-year-old order system, retired without losing an order.',
      intro:
        'Northline moves freight for regional retailers from three warehouses. Its orders, inventory and billing all ran on a custom system built fifteen years ago, which everyone worked around and nobody wanted to touch.',
      facts: [
        { label: 'Industry', value: 'Logistics' },
        { label: 'Engagement', value: '14 weeks' },
        { label: 'Engineer', value: 'Tomás Reyes' },
      ],
      hero: {
        src: '/images/case-studies/northline-logistics.svg',
        alt: 'Northline dispatch dashboard with live routes and order statuses',
        caption: 'Screenshot: Northline dispatch dashboard with live routes and order statuses',
      },
      metrics: [
        { value: '0', label: 'orders lost during the cutover weekend' },
        { value: '3 wks', label: 'parallel run on both systems before the full switch' },
        { value: '64', label: 'shipments tracked live on the new dispatch board' },
      ],
      challenge: {
        heading: 'Replacing the core meant risking every order in flight.',
        paragraphs: [
          'The old system held years of undocumented business rules. Two people understood it, and both were nervous about changing anything during the busy season, so the migration had been postponed three times.',
          'A big-bang switch was not an option: a single weekend of lost or duplicated orders would cost Northline its largest retail accounts.',
        ],
      },
      approach: [
        {
          n: '01',
          title: 'Mapped the rules nobody wrote down',
          body: 'The engineer traced real orders through the old system with the two people who knew it, turning tribal knowledge into documented, tested rules.',
        },
        {
          n: '02',
          title: 'A modern core, run in parallel',
          body: 'The new order and dispatch core ran side by side with the old one for three weeks, with every order reconciled nightly until the numbers matched.',
        },
        {
          n: '03',
          title: 'A calm, rehearsed cutover',
          body: 'Two dry runs, a written rollback plan, and a cutover weekend with the engineer on site. Then the team was trained and the runbooks handed over.',
        },
      ],
      result: {
        heading: 'The cutover weekend was the quiet one.',
        paragraph:
          'Northline now runs orders, inventory and dispatch on a documented, modern core. The rules that used to live in two people’s heads are written down and tested, and the team can change the system without fear.',
        outcomes: [
          'Zero lost or duplicated orders during the switch',
          'Live dispatch board showing every shipment in transit',
          'Documented business rules the whole team can maintain',
        ],
      },
      quote: {
        quote:
          "The cutover weekend was the calmest one we've had in a decade. Nothing broke, and nobody worked through the night.",
        name: 'Marcus Webb',
        role: 'VP Operations, Northline Logistics',
        initials: 'MW',
        placeholder: true,
      },
    },
  },
  {
    slug: 'havenly',
    name: 'Havenly',
    industry: 'Real Estate',
    image: { src: '/images/case-studies/havenly.svg', alt: 'Havenly buyer journey screen', caption: 'Havenly buyer journey screen' },
    summary:
      'One platform now carries a home buyer from pre-approval through search, financing and closing.',
    metric: '1',
    metricLabel: 'platform for the whole buyer journey',
    placeholder: true,
    detail: {
      tags: ['Real estate', 'Platform'],
      headline: 'Havenly: one platform from pre-approval to keys.',
      intro:
        'Havenly helps first-time buyers find and finance a home. Its team was juggling a CRM, a mortgage portal, email threads and shared folders, and buyers felt every gap between them.',
      facts: [
        { label: 'Industry', value: 'Real estate' },
        { label: 'Engagement', value: '10 weeks' },
        { label: 'Engineer', value: 'Leah Park' },
      ],
      hero: {
        src: '/images/case-studies/havenly.svg',
        alt: 'Havenly buyer journey screen showing the pipeline and an active offer',
        caption: 'Screenshot: Havenly buyer journey screen showing the pipeline and an active offer',
      },
      metrics: [
        { value: '1', label: 'platform for the whole buyer journey, down from five tools' },
        { value: '212', label: 'active buyers tracked in a single pipeline' },
        { value: '5', label: 'journey stages, each with a clear next step for the buyer' },
      ],
      challenge: {
        heading: 'Buyers kept falling through the gaps between tools.',
        paragraphs: [
          'Each stage of the journey lived in a different system. Advisors copied details from one to the next, and buyers were asked for the same documents again and again.',
          'Nobody could see the whole pipeline at once, so stalled offers and expiring approvals were often spotted too late.',
        ],
      },
      approach: [
        {
          n: '01',
          title: 'Followed buyers end to end',
          body: 'The engineer shadowed advisors through live deals, from first enquiry to handing over keys, mapping every handoff and repeated request.',
        },
        {
          n: '02',
          title: 'One pipeline, five clear stages',
          body: 'Enquiry, viewing, offer, conveyancing and keys in a single platform, with documents collected once and shared across every stage.',
        },
        {
          n: '03',
          title: 'Connected, not replaced',
          body: 'The mortgage partner and document signing were integrated rather than rebuilt, then the advisors were trained and the platform handed over.',
        },
      ],
      result: {
        heading: 'Every buyer, every stage, one place.',
        paragraph:
          'Advisors now see the whole pipeline at a glance and know exactly what each buyer needs next. Buyers upload documents once and can see where their purchase stands without chasing anyone.',
        outcomes: [
          'A single pipeline from first enquiry to handing over keys',
          'Documents collected once and reused at every stage',
          'Stalled offers and expiring approvals flagged automatically',
        ],
      },
      quote: {
        quote:
          'Our buyers used to ask where things stood every other day. Now they can see it themselves, and so can we.',
        name: 'Elena Brooks',
        role: 'Head of Operations, Havenly',
        initials: 'EB',
        placeholder: true,
      },
    },
  },
  {
    slug: 'practico',
    name: 'Practico',
    industry: 'Legal Services',
    image: { src: '/images/case-studies/practico.svg', alt: 'Practico matter intake screen', caption: 'Practico matter intake screen' },
    summary:
      'Matter intake, document generation and deadline tracking replaced a patchwork of templates and reminders.',
    metric: '40%',
    metricLabel: 'faster matter intake',
    placeholder: true,
    detail: {
      tags: ['Legal services', 'Workflow automation'],
      headline: 'Practico: matter intake in minutes, not days.',
      intro:
        'Practico is a 25-lawyer firm handling commercial disputes. New matters arrived by email and phone, and opening one meant a patchwork of templates, spreadsheets and calendar reminders.',
      facts: [
        { label: 'Industry', value: 'Legal' },
        { label: 'Engagement', value: '9 weeks' },
        { label: 'Engineer', value: 'Omar Haddad' },
      ],
      hero: {
        src: '/images/case-studies/practico.svg',
        alt: 'Practico matter intake screen with a new matter and its documents',
        caption: 'Screenshot: Practico matter intake screen with a new matter and its documents',
      },
      metrics: [
        { value: '40%', label: 'faster from first contact to an open, conflict-checked matter' },
        { value: '0', label: 'missed limitation dates since go-live' },
        { value: '27', label: 'new matters opened in the busiest week, without extra staff' },
      ],
      challenge: {
        heading: 'Every new matter started with copy and paste.',
        paragraphs: [
          'Conflict checks, engagement letters and deadline tracking were separate, manual steps. Details were re-typed from email into templates, then into a spreadsheet of limitation dates that one paralegal maintained.',
          'Generic practice management software did not match how Practico actually scoped and staffed a dispute, so the firm kept falling back on its own workarounds.',
        ],
      },
      approach: [
        {
          n: '01',
          title: 'Sat in on intake calls',
          body: 'The engineer worked with the intake team and two partners to map exactly how a matter is scoped, conflict-checked and staffed.',
        },
        {
          n: '02',
          title: 'One intake flow that drafts the paperwork',
          body: 'A single form runs the conflict check, generates the engagement letter and first documents, and puts every key date on the calendar.',
        },
        {
          n: '03',
          title: 'Deadlines that cannot slip',
          body: 'Limitation dates and court deadlines are tracked centrally with escalating reminders, then the team was trained and given runbooks.',
        },
      ],
      result: {
        heading: 'Matters open faster, and deadlines stay visible.',
        paragraph:
          'Opening a matter is now one guided flow instead of an afternoon of copying details between templates. Every deadline is tracked in one place, and the partners can see the firm’s whole caseload at a glance.',
        outcomes: [
          'Conflict checks and engagement letters generated from one intake form',
          'Every limitation date tracked with escalating reminders',
          'A live view of new matters and who is working on them',
        ],
      },
      quote: {
        quote:
          'Intake used to eat an afternoon per matter. Now it takes a single form, and the paperwork is waiting for us.',
        name: 'Rachel Mensah',
        role: 'Managing Partner, Practico',
        initials: 'RM',
        placeholder: true,
      },
    },
  },
  {
    slug: 'meridian-trades',
    name: 'Meridian Trades',
    industry: 'Field Services',
    image: { src: '/images/case-studies/meridian-trades.svg', alt: 'Meridian dispatch and quoting screen', caption: 'Meridian dispatch and quoting screen' },
    summary:
      "Scheduling, quoting and invoicing close the loop on site instead of in a truck at day's end.",
    metric: '18 hrs',
    metricLabel: 'saved weekly on dispatch',
    placeholder: true,
    detail: {
      tags: ['Field services', 'Dispatch'],
      headline: 'Meridian Trades: closing the loop on site, not in the truck.',
      intro:
        'Meridian runs six crews doing repairs, installs and callouts across a metro area. Jobs were scheduled on a whiteboard, quoted on paper, and invoiced at the end of the day from the cab of a van.',
      facts: [
        { label: 'Industry', value: 'Field services' },
        { label: 'Engagement', value: '8 weeks' },
        { label: 'Engineer', value: 'Kai Lindqvist' },
      ],
      hero: {
        src: '/images/case-studies/meridian-trades.svg',
        alt: 'Meridian dispatch and quoting screen with a crew schedule and a quote',
        caption: 'Screenshot: Meridian dispatch and quoting screen with a crew schedule and a quote',
      },
      metrics: [
        { value: '18 hrs', label: 'saved every week on dispatch and paperwork' },
        { value: '6', label: 'crews scheduled from one live board' },
        { value: '23', label: 'jobs dispatched on a typical day without a phone round' },
      ],
      challenge: {
        heading: 'The office found out what happened on site the next morning.',
        paragraphs: [
          'Dispatch meant a round of phone calls every morning, and any change during the day meant another round. Quotes were written by hand and often re-typed back at the office.',
          'Invoices went out days after a job was finished, and missing details meant chasing crews for photos and parts lists long after they had moved on.',
        ],
      },
      approach: [
        {
          n: '01',
          title: 'Rode along with the crews',
          body: 'The engineer spent days in the vans and in the office, mapping how jobs were scheduled, quoted, changed and billed.',
        },
        {
          n: '02',
          title: 'A live board and quoting on site',
          body: 'One dispatch board for all six crews, and a phone app for quoting, photos and sign-off on site, feeding straight into invoicing.',
        },
        {
          n: '03',
          title: 'Handed over to the office',
          body: 'The office manager was trained to run dispatch and pricing, with runbooks for adding crews and job types as the business grows.',
        },
      ],
      result: {
        heading: 'Jobs are quoted, done and invoiced before the van leaves.',
        paragraph:
          'Crews see their day on one board and changes reach them instantly. Quotes and sign-off happen on site, and invoices go out the same day, so the office spends its time on customers rather than paperwork.',
        outcomes: [
          'One live dispatch board for every crew',
          'Quotes, photos and sign-off captured on site',
          'Same-day invoicing instead of end-of-week catch-up',
        ],
      },
      quote: {
        quote:
          'Our crews used to do the paperwork in the truck at night. Now the job is closed before they pull away.',
        name: 'Ines Castillo',
        role: 'Operations Manager, Meridian Trades',
        initials: 'IC',
        placeholder: true,
      },
    },
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
