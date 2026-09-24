import { siteConfig } from '@/constants/site-config';
import type { DiagramContent, Link, NumberedItem } from './types';

export const meta = {
  title: 'For vendors',
  description: `${siteConfig.name} fields embedded engineering pods on a vendor's behalf, under your brand or white-labeled, so deployment stops being the gap between a signature and a live customer.`,
};

export const hero = {
  eyebrow: 'For vendors',
  heading: "Signed deals shouldn't wait on a hire you haven't made yet.",
  lead: `${siteConfig.name} fields embedded engineering pods on a vendor's behalf, under your brand or white-labeled, so deployment stops being the gap between a signature and a live customer.`,
  action: { label: 'Book a capacity call', href: '/start-a-project' } satisfies Link,
  /** Placeholder account names from the design. */
  diagram: {
    before: {
      title: 'Your pipeline',
      meta: 'signed',
      rows: [
        { label: 'Vantage Robotics', state: 'awaiting deployment', open: true },
        { label: 'Clearline Payments', state: 'awaiting deployment', open: true },
        { label: 'Origin Analytics', state: 'awaiting deployment', open: true },
      ],
    },
    badge: 'POD',
    pillTitle: 'Embedded pod',
    pillMeta: 'under your name',
    after: {
      title: 'Live at customer',
      meta: 'deployed',
      rows: [
        { label: 'Vantage Robotics', state: 'live', open: false },
        { label: 'Clearline Payments', state: 'live', open: false },
      ],
    },
  } satisfies DiagramContent,
};

export const benefits = {
  eyebrow: 'What you get',
  heading: 'A pod that scales with the pipeline, not against your hiring plan.',
  items: [
    {
      n: '01',
      title: 'No ramp-up tax',
      body: 'Engineers who have shipped this kind of work before, on your product from the first week. No juniors to manage into shape.',
    },
    {
      n: '02',
      title: 'Your name, or none',
      body: 'Run the pod under your brand or invisibly inside your team. Your call, account by account.',
    },
    {
      n: '03',
      title: 'Capacity that follows deals',
      body: 'Pods flex up and down as the pipeline moves, without the hiring risk or an idle bench.',
    },
    {
      n: '04',
      title: 'Go-live stops stalling',
      body: 'The role that gates deployment is covered, so signed contracts turn into live customers.',
    },
  ] satisfies NumberedItem[],
};

export const models = {
  eyebrow: 'Two models',
  heading: 'Two ways to field a pod.',
  items: [
    {
      label: 'Branded',
      title: 'Your name, our engineers.',
      body: 'Engineers show up to your customers as part of your delivery organization: your brand, your processes, your email domain. You keep the relationship, we supply the capacity.',
    },
    {
      label: 'White-labeled',
      title: `No ${siteConfig.name} anywhere.`,
      body: 'Contracts, handovers and support all run through you. Customers only ever see your team, and the work ships as yours from kickoff to go-live.',
    },
  ],
};

export const cta = {
  heading: 'Tell us what your pipeline looks like.',
  action: { label: 'Book a capacity call', href: '/start-a-project' } satisfies Link,
};
