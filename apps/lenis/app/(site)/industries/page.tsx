import type { Metadata } from 'next';

import { IndustriesList } from '@/components/pages/industries/industries-list';
import { Reveal } from '@/components/motion/reveal';
import { PageHero } from '@/components/sections/page-hero';
import { SectionIntro } from '@/components/sections/section-intro';
import { ButtonLink } from '@/components/ui/button';
import { hero, meta, stillAFit } from '@/content/industries';

export const metadata: Metadata = meta;

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.heading}
        lead={hero.lead}
        leadClassName="max-w-[600px]"
        actions={
          <>
            <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
      />

      <IndustriesList />

      <section aria-labelledby="still-a-fit-heading" className="border-y border-line-soft bg-surface">
        <div className="container-site flex flex-col gap-10 py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-20 xl:py-32">
          <SectionIntro
            eyebrow={stillAFit.eyebrow}
            heading={stillAFit.heading}
            headingId="still-a-fit-heading"
            className="lg:max-w-[760px]"
          />
          <Reveal delay={0.2} className="flex flex-1 flex-col items-start gap-8 lg:max-w-[480px]">
            <p className="type-lead">{stillAFit.body}</p>
            <ButtonLink href={stillAFit.action.href} arrow>
              {stillAFit.action.label}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
