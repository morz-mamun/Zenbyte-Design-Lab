import { SectionIntro } from '@/components/sections/section-intro';
import { CheckRow } from '@/components/ui/check-row';
import { fit } from '@/content/how-we-work';

function FitCard({ title, items, variant }: { title: string; items: string[]; variant: 'check' | 'cross' }) {
  return (
    <div className="card flex flex-1 flex-col p-6 xl:min-h-[380px] xl:p-8">
      <h3 className="type-h3 mb-2 text-[22px] xl:mb-5 xl:text-[30px]">{title}</h3>
      <ul>
        {items.map((item) => (
          <CheckRow
            key={item}
            variant={variant}
            className="type-body gap-3 border-t border-line-soft py-2.5 xl:gap-3.5 xl:py-3"
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
      <div className="container-site flex flex-col gap-6 xl:gap-10">
        <SectionIntro eyebrow={fit.eyebrow} heading={fit.heading} headingId="fit-heading" />
        <div className="flex flex-col gap-6 lg:flex-row">
          <FitCard title={fit.fitTitle} items={fit.fit} variant="check" />
          <FitCard title={fit.notFitTitle} items={fit.notFit} variant="cross" />
        </div>
        <p className="type-body max-w-[720px]">{fit.note}</p>
      </div>
    </section>
  );
}
