import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SectionIntro } from '@/components/sections/section-intro';
import { CheckRow } from '@/components/ui/check-row';
import { fit } from '@/content/how-we-work';
import { cn } from '@/lib/utils';

function FitCard({ title, items, variant }: { title: string; items: string[]; variant: 'check' | 'cross' }) {
  return (
    <div
      className={cn(
        'card flex h-full flex-col p-6 xl:p-10',
        variant === 'check' && 'border-accent/40',
      )}
    >
      <h3 className="type-h3 mb-6 xl:mb-8 xl:text-[40px]">{title}</h3>
      <ul>
        {items.map((item) => (
          <CheckRow
            key={item}
            variant={variant}
            className={cn('type-body gap-3 border-t border-line-soft py-3.5 xl:gap-4', variant === 'check' && 'text-fg-2')}
          >
            {item}
          </CheckRow>
        ))}
      </ul>
    </div>
  );
}

export function Fit() {
  return (
    <section aria-labelledby="fit-heading" className="section-y">
      <div className="container-site flex flex-col gap-12 xl:gap-16">
        <SectionIntro eyebrow={fit.eyebrow} heading={fit.heading} headingId="fit-heading" />
        <RevealGroup className="grid gap-6 lg:grid-cols-2">
          <RevealItem>
            <FitCard title={fit.fitTitle} items={fit.fit} variant="check" />
          </RevealItem>
          <RevealItem>
            <FitCard title={fit.notFitTitle} items={fit.notFit} variant="cross" />
          </RevealItem>
        </RevealGroup>
        <Reveal>
          <p className="type-lead max-w-[760px]">{fit.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
