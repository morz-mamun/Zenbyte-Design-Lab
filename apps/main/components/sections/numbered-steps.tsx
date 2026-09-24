import type { NumberedItem } from '@/content/types';
import { cn } from '@/lib/utils';

/** Numbered rows ("01 Tell us where it breaks.") separated by top rules. */
export function NumberedSteps({ steps, className }: { steps: NumberedItem[]; className?: string }) {
  return (
    <ol className={cn('flex flex-col', className)}>
      {steps.map((step) => (
        <li key={step.n} className="flex gap-4 border-t border-line py-4 xl:gap-6 xl:py-5">
          <span className="type-mono w-7 flex-none text-accent-ink xl:w-8">{step.n}</span>
          <div className="flex flex-col gap-1 xl:gap-1.5">
            <h3 className="type-h3 text-[20px] xl:text-[26px]">{step.title}</h3>
            <p className="type-body">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
