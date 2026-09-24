'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import { ButtonLink } from '@/components/ui/button';
import { CloseIcon, MenuIcon } from '@/components/ui/icons';
import { primaryCta, primaryNav } from '@/content/site';
import { cn } from '@/lib/utils';
import { isActive } from './nav-links';

/**
 * Menu button and drop-down panel for viewports below the full desktop nav.
 * The panel is positioned against the (relative) site header.
 */
export function MobileMenu({ className }: { className?: string }) {
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close when the route changes (e.g. browser back/forward).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={className}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 cursor-pointer items-center justify-center rounded-[10px] border border-ink bg-transparent text-ink"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id={panelId}
        className={cn(
          'absolute inset-x-0 top-full z-50 bg-paper shadow-[0_16px_24px_rgba(20,23,26,0.18)]',
          'transition-[opacity,transform,visibility] duration-200 ease-out',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <nav aria-label="Primary" className="mx-auto max-w-[1440px] px-5 pt-2 pb-7 md:px-12 lg:px-16">
          <ul>
            {primaryNav.map((item) => {
              const active = isActive(pathname, item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block border-t border-line py-4 text-xl leading-none font-medium text-ink',
                      active && 'underline decoration-2 underline-offset-8',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink
            href={primaryCta.href}
            onClick={close}
            className="mt-5 h-12 w-full md:w-full"
          >
            {primaryCta.label}
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
