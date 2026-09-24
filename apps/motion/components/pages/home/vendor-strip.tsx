import { Reveal } from '@/components/motion/reveal';
import { ArrowLink } from '@/components/ui/button';
import { vendorStrip } from '@/content/home';

export function VendorStrip() {
  return (
    <section aria-label={vendorStrip.chip} className="pb-20 md:pb-28 xl:pb-36">
      <div className="container-site">
        <Reveal className="card flex flex-col gap-6 p-6 transition-colors duration-500 hover:border-accent md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:px-12 xl:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
            <span className="chip w-fit">{vendorStrip.chip}</span>
            <p className="max-w-[760px] text-[22px] leading-[1.3] font-medium tracking-[-0.02em] text-fg xl:text-[30px]">
              {vendorStrip.text}
            </p>
          </div>
          <ArrowLink href={vendorStrip.cta.href} className="shrink-0">
            {vendorStrip.cta.label}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
