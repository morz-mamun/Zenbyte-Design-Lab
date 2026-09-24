import { Parallax } from '@/components/motion/parallax';
import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { NumberedSteps } from '@/components/sections/numbered-steps';
import { ButtonLink } from '@/components/ui/button';
import { Placeholder } from '@/components/ui/placeholder';
import { SectionLabel } from '@/components/ui/section-label';
import { startCta } from '@/content/home';

export function StartCta() {
  return (
    <section aria-labelledby="start-heading" className="section-y border-t border-line-soft">
      <div className="container-site">
        <Reveal distance={12}>
          <SectionLabel>{startCta.eyebrow}</SectionLabel>
        </Reveal>
        <SplitText
          as="h2"
          id="start-heading"
          text={startCta.heading}
          by="letter"
          className="type-display mt-6 xl:mt-8"
        />

        <div className="mt-12 flex flex-col gap-12 lg:mt-20 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
          <Reveal className="overflow-hidden rounded-2xl lg:w-[42%] lg:flex-none">
            <Parallax range={40} className="h-[280px] md:h-[400px] lg:h-[600px]">
              <Placeholder
                slot={startCta.image}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-[calc(100%+80px)] -translate-y-10 rounded-2xl border-0"
              />
            </Parallax>
          </Reveal>
          <div className="flex flex-1 flex-col gap-10">
            <Reveal className="flex flex-col items-start gap-8">
              <p className="type-lead max-w-[620px]">{startCta.lead}</p>
              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-3.5">
                <ButtonLink href={startCta.primary.href} arrow>
                  {startCta.primary.label}
                </ButtonLink>
                <ButtonLink href={startCta.secondary.href} variant="secondary">
                  {startCta.secondary.label}
                </ButtonLink>
              </div>
            </Reveal>
            <NumberedSteps steps={startCta.steps} />
          </div>
        </div>
      </div>
    </section>
  );
}
