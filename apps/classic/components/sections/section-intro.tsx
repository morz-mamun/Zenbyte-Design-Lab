import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionIntroProps = {
  eyebrow: string;
  heading: ReactNode;
  lead?: string;
  /** `dark`: light text and accent eyebrow for ink sections. */
  tone?: 'light' | 'dark';
  headingId?: string;
  className?: string;
  headingClassName?: string;
};

/** Eyebrow + h2 (+ optional lead) block that opens most sections. */
export function SectionIntro({
  eyebrow,
  heading,
  lead,
  tone = 'light',
  headingId,
  className,
  headingClassName,
}: SectionIntroProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('flex flex-col gap-3.5 xl:gap-5', className)}>
      <p className={cn('eyebrow', dark && 'text-accent')}>{eyebrow}</p>
      <h2 id={headingId} className={cn('type-h2', dark && 'text-paper', headingClassName)}>
        {heading}
      </h2>
      {lead && <p className={cn('type-lead', dark && 'text-on-dark')}>{lead}</p>}
    </div>
  );
}
