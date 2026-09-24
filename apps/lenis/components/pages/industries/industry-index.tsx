'use client';

import { AnimatePresence, useScroll } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useRef, useState, type RefObject } from 'react';

import { useSmoothScrollTo } from '@/components/motion/smooth-scroll';
import { hero, industries } from '@/content/industries';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;
const idOf = (n: string) => `industry-${n}`;

/** Index of the industry row crossing the upper-middle band of the viewport. */
function useActiveIndustry() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const rows = industries.map((industry) => document.getElementById(idOf(industry.n)));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = rows.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    rows.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);
  return active;
}

function useJump() {
  const scrollTo = useSmoothScrollTo();
  return (n: string) => {
    const target = document.getElementById(idOf(n));
    if (!target) return;
    scrollTo(target);
    history.replaceState(null, '', `#${idOf(n)}`);
  };
}

/** Big "0N / 06" counter whose number rolls when the active industry changes. */
function Counter({ active }: { active: number }) {
  const n = String(active + 1).padStart(2, '0');
  return (
    <p className="flex items-end gap-3 font-display leading-[0.8]" aria-hidden="true">
      <span className="relative inline-flex h-[0.8em] overflow-clip text-[88px] text-accent">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={n}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease }}
            className="inline-block"
          >
            {n}
          </m.span>
        </AnimatePresence>
      </span>
      <span className="pb-1 text-[28px] text-subtle">/ {String(industries.length).padStart(2, '0')}</span>
    </p>
  );
}

/**
 * Desktop (≥1280px): a pinned table of contents beside the industry rows. It
 * tracks the row in view, fills a progress rail with the section's scroll,
 * and jumps to a row on click.
 */
export function IndustryIndex({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const active = useActiveIndustry();
  const jump = useJump();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.4', 'end 0.6'] });

  return (
    <nav aria-label={hero.indexTitle} className="sticky top-[calc(var(--header-h)+32px)] flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <span className="label text-fg">({hero.indexTitle})</span>
        <span className="type-mono uppercase">{hero.indexMeta}</span>
      </div>

      <Counter active={active} />

      <ol className="relative flex flex-col">
        {/* Progress rail */}
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line">
          <m.span style={{ scaleY: scrollYProgress }} className="absolute inset-0 origin-top bg-accent will-change-transform" />
        </span>
        {industries.map((industry, index) => {
          const isActive = index === active;
          return (
            <li key={industry.n}>
              <a
                href={`#${idOf(industry.n)}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  jump(industry.n);
                }}
                className="group relative flex items-start gap-4 py-3 pl-6"
              >
                {/* Active marker on the rail */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-[19px] -left-[3px] size-[7px] -translate-y-1/2 rounded-full transition-all duration-500',
                    isActive ? 'scale-100 bg-accent shadow-[0_0_0_4px_rgba(255,73,37,0.2)]' : 'scale-0 bg-accent',
                  )}
                />
                <span
                  className={cn(
                    'type-mono w-6 shrink-0 pt-0.5 transition-colors duration-500',
                    isActive ? 'text-accent-text' : 'text-subtle group-hover:text-fg-2',
                  )}
                >
                  {industry.n}
                </span>
                <span
                  className={cn(
                    'flex min-w-0 flex-1 flex-col gap-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isActive && 'translate-x-1',
                  )}
                >
                  <span
                    className={cn(
                      'text-[15px] leading-[1.3] font-medium text-pretty transition-colors duration-500',
                      isActive ? 'text-fg' : 'text-muted group-hover:text-fg-2',
                    )}
                  >
                    {industry.name}
                  </span>
                  <span
                    className={cn(
                      'type-mono uppercase transition-colors duration-500',
                      isActive ? 'text-accent-text' : 'text-subtle',
                    )}
                  >
                    {industry.indexTag}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Below 1280px: a slim bar pinned to the top with swipeable industry chips.
 * The active chip stays scrolled into view and a line tracks overall progress.
 */
export function IndustryIndexBar({
  sectionRef,
  className,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const active = useActiveIndustry();
  const jump = useJump();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.4', 'end 0.6'] });

  // Keep the active chip visible without scrolling the page.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.children[active] as HTMLElement | undefined;
    if (!list || !chip) return;
    list.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  return (
    <nav
      aria-label={hero.indexTitle}
      className={cn(
        'sticky top-0 z-30 -mx-[var(--gutter)] border-b border-line-soft bg-bg/90 backdrop-blur-md',
        className,
      )}
    >
      <ol ref={listRef} className="flex gap-2 overflow-x-auto px-[var(--gutter)] py-3 [scrollbar-width:none]">
        {industries.map((industry, index) => {
          const isActive = index === active;
          return (
            <li key={industry.n} className="shrink-0">
              <a
                href={`#${idOf(industry.n)}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  jump(industry.n);
                }}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] leading-none font-medium whitespace-nowrap transition-colors duration-300',
                  isActive ? 'border-accent bg-accent/10 text-fg' : 'border-line text-muted',
                )}
              >
                <span className={cn('font-mono text-[11px]', isActive ? 'text-accent-text' : 'text-subtle')}>{industry.n}</span>
                {industry.name}
              </a>
            </li>
          );
        })}
      </ol>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px">
        <m.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-accent will-change-transform" />
      </span>
    </nav>
  );
}
