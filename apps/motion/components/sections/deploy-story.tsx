'use client';

import {
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useId, useRef, useState } from 'react';

import { useMotionPrefs } from '@/components/motion/motion-provider';
import type { DiagramContent, StatusRow } from '@/content/types';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number };

/** Everything the SVG needs for one orientation (viewBox units). */
type Layout = {
  w: number;
  h: number;
  hub: Point & { r: number };
  node: { w: number; h: number; label: number; state: number; maxLabel: number };
  before: Point[];
  after: Point[];
  inPaths: string[];
  outPaths: string[];
  /** Hub caption baseline offsets below the hub centre. */
  caption: { title: number; meta: number; titleSize: number; metaSize: number; badgeSize: number };
};

const spread = (n: number, h: number) => Array.from({ length: n }, (_, i) => (h / (n + 1)) * (i + 1));

/** Tablet and up: issues left → hub centre → fixes right. */
function wideLayout(nBefore: number, nAfter: number): Layout {
  const w = 1200;
  const h = 400;
  const hub = { x: w / 2, y: h / 2, r: 64 };
  const node = { w: 336, h: 56, label: 16, state: 11, maxLabel: 22 };
  const rightX = w - node.w;
  const before = spread(nBefore, h).map((y) => ({ x: 0, y }));
  const after = spread(nAfter, h).map((y) => ({ x: rightX, y }));
  return {
    w,
    h,
    hub,
    node,
    before,
    after,
    inPaths: before.map(({ y }) => `M ${node.w} ${y} C ${node.w + 140} ${y}, ${hub.x - 190} ${hub.y}, ${hub.x - hub.r} ${hub.y}`),
    outPaths: after.map(({ y }) => `M ${hub.x + hub.r} ${hub.y} C ${hub.x + 190} ${hub.y}, ${rightX - 140} ${y}, ${rightX} ${y}`),
    caption: { title: hub.r + 46, meta: hub.r + 68, titleSize: 17, metaSize: 12, badgeSize: 34 },
  };
}

/**
 * Phones: issues stacked on top feed a right-hand rail down into the hub;
 * the hub feeds a left-hand rail down into the fixes. No wire crosses a node.
 */
function tallLayout(nBefore: number, nAfter: number): Layout {
  const w = 360;
  const node = { w: 318, h: 44, label: 14, state: 9, maxLabel: 20 };
  const step = 54;
  const railR = w - 8;
  const railL = 8;
  const before = Array.from({ length: nBefore }, (_, i) => ({ x: 0, y: 24 + i * step }));
  const hub = { x: w / 2, y: before[before.length - 1].y + node.h / 2 + 76, r: 40 };
  const firstFix = hub.y + hub.r + 92;
  const after = Array.from({ length: nAfter }, (_, i) => ({ x: w - node.w, y: firstFix + i * step }));
  return {
    w,
    h: after[after.length - 1].y + node.h / 2 + 4,
    hub,
    node,
    before,
    after,
    inPaths: before.map(
      ({ y }) =>
        `M ${node.w} ${y} L ${railR - 12} ${y} Q ${railR} ${y} ${railR} ${y + 12} L ${railR} ${hub.y - 12} Q ${railR} ${hub.y} ${railR - 12} ${hub.y} L ${hub.x + hub.r} ${hub.y}`,
    ),
    outPaths: after.map(
      ({ x, y }) =>
        `M ${hub.x - hub.r} ${hub.y} L ${railL + 12} ${hub.y} Q ${railL} ${hub.y} ${railL} ${hub.y + 12} L ${railL} ${y - 12} Q ${railL} ${y} ${railL + 12} ${y} L ${x} ${y}`,
    ),
    caption: { title: hub.r + 28, meta: hub.r + 46, titleSize: 15, metaSize: 10.5, badgeSize: 24 },
  };
}

const ACCENT = 'var(--color-accent)';
/* Neutral wire and border shades, mixed from the theme tokens so they invert
   with the theme (in dark they resolve to #1f1f1f, #3a3a3a and 18% white). */
const WIRE_BASE = 'color-mix(in srgb, var(--color-fg) 8.6%, var(--color-bg))';
const WIRE_DRAWN = 'color-mix(in srgb, var(--color-fg) 19.6%, var(--color-bg))';
const NODE_BORDER = 'color-mix(in srgb, var(--color-fg) 18%, transparent)';
const NUMBER = /^(\d+)\s*(.*)$/;

/* Scroll choreography (fractions of the pinned scroll). */
const T = {
  issues: [0.02, 0.26] as const,
  wiresIn: [0.24, 0.44] as const,
  hub: [0.4, 0.52] as const,
  wiresOut: [0.5, 0.66] as const,
  fixes: [0.58, 0.84] as const,
  count: [0.5, 0.86] as const,
  stages: [0, 0.3, 0.56, 0.88] as const,
};

const clip = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);

/** The i-th of n evenly spread sub-windows inside [start, end]. */
function slot([start, end]: readonly [number, number], i: number, n: number, overlap = 1.6) {
  const step = (end - start) / n;
  const a = start + step * i;
  return [a, Math.min(end, a + step * overlap)] as const;
}

function Packet({ path, color, dur, begin }: { path: string; color: string; dur: number; begin: number }) {
  return (
    <circle r={4} fill={color}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.1;0.85;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

function Wire({
  p,
  path,
  range,
  color,
  flowing,
}: {
  p: MotionValue<number>;
  path: string;
  range: readonly [number, number];
  color: string;
  flowing: boolean;
}) {
  const pathLength = useTransform(p, [...range], [0, 1]);
  const dashOpacity = useTransform(p, [range[1] - 0.02, range[1] + 0.04], [0, 0.5]);
  return (
    <>
      <path d={path} fill="none" stroke={WIRE_BASE} strokeWidth={1.25} />
      <m.path d={path} fill="none" stroke={WIRE_DRAWN} strokeWidth={1.25} style={{ pathLength }} />
      <m.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        strokeDasharray="3 9"
        style={{ opacity: dashOpacity }}
        className={flowing ? 'animate-[wire-flow_1.6s_linear_infinite]' : undefined}
      />
    </>
  );
}

function Node({
  p,
  row,
  x,
  y,
  side,
  range,
  live,
  geo,
}: {
  p: MotionValue<number>;
  row: StatusRow;
  x: number;
  y: number;
  side: 'issue' | 'fixed';
  range: readonly [number, number];
  live: boolean;
  geo: Layout['node'];
}) {
  const NODE = geo;
  const pad = NODE.h * 0.46;
  const issue = side === 'issue';
  // Issues light up, then settle back once the fixes have landed.
  const opacity = useTransform(
    p,
    issue ? [range[0], range[1], T.fixes[1] - 0.04, T.fixes[1] + 0.04] : [...range],
    issue ? [0.18, 1, 1, 0.45] : [0, 1],
  );
  const shift = useTransform(p, [...range], [issue ? -28 : 28, 0]);
  const check = useTransform(p, [range[0] + (range[1] - range[0]) * 0.4, range[1]], [0, 1]);

  return (
    <m.g style={{ opacity, x: shift }}>
      <rect
        x={x}
        y={y - NODE.h / 2}
        width={NODE.w}
        height={NODE.h}
        rx={NODE.h / 2}
        fill="var(--color-bg)"
        stroke={issue ? 'rgba(255,73,37,0.5)' : NODE_BORDER}
      />
      {issue ? (
        <circle cx={x + pad} cy={y} r={NODE.h * 0.08} fill={ACCENT}>
          {live && <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />}
        </circle>
      ) : (
        <m.path
          d={`M ${x + pad - 7} ${y + 1} l 5 5 l 10 -11`}
          fill="none"
          stroke={ACCENT}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: check }}
        />
      )}
      <text x={x + pad + 20} y={y + NODE.label * 0.34} fill="var(--color-fg)" style={{ fontFamily: 'var(--font-sans)', fontSize: NODE.label, fontWeight: 500 }}>
        {clip(row.label, NODE.maxLabel)}
      </text>
      <text
        x={x + NODE.w - pad}
        y={y + NODE.state * 0.4}
        textAnchor="end"
        fill={issue ? 'var(--color-accent-text)' : 'var(--color-muted)'}
        style={{ fontFamily: 'var(--font-mono)', fontSize: NODE.state, letterSpacing: '0.06em' }}
      >
        {clip(row.state.toUpperCase(), 16)}
      </text>
    </m.g>
  );
}

/** Big workaround counter: ticks from the "before" number to the "after" number. */
function Counter({ p, from, to }: { p: MotionValue<number>; from: RegExpMatchArray; to: RegExpMatchArray }) {
  const value = useTransform(p, [...T.count], [Number(from[1]), Number(to[1])]);
  const mix = useTransform(p, [T.count[1] - 0.04, T.count[1]], [0, 100]);
  const color = useMotionTemplate`color-mix(in srgb, var(--color-fg) ${mix}%, var(--color-accent))`;
  const [shown, setShown] = useState(Number(from[1]));
  useMotionValueEvent(value, 'change', (v) => setShown(Math.round(v)));

  return (
    <div className="flex items-end gap-4">
      <m.span
        style={{ color }}
        className="font-display text-[clamp(4.5rem,min(9vw,14svh),9rem)] leading-[0.8] tabular-nums"
      >
        {shown}
      </m.span>
      <span className="label pb-2 text-fg-2">{from[2] || to[2]}</span>
    </div>
  );
}

function StageBar({ p, titles }: { p: MotionValue<number>; titles: string[] }) {
  return (
    <ol className="grid w-full max-w-[560px] grid-cols-3 gap-4">
      {titles.map((title, i) => (
        <Stage key={title} p={p} title={title} index={i} />
      ))}
    </ol>
  );
}

function Stage({ p, title, index }: { p: MotionValue<number>; title: string; index: number }) {
  const range = [T.stages[index], T.stages[index + 1]];
  const fill = useTransform(p, range, [0, 1]);
  const mix = useTransform(p, [range[0], range[0] + 0.02], [0, 100]);
  const color = useMotionTemplate`color-mix(in srgb, var(--color-fg) ${mix}%, var(--color-subtle))`;
  return (
    <li className="flex flex-col gap-2.5">
      <m.span style={{ color }} className="flex items-baseline gap-2">
        <span className="font-display text-[20px] leading-none text-accent">{String(index + 1).padStart(2, '0')}</span>
        <span className="type-mono hidden truncate text-current uppercase sm:inline">{title}</span>
      </m.span>
      <span className="relative block h-[2px] overflow-hidden rounded-full bg-line">
        <m.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-accent" />
      </span>
    </li>
  );
}

type DiagramProps = {
  L: Layout;
  p: MotionValue<number>;
  content: DiagramContent;
  live: boolean;
  current: number;
  glow: MotionValue<number>;
  hubScale: MotionValue<number>;
  hubOpacity: MotionValue<number>;
  className?: string;
};

function Diagram({ L, p, content, live, current, glow, hubScale, hubOpacity, className }: DiagramProps) {
  const id = useId().replace(/:/g, '');
  return (
              <m.svg
      aria-hidden="true"
      viewBox={`0 0 ${L.w} ${L.h}`}
      className={cn('mx-auto block h-auto w-full overflow-visible', className)}
    >
      <defs>
        <radialGradient id={`${id}-hub`}>
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {L.inPaths.map((path, i) => (
        <g key={`in-${i}`}>
          <Wire p={p} path={path} range={slot(T.wiresIn, i, L.inPaths.length)} color={ACCENT} flowing={live && current >= 2} />
          {live && current >= 2 && <Packet path={path} color={ACCENT} dur={2.2 + i * 0.35} begin={i * 0.45} />}
        </g>
      ))}
      {L.outPaths.map((path, i) => (
        <g key={`out-${i}`}>
          <Wire p={p} path={path} range={slot(T.wiresOut, i, L.outPaths.length)} color="var(--color-fg)" flowing={live && current >= 3} />
          {live && current >= 3 && <Packet path={path} color="var(--color-fg)" dur={2.4 + i * 0.35} begin={i * 0.5} />}
        </g>
      ))}

      {content.before.rows.map((row, i) => (
        <Node
          key={row.label}
          p={p}
          row={row}
          x={L.before[i].x}
          y={L.before[i].y}
          geo={L.node}
          side="issue"
          range={slot(T.issues, i, content.before.rows.length)}
          live={live && current >= 1}
        />
      ))}
      {content.after.rows.map((row, i) => (
        <Node
          key={row.label}
          p={p}
          row={row}
          x={L.after[i].x}
          y={L.after[i].y}
          geo={L.node}
          side="fixed"
          range={slot(T.fixes, i, content.after.rows.length)}
          live={live}
        />
      ))}

      {/* Engineer hub */}
      <m.g style={{ opacity: hubOpacity }}>
        <m.circle cx={L.hub.x} cy={L.hub.y} r={L.hub.r * 2.4} fill={`url(#${id}-hub)`} style={{ opacity: glow }} />
        {live && current >= 2 && (
          <circle cx={L.hub.x} cy={L.hub.y} r={L.hub.r} fill="none" stroke={ACCENT} strokeWidth={1.2}>
            <animate attributeName="r" values={`${L.hub.r};${L.hub.r * 1.8}`} dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
        )}
        <m.g style={{ scale: hubScale }}>
          <circle
            cx={L.hub.x}
            cy={L.hub.y}
            r={L.hub.r + 14}
            fill="none"
            stroke={WIRE_DRAWN}
            strokeDasharray="2 7"
            className={live ? 'origin-center animate-[spin_18s_linear_infinite] [transform-box:fill-box]' : undefined}
          />
          <circle cx={L.hub.x} cy={L.hub.y} r={L.hub.r} fill="var(--color-surface)" stroke={ACCENT} strokeWidth={1.5} />
          <text x={L.hub.x} y={L.hub.y + L.caption.badgeSize * 0.35} textAnchor="middle" fill={ACCENT} style={{ fontFamily: 'var(--font-display)', fontSize: L.caption.badgeSize }}>
            {content.badge}
          </text>
        </m.g>
        <text
          x={L.hub.x}
          y={L.hub.y + L.caption.title}
          textAnchor="middle"
          fill="var(--color-fg)"
          style={{ fontFamily: 'var(--font-sans)', fontSize: L.caption.titleSize, fontWeight: 600 }}
        >
          {content.pillTitle}
        </text>
        {content.pillMeta && (
          <text
            x={L.hub.x}
            y={L.hub.y + L.caption.meta}
            textAnchor="middle"
            fill="var(--color-muted)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: L.caption.metaSize, letterSpacing: '0.04em' }}
          >
            {content.pillMeta}
          </text>
        )}
      </m.g>
    </m.svg>
  );
}

/**
 * Pinned scroll story: the section holds the screen while the
 * scroll plays three stages: the issues light up, the wires feed the engineer
 * hub, and the fixes check off as the workaround counter ticks down. Under
 * reduced motion it renders the finished state without pinning.
 */
export function DeployStory({ content, className }: { content: DiagramContent; className?: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();
  const inView = useInView(stickyRef, { amount: 0.3 });

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  // One stable progress value for the whole story: scroll-driven, or finished under reduced motion.
  const p = useMotionValue(0);
  const [stage, setStage] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!reduced) p.set(v);
  });
  useEffect(() => {
    p.set(reduced ? 1 : scrollYProgress.get());
  }, [reduced, p, scrollYProgress]);
  useMotionValueEvent(p, 'change', (v) => {
    const next = v >= T.wiresOut[1] ? 3 : v >= T.hub[1] ? 2 : v >= T.issues[0] ? 1 : 0;
    setStage((current) => (current === next ? current : next));
  });
  const live = inView && !reduced;
  const current = stage;

  const wide = wideLayout(content.before.rows.length, content.after.rows.length);
  const tall = tallLayout(content.before.rows.length, content.after.rows.length);

  const hubScale = useTransform(p, [...T.hub], [0.55, 1]);
  const hubOpacity = useTransform(p, [...T.hub], [0.12, 1]);
  const glow = useTransform(p, [T.hub[0], T.fixes[1]], [0, 1]);

  const diagramProps = { p, content, live, current, glow, hubScale, hubOpacity };

  const from = content.before.meta?.match(NUMBER);
  const to = content.after.meta?.match(NUMBER);

  return (
    <div ref={outerRef} className={cn('relative', !reduced && 'h-[320svh]', className)}>
      <div
        ref={stickyRef}
        className={cn(
          'flex flex-col justify-start md:justify-center',
          !reduced && 'sticky top-0 h-svh pt-14 md:pt-[var(--header-h)]',
        )}
      >
        <figure
          aria-label={`${content.before.title} to ${content.after.title}, via ${content.pillTitle.toLowerCase()}`}
          className="container-site relative m-0 flex flex-col gap-6 pt-0 pb-8 md:py-8 xl:gap-8"
        >
          {/* Ambient grid + glow that brighten as the story resolves */}
          <m.div
            aria-hidden="true"
            style={{ opacity: glow }}
            className="pointer-events-none absolute will-change-[opacity] inset-0 -z-10 [background-image:linear-gradient(var(--color-line-soft)_1px,transparent_1px),linear-gradient(90deg,var(--color-line-soft)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]"
          />
          <m.div
            aria-hidden="true"
            style={{ opacity: glow }}
            className="pointer-events-none absolute will-change-[opacity] top-1/2 left-1/2 -z-10 size-[520px] -translate-x-1/2 -translate-y-1/2 glow [--glow:0.15]"
          />

          {/* Counter + stages */}
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            {from && to ? <Counter p={p} from={from} to={to} /> : <span />}
            <StageBar p={p} titles={[content.before.title, content.pillTitle, content.after.title]} />
          </div>

          {/* Diagram: wide from tablet up, tall on phones. Height-capped so the pinned view fits. */}
          <Diagram
            L={wide}
            className="hidden max-w-[calc((100svh-var(--header-h)-260px)*3)] md:block"
            {...diagramProps}
          />
          <Diagram
            L={tall}
            className="max-w-[calc((100svh-var(--header-h)-230px)*0.62)] md:hidden"
            {...diagramProps}
          />

          {/* Same data for assistive technology */}
          <div className="sr-only">
            <p>
              {content.before.title}
              {content.before.meta ? `: ${content.before.meta}` : ''}
            </p>
            <ul>
              {content.before.rows.map((row) => (
                <li key={row.label}>
                  {row.label}: {row.state}
                </li>
              ))}
            </ul>
            <p>
              {content.pillTitle}
              {content.pillMeta ? `, ${content.pillMeta}` : ''}
            </p>
            <p>
              {content.after.title}
              {content.after.meta ? `: ${content.after.meta}` : ''}
            </p>
            <ul>
              {content.after.rows.map((row) => (
                <li key={row.label}>
                  {row.label}: {row.state}
                </li>
              ))}
            </ul>
          </div>
        </figure>
      </div>
    </div>
  );
}
