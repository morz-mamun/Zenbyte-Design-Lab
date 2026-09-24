'use client';

import { AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import Link from 'next/link';
import { useState, type PointerEvent } from 'react';

import { useMediaQuery, useMotionPrefs } from '@/components/motion/motion-provider';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ArrowRightIcon } from '@/components/ui/icons';
import { Placeholder } from '@/components/ui/placeholder';
import { caseStudyHref } from '@/content/case-studies';
import type { CaseStudy } from '@/content/types';

const PREVIEW_W = 380;
const PREVIEW_H = 300;

function Row({ study, index }: { study: CaseStudy; index: number }) {
  const href = caseStudyHref(study);
  const number = String(index + 1).padStart(2, '0');

  const content = (
    <>
      {/* Inline image: touch and narrow screens only. */}
      <Placeholder
        slot={study.image}
        sizes="100vw"
        className="mb-6 h-[220px] rounded-xl md:h-[300px] lg:hidden"
      />
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 gap-y-3 lg:grid-cols-[96px_minmax(0,1.1fr)_minmax(0,1fr)_220px] xl:grid-cols-[120px_minmax(0,1.1fr)_minmax(0,1fr)_220px] lg:items-center lg:gap-x-10">
        <span className="font-display text-[32px] leading-none text-accent md:text-[40px] xl:text-[56px]">{number}</span>
        <h3 className="font-display text-[40px] leading-[0.95] uppercase transition-transform duration-500 ease-out md:text-[56px] lg:group-hover:translate-x-3 xl:text-[80px]">
          {study.name}
        </h3>
        <p className="type-body col-start-2 lg:col-start-auto">{study.summary}</p>
        <div className="col-start-2 flex items-center gap-4 lg:col-start-auto lg:justify-end">
          <span className="chip">{study.industry}</span>
          {href && (
            <span className="flex size-11 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
              <ArrowRightIcon size={16} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
            </span>
          )}
        </div>
      </div>
      {/* Metric: touch and narrow screens only (desktop shows it in the preview). */}
      <p className="mt-5 flex items-baseline gap-3 lg:hidden">
        <span className="font-display text-[36px] leading-none text-accent">{study.metric}</span>
        <span className="type-mono uppercase">{study.metricLabel}</span>
      </p>
    </>
  );

  const rowClass =
    'group block border-t border-line-soft py-8 transition-opacity duration-500 lg:py-10 ' +
    'lg:group-hover/list:opacity-30 lg:hover:opacity-100! lg:group-focus-within/list:opacity-30 lg:focus-visible:opacity-100!';

  return href ? (
    <Link href={href} data-cursor="View" className={rowClass}>
      {content}
    </Link>
  ) : (
    <div className={rowClass}>{content}</div>
  );
}

/**
 * The work list. On wide screens with a mouse, a preview card (image + metric)
 * follows the pointer and cross-fades between studies.
 */
export function ProofRows({ studies }: { studies: CaseStudy[] }) {
  const { finePointer, reduced } = useMotionPrefs();
  const wide = useMediaQuery('(min-width: 1024px)');
  const previewEnabled = finePointer && wide;

  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 26, mass: 0.6 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    x.set(event.clientX - PREVIEW_W / 2);
    y.set(event.clientY - PREVIEW_H / 2);
  };

  const current = active === null ? null : studies[active];

  return (
    <>
      <RevealGroup
        as="ul"
        stagger={0.08}
        className="group/list mt-12 border-b border-line-soft xl:mt-20"
        attrs={{ 'aria-label': 'Case studies' }}
      >
        {studies.map((study, index) => (
          <RevealItem as="li" key={study.slug}>
            <div
              onPointerEnter={() => setActive(index)}
              onPointerLeave={() => setActive(null)}
              onPointerMove={onMove}
            >
              <Row study={study} index={index} />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {previewEnabled && (
        <m.div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-40 overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          style={{ x: springX, y: springY, width: PREVIEW_W, height: PREVIEW_H }}
          initial={false}
          animate={{ opacity: current ? 1 : 0, scale: current ? 1 : 0.85 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence initial={false}>
            {current && (
              <m.div
                key={current.slug}
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Placeholder slot={current.image} sizes="380px" className="flex-1 rounded-none border-0" />
                <div className="flex items-baseline gap-3 border-t border-line-soft bg-surface px-5 py-4">
                  <span className="font-display text-[40px] leading-none text-accent">{current.metric}</span>
                  <span className="type-mono uppercase">{current.metricLabel}</span>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      )}
    </>
  );
}
