import { Parallax } from '@/components/motion/parallax';
import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { StatsRuler } from './stats-ruler';
import { DeployStory } from '@/components/sections/deploy-story';
import { StarField } from '@/components/theme/star-field';
import { ButtonLink } from '@/components/ui/button';
import { hero } from '@/content/home';

export function HomeHero() {
  return (
    <section className="relative overflow-clip">
      {/* Grain + night sky (dark theme) + accent glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[120svh] overflow-hidden">
        <div className="grain" />
        {/* <StarField /> */}
        <div className="absolute -top-1/3 -right-1/4 h-[80vh] w-[80vw] glow [--glow:0.12]" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* Screen 1: the statement. Sized to fit one viewport. */}
      <div className="container-site relative flex flex-col pt-8 pb-6 md:min-h-[max(600px,calc(100svh-var(--header-h)))] md:pb-10 md:pt-12 lg:pt-10 lg:pb-12">
        <Reveal trigger="intro" distance={12}>
          <p className="label inline-flex items-center gap-2.5 text-fg-2">
            <span aria-hidden="true" className="relative size-2">
              <span className="absolute inset-0 animate-ring rounded-full bg-accent motion-reduce:animate-none" />
              <span className="absolute inset-0 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </p>
        </Reveal>

        <Parallax mode="exit" range={160} className="mt-6 md:mt-8">
          <SplitText
            as="h1"
            trigger="intro"
            by="letter"
            text={[
              { text: hero.headline.before },
              { text: hero.headline.emphasis, accent: true },
              { text: hero.headline.after },
            ]}
            className="type-display lg:text-[clamp(4rem,min(10.4vw,15.5svh),10.5rem)]"
          />
        </Parallax>

        <div className="mt-12 grid gap-10 md:mt-14 lg:mt-auto lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:pt-10">
          <Reveal trigger="intro" delay={0.5} className="flex flex-col items-start gap-7">
            <p className="type-lead max-w-[560px] lg:text-[18px]">{hero.lead}</p>
            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-3.5">
              <ButtonLink href={hero.primary.href} arrow>
                {hero.primary.label}
              </ButtonLink>
              <ButtonLink href={hero.secondary.href} variant="secondary">
                {hero.secondary.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal trigger="intro" delay={0.65}>
            <StatsRuler stats={hero.stats} />
          </Reveal>
        </div>

      </div>

      {/* Screen 2+: the story, pinned and scroll-driven (wide diagram from tablet up, tall on phones). */}
      <DeployStory content={hero.diagram} />
    </section>
  );
}
