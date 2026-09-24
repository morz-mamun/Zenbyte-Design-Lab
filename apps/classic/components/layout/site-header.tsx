import Link from 'next/link';

import { ButtonLink } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { siteConfig } from '@/constants/site-config';
import { primaryCta } from '@/content/site';
import { MobileMenu } from './mobile-menu';
import { NavLinks } from './nav-links';

export function SiteHeader() {
  return (
    <header className="relative z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-12 lg:px-16 xl:h-[88px] xl:px-[120px]">
        <Link href="/" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>
        <NavLinks className="hidden xl:block" />
        <ButtonLink
          href={primaryCta.href}
          size="nav"
          fullOnMobile={false}
          className="hidden xl:inline-flex"
        >
          {primaryCta.label}
        </ButtonLink>
        <MobileMenu className="xl:hidden" />
      </div>
    </header>
  );
}
