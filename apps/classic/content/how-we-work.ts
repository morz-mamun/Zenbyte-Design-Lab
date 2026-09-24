import type { Link, NumberedItem, Phase } from './types';

export const meta = {
  title: 'How we work',
  description:
    'No 40-page spec, no 200-feature rollout. An embedded engineer finds the gap between what your tools promise and what actually happens, and builds a lean core around it.',
};

export const hero = {
  eyebrow: 'How we work',
  heading: 'We deploy inside the business first, then we build.',
  lead: 'No 40-page spec, no 200-feature rollout. An embedded engineer finds the gap between what your tools promise and what actually happens, builds a lean core around it, and leaves you with a system your team can run.',
};

export const principles = {
  eyebrow: 'Principles',
  heading: "Three rules we don't bend.",
  items: [
    {
      n: '01',
      title: "We start with what's actually broken",
      body: 'Not a requirements document. The most useful insight is usually the problem no demo ever shows: the part that lives between what the tools are supposed to do and what happens when real work runs through them.',
    },
    {
      n: '02',
      title: 'We deploy a lean core, shaped to the work',
      body: 'Not a rollout where most features go unused. A small, modern, often AI-native core built around how your team operates. The workarounds people rely on are usually the edge worth building in.',
    },
    {
      n: '03',
      title: 'The engineer is accountable, not the ticket queue',
      body: 'The person who learns your process is the person who builds, demos and ships. No handoffs between a sales team, a spec and a delivery team that has never met yours.',
    },
  ] satisfies NumberedItem[],
};

export const roadmap = {
  eyebrow: 'The roadmap',
  heading: 'Most deployments follow the same twelve-week shape.',
  lead: 'Working software to review every week, not status updates and a long wait.',
  phases: [
    {
      week: 'Week 1–2',
      title: 'We move in',
      body: 'An engineer joins your team, learns the systems and the people, and agrees a clear scope before anything is built.',
      output: 'Output: scope, access, first workflow mapped',
    },
    {
      week: 'Week 3',
      title: 'Something real, in staging',
      body: 'Working and testable early, in a real environment, so feedback starts while it is still cheap to act on.',
      output: 'Output: first workflow running in staging',
    },
    {
      week: 'Week 4–10',
      title: 'Deploy, demo, repeat',
      body: 'A steady rhythm of sprints with a working demo every week. Tangible progress, reviewed by the people who will use it.',
      output: 'Output: weekly demo, working software',
    },
    {
      week: 'Week 10–12',
      title: 'Go live and transfer',
      body: 'Live in production, with everything your team needs to run it, and the option of an engineer staying embedded.',
      output: 'Output: production launch, runbooks, trained team',
    },
  ] satisfies Phase[],
};

export const fit = {
  eyebrow: 'Who this is for',
  heading: 'Honest about fit, early.',
  fitTitle: "We're a fit when",
  fit: [
    'The work is genuinely particular to how you operate.',
    'The process keeps bending to match the tools instead of the other way around.',
    'The hard part is where real data and real integrations meet.',
    'You want one accountable engineer, not a rotating cast.',
  ],
  notFitTitle: "We're probably not the call when",
  notFit: [
    'The need is common and a configurable SaaS would do the job.',
    'You want a hands-off vendor and a weekly status email.',
    "An engineer can't get access to the team and the systems.",
  ],
  note: "If it isn't a fit, we'll tell you on the first call, not in the third week.",
};

export const cta = {
  heading: 'Tell us where it breaks.',
  action: { label: 'Talk to an engineer', href: '/start-a-project' } satisfies Link,
};
