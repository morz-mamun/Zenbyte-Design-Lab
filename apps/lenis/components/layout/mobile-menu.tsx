'use client';

import { useLenis } from 'lenis/react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import { ButtonLink } from '@/components/ui/button';
import { CloseIcon, MenuIcon } from '@/components/ui/icons';
import { siteConfig } from '@/constants/site-config';
import { primaryCta, primaryNav } from '@/content/site';
import { cn } from '@/lib/utils';
import { isActive } from './nav-links';

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Menu button and full-screen overlay for viewports below the desktop nav.
 * Links stagger in; page scroll is locked while open.
 */
export function MobileMenu({
  className,
  onOpenChange,
}: {
  className?: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close when the route changes (e.g. browser back/forward).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  // Scroll lock and Escape to close.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      lenis?.start();
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <div className={className}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="relative z-[60] flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-bg/60 text-fg backdrop-blur transition-colors hover:border-fg"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            data-lenis-prevent=""
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-bg pt-[var(--header-h)]"
          >
            <nav aria-label="Primary" className="container-site flex flex-1 flex-col pt-8 pb-8">
              <ul>
                {primaryNav.map((item, index) => {
                  const active = isActive(pathname, item);
                  return (
                    <li key={item.href} className="overflow-clip border-b border-line-soft">
                      <m.div
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.7, ease, delay: 0.15 + index * 0.06 }}
                      >
                        <Link
                          href={item.href}
                          onClick={close}
                          aria-current={active ? 'page' : undefined}
                          className="flex items-baseline gap-4 py-4"
                        >
                          <span className="w-10 shrink-0 font-display text-[24px] leading-none text-accent sm:w-12 sm:text-[30px]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={cn(
                              'font-display text-[44px] leading-[0.95] uppercase sm:text-[56px]',
                              active ? 'text-accent' : 'text-fg',
                            )}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </m.div>
                    </li>
                  );
                })}
              </ul>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-auto flex flex-col gap-5 pt-10"
              >
                <ButtonLink href={primaryCta.href} onClick={close} className="w-full md:w-full" arrow>
                  {primaryCta.label}
                </ButtonLink>
                <a href={`mailto:${siteConfig.contact.email}`} className="type-mono text-center text-fg-2">
                  {siteConfig.contact.email}
                </a>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
