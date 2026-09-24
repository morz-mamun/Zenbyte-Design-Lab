import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** `display` = 84px h1, `display-sm` = 76px h1 (desktop sizes). */
  size?: 'display' | 'display-sm';
  actions?: ReactNode;
  /** Right-hand column (index card, diagram). Stacks below the text under `lg`. */
  aside?: ReactNode;
  titleClassName?: string;
  leadClassName?: string;
  className?: string;
};

/** Grid-paper page hero: eyebrow, h1, lead, optional actions and aside. */
export function PageHero({
  eyebrow,
  title,
  lead,
  size = 'display',
  actions,
  aside,
  titleClassName,
  leadClassName,
  className,
}: PageHeroProps) {
  const text = (
    <div className={cn('flex flex-col items-start gap-[18px] md:gap-6 xl:gap-7', aside && 'lg:min-w-0 lg:flex-1 xl:max-w-[680px]')}>
      {typeof eyebrow === 'string' ? <p className="eyebrow">{eyebrow}</p> : eyebrow}
      <h1 className={cn(size === 'display' ? 'type-display' : 'type-display-sm', titleClassName)}>{title}</h1>
      {lead && <p className={cn('type-lead', leadClassName)}>{lead}</p>}
      {actions && (
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-3.5">{actions}</div>
      )}
    </div>
  );

  return (
    <section className={cn('grid-paper', className)}>
      <div
        className={cn(
          'container-site pt-9 pb-8 md:pt-16 md:pb-14 xl:pt-24 xl:pb-16',
          aside && 'flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-[60px]',
        )}
      >
        {text}
        {aside}
      </div>
    </section>
  );
}
