'use client';

// Copied from apps/motion/components/motion/scroll-progress.tsx (the apps share
// no code). Added: `PageProgress`, a page-level bar for the navbar.

import { useInView, useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef, type ElementType, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { useMotionPrefs } from './motion-provider';

type ScrollProgressProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Classes positioning the track, e.g. `left-[5px]`. */
  trackClassName?: string;
  label?: string;
};

/**
 * A thin accent line along a sequential list that fills as the list passes
 * the 70% viewport line. Pair with `ProgressMarker` on each step.
 */
export function ScrollProgress({
  children,
  as: Tag = 'ol',
  className,
  trackClassName,
  label,
}: ScrollProgressProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.7'] });

  return (
    <Tag ref={ref} aria-label={label} className={cn('relative', className)}>
      <span
        aria-hidden="true"
        className={cn('absolute top-0 bottom-0 left-0 w-px bg-line', trackClassName)}
      >
        <m.span
          data-reveal=""
          style={{ scaleY: scrollYProgress }}
          className="absolute inset-0 origin-top bg-accent will-change-transform"
        />
      </span>
      {children}
    </Tag>
  );
}

/** A step dot that turns accent once the progress line reaches it. */
export function ProgressMarker({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Active while the marker is above the 70% viewport line (matches the fill).
  const active = useInView(ref, { margin: '100000px 0px -30% 0px' });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'block size-[11px] rounded-full border transition-colors duration-500',
        active ? 'border-accent bg-accent shadow-[0_0_0_5px_rgba(255,73,37,0.18)]' : 'border-line bg-bg',
        className,
      )}
    />
  );
}

/**
 * A hairline accent bar that fills with the page's scroll position. Eased by
 * a spring normally; tracks the scroll exactly under reduced motion.
 */
export function PageProgress({ className }: { className?: string }) {
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll();
  const eased = useSpring(scrollYProgress, { stiffness: 220, damping: 34, restDelta: 0.001 });

  return (
    <m.span
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : eased }}
      className={cn('pointer-events-none block h-0.5 origin-left bg-accent will-change-transform', className)}
    />
  );
}
