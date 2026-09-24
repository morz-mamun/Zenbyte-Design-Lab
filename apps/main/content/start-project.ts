import type { NumberedItem } from './types';

export const meta = {
  title: 'Start a project',
  description:
    'An engineer reads every note and comes back within one business day with a scoped plan: what we would deploy, how long it would take, and what it would cost.',
};

export const intro = {
  eyebrow: 'Start a project',
  heading: 'Tell us where it breaks.',
  lead: 'An engineer reads every note and comes back within one business day with a scoped plan: what we would deploy, how long it would take, and what it would cost.',
  promises: [
    'Scoped response within 24 hours',
    'NDA friendly',
    'You meet the engineer who would be on-site',
    'First deploy in staging within weeks',
  ],
};

export const nextSteps = {
  eyebrow: 'What happens next',
  steps: [
    { n: '01', title: 'You tell us where it breaks', body: 'A short note on where the work keeps snagging. No spec required.' },
    { n: '02', title: 'We scope it within a day', body: 'What we would deploy, how long it takes, and what it costs.' },
    { n: '03', title: 'An engineer moves in', body: 'Something real in staging early, then a working demo every week.' },
  ] satisfies NumberedItem[],
};

export const form = {
  title: 'Send us a note',
  submit: 'Send it over',
  pending: 'Sending…',
  success: 'Thanks. An engineer will read this and reply within one business day.',
};
