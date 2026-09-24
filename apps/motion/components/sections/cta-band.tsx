import { SplitText } from '@/components/motion/split-text';
import { Reveal } from '@/components/motion/reveal';
import { ButtonLink } from '@/components/ui/button';
import type { Link } from '@/content/types';
import { cn } from '@/lib/utils';

type CtaBandProps = {
  heading: string;
  action: Link;
  /** `accent`: orange band, dark button. `dark`: surface band, orange button. */
  tone?: 'accent' | 'dark';
  /** Render as a rounded inset card on mobile (detail templates). */
  insetOnMobile?: boolean;
  headingClassName?: string;
};

/** Full-width closing band with a giant heading and one action. */
export function CtaBand({
  heading,
  action,
  tone = 'accent',
  insetOnMobile = false,
  headingClassName,
}: CtaBandProps) {
  const accent = tone === 'accent';

  return (
    <section className={cn(insetOnMobile && 'px-[var(--gutter)] pb-12 md:px-0 md:pb-0')}>
      <div
        className={cn(
          accent ? 'bg-accent text-on-accent' : 'border-y border-line-soft bg-surface text-fg',
          insetOnMobile && 'rounded-2xl md:rounded-none',
        )}
      >
        <div className="container-site flex flex-col gap-8 py-14 md:py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12 xl:py-28">
          <SplitText
            as="h2"
            text={heading}
            by="word"
            className={cn('type-h2 lg:max-w-[900px]', headingClassName)}
          />
          <Reveal delay={0.2} className="shrink-0">
            <ButtonLink href={action.href} variant={accent ? 'inverted' : 'primary'} arrow>
              {action.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
