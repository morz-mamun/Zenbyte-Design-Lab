'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';

type MotionPrefs = {
  /** The user prefers reduced motion. */
  reduced: boolean;
  /** A mouse-like pointer that can hover (enables the cursor and hover previews). */
  finePointer: boolean;
  /** The intro loader has finished (or never ran), so above-the-fold reveals may start. */
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

/**
 * The intro is "done" when the boot script didn't flag it (`html.intro`), or
 * once the loader starts its exit (`html.intro-out`).
 */
function subscribeHtmlClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

function getIntroDone() {
  const list = document.documentElement.classList;
  return !list.contains('intro') || list.contains('intro-out');
}

export function MotionProvider({ children }: { children: ReactNode }) {
  // Hydration-safe: `false` on the server and the first client render, then the real value.
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const introDone = useSyncExternalStore(subscribeHtmlClass, getIntroDone, () => false);

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
