import { HorizontalScroll } from '@/components/motion/horizontal-scroll';
import { SectionIntro } from '@/components/sections/section-intro';
import { nextSteps } from '@/content/start-project';

/** "What happens next": a pinned section whose step cards slide horizontally on scroll. */
export function NextSteps() {
  return (
    <section aria-labelledby="next-steps-heading" className="border-t border-line-soft">
      <HorizontalScroll
        label={nextSteps.heading}
        header={
          <SectionIntro
            eyebrow={nextSteps.eyebrow}
            heading={nextSteps.heading}
            headingId="next-steps-heading"
            headingClassName="text-[clamp(2.75rem,5.6vw,5.5rem)]"
          />
        }
      >
        {nextSteps.steps.map((step) => (
          <article
            key={step.n}
            className="card flex h-full min-h-[340px] flex-col justify-between gap-10 rounded-2xl p-6 transition-colors duration-300 hover:border-line md:p-8 xl:min-h-[380px] xl:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-display text-[64px] leading-[0.8] text-accent xl:text-[112px]">{step.n}.</span>
              <span className="chip">Step {step.n}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-[30px] leading-[0.95] uppercase md:text-[40px] xl:text-[52px]">
                {step.title}
              </h3>
              <p className="type-body max-w-[480px]">{step.body}</p>
            </div>
          </article>
        ))}
      </HorizontalScroll>
    </section>
  );
}
