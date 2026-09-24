import Link from 'next/link';

import { BackIcon } from '@/components/ui/icons';

/** Breadcrumb back link used by the case-study and blog-post templates. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex w-fit items-center gap-2 text-muted hover:text-ink">
      <BackIcon className="size-3.5 md:size-4" />
      <span className="type-mono tracking-[0.06em] text-current uppercase">{label}</span>
    </Link>
  );
}
