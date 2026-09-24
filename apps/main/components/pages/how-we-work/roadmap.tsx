import { SectionIntro } from '@/components/sections/section-intro';
import { roadmap } from '@/content/how-we-work';

export function Roadmap() {
  return (
    <section aria-labelledby="roadmap-heading" className="surface-dark section-y bg-ink">
      <div className="container-site flex flex-col gap-7 xl:gap-12">
        <SectionIntro
          eyebrow={roadmap.eyebrow}
          heading={roadmap.heading}
          lead={roadmap.lead}
          tone="dark"
          headingId="roadmap-heading"
          className="max-w-[820px]"
        />
        <ol>
          {roadmap.phases.map((phase) => (
            <li
              key={phase.week}
              className="flex flex-col gap-2 border-t border-dark-line py-5 lg:min-h-[150px] lg:flex-row lg:items-start lg:gap-12 lg:pt-7 lg:pb-10"
            >
              <p className="eyebrow text-accent lg:w-[180px] lg:flex-none">{phase.week}</p>
              <h3 className="type-h3 text-[22px] text-paper lg:w-[300px] lg:flex-none lg:text-[26px] xl:w-[360px] xl:text-[30px]">
                {phase.title}
              </h3>
              <div className="flex flex-1 flex-col gap-2 lg:gap-3">
                <p className="type-body text-on-dark">{phase.body}</p>
                {phase.output && <p className="type-mono text-on-dark-muted">{phase.output}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
