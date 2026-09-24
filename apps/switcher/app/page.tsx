/**
 * ZENBYTE Design Lab landing page. A server component: the copy is in the
 * HTML, and only the navbar, motion wrappers and interactive previews run
 * on the client. Section copy lives in content/landing.ts.
 */

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteNav } from '@/components/layout/site-nav';
import { Build } from '@/components/sections/build';
import { Compare } from '@/components/sections/compare';
import { Designs } from '@/components/sections/designs';
import { Explore } from '@/components/sections/explore';
import { Hero } from '@/components/sections/hero';
import { Idea } from '@/components/sections/idea';

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Idea />
        <Designs />
        <Compare />
        <Build />
        <Explore />
      </main>
      <SiteFooter />
    </>
  );
}
