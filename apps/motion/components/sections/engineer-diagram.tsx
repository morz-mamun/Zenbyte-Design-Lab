'use client';

import { animate, useInView } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useRef, type ReactNode } from 'react';

import { useMotionPrefs } from '@/components/motion/motion-provider';
import type { DiagramContent, StatusPanel, StatusRow } from '@/content/types';
import { cn } from '@/lib/utils';

type EngineerDiagramProps = {
  content: DiagramContent;
  /** The mobile home layout shows the two cards without the connector pill. */
  hidePillOnMobile?: boolean;
  /** `intro`: play after the intro loader (above the fold). */
  trigger?: 'view' | 'intro';
  className?: string;
};

const ease = [0.16, 1, 0.3, 1] as const;
const NUMBER = /^(\d+)(.*)$/;

/** Plays once: after the intro (above the fold) or when scrolled into view. */
export function usePlay(ref: React.RefObject<HTMLElement | null>, trigger: 'view' | 'intro') {
  const { introDone } = useMotionPrefs();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return inView && (trigger === 'view' || introDone);
}

/** Header meta; on the result card, counts down from the "before" number (4 → 0). */
export function Meta({ meta, from, play }: { meta?: string; from?: string; play: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionPrefs();
  const target = meta?.match(NUMBER);
  const start = from?.match(NUMBER);

  useEffect(() => {
    const node = ref.current;
    if (!node || !target || !start || reduced) return;
    const [, to, suffix] = target;
    const render = (n: number) => (node.textContent = `${Math.round(n)}${suffix}`);
    if (!play) {
      render(Number(start[1]));
      return;
    }
    const controls = animate(Number(start[1]), Number(to), { duration: 1.6, delay: 1.1, ease, onUpdate: render });
    return () => controls.stop();
  }, [play, reduced, target?.[0], start?.[0]]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!meta) return null;
  return (
    <span className="type-mono uppercase tabular-nums">
      <span className="sr-only">{meta}</span>
      <span ref={ref} aria-hidden="true">
        {meta}
      </span>
    </span>
  );
}

function Header({ panel, tone, children }: { panel: StatusPanel; tone: 'issue' | 'fixed'; children?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">
      <span className="flex items-center gap-2.5">
        <span aria-hidden="true" className="relative flex size-2">
          {tone === 'issue' && (
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/70 motion-reduce:animate-none" />
          )}
          <span className={cn('relative size-2 rounded-full', tone === 'issue' ? 'bg-accent' : 'bg-fg')} />
        </span>
        <span className="type-mono tracking-[0.08em] text-fg uppercase">{panel.title}</span>
      </span>
      {children}
    </div>
  );
}

/** Before rows: pulsing issue dots, staggered. */
function IssueRows({ rows, play, delay }: { rows: StatusRow[]; play: boolean; delay: number }) {
  return (
    <ul>
      {rows.map((row, i) => (
        <m.li
          key={row.label}
          data-reveal=""
          initial={{ opacity: 0, x: -12 }}
          animate={play ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, delay: delay + i * 0.08, ease }}
          className="flex h-10 items-center gap-3 border-t border-line-soft xl:h-11"
        >
          <span
            aria-hidden="true"
            style={{ animationDelay: `${i * 0.35}s` }}
            className={cn(
              'size-2 shrink-0 rounded-full',
              row.open
                ? 'animate-[issue-pulse_2.4s_ease-in-out_infinite] bg-accent motion-reduce:animate-none'
                : 'bg-fg',
            )}
          />
          <span className="flex-1 text-sm leading-none font-medium text-fg-2 xl:text-[15px]">{row.label}</span>
          <span className="type-mono text-right uppercase">{row.state}</span>
        </m.li>
      ))}
    </ul>
  );
}

/** After rows: each check mark draws itself as its row lands. */
function FixedRows({ rows, play, delay }: { rows: StatusRow[]; play: boolean; delay: number }) {
  return (
    <ul>
      {rows.map((row, i) => {
        const d = delay + i * 0.22;
        return (
          <m.li
            key={row.label}
            data-reveal=""
            initial={{ opacity: 0, y: 8 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: d, ease }}
            className="flex h-10 items-center gap-3 border-t border-line xl:h-11"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 text-accent" fill="none">
              <m.path
                d="M3 8.5l3.2 3.2L13 4.8"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={play ? { pathLength: 1 } : undefined}
                transition={{ duration: 0.5, delay: d + 0.2, ease }}
              />
            </svg>
            <span className="flex-1 text-sm leading-none font-medium text-fg xl:text-[15px]">{row.label}</span>
            <span className="type-mono text-right uppercase">{row.state}</span>
          </m.li>
        );
      })}
    </ul>
  );
}

/**
 * "Before → embedded engineer → after" diagram used by the home and vendor
 * heroes: a diagnostic scan sweeps the issues, a packet drops down the beam
 * through the engineer, and the result card checks each fix off while its
 * workaround count runs down. Decorative summary of the copy, as a figure.
 */
export function EngineerDiagram({ content, hidePillOnMobile, trigger = 'view', className }: EngineerDiagramProps) {
  const ref = useRef<HTMLElement>(null);
  const play = usePlay(ref, trigger);
  const card = (delay: number) => ({
    initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
    animate: play ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <figure
      ref={ref}
      aria-label={`${content.before.title} to ${content.after.title}, via ${content.pillTitle.toLowerCase()}`}
      className={cn('m-0 flex flex-col', hidePillOnMobile && 'gap-6 md:gap-0', className)}
    >
      {/* Before: live diagnostic scan */}
      <m.div data-reveal="" {...card(0)} className="card relative overflow-hidden px-5 py-4 xl:px-6 xl:py-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-[diag-scan_3.6s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-gradient-to-b from-transparent via-accent/[0.07] to-transparent motion-reduce:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--color-line-soft)_1px,transparent_1px)] [background-size:100%_22px] opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
        />
        <div className="relative">
          <Header panel={content.before} tone="issue">
            <Meta meta={content.before.meta} play={play} />
          </Header>
          <IssueRows rows={content.before.rows} play={play} delay={0.2} />
        </div>
      </m.div>

      {/* Beam + engineer */}
      <div
        className={cn(
          'relative flex h-20 items-center justify-center md:h-[96px] xl:h-[92px]',
          hidePillOnMobile && 'hidden md:flex',
        )}
      >
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 overflow-hidden">
          <m.span
            className="absolute inset-0 origin-top bg-line"
            initial={{ scaleY: 0 }}
            animate={play ? { scaleY: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          />
          <span className="absolute inset-x-0 h-8 animate-[beam-drop_1.8s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-gradient-to-b from-transparent via-accent to-transparent motion-reduce:hidden" />
        </span>
        <m.div
          data-reveal=""
          initial={{ opacity: 0, scale: 0.85 }}
          animate={play ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="relative z-[1] overflow-hidden rounded-full p-px"
        >
          {/* Rotating accent border */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#ff4925_60deg,transparent_140deg)] motion-reduce:animate-none"
          />
          <span className="relative flex items-center gap-3 rounded-full bg-surface py-1.5 pr-5 pl-1.5 xl:gap-3.5 xl:py-2 xl:pl-2">
            <span className="relative size-[38px] xl:size-11">
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ring rounded-full bg-accent motion-reduce:animate-none"
              />
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-accent font-mono text-[10px] leading-none font-medium text-on-accent xl:text-xs">
                {content.badge}
              </span>
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-sm leading-none font-semibold xl:text-[15px]">{content.pillTitle}</span>
              {content.pillMeta && <span className="type-mono hidden md:block">{content.pillMeta}</span>}
            </span>
          </span>
        </m.div>
      </div>

      {/* After: rotating accent border, checks draw in, count runs down */}
      <m.div
        data-reveal=""
        {...card(0.85)}
        className="relative overflow-hidden rounded-2xl p-px shadow-[0_0_80px_-24px_rgba(255,73,37,0.5)]"
      >
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,73,37,0.15)_0deg,#ff4925_70deg,rgba(255,73,37,0.15)_150deg,rgba(255,73,37,0.15)_360deg)] motion-reduce:animate-none"
        />
        <div className="relative rounded-[15px] bg-surface px-5 py-4 xl:px-6 xl:py-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-10 size-44 glow [--glow:0.10]"
          />
          <div className="relative">
            <Header panel={content.after} tone="fixed">
              <Meta meta={content.after.meta} from={content.before.meta} play={play} />
            </Header>
            <FixedRows rows={content.after.rows} play={play} delay={1.1} />
          </div>
        </div>
      </m.div>
    </figure>
  );
}
