'use client';

import { useMotionTemplate, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef } from 'react';

import { useMotionPrefs } from '@/components/motion/motion-provider';

/**
 * Oversized outlined wordmark whose accent fill wipes in from the left as
 * the page reaches its end. Filled outright under reduced motion.
 */
export function FooterWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const remaining = useTransform(scrollYProgress, [0.1, 1], [100, 0]);
  // Negative top/bottom insets: the glyphs overflow the tight line box.
  const clip = useMotionTemplate`inset(-20% ${remaining}% -20% 0)`;

  const face = 'block text-center font-display text-[25vw] leading-[0.9] uppercase';

  return (
    <div ref={ref} aria-hidden="true" className="relative select-none">
      <span className={`${face} text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)]`}>{text}</span>
      <m.span style={{ clipPath: reduced ? 'none' : clip }} className={`${face} absolute inset-0 text-accent`}>
        {text}
      </m.span>
    </div>
  );
}
