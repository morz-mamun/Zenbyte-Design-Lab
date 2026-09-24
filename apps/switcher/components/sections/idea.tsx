import { CountUp } from '@/components/motion/count-up';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { idea } from '@/content/landing';
import { SectionHeading } from './section-heading';

/** What the lab is: three short statements, then the numbers behind it. */
export function Idea() {
  return (
    <section id="idea" aria-labelledby="idea-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-lab">
        <SectionHeading index={1} eyebrow="The idea" title={idea.heading} titleId="idea-title" />

        <RevealGroup as="ol" stagger={0.12} className="mt-14 grid gap-10 sm:mt-20 md:grid-cols-3 md:gap-8">
          {idea.statements.map((statement, index) => (
            <RevealItem as="li" key={statement.title} className="flex flex-col gap-4 border-t border-line pt-6">
              <span className="font-mono text-sm text-accent-text">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{statement.title}</h3>
              <p className="leading-relaxed text-pretty text-muted">{statement.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup as="dl" stagger={0.12} className="mt-20 grid grid-cols-3 border-y border-line sm:mt-28">
          {idea.stats.map((stat, index) => (
            <RevealItem
              key={stat.label}
              className={`flex flex-col-reverse gap-2 py-8 sm:py-12 ${index > 0 ? 'border-l border-line pl-4 sm:pl-8' : 'pr-4'}`}
            >
              <dt className="text-sm leading-snug text-muted sm:text-base">{stat.label}</dt>
              <dd className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9]">
                <CountUp value={String(stat.value)} />
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
