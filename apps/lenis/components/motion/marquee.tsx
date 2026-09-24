'use client';

import { useInView } from 'motion/react';
import { useRef, type CSSProperties, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type MarqueeProps = {
  /** List items (`<li>`), rendered twice for a seamless loop. */
  children: ReactNode;
  /** Seconds per full cycle. */
  duration?: number;
  className?: string;
  listClassName?: string;
  label?: string;
};

/**
 * An infinite horizontal loop. Pauses on hover, on keyboard focus inside, and
 * off-screen. Under reduced motion it becomes a static wrapped row.
 */
export function Marquee({ children, duration = 30, className, listClassName, label }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '100px' });

  const list = cn('flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center', listClassName);

  return (
    <div ref={ref} className={cn('group/marquee overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max animate-marquee',
          'group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]',
          'motion-reduce:w-full motion-reduce:animate-none',
          !visible && '[animation-play-state:paused]',
        )}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        <ul aria-label={label} className={list}>
          {children}
        </ul>
        <ul aria-hidden="true" inert className={cn(list, 'motion-reduce:hidden')}>
          {children}
        </ul>
      </div>
    </div>
  );
}
