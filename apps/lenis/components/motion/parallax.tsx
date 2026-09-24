'use client';

import { useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef, type ReactNode } from 'react';

import { useMotionPrefs } from './motion-provider';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Max drift in px each way while the element crosses the viewport. */
  range?: number;
  /**
   * `through`: drift while crossing the viewport (images).
   * `exit`: drift up and fade as the element scrolls away from the top (hero headline).
   */
  mode?: 'through' | 'exit';
};

/** Scroll-linked vertical drift. Transform-only, so layout never shifts. */
export function Parallax({ children, className, range = 60, mode = 'through' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === 'exit' ? ['start start', 'end start'] : ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], mode === 'exit' ? [0, -range] : [-range, range]);
  const opacity = useTransform(scrollYProgress, [0, 1], mode === 'exit' ? [1, 0.35] : [1, 1]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y, opacity }} className="h-full w-full will-change-transform">
        {children}
      </m.div>
    </div>
  );
}
