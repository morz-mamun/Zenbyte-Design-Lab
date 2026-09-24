'use client';

// Copied from apps/motion/components/motion/count-up.tsx (the apps share no
// code). Fix: under reduced motion the final value is restored, since the
// first client render (before the media query resolves) may have set 0.

import { animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import { useMotionPrefs } from './motion-provider';

type CountUpProps = {
  /** e.g. "34", "3.2x", "−40%", "$1.2M". The first number counts; the rest stays fixed. */
  value: string;
  className?: string;
  duration?: number;
  /** Wait for the intro loader before counting (above-the-fold stats). */
  trigger?: 'view' | 'intro';
  /** Classes for the unit after the number (e.g. "+", "%", "M"), rendered separately. */
  suffixClassName?: string;
};

const NUMBER = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/;

/**
 * Counts from 0 to `value` the first time it scrolls into view. The final
 * value is server-rendered, reserves the width, and is what assistive tech reads.
 */
export function CountUp({ value, className, duration = 1.8, trigger = 'view', suffixClassName }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reduced, introDone } = useMotionPrefs();
  const match = value.match(NUMBER);

  const ready = inView && (trigger === 'view' || introDone);

  // Before the count starts, show 0 (the element is still hidden or below the fold).
  useEffect(() => {
    const node = ref.current;
    if (!node || !match) return;
    const [, prefix, number] = match;
    if (reduced) {
      node.textContent = `${prefix}${number}`;
      return;
    }
    const decimals = number.split('.')[1]?.length ?? 0;
    const target = Number.parseFloat(number.replace(/,/g, ''));
    const format = (n: number) =>
      `${prefix}${n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: number.includes(','),
      })}`;

    if (!ready) {
      node.textContent = format(0);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [ready, reduced, duration, match?.[0]]); // eslint-disable-line react-hooks/exhaustive-deps

  // The unit stays static (and can be styled); only the number counts.
  const head = match ? `${match[1]}${match[2]}` : value;
  const suffix = match ? match[3] : '';

  return (
    <span className={cn('inline-flex items-baseline tabular-nums', className)}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="relative inline-block">
        {/* Invisible final number reserves the width so nothing shifts. */}
        <span className="invisible">{head}</span>
        <span ref={ref} className="absolute inset-0">
          {head}
        </span>
      </span>
      {suffix && (
        <span aria-hidden="true" className={cn('whitespace-pre', suffixClassName)}>
          {suffix}
        </span>
      )}
    </span>
  );
}
