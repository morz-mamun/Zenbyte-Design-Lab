import Link from 'next/link';

import { SectionIntro } from '@/components/sections/section-intro';
import { BackLink } from '@/components/sections/back-link';
import { ArrowRightIcon, CheckIcon, QuoteMark } from '@/components/ui/icons';
import { Avatar, Placeholder } from '@/components/ui/placeholder';
import { caseStudyHref } from '@/content/case-studies';
import type { CaseStudy, CaseStudyDetail } from '@/content/types';

export function CaseStudyHero({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section className="grid-paper">
      <div className="container-site flex flex-col gap-[18px] pt-7 pb-2 md:gap-6 md:pt-12 md:pb-12 xl:pt-14 xl:pb-14">
        <BackLink href="/case-studies" label="All case studies" />
        <div className="flex flex-col gap-[18px] lg:flex-row lg:items-end lg:justify-between lg:gap-[60px]">
          <div className="flex max-w-[820px] flex-col gap-[18px] md:gap-5">
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {detail.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
            <h1 className="type-display">{detail.headline}</h1>
            <p className="type-lead">{detail.intro}</p>
          </div>
          <dl className="pb-2 lg:w-[340px] lg:flex-none lg:pb-0">
            {detail.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex justify-between gap-4 border-t border-line py-3 last:border-b xl:py-3.5"
              >
                <dt className="type-mono">{fact.label}</dt>
                <dd className="m-0 text-sm leading-none font-medium xl:text-[15px]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyScreenshot({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section aria-label="Screenshot" className="pb-8 md:pb-0">
      <div className="container-site">
        <Placeholder
          slot={detail.hero}
          priority
          sizes="(min-width: 1440px) 1200px, 100vw"
          className="h-[220px] rounded-xl md:h-[380px] xl:h-[520px] xl:rounded-2xl"
        />
      </div>
    </section>
  );
}

export function CaseStudyMetrics({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section aria-label="Results in numbers" className="border-y border-line">
      <dl className="container-site flex gap-[18px] py-7 md:gap-6 md:py-14 xl:min-h-[260px] xl:py-20">
        {detail.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-1 flex-col-reverse gap-1.5 xl:gap-2">
            <dt className="type-body text-[13px] md:text-[15px] xl:text-[16px]">{metric.label}</dt>
            <dd className="m-0 font-serif text-[32px] leading-none text-accent-ink md:text-[44px] xl:text-[60px]">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

type SplitSectionProps = {
  eyebrow: string;
  heading: string;
  headingId: string;
  children: React.ReactNode;
};

/** Heading column on the left, content on the right (Challenge, Result). */
export function SplitSection({ eyebrow, heading, headingId, children }: SplitSectionProps) {
  return (
    <section aria-labelledby={headingId} className="py-10 md:py-[72px] xl:py-[100px]">
      <div className="container-site flex flex-col gap-4 lg:flex-row lg:gap-16">
        <SectionIntro
          eyebrow={eyebrow}
          heading={heading}
          headingId={headingId}
          className="lg:w-[40%] lg:flex-none xl:w-[460px]"
          headingClassName="xl:text-[38px]"
        />
        <div className="flex flex-1 flex-col gap-4 xl:gap-5">{children}</div>
      </div>
    </section>
  );
}

export function CaseStudyApproach({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section aria-labelledby="approach-heading" className="surface-dark bg-ink py-10 md:py-[72px] xl:py-[100px]">
      <div className="container-site flex flex-col gap-6 xl:gap-12">
        <SectionIntro
          eyebrow="The approach"
          heading="What the embedded engineer actually did."
          tone="dark"
          headingId="approach-heading"
          className="max-w-[760px]"
          headingClassName="xl:text-[38px]"
        />
        <ol className="grid gap-5 lg:grid-cols-3 xl:gap-6">
          {detail.approach.map((step) => (
            <li key={step.n} className="flex flex-col gap-2.5 border-t-2 border-accent pt-3.5 xl:gap-3.5 xl:pt-6">
              <span className="type-mono text-accent">{step.n}</span>
              <h3 className="type-h3 text-[20px] text-paper md:text-[26px] xl:text-[30px]">{step.title}</h3>
              <p className="type-body text-on-dark">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Outcomes({ outcomes }: { outcomes: string[] }) {
  return (
    <ul className="card px-4 xl:mt-3 xl:px-5">
      {outcomes.map((outcome) => (
        <li
          key={outcome}
          className="flex min-h-11 items-center gap-2.5 border-t border-line-soft py-2 first:border-t-0 xl:min-h-12 xl:gap-3"
        >
          <CheckIcon className="size-3.5 shrink-0 text-accent-ink xl:size-4" />
          <span className="flex-1 text-sm leading-[1.2] font-medium xl:text-[15px]">{outcome}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyQuote({ detail }: { detail: CaseStudyDetail }) {
  const { quote } = detail;
  return (
    <section aria-label="Client quote" className="bg-sand py-9 md:py-[72px] xl:py-[100px]">
      <figure className="container-site m-0">
        <div className="flex max-w-[900px] flex-col gap-4 xl:gap-5">
          <QuoteMark className="h-6 w-[30px] text-accent xl:h-7 xl:w-9" />
          <blockquote className="m-0 font-serif text-[24px] leading-[1.3] text-pretty text-ink md:text-[28px] xl:text-[32px]">
            {quote.quote}
          </blockquote>
          <figcaption className="flex items-center gap-3 xl:mt-2 xl:gap-3.5">
            <Avatar initials={quote.initials} image={quote.avatar} className="size-11 xl:size-[52px]" />
            <span className="flex flex-col gap-1">
              <span className="text-[15px] leading-none font-semibold xl:text-base">{quote.name}</span>
              <span className="type-mono">{quote.role}</span>
            </span>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}

export function NextCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <section aria-label="Next case study" className="p-6 md:px-0 md:py-16 xl:py-[100px]">
      <div className="md:container-site">
        <Link
          href={caseStudyHref(study) ?? '/case-studies'}
          className="card flex items-center justify-between gap-6 p-6 xl:p-10"
        >
          <span className="flex flex-col gap-1.5 xl:gap-2">
            <span className="eyebrow">Next case study</span>
            <span className="type-h2 text-[26px] xl:text-[36px]">{study.name}</span>
          </span>
          <ArrowRightIcon className="size-[22px] shrink-0 xl:size-7" />
        </Link>
      </div>
    </section>
  );
}
