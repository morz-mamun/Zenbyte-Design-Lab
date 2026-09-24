import type { Metadata } from 'next';

import { IndustryIndex } from '@/components/pages/industries/industry-index';
import { IndustryRow } from '@/components/pages/industries/industry-row';
import { PageHero } from '@/components/sections/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { hero, industries, meta, stillAFit } from '@/content/industries';

export const metadata: Metadata = meta;

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.heading}
        lead={hero.lead}
        size="display-sm"
        leadClassName="max-w-[600px]"
        actions={
          <>
            <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
        aside={<IndustryIndex />}
      />

      <section aria-label="Industries" className="pt-2 pb-12 md:py-14 xl:py-[60px]">
        <div className="container-site">
          {industries.map((industry, index) => (
            <IndustryRow key={industry.n} industry={industry} reverse={index % 2 === 1} />
          ))}
        </div>
      </section>

      <section aria-labelledby="still-a-fit-heading" className="surface-dark bg-ink">
        <div className="container-site flex flex-col gap-5 py-11 md:py-16 lg:flex-row lg:items-center lg:gap-20 xl:min-h-[440px] xl:py-0">
          <div className="flex flex-col gap-3.5 lg:w-[45%] xl:w-[640px] xl:flex-none xl:gap-5">
            <p className="eyebrow text-accent">{stillAFit.eyebrow}</p>
            <h2 id="still-a-fit-heading" className="type-h2 text-[30px] text-paper md:text-[40px] xl:text-[56px]">
              {stillAFit.heading}
            </h2>
          </div>
          <div className="flex flex-1 flex-col items-start gap-5 xl:gap-7">
            <p className="type-lead text-on-dark">{stillAFit.body}</p>
            <ButtonLink href={stillAFit.action.href}>{stillAFit.action.label}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
