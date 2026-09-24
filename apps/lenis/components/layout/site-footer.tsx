import Link from 'next/link';

import { FitText } from '@/components/motion/fit-text';
import { Reveal } from '@/components/motion/reveal';
import { RollLabel } from '@/components/motion/roll-label';
import { SplitText } from '@/components/motion/split-text';
import { ButtonLink } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { siteConfig } from '@/constants/site-config';
import { footer, primaryCta } from '@/content/site';
import { BackToTop } from './back-to-top';

const linkClass = 'group inline-flex text-[15px] leading-[1.3] text-fg-2 transition-colors duration-300 hover:text-fg';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line-soft bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 glow [--glow:0.15]"
      />
      <div className="container-site relative pt-20 md:pt-28 xl:pt-36">
        {/* Closing call to action */}
        <div className="flex flex-col gap-8 border-b border-line-soft pb-16 md:pb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <Reveal distance={12}>
              <SectionLabel>{primaryCta.label}</SectionLabel>
            </Reveal>
            <SplitText as="h2" text="Let's work together" by="letter" className="type-h2" />
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <ButtonLink href={primaryCta.href} arrow>
              {primaryCta.label}
            </ButtonLink>
          </Reveal>
        </div>

        {/* Tagline + link columns */}
        <div className="flex flex-col gap-12 py-14 lg:flex-row lg:justify-between lg:gap-16 xl:py-20">
          <p className="type-lead max-w-[420px]">{footer.tagline}</p>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-16 xl:gap-24">
            {footer.columns.map((column, index) => (
              <nav
                key={column.heading}
                aria-label={column.heading}
                className={index === footer.columns.length - 1 ? 'col-span-2 md:col-span-1' : undefined}
              >
                <h2 className="label">({column.heading})</h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith('/') ? (
                        <Link href={link.href} className={linkClass}>
                          <RollLabel>{link.label}</RollLabel>
                        </Link>
                      ) : (
                        <a href={link.href} className={linkClass}>
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Giant wordmark */}
        <FitText className="font-display leading-[0.8] text-fg uppercase select-none" fallback="17vw">
          <SplitText text={siteConfig.name} by="letter" />
        </FitText>

        <div className="mt-8 flex flex-col gap-3 border-t border-line-soft py-6 font-mono text-xs leading-[1.4] text-muted uppercase md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {siteConfig.name}
          </span>
          <span>{footer.signoff}</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
