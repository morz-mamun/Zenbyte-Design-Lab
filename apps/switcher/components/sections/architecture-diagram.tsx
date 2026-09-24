'use client';

import * as m from 'motion/react-m';

import { build } from '@/content/landing';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Connector drawn on scroll-in, with an accent dash flowing over it once
 * drawn. `data-draw` lets CSS show it fully without JS or motion.
 */
function Wire({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <>
      <m.path
        data-draw=""
        d={d}
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease, delay }}
      />
      <path
        d={d}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeDasharray="4 8"
        vectorEffect="non-scaling-stroke"
        className="animate-wire-flow opacity-80 motion-reduce:hidden"
      />
    </>
  );
}

function Node({
  label,
  detail,
  note,
  swatch,
  className,
}: {
  label: string;
  detail: string;
  note: string;
  swatch?: 'classic' | 'motion';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2 rounded-2xl border border-line bg-bg p-4 sm:p-5', className)}>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {swatch && (
          <span
            aria-hidden="true"
            className={cn(
              'size-3 shrink-0 rounded-full',
              swatch === 'classic' ? 'bg-classic-paper ring-1 ring-classic-line' : 'bg-motion-bg ring-1 ring-line-strong',
            )}
          />
        )}
        <span className="font-semibold">{label}</span>
        {/* Own line on narrow nodes, right-aligned once there is room. */}
        <span className="basis-full font-mono text-[11px] whitespace-pre text-accent-text sm:ml-auto sm:basis-auto sm:text-xs">
          {detail}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{note}</p>
    </div>
  );
}

/** Browser -> lab entry app -> two independent design apps. */
export function ArchitectureDiagram() {
  const { entry, zones } = build.diagram;
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center">
      <div className="flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 font-mono text-xs text-muted">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        GET localhost:3000/motion/blog
      </div>

      <svg aria-hidden="true" viewBox="0 0 10 100" preserveAspectRatio="none" className="h-10 w-2.5 sm:h-12">
        <Wire d="M5 0 V100" />
      </svg>

      <Node
        label={entry.label}
        detail={entry.detail}
        note="Serves this page and rewrites each design's path prefix to its own app."
        className="w-full max-w-md"
      />

      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="h-14 w-full sm:h-20">
        <Wire d="M50 0 C50 55, 25 45, 25 100" delay={0.3} />
        <Wire d="M50 0 C50 55, 75 45, 75 100" delay={0.3} />
      </svg>

      <div className="grid w-full grid-cols-2 gap-3 sm:gap-6">
        {zones.map((zone) => (
          <Node
            key={zone.id}
            label={zone.label}
            detail={zone.detail}
            note="Own Next.js app, dependencies, styles, fonts and assets."
            swatch={zone.id as 'classic' | 'motion'}
          />
        ))}
      </div>
    </div>
  );
}
