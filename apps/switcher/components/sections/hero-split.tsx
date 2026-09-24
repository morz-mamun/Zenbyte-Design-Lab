'use client';

import { animate, useMotionTemplate, useMotionValue, useTransform, type AnimationPlaybackControls } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useRef, type PointerEvent } from 'react';

import { useMotionPrefs } from '@/components/motion/motion-provider';
import { ClassicPreview, MotionPreview } from '@/components/previews/design-previews';

/**
 * The same hero in both designs, one over the other, split by a divider.
 * The divider sweeps on its own; with a mouse it follows the pointer and
 * resumes the sweep on leave. Static at the middle under reduced motion.
 * Decorative: the section's text says the same thing.
 */
export function HeroSplit() {
  const { reduced, finePointer } = useMotionPrefs();
  const split = useMotionValue(50);
  const sweep = useRef<AnimationPlaybackControls | null>(null);
  const clip = useMotionTemplate`inset(0 0 0 ${split}%)`;
  const left = useTransform(split, (value) => `${value}%`);

  const startSweep = (from: number) => {
    sweep.current?.stop();
    sweep.current = animate(split, [from, 30, 70, 50], {
      duration: 9,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'mirror',
    });
  };

  useEffect(() => {
    if (reduced) {
      sweep.current?.stop();
      split.set(50);
      return;
    }
    startSweep(split.get());
    return () => sweep.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only when the preference changes
  }, [reduced]);

  const interactive = finePointer && !reduced;

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    const target = Math.min(96, Math.max(4, ((event.clientX - box.left) / box.width) * 100));
    sweep.current?.stop();
    sweep.current = animate(split, target, { type: 'spring', stiffness: 260, damping: 32 });
  };

  return (
    <div
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={() => interactive && startSweep(split.get())}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] border border-line shadow-[0_40px_120px_-40px_rgb(0_0_0/0.6)] select-none sm:aspect-[16/9] sm:rounded-[1.75rem]"
      style={{ cursor: interactive ? 'ew-resize' : undefined }}
    >
      <ClassicPreview className="absolute inset-0" />
      <m.div style={{ clipPath: clip }} className="absolute inset-0">
        <MotionPreview />
      </m.div>

      <m.div style={{ left }} className="pointer-events-none absolute inset-y-0 w-0">
        <span className="absolute inset-y-0 -left-px w-0.5 bg-accent shadow-[0_0_24px_rgb(255_73_37/0.6)]" />
        <span className="absolute top-1/2 left-0 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-accent text-black shadow-lg sm:size-12">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 5 2 9l4 4M12 5l4 4-4 4" />
          </svg>
        </span>
      </m.div>

      <span className="absolute bottom-3 left-3 rounded-full bg-classic-ink/85 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-classic-paper uppercase backdrop-blur sm:bottom-5 sm:left-5">
        Classic
      </span>
      <span className="absolute right-3 bottom-3 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-black uppercase backdrop-blur sm:right-5 sm:bottom-5">
        Motion
      </span>
    </div>
  );
}
