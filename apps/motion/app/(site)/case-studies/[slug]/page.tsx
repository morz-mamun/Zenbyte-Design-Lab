import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CaseStudyApproach,
  CaseStudyHero,
  CaseStudyMetrics,
  CaseStudyQuote,
  CaseStudyScreenshot,
  NextCaseStudy,
  Outcomes,
  SplitSection,
} from '@/components/pages/case-study/detail-sections';
import { CtaBand } from '@/components/sections/cta-band';
import { cta, getCaseStudiesWithDetail, getCaseStudy, getNextCaseStudy } from '@/content/case-studies';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudiesWithDetail().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.name,
    description: study.detail.intro,
    openGraph: { title: study.detail.headline, description: study.detail.intro },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { detail } = study;
  const next = getNextCaseStudy(slug);

  return (
    <>
      <CaseStudyHero detail={detail} />
      <CaseStudyScreenshot detail={detail} />
      <CaseStudyMetrics detail={detail} />
      <SplitSection eyebrow="The challenge" heading={detail.challenge.heading} headingId="challenge-heading">
        {detail.challenge.paragraphs.map((paragraph) => (
          <p key={paragraph} className="type-body text-[17px] text-fg-2">
            {paragraph}
          </p>
        ))}
      </SplitSection>
      <CaseStudyApproach detail={detail} />
      <SplitSection eyebrow="The result" heading={detail.result.heading} headingId="result-heading">
        <p className="type-body text-[17px] text-fg-2">{detail.result.paragraph}</p>
        <Outcomes outcomes={detail.result.outcomes} />
      </SplitSection>
      <CaseStudyQuote detail={detail} />
      {next && <NextCaseStudy study={next} />}
      <CtaBand
        heading={cta.heading}
        action={cta.action}
        insetOnMobile
      />
    </>
  );
}
