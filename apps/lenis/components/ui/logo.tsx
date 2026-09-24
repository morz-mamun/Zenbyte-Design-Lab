import { siteConfig } from '@/constants/site-config';
import { cn } from '@/lib/utils';
import { LogoMark } from './icons';

/** Arrow mark (accent) with the condensed uppercase wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-fg md:gap-2.5', className)}>
      <LogoMark className="size-[24px] text-accent md:size-[28px]" />
      <span className="font-display text-[24px] leading-none tracking-[0.01em] uppercase md:text-[28px]">
        {siteConfig.name}
      </span>
    </span>
  );
}
