import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

/**
 * Small visual samples for each compared attribute, drawn in the design's
 * own swatches. Decorative; the value text beside them carries the meaning.
 */

type Side = 'classic' | 'motion';

/** `ring` outlines a swatch that matches its panel's background. */
function Swatch({ color, ring }: { color: string; ring?: 'dark' | 'light' }) {
  return (
    <span
      className={cn(
        'size-9 rounded-full',
        ring && 'ring-1 ring-inset',
        ring === 'dark' && 'ring-black/15',
        ring === 'light' && 'ring-white/30',
      )}
      style={{ background: color }}
    />
  );
}

function Type({ side }: { side: Side }) {
  return side === 'classic' ? (
    <span className="font-serif text-6xl leading-none">
      Aa<em className="text-classic-accent">g</em>
    </span>
  ) : (
    <span className="font-display text-6xl leading-none uppercase">
      Aa<span className="text-motion-accent">G</span>
    </span>
  );
}

function Color({ side }: { side: Side }) {
  return side === 'classic' ? (
    <span className="flex gap-2">
      <Swatch color="#f3f0e8" ring="dark" />
      <Swatch color="#14171a" />
      <Swatch color="#e8502f" />
    </span>
  ) : (
    <span className="flex gap-2">
      <Swatch color="#0a0a0a" ring="light" />
      <Swatch color="#ffffff" />
      <Swatch color="#ff4925" />
    </span>
  );
}

function Layout({ side }: { side: Side }) {
  return side === 'classic' ? (
    <span className="grid w-36 grid-cols-[2fr_1fr] gap-2.5">
      <span className="flex flex-col gap-1.5 border-t border-classic-ink/40 pt-2">
        <span className="h-1.5 w-full rounded-full bg-classic-ink/70" />
        <span className="h-1 w-5/6 rounded-full bg-classic-ink/25" />
        <span className="h-1 w-4/6 rounded-full bg-classic-ink/25" />
      </span>
      <span className="flex flex-col gap-1.5 border-t border-classic-ink/40 pt-2">
        <span className="h-1 w-full rounded-full bg-classic-ink/25" />
        <span className="h-1 w-3/4 rounded-full bg-classic-ink/25" />
      </span>
    </span>
  ) : (
    <span className="flex w-36 flex-col gap-1.5">
      <span className="h-5 w-full rounded-sm bg-white" />
      <span className="h-5 w-3/4 rounded-sm bg-motion-accent" />
      <span className="h-1 w-1/2 rounded-full bg-white/30" />
    </span>
  );
}

function Movement({ side }: { side: Side }) {
  const bars = ['w-full', 'w-4/5', 'w-3/5'];
  return (
    <span className="flex w-36 flex-col gap-2">
      {bars.map((width, index) =>
        side === 'classic' ? (
          <span key={width} className={cn('h-1.5 rounded-full bg-classic-ink/30', width)} />
        ) : (
          <span key={width} className={cn('h-1.5 overflow-hidden rounded-full bg-white/10', width)}>
            <span
              className="block h-full animate-bar-flow rounded-full bg-motion-accent motion-reduce:animate-none"
              style={{ animationDelay: `${index * 0.18}s` }}
            />
          </span>
        ),
      )}
    </span>
  );
}

function Theme({ side }: { side: Side }) {
  return side === 'classic' ? (
    <span className="flex items-center gap-2 rounded-full border border-classic-line bg-white/60 px-3 py-2 text-xs font-medium">
      <SunIcon size={16} /> Light only
    </span>
  ) : (
    <span className="flex items-center rounded-full border border-motion-line p-1 text-xs font-medium">
      <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-black">
        <MoonIcon size={14} /> Dark
      </span>
      <span className="flex items-center gap-1.5 px-2.5 py-1 text-white/70">
        <SunIcon size={14} /> Light
      </span>
    </span>
  );
}

const specimens = { Type, Color, Layout, Motion: Movement, Theme } as const;

export function Specimen({ attribute, side }: { attribute: string; side: Side }) {
  const Component = specimens[attribute as keyof typeof specimens];
  return Component ? <Component side={side} /> : null;
}
