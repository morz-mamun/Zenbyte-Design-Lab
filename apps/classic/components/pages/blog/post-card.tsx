import Link from 'next/link';

import { formatPostDate, listing, postHref } from '@/content/posts';
import type { Post } from '@/content/types';

/** Blog index card. Links to the post only when the post has a written body. */
export function PostCard({ post }: { post: Post }) {
  const href = postHref(post);
  const classes = 'card flex h-full flex-col p-6 xl:min-h-[320px] xl:p-8';

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
        <time dateTime={post.date} className="type-mono shrink-0">
          {formatPostDate(post.date)}
        </time>
      </div>
      <h2 className="type-h3 mt-4 text-[26px] xl:mt-6 xl:text-[36px]">{post.title}</h2>
      <p className="type-body mt-2.5 xl:mt-3.5">{post.excerpt}</p>
      {href && (
        <span className="mt-3.5 text-[15px] leading-none font-semibold text-accent-ink md:mt-auto md:pt-6">
          {listing.readMore}
        </span>
      )}
    </>
  );

  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <article className={classes}>{content}</article>
  );
}
