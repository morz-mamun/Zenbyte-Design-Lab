'use client';

import * as m from 'motion/react-m';
import Link from 'next/link';

import { CountUp } from '@/components/motion/count-up';
import { SplitText } from '@/components/motion/split-text';
import { Placeholder } from '@/components/ui/placeholder';
import { caseStudyHref } from '@/content/case-studies';
import type { CaseStudy } from '@/content/types';
import { cn } from '@/lib/utils';

type CaseStudyCardProps = {
  study: CaseStudy;
  /** Position in the grid; staggers the entrance across each row. */
  index?: number;
  className?: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Summary card for a case study. On scroll-in the image uncovers from the
 * bottom while settling from a slight zoom, the name rises letter by letter
 * and the metric counts up. On hover the image zooms and brightens, an accent
 * hairline draws across the top and the name slides. Links to the detail page
 * only when the study has detail content.
 */
export function CaseStudyCard({ study, index = 0, className }: CaseStudyCardProps) {
  const href = caseStudyHref(study);
  const delay = (index % 3) * 0.12;

  const classes = cn(
    'card group relative flex h-full flex-col overflow-hidden transition-[border-color] duration-500',
    href && 'hover:border-line',
    className,
  );

  // The card (always visible) decides when it is in view; the curtain and
  // zoom follow via variants. A fully clipped element can't trigger it itself.
  const content = (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative flex h-full w-full flex-col"
    >
      {/* Accent hairline that draws across the top on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-accent to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />

      {/* Curtain reveal: the frame uncovers upward while the image settles from a zoom */}
      <m.div
        data-reveal=""
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, delay, ease } },
        }}
        className="relative h-[200px] shrink-0 overflow-hidden border-b border-line-soft md:h-[220px] xl:h-[240px]"
      >
        <m.div
          data-reveal=""
          variants={{ hidden: { scale: 1.15 }, show: { scale: 1, transition: { duration: 1.6, delay, ease } } }}
          className="h-full w-full"
        >
          <div
            className={cn(
              'h-full w-full brightness-90 transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]',
              href && 'group-hover:scale-[1.06] group-hover:brightness-110 motion-reduce:group-hover:scale-100',
            )}
          >
            <Placeholder
              slot={study.image}
              sizes="(min-width: 1280px) 440px, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full rounded-none border-0"
            />
          </div>
        </m.div>
      </m.div>

      <m.div
        data-reveal=""
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: delay + 0.25, ease } },
        }}
        className="flex flex-1 flex-col p-5 xl:p-7"
      >
        <div className="flex items-center justify-between gap-3">
          <SplitText
            as="h3"
            text={study.name}
            by="letter"
            delay={delay + 0.3}
            className={cn(
              'type-h3 text-[26px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:text-[32px]',
              href && 'group-hover:translate-x-1.5',
            )}
          />
          <span className="chip shrink-0">{study.industry}</span>
        </div>
        <p className="type-body mt-3 mb-5 transition-colors duration-500 group-hover:text-fg-2">{study.summary}</p>
        <div className="mt-auto flex items-baseline gap-3 border-t border-line-soft pt-4">
          <span className="font-display text-[40px] leading-none text-accent xl:text-[52px]">
            <CountUp value={study.metric} />
          </span>
          <span className="type-mono uppercase">{study.metricLabel}</span>
        </div>
      </m.div>
    </m.div>
  );

  return href ? (
    <Link href={href} data-cursor="View" className={classes}>
      {content}
    </Link>
  ) : (
    <article className={classes}>{content}</article>
  );
}
