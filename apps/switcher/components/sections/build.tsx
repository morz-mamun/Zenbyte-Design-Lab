import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { build } from '@/content/landing';
import { ArchitectureDiagram } from './architecture-diagram';
import { SectionHeading } from './section-heading';

/** Architecture (Multi-Zones diagram) and the tech stack. */
export function Build() {
  return (
    <section id="how-its-built" aria-labelledby="build-title" className="section-pad border-t border-line">
      <div className="container-lab">
        <SectionHeading index={4} eyebrow="Architecture" title={build.heading} titleId="build-title" intro={build.intro} />

        <Reveal as="figure" distance={40} className="mt-10 rounded-[1.75rem] border border-line bg-surface px-4 py-10 sm:mt-12 sm:px-10 sm:py-14">
          <ArchitectureDiagram />
          <figcaption className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-muted">
            {build.diagram.caption}
          </figcaption>
        </Reveal>

        <h3 className="mt-16 text-2xl font-semibold tracking-tight">Stack</h3>
        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          {build.stack.map((item) => (
            <RevealItem as="li" key={item.name} distance={20} className="flex flex-col gap-1.5 bg-bg p-5 sm:p-6">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-muted">{item.note}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
