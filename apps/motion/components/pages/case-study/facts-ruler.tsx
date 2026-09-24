'use client';

import * as m from 'motion/react-m';

import { CountUp } from '@/components/motion/count-up';
import { useMotionPrefs } from '@/components/motion/motion-provider';
import type { CaseStudyDetail } from '@/content/types';

const ease = [0.16, 1, 0.3, 1] as const;
const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Case-study facts as a "spec ruler": tick marks along the top, thin column
 * dividers, a mono label above each large value. Numbers count up with their
 * unit muted; the engineer gets an initials avatar with a live dot. Plays once
 * the intro is done (it sits above the fold).
 */
export function FactsRuler({ facts }: { facts: CaseStudyDetail['facts'] }) {
  const { introDone } = useMotionPrefs();

  return (
    <m.dl
      initial="hidden"
      animate={introDone ? 'show' : 'hidden'}
      className="relative m-0 grid w-full grid-cols-3"
    >
      <m.span
        aria-hidden="true"
        data-reveal=""
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, delay: 0.55, ease } } }}
        className="absolute inset-x-0 top-0 h-2 origin-left [background:repeating-linear-gradient(90deg,var(--color-line)_0_1px,transparent_1px_27px)]"
      />
      {facts.map((fact, i) => {
        const engineer = /engineer/i.test(fact.label);
        const numeric = /^\d/.test(fact.value);
        return (
          <div key={fact.label} className="relative flex min-h-[80px] flex-col justify-between gap-6 pt-6 pl-4 md:min-h-[120px] md:pl-5">
            <m.span
              aria-hidden="true"
              data-reveal=""
              variants={{
                hidden: { scaleY: 0 },
                show: { scaleY: 1, transition: { duration: 0.9, delay: 0.65 + i * 0.12, ease } },
              }}
              className="absolute top-0 bottom-0 left-0 w-px origin-top bg-line"
            />
            <dt className="type-mono uppercase">{fact.label}</dt>
            <m.dd
              data-reveal=""
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 + i * 0.12, ease } },
              }}
              className="m-0 flex flex-col items-start gap-2.5 text-[16px] leading-none font-medium tracking-[-0.02em] whitespace-nowrap text-fg md:flex-row md:items-center md:text-[22px]"
            >
              {engineer && (
                <span aria-hidden="true" className="relative shrink-0">
                  <span className="flex size-8 items-center justify-center rounded-full border border-accent bg-accent/10 font-mono text-[10px] tracking-normal text-fg md:size-9 md:text-[11px]">
                    {initialsOf(fact.value)}
                  </span>
                  <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-bg bg-accent">
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent motion-reduce:animate-none" />
                  </span>
                </span>
              )}
              {numeric ? (
                <CountUp
                  value={fact.value}
                  trigger="intro"
                  className="text-[30px] tracking-[-0.05em] md:text-[40px]"
                  suffixClassName="ml-1.5 font-mono text-[11px] tracking-[0.06em] text-muted uppercase md:text-xs"
                />
              ) : (
                <span>{fact.value}</span>
              )}
            </m.dd>
          </div>
        );
      })}
    </m.dl>
  );
}
