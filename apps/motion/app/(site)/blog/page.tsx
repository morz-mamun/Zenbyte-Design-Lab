import type { Metadata } from 'next';

import { PostCard } from '@/components/pages/blog/post-card';
import { PageHero } from '@/components/sections/page-hero';
import { getPostsSorted, listing, meta } from '@/content/posts';

export const metadata: Metadata = meta;

export default function BlogPage() {
  const posts = getPostsSorted();

  return (
    <>
      <PageHero
        eyebrow={listing.eyebrow}
        title={listing.heading}
        lead={listing.lead}
        titleClassName="max-w-[1040px]"
        leadClassName="max-w-[720px]"
      />
      <section aria-label="Posts" className="pt-4 pb-12 md:pt-8 md:pb-[72px] xl:pt-10 xl:pb-[100px]">
        <ul className="container-site grid gap-5 md:grid-cols-2 xl:gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
