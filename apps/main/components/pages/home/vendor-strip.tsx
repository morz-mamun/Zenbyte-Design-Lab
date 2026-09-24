import { ButtonLink } from '@/components/ui/button';
import { vendorStrip } from '@/content/home';

export function VendorStrip() {
  return (
    <section aria-label={vendorStrip.chip} className="pb-14 md:pb-[72px] xl:py-12">
      <div className="container-site">
        <div className="card flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:px-9 xl:py-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-7">
            <span className="eyebrow w-fit rounded-full border border-ink px-2.5 py-[7px] text-ink xl:px-3 xl:py-2">
              {vendorStrip.chip}
            </span>
            <p className="max-w-[640px] font-serif text-[22px] leading-[1.25] text-ink xl:text-[28px] xl:leading-[1.2]">
              {vendorStrip.text}
            </p>
          </div>
          <ButtonLink href={vendorStrip.cta.href} variant="secondary" arrow>
            {vendorStrip.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
