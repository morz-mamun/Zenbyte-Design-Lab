'use client';

import { AnimatePresence, animate, useInView, useMotionValue, type Variants } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { useMotionPrefs } from '@/components/motion/motion-provider';
import { ArrowRightIcon, QuoteMark } from '@/components/ui/icons';
import { Avatar } from '@/components/ui/placeholder';
import type { Testimonial } from '@/content/types';
import { cn } from '@/lib/utils';

/** Seconds each quote stays before auto-advancing. */
const DURATION = 5;
const ease = [0.16, 1, 0.3, 1] as const;

const quoteVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.012, delayChildren: 0 } },
  exit: { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.18, ease: 'easeIn' } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease } },
};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * One featured testimonial at a time: words sharpen in, author tabs with
 * progress bars auto-advance every few seconds. Pauses on hover, keyboard
 * focus, off-screen and under reduced motion.
 */
export function TestimonialSpotlight({ items, header }: { items: Testimonial[]; header?: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [announce, setAnnounce] = useState(false);
  const progress = useMotionValue(0);

  const playing = inView && !hovered && !focused && !reduced;

  const go = (index: number, fromUser = false) => {
    progress.set(0);
    setAnnounce(fromUser);
    setActive((index + items.length) % items.length);
  };

  // Run the active tab's progress bar; advance when it fills.
  useEffect(() => {
    if (!playing) return;
    const controls = animate(progress, 1, {
      duration: DURATION * (1 - progress.get()),
      ease: 'linear',
      onComplete: () => {
        progress.set(0);
        setAnnounce(false);
        setActive((current) => (current + 1) % items.length);
      },
    });
    return () => controls.stop();
  }, [playing, active, items.length, progress]);

  const current = items[active];
  const words = current.quote.split(/\s+/);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      // Pause for keyboard focus only; a mouse click leaves focus on the
      // clicked control and must not freeze the progress bar.
      onFocus={(event) => {
        if (event.target.matches(':focus-visible')) setFocused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {header}
      {/* Featured quote */}
      <div
        // Pause only while reading the quote, not while using the controls.
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className="card relative mt-8 overflow-hidden rounded-3xl p-6 md:p-10 xl:mt-10 xl:px-14 xl:py-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] glow [--glow:0.10]"
        />
        <QuoteMark
          width={320}
          height={256}
          className="pointer-events-none absolute -top-6 right-6 h-[140px] w-[175px] text-accent opacity-[0.07] md:h-[220px] md:w-[275px] xl:right-16 xl:h-[256px] xl:w-[320px]"
        />

        <div className="relative flex items-center justify-between gap-6">
          <QuoteMark className="h-[30px] w-[38px] text-accent xl:h-[40px] xl:w-[50px]" />
          <p className="font-mono text-sm text-muted tabular-nums">
            <span className="text-fg">{pad(active + 1)}</span> / {pad(items.length)}
          </p>
        </div>

        <figure
          className="relative m-0 mt-6 min-h-[260px] md:min-h-[220px] xl:mt-8 xl:min-h-[230px]"
          aria-live={announce ? 'polite' : 'off'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={active} initial="hidden" animate="show" exit="exit" variants={quoteVariants}>
              <blockquote className="m-0 max-w-[1100px] text-[24px] leading-[1.3] font-medium tracking-[-0.025em] text-pretty text-fg md:text-[32px] xl:text-[40px] xl:leading-[1.2]">
                <span className="sr-only">{current.quote}</span>
                <span aria-hidden="true">
                  {words.map((word, index) => (
                    <m.span key={index} data-reveal="" variants={wordVariants} className="inline-block">
                      {word}
                      {index < words.length - 1 && ' '}
                    </m.span>
                  ))}
                </span>
              </blockquote>
              <m.figcaption variants={wordVariants} data-reveal="" className="mt-6 flex items-center gap-4 xl:mt-8">
                <Avatar
                  initials={current.initials ?? initialsOf(current.name)}
                  image={current.avatar}
                  className="size-11 text-fg xl:size-12"
                />
                <span className="flex flex-col gap-1.5">
                  <span className="text-base leading-none font-semibold xl:text-lg">{current.name}</span>
                  <span className="type-mono uppercase">{current.role}</span>
                </span>
              </m.figcaption>
            </m.div>
          </AnimatePresence>
        </figure>
      </div>

      {/* Avatar stack · segmented story timeline · arrows */}
      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-5 xl:mt-5">
        <div className="flex items-center -space-x-3">
          {items.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => go(index, true)}
                aria-pressed={isActive}
                aria-label={`Show testimonial from ${item.name}`}
                style={{ zIndex: isActive ? items.length + 1 : items.length - index }}
                className={cn(
                  'relative cursor-pointer rounded-full bg-bg p-[3px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isActive ? 'scale-110' : 'scale-95 opacity-60 hover:scale-100 hover:opacity-100',
                )}
              >
                <Avatar
                  initials={item.initials ?? initialsOf(item.name)}
                  image={item.avatar}
                  className={cn(
                    'size-11 text-[11px] transition-colors duration-500',
                    isActive ? 'border-accent text-fg shadow-[0_0_0_4px_rgba(255,73,37,0.15)]' : 'text-muted',
                  )}
                />
              </button>
            );
          })}
        </div>

        <ol aria-hidden="true" className="order-last flex w-full gap-3 md:order-none md:w-auto md:flex-1 md:gap-4">
          {items.map((item, index) => {
            const isActive = index === active;
            return (
              <li key={item.name} className="flex-1">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(index, true)}
                  className="group flex w-full cursor-pointer flex-col gap-2.5 text-left"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span
                      className={cn(
                        'font-display text-[22px] leading-none transition-colors duration-500 xl:text-[26px]',
                        isActive ? 'text-accent' : 'text-subtle group-hover:text-fg-2',
                      )}
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      className={cn(
                        'type-mono hidden truncate uppercase transition-opacity duration-500 lg:block',
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                      )}
                    >
                      {item.name}
                    </span>
                  </span>
                  <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-line">
                    {index < active && <span className="absolute inset-0 bg-fg/40" />}
                    {isActive && (
                      <m.span
                        style={{ scaleX: reduced ? 1 : progress }}
                        className="absolute inset-0 origin-left bg-accent"
                      />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="ml-auto flex gap-2.5 md:ml-0">
          <button
            type="button"
            onClick={() => go(active - 1, true)}
            aria-label="Previous testimonial"
            className="group flex h-12 w-20 cursor-pointer items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent xl:w-24"
          >
            <ArrowRightIcon className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1, true)}
            aria-label="Next testimonial"
            className="group flex h-12 w-20 cursor-pointer items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent xl:w-24"
          >
            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
