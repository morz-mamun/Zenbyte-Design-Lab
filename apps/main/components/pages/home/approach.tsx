import { SectionIntro } from '@/components/sections/section-intro';
import { StatusRows } from '@/components/ui/status-rows';
import { approach } from '@/content/home';

export function Approach() {
  return (
    <section aria-labelledby="approach-heading" className="section-y">
      <div className="container-site flex flex-col gap-8 xl:gap-14">
        <SectionIntro
          eyebrow={approach.eyebrow}
          heading={approach.heading}
          headingId="approach-heading"
          className="max-w-[860px]"
        />
        <ol className="grid gap-5 lg:grid-cols-3 xl:gap-6">
          {approach.steps.map((step) => (
            <li key={step.n} className="card flex flex-col gap-3.5 p-[22px] xl:min-h-[590px] xl:gap-5 xl:p-6">
              <div className="hidden h-[210px] flex-col rounded-[10px] border border-line bg-paper px-4 py-3 md:flex">
                <p className="type-mono flex h-8 items-center text-ink">{step.panel.title}</p>
                <StatusRows rows={step.panel.rows} />
              </div>
              <p className="eyebrow">Step {step.n}</p>
              <h3 className="type-h3">{step.title}</h3>
              <p className="type-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
