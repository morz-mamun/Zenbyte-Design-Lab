'use client';

import { useScroll, useTransform, type MotionValue } from 'motion/react';
import * as m from 'motion/react-m';
import { Children, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery, useMotionPrefs } from './motion-provider';

type StickyStackProps = {
  /** One child per card. Each is wrapped in an `<li>`. */
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  label?: string;
};

function StackCard({
  children,
  index,
  total,
  progress,
  className,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  className?: string;
}) {
  // Each card starts shrinking as the next one begins to cover it.
  const start = index / total;
  const depth = total - 1 - index;
  const scale = useTransform(progress, [start, 1], [1, 1 - depth * 0.03]);
  const dim = useTransform(progress, [start, 1], [0, Math.min(depth * 0.18, 0.55)]);

  return (
    <li
      className={cn('sticky', className)}
      style={{ top: `calc(var(--header-h) + 24px + ${index * 18}px)` }}
    >
      <m.div style={{ scale }} className="relative origin-top will-change-transform">
        {children}
        <m.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-dim will-change-[opacity]"
        />
      </m.div>
    </li>
  );
}

/**
 * Cards that pin below the header and stack over each other while scrolling
 * (≥1024px). Below that, or under reduced motion, a plain vertical list.
 */
export function StickyStack({ children, className, itemClassName, label }: StickyStackProps) {
  const ref = useRef<HTMLOListElement>(null);
  const wide = useMediaQuery('(min-width: 1024px)');
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const items = Children.toArray(children);
  const stacked = wide && !reduced;

  return (
    <ol ref={ref} aria-label={label} className={cn('flex flex-col gap-5', stacked && 'gap-[12vh]', className)}>
      {items.map((child, index) =>
        stacked ? (
          <StackCard
            key={index}
            index={index}
            total={items.length}
            progress={scrollYProgress}
            className={itemClassName}
          >
            {child}
          </StackCard>
        ) : (
          <li key={index} className={itemClassName}>
            {child}
          </li>
        ),
      )}
    </ol>
  );
}
