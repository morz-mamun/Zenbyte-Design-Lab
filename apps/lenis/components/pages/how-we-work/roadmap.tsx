import { ProgressMarker, ScrollProgress } from '@/components/motion/scroll-progress';
import { Reveal } from '@/components/motion/reveal';
import { SectionIntro } from '@/components/sections/section-intro';
import { roadmap } from '@/content/how-we-work';

export function Roadmap() {
  return (
    <section aria-labelledby="roadmap-heading" className="section-y border-y border-line-soft bg-surface">
      <div className="container-site flex flex-col gap-12 xl:gap-20">
        <SectionIntro
          eyebrow={roadmap.eyebrow}
          heading={roadmap.heading}
          lead={roadmap.lead}
          headingId="roadmap-heading"
          className="max-w-[1100px]"
        />
        <ScrollProgress label={roadmap.eyebrow} trackClassName="top-[10px] left-[5px]">
          {roadmap.phases.map((phase) => (
            <li key={phase.week} className="relative pb-12 pl-10 last:pb-0 md:pl-14 xl:pb-16">
              <ProgressMarker className="absolute top-1 left-0" />
              <Reveal className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-12">
                <p className="label pt-1 text-accent-text lg:w-[160px] lg:flex-none">{phase.week}</p>
                <h3 className="font-display text-[30px] leading-[0.95] uppercase lg:w-[320px] lg:flex-none xl:w-[420px] xl:text-[48px]">
                  {phase.title}
                </h3>
                <div className="flex flex-1 flex-col gap-3">
                  <p className="type-body">{phase.body}</p>
                  {phase.output && <p className="type-mono text-fg-2">{phase.output}</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ScrollProgress>
      </div>
    </section>
  );
}
