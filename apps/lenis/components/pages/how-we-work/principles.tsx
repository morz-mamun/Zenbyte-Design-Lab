import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SectionIntro } from '@/components/sections/section-intro';
import { principles } from '@/content/how-we-work';

export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="section-y">
      <div className="container-site flex flex-col gap-12 xl:gap-20">
        <SectionIntro eyebrow={principles.eyebrow} heading={principles.heading} headingId="principles-heading" />
        <RevealGroup as="ol" className="grid gap-10 lg:grid-cols-3 xl:gap-8">
          {principles.items.map((item) => (
            <RevealItem as="li" key={item.n} className="flex flex-col gap-4 border-t border-line pt-6 xl:gap-5 xl:pt-8">
              <span className="type-mono text-accent-text">{item.n}</span>
              <h3 className="font-display text-[32px] leading-[0.95] uppercase xl:text-[44px]">{item.title}</h3>
              <p className="type-body">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
