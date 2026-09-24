import type { ReactNode } from 'react';

import { Cursor } from '@/components/motion/cursor';
import { IntroLoader } from '@/components/motion/intro-loader';
import { MotionProvider } from '@/components/motion/motion-provider';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { SkipLink } from './skip-link';

/** The site frame: motion system, header, main landmark and footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll />
      <IntroLoader />
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1} className="overflow-x-clip pt-[var(--header-h)] outline-none">
        {children}
      </main>
      <SiteFooter />
      <Cursor />
    </MotionProvider>
  );
}
