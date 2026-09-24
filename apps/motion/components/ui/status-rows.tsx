import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import type { StatusRow } from '@/content/types';
import { cn } from '@/lib/utils';
import { CheckIcon } from './icons';

type StatusRowsProps = {
  rows: StatusRow[];
  /** `dot`: accent dot when open, white dot when done. `check`: accent check mark. */
  marker?: 'dot' | 'check';
  /** `panel`: compact rows inside a sub-panel. `feature`: larger diagram rows. */
  density?: 'panel' | 'feature';
  /** Row divider color. */
  tone?: 'panel' | 'card' | 'dark';
  /** Rows tick in one after another when scrolled into view (or after the intro). */
  animate?: boolean | 'intro';
  delay?: number;
  className?: string;
};

const dividers = {
  panel: 'border-line-soft',
  card: 'border-line-soft',
  dark: 'border-line',
};

/** Label/state rows used by the status panels and hero diagrams. */
export function StatusRows({
  rows,
  marker = 'dot',
  density = 'panel',
  tone = 'panel',
  animate = false,
  delay = 0,
  className,
}: StatusRowsProps) {
  const items = rows.map((row) => {
    const rowClass = cn(
      'flex items-center gap-2.5 border-t md:gap-3',
      dividers[tone],
      density === 'panel' ? 'h-[38px] xl:h-10' : 'h-10 xl:h-11',
    );
    const content = (
      <>
        {marker === 'dot' ? (
          <span
            aria-hidden="true"
            className={cn(
              'size-[7px] shrink-0 rounded-full md:size-2',
              row.open ? 'bg-accent shadow-[0_0_0_3px_rgba(255,73,37,0.18)]' : 'bg-fg',
            )}
          />
        ) : (
          <CheckIcon size={16} className="size-3.5 shrink-0 text-accent md:size-4" />
        )}
        <span
          className={cn(
            'flex-1 font-medium text-fg-2',
            density === 'panel' ? 'text-[13px] leading-[1.2] md:text-sm' : 'text-sm leading-none xl:text-[15px]',
            tone === 'dark' && 'text-fg',
          )}
        >
          {row.label}
        </span>
        <span className="type-mono text-right uppercase">{row.state}</span>
      </>
    );
    return animate ? (
      <RevealItem as="li" key={row.label} distance={10} className={rowClass}>
        {content}
      </RevealItem>
    ) : (
      <li key={row.label} className={rowClass}>
        {content}
      </li>
    );
  });

  if (!animate) return <ul className={className}>{items}</ul>;

  return (
    <RevealGroup
      as="ul"
      className={className}
      stagger={0.18}
      delay={delay}
      trigger={animate === 'intro' ? 'intro' : 'view'}
    >
      {items}
    </RevealGroup>
  );
}
