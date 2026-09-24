import { SectionIntro } from '@/components/sections/section-intro';
import { ButtonLink } from '@/components/ui/button';
import { timeline } from '@/content/home';

export function Timeline() {
  return (
    <section aria-labelledby="timeline-heading" className="surface-dark section-y bg-ink">
      <div className="container-site flex flex-col gap-8 xl:gap-14">
        <SectionIntro
          eyebrow={timeline.eyebrow}
          heading={timeline.heading}
          lead={timeline.lead}
          tone="dark"
          headingId="timeline-heading"
          className="max-w-[820px]"
        />
        <ol className="grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 xl:grid-cols-4">
          {timeline.phases.map((phase) => (
            <li
              key={phase.week}
              className="flex flex-col gap-2 border-t border-dark-line py-5 md:gap-4 md:border-t-0 md:py-0"
            >
              <span aria-hidden="true" className="hidden items-center md:flex">
                <span className="size-3.5 shrink-0 rounded-full bg-accent" />
                <span className="h-px flex-1 bg-dark-line" />
              </span>
              <p className="eyebrow text-accent md:mt-2">{phase.week}</p>
              <h3 className="type-h3 text-[22px] text-paper md:text-[26px] xl:text-[30px]">{phase.title}</h3>
              <p className="type-body text-on-dark">{phase.body}</p>
            </li>
          ))}
        </ol>
        <div>
          <ButtonLink href={timeline.cta.href} variant="secondary-on-dark">
            {timeline.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
