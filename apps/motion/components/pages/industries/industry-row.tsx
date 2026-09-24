import { Parallax } from '@/components/motion/parallax';
import { Reveal } from '@/components/motion/reveal';
import { ArrowLink } from '@/components/ui/button';
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
  const headingId = `industry-${industry.n}-heading`;

  return (
    <article
      id={`industry-${industry.n}`}
      aria-labelledby={headingId}
      className={cn(
        'flex flex-col gap-8 border-t border-line-soft py-12 lg:items-center lg:gap-14 xl:gap-12 xl:py-20',
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row',
      )}
    >
      <Reveal className="overflow-hidden rounded-2xl lg:w-[45%] lg:flex-none xl:w-[46%]">
        <Parallax range={30} className="h-[240px] md:h-[340px] lg:h-[440px]">
          <Placeholder
            slot={industry.image}
            sizes="(min-width: 1280px) 460px, (min-width: 1024px) 45vw, 100vw"
            className="h-[calc(100%+60px)] -translate-y-[30px] rounded-2xl border-0"
          />
        </Parallax>
      </Reveal>
      <Reveal className="flex flex-1 flex-col gap-5">
        <p className="label">
          ({industry.n} · {industry.slug})
        </p>
        <h2 id={headingId} className="font-display text-[40px] leading-[0.95] uppercase md:text-[52px] xl:text-[56px]">
          {industry.name}
        </h2>
        <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
          {industry.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <h3 className="mt-2 text-[20px] leading-[1.3] font-medium tracking-[-0.01em] text-fg xl:text-[24px]">
          {industry.headline}
        </h3>
        <p className="type-body">{industry.body}</p>
        <ul className="flex flex-col">
          {industry.bullets.map((bullet) => (
            <CheckRow
              key={bullet}
              className="type-body gap-3 border-t border-line-soft py-3 text-fg-2"
              iconClassName="mt-1"
            >
              {bullet}
            </CheckRow>
          ))}
        </ul>
        <ArrowLink href="/start-a-project" className="mt-2">
          {industry.cta}
        </ArrowLink>
      </Reveal>
    </article>
  );
}
