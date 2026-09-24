'use client';

import { RollLabel } from '@/components/motion/roll-label';
import { useSmoothScrollTo } from '@/components/motion/smooth-scroll';
import { ArrowRightIcon } from '@/components/ui/icons';

/** Smooth-scrolls to the top, then moves focus to the main content. */
export function BackToTop() {
  const scrollTo = useSmoothScrollTo();

  return (
    <button
      type="button"
      onClick={() => {
        scrollTo(0);
        document.getElementById('content')?.focus({ preventScroll: true });
      }}
      className="group inline-flex w-fit cursor-pointer items-center gap-2 text-fg-2 uppercase transition-colors hover:text-fg"
    >
      <RollLabel>Back to top</RollLabel>
      <ArrowRightIcon size={14} className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
