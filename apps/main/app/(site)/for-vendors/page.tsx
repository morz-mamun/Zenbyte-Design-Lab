import type { Metadata } from 'next';

import { CtaBand } from '@/components/sections/cta-band';
import { EngineerDiagram } from '@/components/sections/engineer-diagram';
import { PageHero } from '@/components/sections/page-hero';
import { SectionIntro } from '@/components/sections/section-intro';
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
        size="display-sm"
        leadClassName="max-w-[600px]"
        actions={
          <ButtonLink href={hero.action.href} arrow>
            {hero.action.label}
          </ButtonLink>
        }
        aside={
          <EngineerDiagram
            content={hero.diagram}
            className="w-full lg:w-[40%] lg:max-w-[460px] lg:flex-none xl:w-[460px] xl:pt-2"
          />
        }
      />

      <section aria-labelledby="benefits-heading" className="section-y">
        <div className="container-site flex flex-col gap-7 xl:gap-12">
          <SectionIntro
            eyebrow={benefits.eyebrow}
            heading={benefits.heading}
            headingId="benefits-heading"
            className="max-w-[900px]"
          />
          <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {benefits.items.map((item) => (
              <li key={item.n} className="card flex flex-col gap-2.5 p-[22px] xl:min-h-[260px] xl:gap-3.5 xl:p-7">
                <span className="type-mono text-accent-ink">{item.n}</span>
                <h3 className="type-h3 text-[22px] xl:text-[30px]">{item.title}</h3>
                <p className="type-body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="models-heading" className="surface-dark section-y bg-ink">
        <div className="container-site flex flex-col gap-6 xl:gap-12">
          <SectionIntro
            eyebrow={models.eyebrow}
            heading={models.heading}
            tone="dark"
            headingId="models-heading"
            className="max-w-[800px]"
          />
          <div className="flex flex-col gap-6 lg:flex-row">
            {models.items.map((model) => (
              <article
                key={model.label}
                className="flex flex-1 flex-col gap-3 rounded-[14px] border border-dark-line p-6 xl:min-h-[300px] xl:gap-4 xl:p-8"
              >
                <p className="eyebrow text-accent">{model.label}</p>
                <h3 className="type-h3 text-[24px] text-paper md:text-[30px] xl:text-[38px]">{model.title}</h3>
                <p className="type-body text-on-dark">{model.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading={cta.heading} action={cta.action} />
    </>
  );
}
