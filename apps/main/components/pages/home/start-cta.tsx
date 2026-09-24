import { NumberedSteps } from '@/components/sections/numbered-steps';
import { ButtonLink } from '@/components/ui/button';
import { Placeholder } from '@/components/ui/placeholder';
import { startCta } from '@/content/home';

export function StartCta() {
  return (
    <section aria-labelledby="start-heading" className="section-y">
      <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-[60px]">
        <Placeholder
          slot={startCta.image}
          sizes="(min-width: 1280px) 460px, (min-width: 1024px) 40vw, 100vw"
          className="h-[260px] rounded-[14px] md:h-[360px] lg:h-[560px] lg:w-[40%] lg:flex-none xl:h-[640px] xl:w-[460px]"
        />
        <div className="flex flex-col gap-6 lg:gap-0 xl:w-[620px]">
          <p className="eyebrow">{startCta.eyebrow}</p>
          <h2 id="start-heading" className="type-h2 lg:mt-5">
            {startCta.heading}
          </h2>
          <p className="type-lead lg:mt-5">{startCta.lead}</p>
          <div className="flex flex-col gap-3 md:flex-row md:gap-3.5 lg:mt-8">
            <ButtonLink href={startCta.primary.href}>{startCta.primary.label}</ButtonLink>
            <ButtonLink href={startCta.secondary.href} variant="secondary">
              {startCta.secondary.label}
            </ButtonLink>
          </div>
          <NumberedSteps steps={startCta.steps} className="lg:mt-12" />
        </div>
      </div>
    </section>
  );
}
