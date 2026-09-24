import type { Metadata } from 'next';

import { SiteShell } from '@/components/layout/site-shell';
import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { ButtonLink } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="container-site flex min-h-[70vh] flex-col items-start justify-center gap-8 py-24">
          <SectionLabel>404</SectionLabel>
          <SplitText
            as="h1"
            text="This page isn't where you expected."
            by="word"
            trigger="intro"
            className="type-display-sm max-w-[1100px]"
          />
          <Reveal trigger="intro" delay={0.4} className="flex flex-col items-start gap-8">
            <p className="type-lead max-w-[640px]">
              The link may be out of date, or the page has moved. Everything we deploy starts from
              the home page.
            </p>
            <ButtonLink href="/" arrow>
              Back to home
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
