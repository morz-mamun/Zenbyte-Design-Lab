import { Marquee } from '@/components/motion/marquee';
import { logoStrip } from '@/content/home';

export function LogoStrip() {
  return (
    <section aria-label={logoStrip.label} className="border-y border-line-soft py-10 xl:py-14">
      <p className="container-site label">({logoStrip.label})</p>
      <Marquee duration={32} className="mt-8 xl:mt-10" label={logoStrip.label}>
        {logoStrip.logos.map((name) => (
          <li key={name} className="flex items-center">
            <span className="px-6 font-display text-[40px] leading-none text-fg-2 uppercase transition-colors duration-300 hover:text-fg md:px-10 md:text-[56px] xl:text-[72px]">
              {name}
            </span>
            <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
          </li>
        ))}
      </Marquee>
    </section>
  );
}
