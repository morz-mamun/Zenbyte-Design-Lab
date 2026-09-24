import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostBody } from '@/components/pages/blog/post-body';
import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
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
        <header className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 glow [--glow:0.10]"
          />
          <div className="container-site relative flex flex-col gap-8 pt-10 pb-12 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20">
            <Reveal trigger="intro" distance={12}>
              <BackLink href="/blog" label="All posts" />
            </Reveal>
            <Reveal trigger="intro" distance={12}>
              <ul className="flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
            <SplitText as="h1" text={post.title} by="word" trigger="intro" className="type-display-sm max-w-[1200px]" />
            <Reveal trigger="intro" delay={0.4} className="flex flex-wrap items-center gap-3">
              <Avatar initials={post.author.initials} image={post.author.avatar} className="size-9" />
              <span className="text-sm leading-none font-medium">{post.author.name}</span>
              <span aria-hidden="true" className="type-mono">
                ·
              </span>
              <time dateTime={post.date} className="type-mono uppercase">
                {formatPostDate(post.date)}
              </time>
              <span aria-hidden="true" className="type-mono">
                ·
              </span>
              <span className="type-mono uppercase">{post.readMinutes} min read</span>
            </Reveal>
          </div>
        </header>

        <Reveal trigger="intro" delay={0.5} className="container-site">
          <Placeholder
            slot={post.hero}
            priority
            sizes="(min-width: 1440px) 1200px, 100vw"
            className="h-[220px] rounded-2xl md:h-[420px] xl:h-[600px]"
          />
        </Reveal>

        <div className="container-site py-12 md:py-20 xl:py-28">
          <div className="mx-auto max-w-[720px]">
            <PostBody blocks={post.body} />
          </div>
        </div>

        <footer className="container-site pb-16 md:pb-20 xl:pb-28">
          <div className="card mx-auto flex max-w-[720px] items-center gap-5 p-6 xl:p-8">
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
      />
    </>
  );
}
