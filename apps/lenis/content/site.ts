import { siteConfig } from '@/constants/site-config';
import type { Link, NavItem } from './types';

export const primaryNav: NavItem[] = [
  { label: 'How we work', href: '/how-we-work', match: '/how-we-work' },
  { label: 'Industries', href: '/industries', match: '/industries' },
  { label: 'Case studies', href: '/case-studies', match: '/case-studies' },
  { label: 'Blog', href: '/blog', match: '/blog' },
  { label: 'For vendors', href: '/for-vendors', match: '/for-vendors' },
];

export const primaryCta: Link = { label: 'Start a project', href: '/start-a-project' };

export const footer = {
  tagline:
    'Forward-deployed engineers, embedded in your operation. Live in weeks, and running inside your business long after.',
  signoff: 'Engineers in the room, software in production.',
  columns: [
    {
      heading: 'Company',
      links: [
        { label: 'How we work', href: '/how-we-work' },
        { label: 'Where we deploy', href: '/industries' },
        { label: 'Case studies', href: '/case-studies' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      heading: 'Get started',
      links: [
        { label: 'Start a project', href: '/start-a-project' },
        { label: "See if we're a fit", href: '/industries' },
        { label: 'For vendors', href: '/for-vendors' },
      ],
    },
    {
      heading: 'Say hello',
      links: [
        { label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
        { label: `${siteConfig.name} on LinkedIn`, href: siteConfig.links.linkedin },
      ],
    },
  ] satisfies { heading: string; links: Link[] }[],
};
