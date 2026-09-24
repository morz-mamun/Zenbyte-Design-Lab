import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { ArrowRightIcon } from '@/components/ui/icons';
import { hero } from '@/content/landing';
import { HeroSplit } from './hero-split';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

/** Opening statement in two voices (Classic's serif, Motion's display face) over the split preview. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(255_73_37/0.22),transparent)] in-data-[theme=light]:opacity-60" />
        <div className="absolute inset-[-50%] animate-grain bg-grain opacity-[0.07] in-data-[theme=light]:opacity-[0.05]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-lab flex flex-col pt-[calc(var(--nav-h)+3.5rem)] pb-20 sm:pt-[calc(var(--nav-h)+5rem)] sm:pb-28">
        <Reveal trigger="intro" distance={16}>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-3 text-sm text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </p>
        </Reveal>

        <h1 id="hero-title" className="mt-8 flex flex-col gap-1 sm:mt-10">
          <SplitText
            as="span"
            by="word"
            trigger="intro"
            delay={0.1}
            text={hero.titleLead}
            className="block font-serif text-[clamp(3.75rem,12vw,10rem)] leading-[0.88] tracking-[-0.02em]"
          />
          <SplitText
            as="span"
            by="word"
            trigger="intro"
            delay={0.3}
            text={[...hero.titleTail]}
            className="block font-display text-[clamp(3rem,10.2vw,8.75rem)] leading-[0.95] uppercase"
          />
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <Reveal trigger="intro" delay={0.55} distance={20} as="p" className="max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {hero.intro}
          </Reveal>
          <Reveal trigger="intro" delay={0.7} distance={20} className="flex flex-wrap gap-3">
            <a
              href={hero.primaryCta.href}
              className={`group inline-flex h-12 items-center gap-2 rounded-full bg-accent pr-5 pl-6 font-medium text-on-accent transition-transform hover:scale-[1.03] ${focusRing}`}
            >
              {hero.primaryCta.label}
              <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className={`inline-flex h-12 items-center rounded-full border border-line px-6 font-medium text-fg transition-colors hover:border-fg ${focusRing}`}
            >
              {hero.secondaryCta.label}
            </a>
          </Reveal>
        </div>

        <Reveal trigger="intro" delay={0.85} distance={48} className="mt-14 sm:mt-20">
          <HeroSplit />
        </Reveal>
      </div>
    </section>
  );
}
