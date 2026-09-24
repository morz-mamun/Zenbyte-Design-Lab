import { hero, industries } from '@/content/industries';

/** Hero index card listing the six industries. Hidden on mobile, as in the mobile artboard. */
export function IndustryIndex() {
  return (
    <aside
      aria-label="Industries we deploy in"
      className="card hidden flex-col px-7 py-6 md:flex lg:mt-2 lg:w-[40%] lg:max-w-[460px] lg:flex-none lg:self-start xl:w-[460px]"
    >
      <div className="flex h-8 items-center justify-between">
        <span className="type-mono tracking-[0.08em] text-ink uppercase">{hero.indexTitle}</span>
        <span className="type-mono">{hero.indexMeta}</span>
      </div>
      <ol>
        {industries.map((industry) => (
          <li key={industry.n} className="flex h-14 items-center gap-4 border-t border-line-soft">
            <span className="type-mono w-6 text-accent-ink">{industry.n}</span>
            <span className="flex-1 text-base leading-[1.2] font-medium">{industry.name}</span>
            <span className="type-mono">{industry.indexTag}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
