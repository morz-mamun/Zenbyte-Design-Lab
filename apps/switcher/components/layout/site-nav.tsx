'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';

import { PageProgress } from '@/components/motion/scroll-progress';
import { useSmoothScrollTo } from '@/components/motion/smooth-scroll';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ArrowRightIcon, GitHubIcon } from '@/components/ui/icons';
import { sections, site } from '@/content/landing';
import { cn } from '@/lib/utils';
import { MobileMenu } from './mobile-menu';
import { useActiveSection } from './use-active-section';

const sectionIds = sections.map((section) => section.id);

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

/**
 * Fixed navbar: transparent over the top of the hero, blurred once scrolled.
 * Past the hero it hides while scrolling down and returns on any upward
 * scroll; it never hides while keyboard focus is inside it, the menu is
 * open, or a scroll started from one of its links is still running. Section
 * links mark the section in view.
 */
export function SiteNav() {
  const { scrollY } = useScroll();
  const scrollTo = useSmoothScrollTo();
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);

  // Set while a jump started from the navbar is scrolling; cleared once the
  // scroll has been still for a moment, so the navbar stays in view after use.
  const jumpTimer = useRef<number | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (jumpTimer.current !== null) {
      window.clearTimeout(jumpTimer.current);
      jumpTimer.current = window.setTimeout(() => (jumpTimer.current = null), 200);
      return;
    }
    if (y > previous && y > window.innerHeight * 0.8) setHidden(true);
    else if (y < previous) setHidden(false);
  });

  const pinForJump = () => {
    if (jumpTimer.current !== null) window.clearTimeout(jumpTimer.current);
    jumpTimer.current = window.setTimeout(() => (jumpTimer.current = null), 200);
    setHidden(false);
  };

  const collapsed = hidden && !menuOpen && !focusWithin;

  return (
    <header
      onClickCapture={(event) => {
        if ((event.target as Element).closest('a[href^="#"]')) pinForJump();
      }}
      onFocus={(event) => {
        // Only keyboard focus pins the navbar open; mouse clicks don't.
        if (event.target.matches(':focus-visible')) setFocusWithin(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusWithin(false);
          setHidden(false);
        }
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled && !menuOpen ? 'border-line bg-bg/75 backdrop-blur-md' : 'border-transparent bg-transparent',
        collapsed && '-translate-y-full',
      )}
    >
      <div className="container-lab flex h-full items-center justify-between gap-6">
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            history.replaceState(null, '', location.pathname);
            scrollTo(0);
          }}
          aria-label={`${site.name}, back to top`}
          className={cn('relative z-[60] flex items-baseline gap-2 rounded-sm', focusRing)}
        >
          <span className="text-base font-bold tracking-[0.26em] sm:text-lg">{site.wordmark}</span>
          <span className="text-base text-muted sm:text-lg">Design Lab</span>
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => {
              const current = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={current ? 'true' : undefined}
                    className={cn(
                      'relative flex h-10 items-center rounded-full px-3.5 text-[15px] transition-colors',
                      current ? 'text-fg' : 'text-muted hover:text-fg',
                      focusRing,
                    )}
                  >
                    {section.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-[opacity,transform] duration-300',
                        current ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source on GitHub (opens in a new tab)"
            className={cn(
              'relative z-[60] hidden size-11 items-center justify-center rounded-full border border-line bg-bg/60 text-fg backdrop-blur transition-colors hover:border-fg sm:flex',
              focusRing,
            )}
          >
            <GitHubIcon />
          </a>
          <a
            href="#designs"
            className={cn(
              'group hidden h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-5 text-[15px] font-medium text-on-accent transition-transform hover:scale-[1.03] sm:flex',
              focusRing,
            )}
          >
            View designs
            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <ThemeToggle className={focusRing} />
          <MobileMenu active={active} className="lg:hidden" onOpenChange={setMenuOpen} />
        </div>
      </div>
      <PageProgress className="absolute inset-x-0 -bottom-px" />
    </header>
  );
}
