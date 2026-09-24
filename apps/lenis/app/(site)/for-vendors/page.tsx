import type { Metadata } from 'next';

import { CtaBand } from '@/components/sections/cta-band';
import { DeployStory } from '@/components/sections/deploy-story';
import { PageHero } from '@/components/sections/page-hero';
import { SectionIntro } from '@/components/sections/section-intro';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ButtonLink } from '@/components/ui/button';
import { benefits, cta, hero, meta, models } from '@/content/vendors';

export const metadata: Metadata = meta;

export default function ForVendorsPage() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.heading}
        lead={hero.lead}
        leadClassName="max-w-[600px]"
        contentClassName="pb-6 md:pb-8 xl:pb-10"
        // Stays above the story's empty top half (pulled up below) so the CTA remains clickable.
        className="z-[1]"
        actions={
          <ButtonLink href={hero.action.href} arrow>
            {hero.action.label}
          </ButtonLink>
        }
      />

      {/* Pinned pipeline → pod → live story (as on home). From md it centres vertically, so pull it in at both ends to close the gaps. */}
      <DeployStory content={hero.diagram} className="md:-mt-[14svh] md:-mb-[14svh]" />

      {/* Positioned so it paints over the story's empty bottom band (pulled up above). */}
      <section aria-labelledby="benefits-heading" className="section-y relative z-[1]">
        <div className="container-site flex flex-col gap-12 xl:gap-20">
          <SectionIntro
            eyebrow={benefits.eyebrow}
            heading={benefits.heading}
            headingId="benefits-heading"
            className="max-w-[1100px]"
          />
          <RevealGroup as="ol" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {benefits.items.map((item) => (
              <RevealItem
                as="li"
                key={item.n}
                className="card flex flex-col gap-4 p-6 transition-colors duration-300 hover:border-line xl:min-h-[320px] xl:p-8"
              >
                <span className="font-display text-[48px] leading-none text-accent xl:text-[64px]">{item.n}</span>
                <h3 className="type-h3 mt-auto">{item.title}</h3>
                <p className="type-body">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="models-heading" className="section-y border-y border-line-soft bg-surface">
        <div className="container-site flex flex-col gap-12 xl:gap-20">
          <SectionIntro
            eyebrow={models.eyebrow}
            heading={models.heading}
            headingId="models-heading"
            className="max-w-[1000px]"
          />
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {models.items.map((model) => (
              <RevealItem
                as="article"
                key={model.label}
                className="flex flex-col gap-5 rounded-2xl border border-line p-7 transition-colors duration-300 hover:border-accent xl:min-h-[360px] xl:p-12"
              >
                <p className="label text-accent-text">({model.label})</p>
                <h3 className="mt-auto font-display text-[36px] leading-[0.95] uppercase md:text-[48px] xl:text-[64px]">
                  {model.title}
                </h3>
                <p className="type-body">{model.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand heading={cta.heading} action={cta.action} />
    </>
  );
}
