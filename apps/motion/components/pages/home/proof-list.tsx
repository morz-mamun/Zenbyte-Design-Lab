import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { ButtonLink } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import type { CaseStudy } from '@/content/types';
import { ProofRows } from './proof-rows';

type ProofListProps = {
  eyebrow: string;
  heading: string;
  studies: CaseStudy[];
};

/** Numbered case-study list with a cursor-following preview on desktop. */
export function ProofList({ eyebrow, heading, studies }: ProofListProps) {
  return (
    <section aria-labelledby="proof-heading" className="section-y">
      <div className="container-site">
        <div className="flex items-center justify-between gap-6">
          <Reveal distance={12}>
            <SectionLabel>{eyebrow}</SectionLabel>
          </Reveal>
          <Reveal distance={12}>
            <span className="label">({String(studies.length).padStart(2, '0')})</span>
          </Reveal>
        </div>
        <SplitText
          as="h2"
          id="proof-heading"
          text={heading}
          by="word"
          className="type-h2 mt-6 max-w-[1200px] xl:mt-8"
        />

        <ProofRows studies={studies} />

        <Reveal className="mt-12 xl:mt-16">
          <ButtonLink href="/case-studies" variant="secondary" arrow>
            See all case studies
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
