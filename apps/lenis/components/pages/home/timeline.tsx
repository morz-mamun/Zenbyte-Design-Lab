import { ProgressMarker, ScrollProgress } from '@/components/motion/scroll-progress';
import { Reveal } from '@/components/motion/reveal';
import { SectionIntro } from '@/components/sections/section-intro';
import { ButtonLink } from '@/components/ui/button';
import { timeline } from '@/content/home';

export function Timeline() {
  return (
    <section aria-labelledby="timeline-heading" className="section-y border-y border-line-soft bg-surface">
      <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-28">
        <div className="flex flex-col items-start gap-10 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
          <SectionIntro
            eyebrow={timeline.eyebrow}
            heading={timeline.heading}
            lead={timeline.lead}
            headingId="timeline-heading"
            headingClassName="text-[clamp(2.5rem,4.6vw,4.75rem)]"
          />
          <Reveal delay={0.2}>
            <ButtonLink href={timeline.cta.href} variant="secondary" arrow>
              {timeline.cta.label}
            </ButtonLink>
          </Reveal>
        </div>

        <ScrollProgress label={timeline.eyebrow} trackClassName="top-[10px] left-[5px]" className="flex flex-col">
          {timeline.phases.map((phase) => (
            <li key={phase.week} className="relative pb-14 pl-10 last:pb-0 md:pl-14 xl:pb-24">
              <ProgressMarker className="absolute top-1 left-0" />
              <Reveal className="flex flex-col gap-4">
                <p className="label text-accent-text">{phase.week}</p>
                <h3 className="font-display text-[36px] leading-[0.95] uppercase md:text-[48px] xl:text-[64px]">
                  {phase.title}
                </h3>
                <p className="type-body max-w-[560px]">{phase.body}</p>
              </Reveal>
            </li>
          ))}
        </ScrollProgress>
      </div>
    </section>
  );
}
