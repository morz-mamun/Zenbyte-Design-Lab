'use client';

// Copied from apps/motion/components/motion/motion-provider.tsx (the apps share
// no code). Change: the lab has no intro loader, so `introDone` means hydrated
// and the hero's intro reveal plays as soon as the page is interactive.

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';

type MotionPrefs = {
  /** The user prefers reduced motion. */
  reduced: boolean;
  /** A mouse-like pointer that can hover (enables the cursor and hover previews). */
  finePointer: boolean;
  /** The page has hydrated, so above-the-fold intro reveals may start. */
  introDone: boolean;
};

const MotionPrefsContext = createContext<MotionPrefs>({
  reduced: false,
  finePointer: false,
  introDone: true,
});

export function useMotionPrefs() {
  return useContext(MotionPrefsContext);
}

/** Subscribes to a media query; `false` on the server and during hydration. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const noop = () => () => {};

export function MotionProvider({ children }: { children: ReactNode }) {
  // Hydration-safe: `false` on the server and the first client render, then the real value.
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const introDone = useSyncExternalStore(noop, () => true, () => false);

  // Hydrated: turn off the CSS reveal failsafe.
  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
  }, []);

  return (
    <MotionPrefsContext value={{ reduced, finePointer, introDone }}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </MotionPrefsContext>
  );
}
