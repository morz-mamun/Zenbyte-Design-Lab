import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ProgressMarker, ScrollProgress } from '@/components/motion/scroll-progress';
import { explore } from '@/content/landing';
import { SectionHeading } from './section-heading';

const frame = 'relative h-44 overflow-hidden rounded-2xl border border-line bg-surface';

/** Step 1: a cursor travels to the Motion card and picks it. */
function PickIllustration() {
  return (
    <div className={`${frame} flex items-center justify-center gap-4`}>
      <span className="h-24 w-32 rounded-lg border border-classic-line bg-classic-paper p-3">
        <span className="block font-serif text-xl leading-none text-classic-ink">Classic</span>
      </span>
      <span className="relative h-24 w-32 animate-card-pick rounded-lg border border-motion-line bg-motion-bg p-3">
        <span className="block font-display text-xl leading-none text-white uppercase">Motion</span>
        <svg
          viewBox="0 0 16 16"
          className="absolute top-1/2 left-1/2 size-6 animate-cursor-tap fill-white stroke-black drop-shadow"
          strokeWidth="1"
        >
          <path d="M3 1.5v11.2l3-2.9 2 4.5 2-.9-2-4.4h4.2z" />
        </svg>
      </span>
    </div>
  );
}

/** Step 2: a page scrolls by inside a browser frame. */
function BrowseIllustration() {
  return (
    <div className={`${frame} flex flex-col`}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="ml-2 rounded-full bg-bg px-3 py-0.5 font-mono text-[10px] text-muted">/motion/case-studies</span>
      </div>
      <div className="relative flex-1 overflow-hidden bg-motion-bg">
        <div className="absolute inset-x-0 top-0 flex h-[200%] animate-page-scroll flex-col gap-3 p-4">
          <span className="h-5 w-3/4 rounded-sm bg-white" />
          <span className="h-5 w-1/2 rounded-sm bg-motion-accent" />
          <span className="h-1.5 w-5/6 rounded-full bg-white/25" />
          <span className="h-1.5 w-2/3 rounded-full bg-white/25" />
          <span className="mt-2 grid grid-cols-3 gap-2">
            <span className="h-10 rounded bg-white/10" />
            <span className="h-10 rounded bg-white/10" />
            <span className="h-10 rounded bg-white/10" />
          </span>
          <span className="h-1.5 w-4/5 rounded-full bg-white/25" />
          <span className="h-1.5 w-3/5 rounded-full bg-white/25" />
          <span className="h-5 w-2/3 rounded-sm bg-white" />
        </div>
      </div>
    </div>
  );
}

/** Step 3: the corner switch pill, its highlight moving between the two designs. */
function SwitchIllustration() {
  return (
    <div className={`${frame} bg-[linear-gradient(135deg,var(--color-classic-paper)_0_50%,var(--color-motion-bg)_50%_100%)]`}>
      <div className="absolute bottom-4 left-4 flex items-center gap-0.5 rounded-full border border-white/15 bg-[#111]/90 p-1 font-sans text-[10px] font-medium tracking-[0.06em] text-white/70 uppercase shadow-lg">
        <span className="px-2.5 py-1.5 font-bold tracking-[0.14em] text-white">Zenbyte</span>
        <span className="mx-1 h-3.5 w-px bg-white/20" />
        <span className="relative grid grid-cols-2">
          <span className="absolute inset-y-0 left-0 w-1/2 animate-pill-slide rounded-full bg-white" />
          <span className="relative px-2.5 py-1.5 mix-blend-difference">Classic</span>
          <span className="relative px-2.5 py-1.5 mix-blend-difference">Motion</span>
        </span>
      </div>
    </div>
  );
}

const illustrations = [PickIllustration, BrowseIllustration, SwitchIllustration];

export function Explore() {
  return (
    <section id="explore" aria-labelledby="explore-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-lab">
        <SectionHeading index={5} eyebrow="Explore" title={explore.heading} titleId="explore-title" />

        <ScrollProgress label="Steps" className="mt-14 sm:mt-20" trackClassName="left-[5px]">
          {explore.steps.map((step, index) => {
            const Illustration = illustrations[index];
            return (
              <li key={step.title} className="relative pb-14 pl-10 last:pb-0 sm:pl-14">
                <ProgressMarker className="absolute top-1.5 left-0" />
                <RevealGroup stagger={0.1} className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:gap-12">
                  <RevealItem className="flex flex-col gap-3">
                    <span className="font-mono text-sm text-accent-text">Step {String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{step.title}</h3>
                    <p className="max-w-md leading-relaxed text-pretty text-muted">{step.body}</p>
                  </RevealItem>
                  <RevealItem attrs={{ 'aria-hidden': true }}>
                    <Illustration />
                  </RevealItem>
                </RevealGroup>
              </li>
            );
          })}
        </ScrollProgress>
      </div>
    </section>
  );
}
