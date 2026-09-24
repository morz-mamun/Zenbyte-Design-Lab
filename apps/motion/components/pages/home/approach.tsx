import { Reveal, RevealGroup } from '@/components/motion/reveal';
import { RollLabel } from '@/components/motion/roll-label';
import { ScrollFill } from '@/components/motion/scroll-fill';
import { TiltCard } from '@/components/motion/tilt-card';
import { SectionLabel } from '@/components/ui/section-label';
import { StatusRows } from '@/components/ui/status-rows';
import { approach } from '@/content/home';

export function Approach() {
  return (
    <section aria-labelledby="approach-heading" className="section-y">
      <div className="container-site">
        <Reveal distance={12}>
          <SectionLabel>{approach.eyebrow}</SectionLabel>
        </Reveal>
        <ScrollFill
          as="h2"
          id="approach-heading"
          text={approach.heading}
          className="mt-8 max-w-[1240px] text-[clamp(2.25rem,5.4vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.035em] text-fg xl:mt-10"
        />

        <RevealGroup as="ol" stagger={0.14} className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3 xl:mt-28 xl:gap-6">
          {approach.steps.map((step) => (
            <TiltCard
              key={step.n}
              className="card flex flex-col gap-4 p-6 transition-colors duration-500 hover:border-accent/40 xl:gap-5 xl:p-8"
            >
              <p className="font-display text-[28px] leading-none text-accent uppercase xl:text-[32px]">
                <RollLabel>Step {step.n.padStart(2, '0')}.</RollLabel>
              </p>
              <h3 className="type-h3 mt-2 transition-transform duration-500 group-hover:[transform:translateZ(28px)]">
                {step.title}
              </h3>
              <p className="type-body transition-colors duration-500 group-hover:text-fg-2">{step.body}</p>
              <div className="mt-auto hidden rounded-xl border border-line-soft bg-bg px-4 pt-1 pb-2 shadow-[0_0_0_rgba(0,0,0,0)] transition-[transform,box-shadow,border-color] duration-500 group-hover:border-line group-hover:shadow-[0_24px_60px_-20px_var(--color-shadow)] group-hover:[transform:translateZ(44px)] md:block [&_.bg-accent]:group-hover:animate-pulse">
                <p className="type-mono flex h-9 items-center text-fg">{step.panel.title}</p>
                <StatusRows rows={step.panel.rows} animate />
              </div>
            </TiltCard>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
