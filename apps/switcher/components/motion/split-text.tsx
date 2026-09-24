'use client';

// Copied from apps/motion/components/motion/split-text.tsx (the apps share no code).

import * as m from 'motion/react-m';
import type { Variants } from 'motion/react';
import { Fragment, type ElementType } from 'react';

import { cn } from '@/lib/utils';
import { useMotionPrefs } from './motion-provider';

export type TextSegment = { text: string; accent?: boolean };

type SplitTextProps = {
  /** Plain text, or segments where `accent` words render in the accent color. */
  text: string | TextSegment[];
  as?: ElementType;
  /** `letter` for short uppercase headings, `word` for longer ones. */
  by?: 'letter' | 'word';
  /** `view`: reveal when scrolled into view. `intro`: reveal once the intro loader is done. */
  trigger?: 'view' | 'intro';
  delay?: number;
  className?: string;
  id?: string;
  accentClassName?: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

const unit: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease } },
};

/**
 * Display text that rises into place unit by unit from behind a mask.
 * Screen readers get the unsplit text once; the split copy is aria-hidden.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  by = 'letter',
  trigger = 'view',
  delay = 0,
  className,
  id,
  accentClassName = 'text-accent',
}: SplitTextProps) {
  const { introDone } = useMotionPrefs();
  const segments = typeof text === 'string' ? [{ text }] : text;
  const fullText = segments.map((segment) => segment.text).join('');

  const words = segments.flatMap((segment) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent: segment.accent })),
  );
  const units = by === 'letter' ? words.reduce((sum, { word }) => sum + word.length, 0) : words.length;
  // Keep the whole reveal within ~1.2s however long the text is.
  const stagger = Math.min(by === 'letter' ? 0.035 : 0.08, 0.45 / Math.max(units, 1));

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const play =
    trigger === 'intro'
      ? { animate: introDone ? 'show' : 'hidden' }
      : { whileInView: 'show', viewport: { once: true, amount: 0.35 } };

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{fullText}</span>
      <m.span aria-hidden="true" className="block" initial="hidden" variants={container} {...play}>
        {words.map(({ word, accent }, index) => (
          <Fragment key={index}>
            {index > 0 && ' '}
            <span
              className={cn(
                // Mask: clip the rising units, with room for glyph overshoot.
                'inline-block overflow-clip py-[0.08em] -my-[0.08em] align-top whitespace-nowrap',
                accent && accentClassName,
              )}
            >
              {by === 'letter' ? (
                Array.from(word).map((letter, letterIndex) => (
                  <m.span key={letterIndex} data-reveal="" variants={unit} className="inline-block">
                    {letter}
                  </m.span>
                ))
              ) : (
                <m.span data-reveal="" variants={unit} className="inline-block">
                  {word}
                </m.span>
              )}
            </span>
          </Fragment>
        ))}
      </m.span>
    </Tag>
  );
}
