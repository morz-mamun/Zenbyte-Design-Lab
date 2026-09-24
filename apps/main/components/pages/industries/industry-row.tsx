import Link from 'next/link';

import { CheckRow } from '@/components/ui/check-row';
import { Placeholder } from '@/components/ui/placeholder';
import type { Industry } from '@/content/industries';
import { cn } from '@/lib/utils';

type IndustryRowProps = {
  industry: Industry;
  /** Image on the right at `lg+` (every other row). */
  reverse?: boolean;
};

export function IndustryRow({ industry, reverse }: IndustryRowProps) {
  const headingId = `industry-${industry.n}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        'flex flex-col gap-4 border-t border-line py-8 lg:items-center lg:gap-12 xl:min-h-[520px] xl:gap-16 xl:py-[30px]',
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row',
      )}
    >
      <Placeholder
        slot={industry.image}
        sizes="(min-width: 1280px) 540px, (min-width: 1024px) 45vw, 100vw"
        className="h-[200px] rounded-xl md:h-[320px] lg:h-[400px] lg:w-[45%] lg:flex-none lg:rounded-[14px] xl:w-[540px]"
      />
      <div className="flex flex-1 flex-col gap-4 xl:gap-0">
        <p className="eyebrow">
          {industry.n} · {industry.slug}
        </p>
        <h2 id={headingId} className="type-h2 text-[28px] md:text-[36px] xl:mt-3.5 xl:text-[44px]">
          {industry.name}
        </h2>
        <ul className="flex flex-wrap gap-2 xl:mt-4" aria-label="Focus areas">
          {industry.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <h3 className="type-h3 text-[20px] xl:mt-5 xl:text-[26px]">{industry.headline}</h3>
        <p className="type-body xl:mt-2.5">{industry.body}</p>
        <ul className="flex flex-col xl:mt-4">
          {industry.bullets.map((bullet) => (
            <CheckRow
              key={bullet}
              className="type-body gap-2.5 py-2 xl:gap-3 xl:text-ink"
              iconClassName="mt-1 size-3.5 xl:size-4"
            >
              {bullet}
            </CheckRow>
          ))}
        </ul>
        <Link
          href="/start-a-project"
          className="w-fit text-[15px] leading-none font-semibold text-accent-ink hover:underline hover:underline-offset-4 xl:mt-3.5"
        >
          {industry.cta}
        </Link>
      </div>
    </article>
  );
}
