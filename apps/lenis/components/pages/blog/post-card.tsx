import Link from 'next/link';

import { RollLabel } from '@/components/motion/roll-label';
import { ArrowRightIcon } from '@/components/ui/icons';
import { formatPostDate, listing, postHref } from '@/content/posts';
import type { Post } from '@/content/types';
import { cn } from '@/lib/utils';

/** Blog index card. Links to the post only when the post has a written body. */
export function PostCard({ post }: { post: Post }) {
  const href = postHref(post);
  const classes = cn(
    'card group flex h-full flex-col p-6 transition-[border-color,transform] duration-500 ease-out xl:min-h-[380px] xl:p-9',
    href && 'hover:-translate-y-1 hover:border-line motion-reduce:hover:translate-y-0',
  );

  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-1.5 md:gap-2" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <time dateTime={post.date} className="type-mono shrink-0 uppercase">
          {formatPostDate(post.date)}
        </time>
      </div>
      <h2 className="mt-8 font-display text-[32px] leading-[0.95] uppercase xl:mt-12 xl:text-[48px]">{post.title}</h2>
      <p className="type-body mt-4">{post.excerpt}</p>
      {href && (
        <span className="mt-6 inline-flex items-center gap-2 text-[13px] leading-none font-medium tracking-[0.04em] text-accent-text uppercase md:mt-auto md:pt-8">
          <RollLabel>{listing.readMore}</RollLabel>
          <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      )}
    </>
  );

  return href ? (
    <Link href={href} data-cursor="Read" className={classes}>
      {content}
    </Link>
  ) : (
    <article className={classes}>{content}</article>
  );
}
