import type { ReactNode } from 'react';

import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { SectionLabel } from '@/components/ui/section-label';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  /** `display` = largest h1, `display-sm` = inner-page h1. */
  size?: 'display' | 'display-sm';
  actions?: ReactNode;
  /** Right-hand column (index card, diagram). Stacks below the text under `lg`. */
  aside?: ReactNode;
  titleClassName?: string;
  leadClassName?: string;
  /** Inner container, e.g. to trim the bottom padding when a section follows tight. */
  contentClassName?: string;
  className?: string;
};

/**
 * Inner-page hero: "(LABEL)", a giant split-text h1 that reveals on load (after
 * the intro when it plays), then the lead, actions and optional aside.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  size = 'display-sm',
  actions,
  aside,
  titleClassName,
  leadClassName,
  contentClassName,
  className,
}: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 glow [--glow:0.10]"
      />
      <div className={cn('container-site relative pt-14 pb-16 md:pt-24 md:pb-24 xl:pt-32 xl:pb-32', contentClassName)}>
        <Reveal trigger="intro" distance={12}>
          <SectionLabel>{eyebrow}</SectionLabel>
        </Reveal>
        <SplitText
          as="h1"
          text={title}
          by="word"
          trigger="intro"
          delay={0.1}
          className={cn(
            'mt-6 xl:mt-8',
            size === 'display' ? 'type-display' : 'type-display-sm',
            titleClassName,
          )}
        />
        <div
          className={cn(
            'mt-8 flex flex-col gap-10 md:mt-12',
            aside && 'lg:flex-row lg:items-start lg:justify-between lg:gap-[60px]',
          )}
        >
          {(lead || actions) && (
            <Reveal trigger="intro" delay={0.45} className={cn('flex flex-col items-start gap-8', aside && 'lg:max-w-[620px] lg:flex-1')}>
              {lead && <p className={cn('type-lead max-w-[720px]', leadClassName)}>{lead}</p>}
              {actions && (
                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-3.5">{actions}</div>
              )}
            </Reveal>
          )}
          {aside && (
            <Reveal trigger="intro" delay={0.6} className="w-full lg:w-auto">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
