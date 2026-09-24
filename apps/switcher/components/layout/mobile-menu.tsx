'use client';

import { useLenis } from 'lenis/react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';

import { useMotionPrefs } from '@/components/motion/motion-provider';
import { useSmoothScrollTo } from '@/components/motion/smooth-scroll';
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from '@/components/ui/icons';
import { sections, site } from '@/content/landing';
import { cn } from '@/lib/utils';

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Menu button and full-screen sheet for viewports below the desktop nav,
 * modelled on apps/motion's mobile menu. Escape closes it and returns focus
 * to the button; page scroll is locked and the page behind is inert while
 * it is open.
 */
export function MobileMenu({
  active,
  className,
  onOpenChange,
}: {
  active: string | null;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const scrollTo = useSmoothScrollTo();
  const { reduced } = useMotionPrefs();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const main = document.querySelector('main');
    if (main) main.inert = true;
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
      if (main) main.inert = false;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, lenis]);

  // Close first, then scroll once the lock is released.
  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollTo(`#${id}`));
  };

  const duration = reduced ? 0 : 0.7;

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
            transition={{ duration, ease }}
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-bg pt-[var(--nav-h)]"
          >
            <nav aria-label="Sections" className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-6 pb-8 sm:px-8">
              <ul>
                {sections.map((section, index) => (
                  <li key={section.id} className="overflow-clip border-b border-line">
                    <m.div
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '100%' }}
                      transition={{ duration, ease, delay: reduced ? 0 : 0.15 + index * 0.06 }}
                    >
                      <a
                        href={`#${section.id}`}
                        onClick={(event) => goTo(event, section.id)}
                        aria-current={active === section.id ? 'true' : undefined}
                        className="group flex items-baseline gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="w-9 shrink-0 font-mono text-sm text-accent-text">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={cn(
                            'font-display text-[40px] leading-[1] uppercase sm:text-[52px]',
                            active === section.id ? 'text-accent-text' : 'text-fg',
                          )}
                        >
                          {section.label}
                        </span>
                      </a>
                    </m.div>
                  </li>
                ))}
              </ul>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.5 }}
                className="mt-auto flex flex-col gap-4 pt-10"
              >
                <a
                  href="#designs"
                  onClick={(event) => goTo(event, 'designs')}
                  className="flex h-12 items-center justify-center rounded-full bg-accent font-medium text-on-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  View designs
                </a>
                <a
                  href={site.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-line text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Source on GitHub
                  <ArrowUpRightIcon />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
