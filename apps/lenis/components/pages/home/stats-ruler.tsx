'use client';

import * as m from 'motion/react-m';

import { CountUp } from '@/components/motion/count-up';
import { useMotionPrefs } from '@/components/motion/motion-provider';
import type { Stat } from '@/content/types';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hero stats: a tick "ruler" along the top, thin column dividers, large
 * light numbers with the unit in accent, and the label pinned to the bottom.
 * The ruler draws in from the left and the dividers grow down after the intro.
 */
export function StatsRuler({ stats }: { stats: Stat[] }) {
  const { introDone } = useMotionPrefs();
  const play = introDone ? 'show' : 'hidden';

  return (
    <m.dl initial="hidden" animate={play} className="relative m-0 grid grid-cols-3">
      {/* Tick ruler */}
      <m.span
        aria-hidden="true"
        data-reveal=""
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, delay: 0.7, ease } } }}
        className="absolute inset-x-0 top-0 h-2 origin-left [background:repeating-linear-gradient(90deg,var(--color-line)_0_1px,transparent_1px_29px)]"
      />
      {stats.map((stat, i) => (
        <div key={stat.label} className="relative flex min-h-[70px] flex-col justify-between pt-7 pl-4 md:min-h-[100px] md:pt-9 md:pl-5 xl:min-h-[70px]">
          {/* Column divider */}
          <m.span
            aria-hidden="true"
            data-reveal=""
            variants={{
              hidden: { scaleY: 0 },
              show: { scaleY: 1, transition: { duration: 0.9, delay: 0.8 + i * 0.12, ease } },
            }}
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-line"
          />
          <dd className="m-0 order-1 text-[40px] leading-none font-medium tracking-[-0.06em] text-fg-2 md:text-[56px] xl:text-[68px]">
            <CountUp value={stat.value} trigger="intro" suffixClassName="text-accent" />
          </dd>
          <dt className="order-2 mt-6 max-w-[14ch] text-[13px] leading-[1.25] text-muted md:text-sm">{stat.label}</dt>
        </div>
      ))}
    </m.dl>
  );
}
