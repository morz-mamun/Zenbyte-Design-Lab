import { SectionIntro } from '@/components/sections/section-intro';
import { principles } from '@/content/how-we-work';

export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="section-y">
      <div className="container-site flex flex-col gap-7 xl:gap-12">
        <SectionIntro eyebrow={principles.eyebrow} heading={principles.heading} headingId="principles-heading" />
        <ol className="grid gap-5 lg:grid-cols-3 xl:gap-6">
          {principles.items.map((item) => (
            <li key={item.n} className="flex flex-col gap-2.5 border-t-2 border-ink pt-4 xl:gap-4 xl:pt-6">
              <span className="type-mono text-accent-ink">{item.n}</span>
              <h3 className="type-h3 text-[26px] xl:text-[36px]">{item.title}</h3>
              <p className="type-body">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
