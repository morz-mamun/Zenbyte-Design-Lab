import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { ArrowRightIcon } from '@/components/ui/icons';
import { hero } from '@/content/landing';
import { HeroSplit } from './hero-split';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

/**
 * Opening statement in two voices (Classic's serif, Motion's display face)
 * beside the split preview. From `lg` up the whole hero fits the first
 * screen below the navbar: the headline scales with viewport height as well
 * as width. Smaller screens stack, text first.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-25%] left-[15%] h-[80vmax] w-[80vmax] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(255_73_37/0.22),transparent)] in-data-[theme=light]:opacity-60" />
        <div className="absolute inset-[-50%] animate-grain bg-grain opacity-[0.07] in-data-[theme=light]:opacity-[0.05]" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-lab grid gap-14 pt-[calc(var(--nav-h)+3rem)] pb-20 sm:pt-[calc(var(--nav-h)+4rem)] sm:pb-24 lg:min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14 lg:pt-[calc(var(--nav-h)+2rem)] lg:pb-12">
        <div className="flex flex-col">
          <h1 id="hero-title" className="flex flex-col gap-1">
            <SplitText
              as="span"
              by="word"
              trigger="intro"
              delay={0.1}
              text={hero.titleLead}
              className="block font-serif text-[clamp(3.5rem,13vw,7rem)] leading-[0.88] tracking-[-0.02em] lg:text-[min(8.8vw,15.5vh,7.75rem)]"
            />
            <SplitText
              as="span"
              by="word"
              trigger="intro"
              delay={0.3}
              text={[...hero.titleTail]}
              className="block font-display text-[clamp(3rem,11.5vw,6.25rem)] leading-[0.95] uppercase lg:text-[min(8vw,14vh,7rem)]"
            />
          </h1>

          <Reveal trigger="intro" delay={0.55} distance={20} as="p" className="mt-8 max-w-lg text-lg leading-relaxed text-pretty text-muted lg:mt-[min(2.5rem,4vh)]">
            {hero.intro}
          </Reveal>
          <Reveal trigger="intro" delay={0.7} distance={20} className="mt-8 flex flex-wrap gap-3 lg:mt-[min(2.5rem,4vh)]">
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

        <Reveal trigger="intro" delay={0.6} distance={48}>
          <HeroSplit />
        </Reveal>
      </div>
    </section>
  );
}
