import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { cn } from '@/lib/utils';

/** Numbered eyebrow, split-text `h2` and an optional intro, shared by every section. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  titleId,
  intro,
  className,
}: {
  index: number;
  /** id for the h2, so the section can be labelled by it. */
  titleId: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <Reveal as="p" distance={16} className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent-text uppercase">
        <span>{String(index).padStart(2, '0')}</span>
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        <span>{eyebrow}</span>
      </Reveal>
      <SplitText
        as="h2"
        id={titleId}
        by="word"
        text={title}
        className="max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
      />
      {intro && (
        <Reveal as="p" delay={0.15} distance={20} className="max-w-2xl text-lg leading-relaxed text-pretty text-muted">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
