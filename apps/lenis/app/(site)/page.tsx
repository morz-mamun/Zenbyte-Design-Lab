import { Approach } from '@/components/pages/home/approach';
import { HomeHero } from '@/components/pages/home/hero';
import { LogoStrip } from '@/components/pages/home/logo-strip';
import { ProofList } from '@/components/pages/home/proof-list';
import { StartCta } from '@/components/pages/home/start-cta';
import { Testimonials } from '@/components/pages/home/testimonials';
import { Timeline } from '@/components/pages/home/timeline';
import { VendorStrip } from '@/components/pages/home/vendor-strip';
import { WhatWeDeploy } from '@/components/pages/home/what-we-deploy';
import { caseStudies } from '@/content/case-studies';
import { proof } from '@/content/home';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Approach />
      <LogoStrip />
      <WhatWeDeploy />
      <Timeline />
      <ProofList eyebrow={proof.eyebrow} heading={proof.heading} studies={caseStudies} />
      <Testimonials />
      <StartCta />
      <VendorStrip />
    </>
  );
}
