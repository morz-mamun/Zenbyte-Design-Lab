import { ButtonLink } from '@/components/ui/button';
import type { Link } from '@/content/types';
import { cn } from '@/lib/utils';

type CtaBandProps = {
  heading: string;
  action: Link;
  /** `accent`: orange band, ink button. `dark`: ink band, orange button. */
  tone?: 'accent' | 'dark';
  /** Render as a rounded inset card on mobile (detail templates). */
  insetOnMobile?: boolean;
  headingClassName?: string;
};

/** Full-width closing band with a heading and one action. */
export function CtaBand({
  heading,
  action,
  tone = 'accent',
  insetOnMobile = false,
  headingClassName,
}: CtaBandProps) {
  const accent = tone === 'accent';

  return (
    <section
      className={cn(
        insetOnMobile ? 'px-6 pb-11 md:px-0 md:pb-0' : undefined,
        !accent && 'surface-dark',
      )}
    >
      <div
        className={cn(
          accent ? 'bg-accent' : 'bg-ink',
          insetOnMobile && 'rounded-[14px] md:rounded-none',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1440px] flex-col gap-4 md:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10',
            insetOnMobile ? 'p-7 md:px-12 md:py-16' : 'px-6 py-11 md:px-12 md:py-16',
            'lg:px-16 xl:min-h-[320px] xl:px-[120px] xl:py-0',
          )}
        >
          <h2
            className={cn(
              'type-h2 text-[30px] md:text-[40px] lg:max-w-[700px] xl:max-w-[720px] xl:text-[56px]',
              !accent && 'text-paper',
              headingClassName,
            )}
          >
            {heading}
          </h2>
          <ButtonLink href={action.href} variant={accent ? 'inverted' : 'primary'} arrow>
            {action.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
