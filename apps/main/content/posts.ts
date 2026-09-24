import { siteConfig } from '@/constants/site-config';
import type { Author, Link, Post } from './types';

export const meta = {
  title: 'Blog',
  description:
    'Practical notes on forward-deployed engineering, scoping the first weeks on-site, and handing over systems your team can run.',
};

export const listing = {
  eyebrow: 'Blog',
  heading: 'How we think about software that actually gets used.',
  lead: meta.description,
  readMore: 'Read the note →',
};

export const postCta = {
  heading: 'Tell us where it breaks.',
  action: { label: 'Talk to an engineer', href: '/start-a-project' } satisfies Link,
};

/** Placeholder author from the design canvas. */
const jordanKim: Author = {
  name: 'Jordan Kim',
  initials: 'JK',
  bio: `Forward-deployed engineer at ${siteConfig.name}, currently embedded with a logistics team replatforming a decade-old order system.`,
};

/**
 * Posts from the design canvas. Only the first has a written body; the rest
 * are listed on the index until their bodies are written.
 */
export const posts: Post[] = [
  {
    slug: 'what-a-forward-deployed-engineer-does-all-day',
    title: 'What a forward-deployed engineer actually does all day',
    excerpt:
      'Less slide-making, more sitting next to the person who does the work. A look at a typical week on-site.',
    date: '2026-09-15',
    tags: ['fde', 'process'],
    author: jordanKim,
    readMinutes: 6,
    hero: {
      alt: "An engineer at a client's desk, laptop open next to theirs",
      caption: "Photo: an engineer at a client's desk, laptop open next to theirs",
    },
    placeholder: true,
    body: [
      {
        type: 'paragraph',
        text: "Most people picture an engineer at a desk, headphones on, shipping code in isolation. A forward-deployed engineer's week looks almost nothing like that. On a typical Tuesday you'll find them in a conference room watching an office manager reconcile a spreadsheet by hand, or on a call with a client's IT admin arguing about API rate limits, or rewriting a data model at 4pm because the morning's assumptions turned out to be wrong.",
      },
      {
        type: 'paragraph',
        text: "On a recent engagement with an accounting firm, the engineer spent the first three days doing nothing that looked like engineering at all. He sat next to the person who ran busy season, watched her copy numbers between two spreadsheets and a shared inbox, and asked why, every time something didn't fit the plan. By day four he had a shortlist of the two workflows that actually mattered — not the ten the kickoff call had assumed.",
      },
      { type: 'heading', text: "The job is mostly listening, until it suddenly isn't" },
      {
        type: 'paragraph',
        text: 'The engineering itself compresses into a much smaller window than people expect. Once the real workflow is mapped, building the first version is often the fastest part of the whole engagement — a matter of days, not weeks, because the scope has already been cut down to what actually matters.',
      },
      {
        type: 'paragraph',
        text: 'What makes the difference is what happens in between: the practices that separate a deployment that sticks from one that quietly gets replaced by the old spreadsheet six months later.',
      },
      {
        type: 'list',
        items: [
          'Shadow the actual workflow before touching a requirements doc — the gap is almost never where the kickoff call assumed it would be.',
          'Build the smallest core that fixes the real bottleneck first, then let the client ask for more instead of guessing what they’ll need.',
          'Stay through the first busy cycle after go-live — that’s when the old workaround tries to creep back in.',
        ],
      },
      {
        type: 'quote',
        text: 'The best forward-deployed engineers spend their first week collecting reasons not to build something.',
      },
      { type: 'heading', text: "What this means if you're evaluating a deployment" },
      {
        type: 'paragraph',
        text: "If the person proposing your solution has never sat with the team that will use it, be skeptical of the timeline they're giving you. The weeks that look slow at the start are usually what make the weeks after go-live boring — in the good sense, where nothing breaks and nobody quietly reverts to the old spreadsheet.",
      },
    ],
  },
  {
    slug: 'why-deployment-is-where-projects-fail',
    title: 'Why deployment, not development, is where projects fail',
    excerpt:
      'The software usually works. What breaks is the gap between the product and the way a real team operates.',
    date: '2026-08-28',
    tags: ['deployment'],
    author: jordanKim,
    readMinutes: 5,
    hero: { alt: '', caption: 'Photo: a team reviewing a deployment' },
    placeholder: true,
  },
  {
    slug: 'how-we-scope-the-first-two-weeks',
    title: 'How we scope the first two weeks on-site',
    excerpt:
      'No 40-page spec. We agree a lean core, map one real workflow, and put something testable in staging by week three.',
    date: '2026-08-10',
    tags: ['process', 'sprints'],
    author: jordanKim,
    readMinutes: 5,
    hero: { alt: '', caption: 'Photo: a scoping session on-site' },
    placeholder: true,
  },
  {
    slug: 'embedded-engineer-or-consulting-team',
    title: 'An embedded engineer or a consulting team: how to choose',
    excerpt:
      'Both can ship. They differ in who is accountable, how fast feedback moves, and what happens after go-live.',
    date: '2026-07-22',
    tags: ['fde', 'comparison'],
    author: jordanKim,
    readMinutes: 5,
    hero: { alt: '', caption: 'Photo: an engineer pairing with a client' },
    placeholder: true,
  },
];

export type PublishedPost = Post & { body: NonNullable<Post['body']> };

export function postHref(post: Post): string | undefined {
  return post.body ? `/blog/${post.slug}` : undefined;
}

export function getPostsSorted(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedPosts(): PublishedPost[] {
  return getPostsSorted().filter((p): p is PublishedPost => Boolean(p.body));
}

export function getPost(slug: string): PublishedPost | undefined {
  const post = posts.find((p) => p.slug === slug);
  return post?.body ? (post as PublishedPost) : undefined;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2026-09-15" → "Sep 15, 2026" */
export function formatPostDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}
