import type { Metadata } from 'next';

import { CaseStudyCard } from '@/components/sections/case-study-card';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHero } from '@/components/sections/page-hero';
import { caseStudies, cta, listing, meta } from '@/content/case-studies';

export const metadata: Metadata = meta;

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow={listing.eyebrow}
        title={listing.heading}
        lead={listing.lead}
        titleClassName="max-w-[1040px]"
        leadClassName="max-w-[720px]"
      />
      <section aria-label="Case studies" className="pt-4 pb-12 md:pt-8 md:pb-[72px] xl:pt-10 xl:pb-[100px]">
        <ul className="container-site grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {caseStudies.map((study, index) => (
            <li key={study.slug} className="flex">
              <CaseStudyCard study={study} index={index} className="w-full" />
            </li>
          ))}
        </ul>
      </section>
      <CtaBand heading={cta.heading} action={cta.action} />
    </>
  );
}
