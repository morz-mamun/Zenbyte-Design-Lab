import type { Metadata } from 'next';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SkipLink } from '@/components/layout/skip-link';
import { ButtonLink } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1} className="outline-none">
        <section className="grid-paper">
          <div className="container-site flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24 xl:gap-7">
            <p className="eyebrow">404</p>
            <h1 className="type-display max-w-[900px]">This page isn&apos;t where you expected.</h1>
            <p className="type-lead max-w-[640px]">
              The link may be out of date, or the page has moved. Everything we deploy starts from
              the home page.
            </p>
            <ButtonLink href="/" arrow>
              Back to home
            </ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
