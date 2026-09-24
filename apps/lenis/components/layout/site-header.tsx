'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ButtonLink } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { siteConfig } from '@/constants/site-config';
import { primaryCta } from '@/content/site';
import { cn } from '@/lib/utils';
import { MobileMenu } from './mobile-menu';
import { NavLinks } from './nav-links';

/**
 * Fixed header: transparent at the top, blurred once scrolled, hidden while
 * scrolling down and back on any upward scroll or keyboard focus inside it.
 */
export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // A clicked nav link keeps focus across client-side navigation; drop it so
  // the header can hide again on the new route.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setFocusWithin(false);
    setHidden(false);
  }

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 80);
    if (y > previous && y > 200) setHidden(true);
    else if (y < previous) setHidden(false);
  });

  const collapsed = hidden && !menuOpen && !focusWithin;

  return (
    <header
      onFocus={(event) => {
        // Only keyboard focus pins the header open; mouse clicks don't.
        if (event.target.matches(':focus-visible')) setFocusWithin(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusWithin(false);
          setHidden(false);
        }
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'border-b',
        scrolled && !menuOpen
          ? 'border-line-soft bg-bg/85 backdrop-blur-md'
          : 'border-transparent bg-transparent',
        collapsed && '-translate-y-full',
      )}
    >
      <div className="container-site flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="relative z-[60]">
          <Logo />
        </Link>
        <NavLinks className="hidden xl:block" />
        <div className="flex items-center gap-3">
          <ButtonLink href={primaryCta.href} size="nav" fullOnMobile={false} className="hidden xl:inline-flex">
            {primaryCta.label}
          </ButtonLink>
          <ThemeToggle />
          <MobileMenu className="xl:hidden" onOpenChange={setMenuOpen} />
        </div>
      </div>
    </header>
  );
}
