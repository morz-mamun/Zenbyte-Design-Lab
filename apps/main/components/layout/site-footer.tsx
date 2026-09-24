import Link from 'next/link';

import { Logo } from '@/components/ui/logo';
import { siteConfig } from '@/constants/site-config';
import { footer } from '@/content/site';

const linkClass =
  'text-[15px] leading-[1.3] text-on-dark transition-colors duration-150 hover:text-white';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark bg-ink text-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-9 px-6 pt-14 pb-8 md:px-12 md:pt-20 md:pb-10 lg:px-16 xl:min-h-[420px] xl:justify-between xl:px-[120px]">
        <div className="flex flex-col gap-9 lg:flex-row lg:justify-between lg:gap-[60px]">
          <div className="flex flex-col gap-4 lg:w-[380px] lg:gap-5">
            <Logo tone="dark" />
            <p className="text-[15px] leading-[1.6] text-on-dark md:text-base">{footer.tagline}</p>
          </div>

          <div className="flex flex-col gap-9 md:flex-row md:gap-16 xl:gap-24">
            {footer.columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="font-mono text-xs leading-none font-medium tracking-[0.08em] text-accent uppercase">
                  {column.heading}
                </h2>
                <ul className="mt-4 flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith('/') ? (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
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

        <div className="flex flex-col gap-2 border-t border-dark-line-soft pt-5 font-mono text-[13px] leading-[1.4] text-on-dark-muted md:flex-row md:justify-between md:pt-6 md:leading-none">
          <span>
            © {year} {siteConfig.name}
          </span>
          <span>{footer.signoff}</span>
        </div>
      </div>
    </footer>
  );
}
