import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SkipLink } from '@/components/layout/skip-link';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1} className="overflow-x-clip outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
