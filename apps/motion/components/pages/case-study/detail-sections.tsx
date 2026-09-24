import Link from 'next/link';

import { CountUp } from '@/components/motion/count-up';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { SectionIntro } from '@/components/sections/section-intro';
import { FactsRuler } from './facts-ruler';
import { BackLink } from '@/components/sections/back-link';
import { ArrowRightIcon, CheckIcon, QuoteMark } from '@/components/ui/icons';
import { Avatar, Placeholder } from '@/components/ui/placeholder';
import { caseStudyHref } from '@/content/case-studies';
import type { CaseStudy, CaseStudyDetail } from '@/content/types';

export function CaseStudyHero({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 glow [--glow:0.10]"
      />
      <div className="container-site relative flex flex-col gap-8 pt-10 pb-12 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20">
        <Reveal trigger="intro" distance={12}>
          <BackLink href="/case-studies" label="All case studies" />
        </Reveal>
        <Reveal trigger="intro" distance={12}>
          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {detail.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
        <SplitText as="h1" text={detail.headline} by="word" trigger="intro" className="type-display-sm max-w-[1200px]" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-[60px]">
          <Reveal trigger="intro" delay={0.4}>
            <p className="type-lead max-w-[720px]">{detail.intro}</p>
          </Reveal>
          <div className="w-full lg:w-[560px] lg:flex-none">
            <FactsRuler facts={detail.facts} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyScreenshot({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section aria-label="Screenshot" className="pb-12 md:pb-0">
      <Reveal trigger="intro" delay={0.6} className="container-site">
        <Placeholder
          slot={detail.hero}
          priority
          sizes="(min-width: 1440px) 1360px, 100vw"
          className="h-[240px] rounded-2xl md:h-[420px] xl:h-[600px]"
        />
      </Reveal>
    </section>
  );
}

export function CaseStudyMetrics({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section aria-label="Results in numbers" className="mt-0 border-y border-line-soft md:mt-20">
      <RevealGroup as="dl" className="container-site grid grid-cols-2 gap-8 py-12 md:grid-cols-3 md:py-16 xl:py-24">
        {detail.metrics.map((metric) => (
          <RevealItem key={metric.label} className="flex flex-col-reverse justify-end gap-3">
            <dt className="type-body min-h-[3.2em] max-w-[30ch]">{metric.label}</dt>
            <dd className="m-0 font-display text-[48px] leading-none text-accent md:text-[72px] xl:text-[104px]">
              <CountUp value={metric.value} />
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>
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
    <section aria-labelledby={headingId} className="section-y">
      <div className="container-site flex flex-col gap-10 lg:flex-row lg:gap-20">
        <SectionIntro
          eyebrow={eyebrow}
          heading={heading}
          headingId={headingId}
          by="word"
          className="lg:w-[45%] lg:flex-none"
          headingClassName="text-[clamp(2.25rem,4vw,4rem)]"
        />
        <Reveal delay={0.15} className="flex flex-1 flex-col gap-5 lg:pt-10">
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function CaseStudyApproach({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section aria-labelledby="approach-heading" className="section-y border-y border-line-soft bg-surface">
      <div className="container-site flex flex-col gap-12 xl:gap-16">
        <SectionIntro
          eyebrow="The approach"
          heading="What the embedded engineer actually did."
          headingId="approach-heading"
          by="word"
          className="max-w-[1000px]"
          headingClassName="text-[clamp(2.25rem,4.6vw,4.75rem)]"
        />
        <RevealGroup as="ol" className="grid gap-10 lg:grid-cols-3 xl:gap-8">
          {detail.approach.map((step) => (
            <RevealItem as="li" key={step.n} className="flex flex-col gap-4 border-t border-accent pt-6">
              <span className="type-mono text-accent-text">{step.n}</span>
              <h3 className="type-h3">{step.title}</h3>
              <p className="type-body">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Outcomes({ outcomes }: { outcomes: string[] }) {
  return (
    <ul className="card mt-2 px-5">
      {outcomes.map((outcome) => (
        <li
          key={outcome}
          className="flex min-h-12 items-center gap-3 border-t border-line-soft py-2 first:border-t-0"
        >
          <CheckIcon className="size-4 shrink-0 text-accent" />
          <span className="flex-1 text-[15px] leading-[1.3] font-medium text-fg-2">{outcome}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyQuote({ detail }: { detail: CaseStudyDetail }) {
  const { quote } = detail;
  return (
    <section aria-label="Client quote" className="section-y border-t border-line-soft">
      <figure className="container-site m-0">
        <Reveal className="flex max-w-[1100px] flex-col gap-8">
          <QuoteMark className="h-10 w-[50px] text-accent" />
          <blockquote className="m-0 text-[28px] leading-[1.25] font-medium tracking-[-0.025em] text-pretty text-fg md:text-[40px] xl:text-[52px]">
            {quote.quote}
          </blockquote>
          <figcaption className="flex items-center gap-3.5">
            <Avatar initials={quote.initials} image={quote.avatar} className="size-12 xl:size-14" />
            <span className="flex flex-col gap-1.5">
              <span className="text-base leading-none font-semibold">{quote.name}</span>
              <span className="type-mono uppercase">{quote.role}</span>
            </span>
          </figcaption>
        </Reveal>
      </figure>
    </section>
  );
}

export function NextCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <section aria-label="Next case study" className="px-[var(--gutter)] pb-12 md:px-0 md:pb-20 xl:pb-28">
      <div className="md:container-site">
        <Link
          href={caseStudyHref(study) ?? '/case-studies'}
          data-cursor="View"
          className="card group flex items-center justify-between gap-6 p-6 transition-colors duration-300 hover:border-accent xl:p-12"
        >
          <span className="flex flex-col gap-3">
            <span className="label">(Next case study)</span>
            <span className="font-display text-[44px] leading-[0.95] uppercase transition-transform duration-500 group-hover:translate-x-2 md:text-[64px] xl:text-[96px]">
              {study.name}
            </span>
          </span>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent xl:size-20">
            <ArrowRightIcon className="size-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0 xl:size-7" />
          </span>
        </Link>
      </div>
    </section>
  );
}
