import { siteConfig } from '@/constants/site-config';
import { cn } from '@/lib/utils';
import { LogoMark } from './icons';

type LogoProps = {
  tone?: 'light' | 'dark';
  className?: string;
};

/** Rounded-square arrow mark with the serif wordmark. `dark` = for dark surfaces. */
export function Logo({ tone = 'light', className }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 md:gap-2.5',
        tone === 'dark' ? 'text-paper' : 'text-ink',
        className,
      )}
    >
      <LogoMark className="size-[26px] md:size-[30px]" />
      <span className="font-serif text-[26px] leading-none tracking-[-0.01em] md:text-[32px]">
        {siteConfig.name}
      </span>
    </span>
  );
}
