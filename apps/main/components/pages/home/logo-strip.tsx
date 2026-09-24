import { logoStrip } from '@/content/home';

export function LogoStrip() {
  return (
    <section aria-label={logoStrip.label} className="border-y border-line">
      <div className="container-site flex flex-col gap-5 py-10 lg:flex-row lg:items-center lg:gap-10 xl:min-h-[200px] xl:py-0">
        <p className="type-mono tracking-[0.08em] text-ink uppercase lg:w-[180px] lg:flex-none">
          {logoStrip.label}
        </p>
        <ul className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-3 lg:flex lg:gap-4 xl:gap-10">
          {logoStrip.logos.map((name) => (
            <li
              key={name}
              className="stripes flex h-14 items-center justify-center rounded-[10px] border border-dashed border-line px-2 text-center text-[13px] leading-[1.2] font-medium text-ink lg:h-16 lg:flex-1 xl:text-[15px]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
