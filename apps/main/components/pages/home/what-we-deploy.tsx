import { SectionIntro } from '@/components/sections/section-intro';
import { ButtonLink } from '@/components/ui/button';
import { StatusRows } from '@/components/ui/status-rows';
import { whatWeDeploy } from '@/content/home';

export function WhatWeDeploy() {
  const cta = (
    <ButtonLink href={whatWeDeploy.cta.href} variant="secondary">
      {whatWeDeploy.cta.label}
    </ButtonLink>
  );

  return (
    <section aria-labelledby="deploy-heading" className="section-y">
      <div className="container-site flex flex-col gap-7 xl:gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow={whatWeDeploy.eyebrow}
            heading={whatWeDeploy.heading}
            headingId="deploy-heading"
            className="max-w-[760px]"
          />
          <div className="hidden md:block">{cta}</div>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 xl:gap-6">
          {whatWeDeploy.items.map((item) => (
            <li key={item.tag} className="card flex flex-col p-6 xl:min-h-[420px] xl:p-8">
              <p className="eyebrow">{item.tag}</p>
              <h3 className="type-h3 mt-3.5">{item.title}</h3>
              <p className="type-body mt-3.5 mb-3.5 xl:mt-3 xl:mb-6">{item.body}</p>
              <div className="mt-auto rounded-[10px] border border-line bg-paper px-3.5 xl:px-4">
                <StatusRows rows={item.rows} className="[&>li:first-child]:border-t-0" />
              </div>
            </li>
          ))}
        </ul>

        <div className="md:hidden">{cta}</div>
      </div>
    </section>
  );
}
