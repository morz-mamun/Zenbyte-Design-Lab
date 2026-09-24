import { Parallax } from '@/components/motion/parallax';
import { RevealGroup } from '@/components/motion/reveal';
import { TiltCard } from '@/components/motion/tilt-card';
import { ClassicPreview, MotionPreview } from '@/components/previews/design-previews';
import { ArrowRightIcon } from '@/components/ui/icons';
import { designs, designsSection, type Design } from '@/content/landing';
import { cn } from '@/lib/utils';
import { SectionHeading } from './section-heading';

/**
 * Each design is a separate Next app (zone) behind the rewrites in
 * next.config.ts, so the choices are plain <a> tags: opening one is a full
 * document load, exactly like opening a different website.
 */
function DesignCard({ design }: { design: Design }) {
  const Preview = design.id === 'classic' ? ClassicPreview : MotionPreview;
  return (
    <a
      href={design.href}
      className="group/card relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface transition-colors duration-500 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div
        aria-hidden="true"
        className={cn(
          'relative aspect-[16/10] overflow-hidden border-b',
          design.id === 'classic' ? 'border-classic-line bg-classic-paper' : 'border-motion-line bg-motion-bg',
        )}
      >
        {/* The frame is the preview's own background, so the drift never shows an edge. */}
        <Parallax range={12} className="absolute inset-0">
          <Preview className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03]" />
        </Parallax>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{design.name}</h3>
          <span className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors duration-300 group-hover/card:border-accent group-hover/card:bg-accent group-hover/card:text-on-accent">
            Open
            <ArrowRightIcon size={14} className="transition-transform duration-300 group-hover/card:translate-x-0.5" />
          </span>
        </div>
        <p className="leading-relaxed text-pretty text-muted">{design.summary}</p>
        <ul aria-label="Traits" className="flex flex-wrap gap-2">
          {design.traits.map((trait) => (
            <li key={trait} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {trait}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-2 font-mono text-xs text-muted">{design.href}</p>
      </div>
    </a>
  );
}

export function Designs() {
  return (
    <section id="designs" aria-labelledby="designs-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-lab">
        <SectionHeading
          index={2}
          eyebrow="Designs"
          title={designsSection.heading}
          titleId="designs-title"
          intro={designsSection.intro}
        />
        <RevealGroup as="ul" stagger={0.16} className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-2 lg:gap-8">
          {designs.map((design) => (
            <TiltCard key={design.id} className="rounded-[1.5rem]">
              <DesignCard design={design} />
            </TiltCard>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
