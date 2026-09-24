import type { StatusRow } from '@/content/types';
import { cn } from '@/lib/utils';
import { CheckIcon } from './icons';

type StatusRowsProps = {
  rows: StatusRow[];
  /** `dot`: accent dot when open, ink dot when done. `check`: accent check mark. */
  marker?: 'dot' | 'check';
  /** `panel`: compact rows inside a sub-panel. `feature`: larger diagram rows. */
  density?: 'panel' | 'feature';
  /** Row divider and text colors. */
  tone?: 'panel' | 'card' | 'dark';
  className?: string;
};

const dividers = {
  panel: 'border-line-panel',
  card: 'border-line-soft',
  dark: 'border-dark-line-soft',
};

/** Label/state rows used by the status panels and hero diagrams. */
export function StatusRows({
  rows,
  marker = 'dot',
  density = 'panel',
  tone = 'panel',
  className,
}: StatusRowsProps) {
  return (
    <ul className={className}>
      {rows.map((row) => (
        <li
          key={row.label}
          className={cn(
            'flex items-center gap-2.5 border-t md:gap-3',
            dividers[tone],
            density === 'panel' ? 'h-[38px] xl:h-10' : 'h-10 xl:h-11',
          )}
        >
          {marker === 'dot' ? (
            <span
              aria-hidden="true"
              className={cn(
                'size-[7px] shrink-0 rounded-full md:size-2',
                row.open ? 'bg-accent' : 'bg-ink',
              )}
            />
          ) : (
            <CheckIcon size={16} className="size-3.5 shrink-0 text-accent md:size-4" />
          )}
          <span
            className={cn(
              'flex-1 font-medium',
              density === 'panel' ? 'text-[13px] leading-[1.2] md:text-sm' : 'text-sm leading-none xl:text-[15px]',
              tone === 'dark' && 'text-paper',
            )}
          >
            {row.label}
          </span>
          <span className={cn('type-mono text-right', tone === 'dark' && 'text-on-dark-muted')}>
            {row.state}
          </span>
        </li>
      ))}
    </ul>
  );
}
