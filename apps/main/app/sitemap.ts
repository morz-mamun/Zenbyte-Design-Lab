import type { MetadataRoute } from 'next';

import { siteConfig } from '@/constants/site-config';
import { getCaseStudiesWithDetail } from '@/content/case-studies';
import { getPublishedPosts } from '@/content/posts';

const staticRoutes = [
  '',
  '/how-we-work',
  '/industries',
  '/case-studies',
  '/blog',
  '/for-vendors',
  '/start-a-project',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const caseStudies: MetadataRoute.Sitemap = getCaseStudiesWithDetail().map((study) => ({
    url: `${siteConfig.url}/case-studies/${study.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const posts: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...pages, ...caseStudies, ...posts];
}
