'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

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

/** Starts each new route at the top, or at its `#fragment` below the header. */
function RouteScrollReset() {
  const pathname = usePathname();
  const scrollTo = useSmoothScrollTo();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) scrollTo(target);
    else scrollTo(0, { immediate: true });
    // Only on route changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

/**
 * Lenis smooth scrolling on the document, for fine pointers only and never
 * under reduced motion. Touch devices keep native scrolling.
 */
export function SmoothScroll() {
  const { reduced, finePointer } = useMotionPrefs();
  const enabled = finePointer && !reduced;

  return (
    <>
      {enabled && (
        <ReactLenis
          root
          options={{ lerp: 0.1, smoothWheel: true, autoRaf: true, anchors: true }}
        />
      )}
      <RouteScrollReset />
    </>
  );
}
