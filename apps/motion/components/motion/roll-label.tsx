import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * A label that rolls up on hover / keyboard focus of the nearest `.group`
 * ancestor: the visible copy slides out and an identical copy slides in.
 * Pure CSS (see `.roll` in globals.css); the second copy is aria-hidden.
 */
export function RollLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('roll', className)}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
