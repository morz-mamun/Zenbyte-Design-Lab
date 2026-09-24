import { Reveal } from '@/components/motion/reveal';
import { StickyStack } from '@/components/motion/sticky-stack';
import { SectionIntro } from '@/components/sections/section-intro';
import { ButtonLink } from '@/components/ui/button';
import { StatusRows } from '@/components/ui/status-rows';
import { whatWeDeploy } from '@/content/home';
import { DeployVisual } from './deploy-visual';

export function WhatWeDeploy() {
  const cta = (
    <ButtonLink href={whatWeDeploy.cta.href} variant="secondary" arrow>
      {whatWeDeploy.cta.label}
    </ButtonLink>
  );

  return (
    <section aria-labelledby="deploy-heading" className="section-y">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow={whatWeDeploy.eyebrow}
            heading={whatWeDeploy.heading}
            headingId="deploy-heading"
            className="max-w-[1000px]"
          />
          <Reveal className="hidden shrink-0 lg:block">{cta}</Reveal>
        </div>

        <StickyStack label={whatWeDeploy.eyebrow} className="mt-12 xl:mt-20">
          {whatWeDeploy.items.map((item, index) => (
            <Reveal key={item.tag} as="article" className="card overflow-hidden rounded-2xl">
              <div className="grid gap-8 p-6 md:p-8 lg:min-h-[460px] lg:grid-cols-2 lg:gap-12 xl:p-12">
                <div className="flex flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-[64px] leading-[0.8] text-accent xl:text-[112px]">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="chip">{item.tag}</span>
                  </div>
                  <h3 className="mt-auto font-display text-[32px] leading-[0.95] uppercase md:text-[40px] xl:text-[56px]">
                    {item.title}
                  </h3>
                  <p className="type-body max-w-[520px]">{item.body}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="hidden w-full sm:block">
                    <DeployVisual rows={item.rows} index={index} tag={item.tag} />
                  </div>
                  {/* Same data as the diagram: visible on phones, read by screen readers everywhere. */}
                  <div className="rounded-xl border border-line-soft bg-bg px-4 pb-1 sm:sr-only md:px-5">
                    <StatusRows rows={item.rows} className="[&>li:first-child]:border-t-0" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </StickyStack>

        <div className="mt-10 lg:hidden">{cta}</div>
      </div>
    </section>
  );
}
