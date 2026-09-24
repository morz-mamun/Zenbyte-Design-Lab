import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { SectionLabel } from '@/components/ui/section-label';
import { cn } from '@/lib/utils';

type SectionIntroProps = {
  eyebrow: string;
  heading: string;
  lead?: string;
  headingId?: string;
  className?: string;
  headingClassName?: string;
  /** Split unit for the heading reveal. Defaults to letters for short headings. */
  by?: 'letter' | 'word';
};

/** "(LABEL)" + giant split-text h2 (+ optional lead) that opens most sections. */
export function SectionIntro({
  eyebrow,
  heading,
  lead,
  headingId,
  className,
  headingClassName,
  by,
}: SectionIntroProps) {
  return (
    <div className={cn('flex flex-col gap-5 xl:gap-7', className)}>
      <Reveal distance={12}>
        <SectionLabel>{eyebrow}</SectionLabel>
      </Reveal>
      <SplitText
        as="h2"
        id={headingId}
        text={heading}
        by={by ?? (heading.length <= 28 ? 'letter' : 'word')}
        className={cn('type-h2', headingClassName)}
      />
      {lead && (
        <Reveal delay={0.15}>
          <p className="type-lead max-w-[640px]">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
