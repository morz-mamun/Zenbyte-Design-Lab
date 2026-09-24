import type { Metadata } from 'next';

import { InquiryForm } from '@/components/pages/start-project/inquiry-form';
import { NumberedSteps } from '@/components/sections/numbered-steps';
import { CheckRow } from '@/components/ui/check-row';
import { intro, meta, nextSteps } from '@/content/start-project';

export const metadata: Metadata = meta;

export default function StartProjectPage() {
  return (
    <section className="grid-paper">
      {/* DOM order (intro → form → next steps) is the mobile order; the grid
          moves the form into the right column from `lg`. */}
      <div className="container-site grid gap-8 pt-9 pb-11 md:pt-16 md:pb-16 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-11 xl:grid-cols-[520px_560px] xl:justify-between xl:gap-x-20 xl:py-20">
        <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1 xl:gap-0">
          <p className="eyebrow">{intro.eyebrow}</p>
          <h1 className="type-display-sm xl:mt-6">{intro.heading}</h1>
          <p className="type-lead xl:mt-6">{intro.lead}</p>
          <ul className="flex flex-col gap-2.5 xl:mt-8 xl:gap-3.5">
            {intro.promises.map((promise) => (
              <CheckRow
                key={promise}
                className="items-center gap-2.5 text-sm leading-[1.3] font-medium xl:gap-3 xl:text-base"
                iconClassName="mt-0"
              >
                {promise}
              </CheckRow>
            ))}
          </ul>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <InquiryForm />
        </div>

        <div className="flex flex-col lg:col-start-1 lg:row-start-2">
          <p className="eyebrow mb-3.5">{nextSteps.eyebrow}</p>
          <NumberedSteps steps={nextSteps.steps} />
        </div>
      </div>
    </section>
  );
}
