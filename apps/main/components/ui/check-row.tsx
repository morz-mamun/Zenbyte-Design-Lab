import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { CheckIcon, CrossIcon } from './icons';

type CheckRowProps = {
  children: ReactNode;
  /** `check` in accent text color, `cross` in muted gray. */
  variant?: 'check' | 'cross';
  className?: string;
  iconClassName?: string;
};

/** An icon-led line item used by fit lists, bullets, outcomes and promises. */
export function CheckRow({ children, variant = 'check', className, iconClassName }: CheckRowProps) {
  const Icon = variant === 'check' ? CheckIcon : CrossIcon;
  return (
    <li className={cn('flex gap-3', className)}>
      <Icon
        className={cn(
          'mt-[3px] size-4 shrink-0 xl:size-[18px]',
          variant === 'check' ? 'text-accent-ink' : 'text-muted',
          iconClassName,
        )}
      />
      <span>{children}</span>
    </li>
  );
}
