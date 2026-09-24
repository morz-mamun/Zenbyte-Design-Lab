import type { Metadata } from 'next';

import { InquiryForm } from '@/components/pages/start-project/inquiry-form';
import { NextSteps } from '@/components/pages/start-project/next-steps';
import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { CheckRow } from '@/components/ui/check-row';
import { SectionLabel } from '@/components/ui/section-label';
import { intro, meta } from '@/content/start-project';

export const metadata: Metadata = meta;

export default function StartProjectPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[900px] glow [--glow:0.10]"
        />
        <div className="container-site relative grid gap-12 pt-10 pb-16 md:pt-16 md:pb-20 lg:grid-cols-2 lg:gap-x-16 xl:grid-cols-[minmax(0,1fr)_600px] xl:gap-x-24 xl:pt-16 xl:pb-28">
          <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
            <Reveal trigger="intro" distance={12}>
              <SectionLabel>{intro.eyebrow}</SectionLabel>
            </Reveal>
            <SplitText as="h1" text={intro.heading} by="word" trigger="intro" className="type-display-sm" />
            <Reveal trigger="intro" delay={0.4} className="flex flex-col gap-6">
              <p className="type-lead">{intro.lead}</p>
              <ul className="flex flex-col gap-3 xl:gap-3.5">
                {intro.promises.map((promise) => (
                  <CheckRow
                    key={promise}
                    className="items-center gap-3 text-[15px] leading-[1.3] font-medium text-fg-2 xl:text-base"
                    iconClassName="mt-0"
                  >
                    {promise}
                  </CheckRow>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal trigger="intro" delay={0.5} className="lg:col-start-2 lg:row-start-1 lg:self-start">
            <InquiryForm />
          </Reveal>
        </div>
      </section>
      <NextSteps />
    </>
  );
}
