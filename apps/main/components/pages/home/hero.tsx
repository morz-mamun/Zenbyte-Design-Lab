import { EngineerDiagram } from '@/components/sections/engineer-diagram';
import { ButtonLink } from '@/components/ui/button';
import { hero } from '@/content/home';
import { cn } from '@/lib/utils';

export function HomeHero() {
  return (
    <section className="grid-paper">
      <div className="container-site flex flex-col gap-10 pt-9 pb-11 md:pt-16 md:pb-16 lg:flex-row lg:justify-between lg:gap-10 xl:pt-24 xl:pb-10">
        <div className="flex flex-col items-start gap-6 lg:min-w-0 lg:flex-1 xl:max-w-[660px] xl:gap-0">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-ink bg-paper px-3 py-2 xl:gap-2.5 xl:px-3.5 xl:py-[9px]">
            <span aria-hidden="true" className="size-[7px] rounded-full bg-accent xl:size-2" />
            {hero.eyebrow}
          </p>
          <h1 className="type-display xl:mt-7">
            {hero.headline.before}
            <em className="text-accent-ink italic">{hero.headline.emphasis}</em>
            {hero.headline.after}
          </h1>
          <p className="type-lead max-w-[580px] xl:mt-7">{hero.lead}</p>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-3.5 xl:mt-9">
            <ButtonLink href={hero.primary.href} arrow>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </ButtonLink>
          </div>
          <dl className="flex w-full gap-4 md:gap-8 xl:mt-14">
            {hero.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'flex flex-1 flex-col-reverse border-t border-ink pt-2.5 xl:pt-3.5',
                  index > 1 && 'hidden md:flex',
                )}
              >
                <dt className="type-mono mt-1.5 uppercase md:tracking-[0.06em] xl:mt-2">{stat.label}</dt>
                <dd className="m-0 font-serif text-[34px] leading-none text-accent-ink md:text-[44px] xl:text-[52px]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <EngineerDiagram
          content={hero.diagram}
          hidePillOnMobile
          className="w-full lg:w-[40%] lg:max-w-[500px] lg:flex-none xl:w-[500px] xl:pt-2"
        />
      </div>
    </section>
  );
}
