import Link from 'next/link';

import { Placeholder } from '@/components/ui/placeholder';
import { caseStudyHref } from '@/content/case-studies';
import type { CaseStudy } from '@/content/types';
import { cn } from '@/lib/utils';

type CaseStudyCardProps = {
  study: CaseStudy;
  className?: string;
};

/**
 * Summary card for a case study. Links to the detail page only when the study
 * has detail content; otherwise it renders the same card without a link.
 */
export function CaseStudyCard({ study, className }: CaseStudyCardProps) {
  const href = caseStudyHref(study);
  const classes = cn('card flex flex-col overflow-hidden', className);

  const content = (
    <>
      <Placeholder
        slot={study.image}
        sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
        className="h-[150px] flex-none rounded-none border-0 border-b border-line md:h-[170px] xl:h-[190px]"
      />
      <div className="flex flex-1 flex-col p-[18px] md:p-5 xl:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="type-h3 text-[20px] md:text-[24px] xl:text-[26px]">{study.name}</h3>
          <span className="type-mono tracking-[0.06em] uppercase">{study.industry}</span>
        </div>
        <p className="type-body mt-2 mb-3 md:mt-2.5 md:mb-3.5 xl:mt-3 xl:mb-4">{study.summary}</p>
        <div className="mt-auto flex items-baseline gap-2.5 border-t border-line pt-3 md:pt-3.5 xl:gap-3 xl:pt-4">
          <span className="font-serif text-[32px] leading-none text-accent-ink md:text-[36px] xl:text-[44px]">
            {study.metric}
          </span>
          <span className="type-mono">{study.metricLabel}</span>
        </div>
      </div>
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
