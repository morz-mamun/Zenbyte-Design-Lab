'use client';

// Copied from apps/motion/components/motion/smooth-scroll.tsx (the apps share
// no code). Change: no route scroll reset, since the lab is a single page.

import { ReactLenis, useLenis } from 'lenis/react';
import { useCallback } from 'react';

import { useMotionPrefs } from './motion-provider';

/**
 * Smooth-scrolls to an element, selector or y position. Elements land below
 * the fixed header via their CSS `scroll-margin-top`, which both Lenis and
 * native scrolling honor. Falls back to native scrolling when Lenis is off.
 */
export function useSmoothScrollTo() {
  const lenis = useLenis();
  const { reduced } = useMotionPrefs();

  return useCallback(
    (target: string | HTMLElement | number, options: { immediate?: boolean } = {}) => {
      if (lenis) {
        lenis.scrollTo(target, { immediate: options.immediate, force: true });
        return;
      }
      const behavior: ScrollBehavior = reduced || options.immediate ? 'auto' : 'smooth';
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior });
        return;
      }
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      element?.scrollIntoView({ behavior, block: 'start' });
    },
    [lenis, reduced],
  );
}

/**
 * Lenis smooth scrolling on the document, for fine pointers only and never
 * under reduced motion. Touch devices keep native scrolling.
 */
export function SmoothScroll() {
  const { reduced, finePointer } = useMotionPrefs();
  const enabled = finePointer && !reduced;

  if (!enabled) return null;
  return <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, autoRaf: true, anchors: true }} />;
}
