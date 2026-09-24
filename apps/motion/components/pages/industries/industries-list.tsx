'use client';

import { useRef } from 'react';

import { industries } from '@/content/industries';
import { IndustryIndex, IndustryIndexBar } from './industry-index';
import { IndustryRow } from './industry-row';

/**
 * The six industry rows with a scroll-spy index: pinned in a right column
 * from 1280px, a sticky chip bar above the rows below that.
 */
export function IndustriesList() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} aria-label="Industries" className="pb-12 md:pb-16 xl:pb-24">
      {/* Rows stay aligned with the page's left edge; from 1280px the index
          breaks out of the 1440px container toward the right edge. */}
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)] xl:max-w-none xl:pl-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))]">
        <IndustryIndexBar sectionRef={sectionRef} className="xl:hidden" />
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-16 2xl:grid-cols-[minmax(0,1fr)_340px] 2xl:gap-20">
          <div>
            {industries.map((industry, index) => (
              <IndustryRow key={industry.n} industry={industry} reverse={index % 2 === 1} />
            ))}
          </div>
          <aside className="hidden border-t border-line-soft pt-12 xl:block xl:pt-20">
            <IndustryIndex sectionRef={sectionRef} />
          </aside>
        </div>
      </div>
    </section>
  );
}
