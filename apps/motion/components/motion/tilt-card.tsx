'use client';

import { useMotionTemplate, useMotionValue, useSpring, type Variants } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef, type PointerEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { useMotionPrefs } from './motion-provider';

const ease = [0.16, 1, 0.3, 1] as const;

/** Rises out of a slight 3D tilt while sharpening; staggered by a parent `RevealGroup`. */
const entrance: Variants = {
  hidden: { opacity: 0, y: 70, rotateX: 16, filter: 'blur(10px)', transformPerspective: 1200 },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transformPerspective: 1200, transition: { duration: 1.2, ease } },
};

const MAX_TILT = 7;

/**
 * A list item card with a premium hover: spring 3D tilt toward the pointer, a
 * cursor-following accent spotlight, and depth for children using
 * `[transform:translateZ(..)]`. Mouse only, and static under reduced motion.
 */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { finePointer, reduced } = useMotionPrefs();
  const interactive = finePointer && !reduced;

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(tiltX, spring);
  const rotateY = useSpring(tiltY, spring);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${spotX}% ${spotY}%, rgba(255, 73, 37, 0.16), transparent 60%)`;

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || event.pointerType !== 'mouse' || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    spotX.set(px * 100);
    spotY.set(py * 100);
    tiltY.set((px - 0.5) * MAX_TILT * 2);
    tiltX.set(-(py - 0.5) * MAX_TILT * 2);
  };

  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <m.li data-reveal="" variants={entrance} className="flex [perspective:1400px]">
      <m.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={interactive ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className={cn('group relative w-full', interactive && 'will-change-transform [backface-visibility:hidden] [outline:1px_solid_transparent]', className)}
      >
        {interactive && (
          <m.div
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        {/* Accent hairline that draws across the top edge on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
        {children}
      </m.div>
    </m.li>
  );
}
