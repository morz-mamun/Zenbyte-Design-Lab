'use client';

import { useSyncExternalStore } from 'react';

import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { getTheme, subscribeTheme, type Theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { primeDropSound } from './drop-sound';
import { toggleTheme } from './theme-transition';

const serverTheme = (): Theme => 'dark';

/** Twinkling night stars around the icon, dark theme only. */
const sparkles = [
  { className: 'top-[9px] left-[10px] size-[5px]', delay: '0s', shape: 'sparkle' },
  { className: 'top-[12px] right-[9px] size-[2px]', delay: '0.9s', shape: 'dot' },
  { className: 'bottom-[10px] left-[13px] size-[2px]', delay: '1.7s', shape: 'dot' },
  { className: 'right-[11px] bottom-[9px] size-[4px]', delay: '1.2s', shape: 'sparkle' },
] as const;

/**
 * Header button that switches between the dark and light themes with the
 * drop transition. The icon is picked by CSS from `<html data-theme>`, so a
 * stored light theme shows the right icon before hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, serverTheme);
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      data-theme-toggle=""
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      onClick={(event) => {
        primeDropSound();
        toggleTheme(event.currentTarget);
      }}
      className={cn(
        'relative z-[60] flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-bg/60 text-fg backdrop-blur transition-colors hover:border-fg',
        className,
      )}
    >
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.className}
          aria-hidden="true"
          style={{ animationDelay: sparkle.delay }}
          className={cn(
            'pointer-events-none absolute animate-twinkle text-fg motion-reduce:animate-none motion-reduce:opacity-60 in-data-[theme=light]:hidden',
            sparkle.shape === 'dot' && 'rounded-full bg-current',
            sparkle.className,
          )}
        >
          {sparkle.shape === 'sparkle' && (
            <svg viewBox="0 0 10 10" className="block size-full fill-current">
              <path d="M5 0C5.4 3.2 6.8 4.6 10 5 6.8 5.4 5.4 6.8 5 10 4.6 6.8 3.2 5.4 0 5 3.2 4.6 4.6 3.2 5 0Z" />
            </svg>
          )}
        </span>
      ))}
      <SunIcon className="in-data-[theme=light]:hidden" />
      <MoonIcon className="hidden in-data-[theme=light]:block" />
    </button>
  );
}
