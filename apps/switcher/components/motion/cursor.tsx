'use client';

// Copied from apps/motion/components/motion/cursor.tsx (the apps share no code).

import { useMotionValue, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useState } from 'react';

import { useMotionPrefs } from './motion-provider';

type CursorState = { kind: 'hidden' | 'default' | 'link' | 'label'; label?: string };

const TEXT_ENTRY = 'input, textarea, select, [contenteditable="true"]';
const INTERACTIVE = 'a, button, [role="button"], summary, label';

/** Reads the cursor state for the element under the pointer. */
function stateFor(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return { kind: 'default' };
  if (target.closest(TEXT_ENTRY)) return { kind: 'hidden' };
  const tagged = target.closest<HTMLElement>('[data-cursor]');
  if (tagged) {
    const value = tagged.dataset.cursor ?? '';
    if (value === 'link') return { kind: 'link' };
    if (value) return { kind: 'label', label: value };
  }
  if (target.closest(INTERACTIVE)) return { kind: 'link' };
  return { kind: 'default' };
}

const sizes = { hidden: 0, default: 10, link: 44, label: 96 } as const;

function CursorDot() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [state, setState] = useState<CursorState>({ kind: 'hidden' });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x.set(event.clientX);
      y.set(event.clientY);
      setState((current) => {
        const next = stateFor(event.target);
        return current.kind === next.kind && current.label === next.label ? current : next;
      });
    };
    const onLeave = () => setState({ kind: 'hidden' });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  const size = sizes[state.kind];
  const isLabel = state.kind === 'label';

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ x: springX, y: springY, mixBlendMode: isLabel ? 'normal' : 'difference' }}
    >
      <m.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full"
        initial={false}
        animate={{
          width: size,
          height: size,
          backgroundColor: isLabel ? '#ff4925' : '#ffffff',
          opacity: state.kind === 'hidden' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      >
        {isLabel && (
          <span className="font-mono text-[11px] font-medium tracking-[0.06em] text-on-accent uppercase">
            {state.label}
          </span>
        )}
      </m.div>
    </m.div>
  );
}

/**
 * Custom cursor for mouse users: a blended dot that grows over links and turns
 * into a labeled disc over `[data-cursor="View"]`-style targets. The native
 * cursor is never hidden. Not rendered for touch or reduced motion.
 */
export function Cursor() {
  const { finePointer, reduced } = useMotionPrefs();
  if (!finePointer || reduced) return null;
  return <CursorDot />;
}
