import { StatusRows } from '@/components/ui/status-rows';
import type { DiagramContent, StatusPanel } from '@/content/types';
import { cn } from '@/lib/utils';

type EngineerDiagramProps = {
  content: DiagramContent;
  /** The mobile home artboard shows the two cards without the connector pill. */
  hidePillOnMobile?: boolean;
  className?: string;
};

function PanelHeader({ panel, dark }: { panel: StatusPanel; dark?: boolean }) {
  return (
    <div className="mb-2.5 flex items-center justify-between xl:mb-3">
      <span className={cn('type-mono tracking-[0.08em] uppercase', dark ? 'text-paper' : 'text-ink')}>
        {panel.title}
      </span>
      {panel.meta && <span className={cn('type-mono', dark && 'text-on-dark-muted')}>{panel.meta}</span>}
    </div>
  );
}

/**
 * "Before → embedded engineer → after" diagram used by the home and vendor
 * heroes. Decorative summary of the copy, so it is presented as a figure.
 */
export function EngineerDiagram({ content, hidePillOnMobile, className }: EngineerDiagramProps) {
  return (
    <figure
      aria-label={`${content.before.title} to ${content.after.title}, via ${content.pillTitle.toLowerCase()}`}
      className={cn('m-0 flex flex-col', hidePillOnMobile && 'gap-6 md:gap-0', className)}
    >
      <div className="card px-[18px] py-4 xl:px-[22px] xl:py-5">
        <PanelHeader panel={content.before} />
        <StatusRows rows={content.before.rows} density="feature" tone="card" />
      </div>

      <div
        className={cn(
          'relative flex h-20 items-center justify-center md:h-[110px] xl:h-[120px]',
          hidePillOnMobile && 'hidden md:flex',
        )}
      >
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 border-l-2 border-dashed border-ink" />
        <div className="relative z-[1] flex items-center gap-3 rounded-full border border-ink bg-paper py-1.5 pr-4 pl-1.5 xl:gap-3.5 xl:py-2 xl:pr-5 xl:pl-2">
          <span className="relative size-[38px] xl:size-11">
            <span aria-hidden="true" className="absolute inset-0 animate-ring rounded-full bg-accent motion-reduce:animate-none" />
            <span className="absolute inset-0 flex items-center justify-center rounded-full border border-ink bg-accent font-mono text-[10px] leading-none font-medium text-ink xl:text-xs">
              {content.badge}
            </span>
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-sm leading-none font-semibold xl:text-[15px]">{content.pillTitle}</span>
            {content.pillMeta && <span className="type-mono hidden md:block">{content.pillMeta}</span>}
          </span>
        </div>
      </div>

      <div className="rounded-[14px] bg-ink px-[18px] py-4 xl:px-[22px] xl:py-5">
        <PanelHeader panel={content.after} dark />
        <StatusRows rows={content.after.rows} marker="check" density="feature" tone="dark" />
      </div>
    </figure>
  );
}
