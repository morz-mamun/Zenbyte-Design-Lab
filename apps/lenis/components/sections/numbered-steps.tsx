import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import type { NumberedItem } from '@/content/types';
import { cn } from '@/lib/utils';

/** Numbered rows ("01 Tell us where it breaks.") separated by top rules. */
export function NumberedSteps({ steps, className }: { steps: NumberedItem[]; className?: string }) {
  return (
    <RevealGroup as="ol" className={cn('flex flex-col', className)}>
      {steps.map((step) => (
        <RevealItem
          as="li"
          key={step.n}
          distance={20}
          className="flex gap-5 border-t border-line-soft py-5 xl:gap-8 xl:py-6"
        >
          <span className="type-mono w-8 flex-none pt-1 text-accent-text">{step.n}</span>
          <div className="flex flex-col gap-2">
            <h3 className="type-h3 text-[22px] xl:text-[28px]">{step.title}</h3>
            <p className="type-body">{step.body}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
