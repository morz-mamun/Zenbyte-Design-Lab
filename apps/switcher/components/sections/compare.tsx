'use client';

import { Reveal } from '@/components/motion/reveal';
import { useActiveSection } from '@/components/layout/use-active-section';
import { compare } from '@/content/landing';
import { cn } from '@/lib/utils';
import { Specimen } from './compare-specimens';
import { SectionHeading } from './section-heading';

const rowId = (attribute: string) => `compare-${attribute.toLowerCase()}`;
const rowIds = compare.rows.map((row) => rowId(row.attribute));

/**
 * Desktop: the attribute list stays pinned beside the rows; the row crossing
 * the reading line lights up in the list and the other rows dim. Mobile: a
 * plain stacked list. Nothing dims until a row is active, so the section
 * reads fully without JavaScript.
 */
export function Compare() {
  const active = useActiveSection(rowIds);

  return (
    <section id="compare" aria-labelledby="compare-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-lab grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
          <SectionHeading index={3} eyebrow="Compare" title={compare.heading} titleId="compare-title" intro={compare.intro} />

          <ol aria-hidden="true" className="mt-12 hidden flex-col lg:flex">
            {compare.rows.map((row, index) => {
              const current = active === rowId(row.attribute);
              return (
                <li
                  key={row.attribute}
                  className={cn(
                    'flex items-center gap-4 border-t border-line py-3.5 transition-colors duration-500',
                    current ? 'text-fg' : 'text-muted',
                  )}
                >
                  <span className="w-6 font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-medium">{row.attribute}</span>
                  <span
                    className={cn(
                      'ml-auto h-px origin-right bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      current ? 'w-16' : 'w-0',
                    )}
                  />
                </li>
              );
            })}
          </ol>

          <div aria-hidden="true" className="mt-8 hidden gap-5 text-sm text-muted lg:flex">
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-classic-paper ring-1 ring-classic-line" /> Classic
            </span>
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-motion-bg ring-1 ring-line-strong" /> Motion
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {compare.rows.map((row) => {
            const id = rowId(row.attribute);
            const dimmed = active !== null && active !== id;
            return (
              <article
                key={row.attribute}
                id={id}
                aria-labelledby={`${id}-title`}
                className={cn(
                  'flex flex-col gap-5 border-t border-line py-10 transition-opacity duration-700 first:border-t-0 first:pt-0 lg:min-h-[62vh] lg:justify-center lg:first:border-t lg:first:pt-10',
                  dimmed && 'lg:opacity-35',
                )}
              >
                <h3 id={`${id}-title`} className="text-2xl font-semibold tracking-tight">
                  {row.attribute}
                </h3>
                <Reveal distance={28} className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-6 rounded-2xl border border-classic-line bg-classic-paper p-6 text-classic-ink">
                    <div aria-hidden="true" className="flex h-16 items-center">
                      <Specimen attribute={row.attribute} side="classic" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-mono text-[11px] tracking-[0.16em] text-classic-body uppercase">Classic</p>
                      <p className="leading-relaxed text-classic-body">{row.classic}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 rounded-2xl border border-motion-line bg-motion-bg p-6 text-white">
                    <div aria-hidden="true" className="flex h-16 items-center">
                      <Specimen attribute={row.attribute} side="motion" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">Motion</p>
                      <p className="leading-relaxed text-white/80">{row.motion}</p>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
