import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostBody } from '@/components/pages/blog/post-body';
import { BackLink } from '@/components/sections/back-link';
import { CtaBand } from '@/components/sections/cta-band';
import { Avatar, Placeholder } from '@/components/ui/placeholder';
import { formatPostDate, getPost, getPublishedPosts, postCta } from '@/content/posts';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header className="grid-paper">
          <div className="container-site flex flex-col gap-4 pt-7 md:items-center md:gap-[22px] md:pt-12 md:pb-12 xl:pt-14 xl:pb-14">
            <div className="md:self-start">
              <BackLink href="/blog" label="All posts" />
            </div>
            <div className="flex flex-col gap-4 md:max-w-[800px] md:items-center md:gap-[18px] md:text-center">
              <ul className="flex flex-wrap gap-2 md:justify-center" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
              <h1 className="type-display">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-2.5 md:justify-center md:gap-3">
                <Avatar initials={post.author.initials} image={post.author.avatar} className="size-8 md:size-9" />
                <span className="text-[13px] leading-none font-medium md:text-sm">{post.author.name}</span>
                <span aria-hidden="true" className="type-mono">
                  ·
                </span>
                <time dateTime={post.date} className="type-mono">
                  {formatPostDate(post.date)}
                </time>
                <span aria-hidden="true" className="type-mono">
                  ·
                </span>
                <span className="type-mono">{post.readMinutes} min read</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-site pt-5 md:pt-0">
          <Placeholder
            slot={post.hero}
            priority
            sizes="(min-width: 1440px) 1200px, 100vw"
            className="h-[200px] rounded-xl md:h-[380px] xl:h-[520px] xl:rounded-2xl"
          />
        </div>

        <div className="container-site py-8 md:py-16 xl:py-20">
          <div className="mx-auto max-w-[720px]">
            <PostBody blocks={post.body} />
          </div>
        </div>

        <footer className="container-site pb-8 md:pb-16 xl:pb-20">
          <div className="card mx-auto flex max-w-[720px] items-center gap-4 p-6 xl:gap-5 xl:p-8">
            <Avatar initials={post.author.initials} image={post.author.avatar} className="size-[52px] xl:size-16" />
            <div className="flex flex-col gap-1.5 xl:gap-2">
              <p className="text-base leading-none font-semibold xl:text-[18px]">{post.author.name}</p>
              <p className="type-body text-[14px] md:text-[15px]">{post.author.bio}</p>
            </div>
          </div>
        </footer>
      </article>

      <CtaBand
        heading={postCta.heading}
        action={postCta.action}
        tone="dark"
        insetOnMobile
        headingClassName="xl:text-[42px]"
      />
    </>
  );
}
