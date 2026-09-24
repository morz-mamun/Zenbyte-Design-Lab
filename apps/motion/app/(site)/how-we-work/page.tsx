import type { Metadata } from 'next';

import { Fit } from '@/components/pages/how-we-work/fit';
import { Principles } from '@/components/pages/how-we-work/principles';
import { Roadmap } from '@/components/pages/how-we-work/roadmap';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHero } from '@/components/sections/page-hero';
import { cta, hero, meta } from '@/content/how-we-work';

export const metadata: Metadata = meta;

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.heading}
        lead={hero.lead}
        titleClassName="max-w-[1000px]"
        leadClassName="max-w-[760px]"
      />
      <Principles />
      <Roadmap />
      <Fit />
      <CtaBand heading={cta.heading} action={cta.action} />
    </>
  );
}
