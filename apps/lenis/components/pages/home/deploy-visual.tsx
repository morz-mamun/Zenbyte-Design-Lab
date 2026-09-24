'use client';

import { useInView } from 'motion/react';
import * as m from 'motion/react-m';
import { useId, useRef } from 'react';

import { useMotionPrefs } from '@/components/motion/motion-provider';
import type { StatusRow } from '@/content/types';

const W = 600;
const H = 300;
const HUB = { x: 505, y: H / 2, r: 42 };
const NODE = { x: 4, w: 272, h: 44 };

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Decorative "system" diagram for a deploy card: each status row is a node
 * wired into a central hub, with data packets flowing along the wires
 * (accent = in progress, white = done). Static under reduced motion,
 * paused off-screen.
 */
export function DeployVisual({ rows, index, tag }: { rows: StatusRow[]; index: number; tag: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const { reduced } = useMotionPrefs();
  const id = useId().replace(/:/g, '');
  const live = inView && !reduced;

  const gap = H / (rows.length + 1);
  const nodes = rows.map((row, i) => {
    const y = gap * (i + 1);
    const sx = NODE.x + NODE.w;
    const path = `M ${sx} ${y} C ${sx + 90} ${y}, ${HUB.x - 130} ${HUB.y}, ${HUB.x - HUB.r} ${HUB.y}`;
    return { row, y, path };
  });

  return (
    <div ref={ref} aria-hidden="true" className="relative w-full [contain:layout_paint]">
      {/* Faded engineering grid */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--color-line-soft)_1px,transparent_1px),linear-gradient(90deg,var(--color-line-soft)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_75%)] opacity-60" />
      <div className="pointer-events-none absolute top-1/2 right-[8%] size-40 -translate-y-1/2 glow [--glow:0.15]" />

      <m.svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative block h-auto w-full overflow-visible"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <defs>
          <radialGradient id={`${id}-hub`}>
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.map(({ row, y, path }, i) => (
          <g key={row.label}>
            {/* Wire: draws in, then carries a flowing dash and a packet. */}
            <m.path
              d={path}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth={1.25}
              variants={{
                hidden: { pathLength: 0 },
                show: { pathLength: 1, transition: { duration: 1.1, delay: 0.2 + i * 0.15, ease } },
              }}
            />
            <path
              d={path}
              fill="none"
              stroke={row.open ? 'var(--color-accent)' : 'var(--color-fg)'}
              strokeOpacity={row.open ? 0.55 : 0.25}
              strokeWidth={1.25}
              strokeDasharray="3 9"
              className={live ? 'animate-[wire-flow_1.6s_linear_infinite]' : undefined}
            />
            {live && (
              <circle r={3.5} fill={row.open ? 'var(--color-accent)' : 'var(--color-fg)'}>
                <animateMotion dur={`${2.4 + i * 0.5}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" path={path} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${2.4 + i * 0.5}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            )}

            {/* Node */}
            <m.g
              variants={{
                hidden: { opacity: 0, x: -16 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease } },
              }}
            >
              <rect
                x={NODE.x}
                y={y - NODE.h / 2}
                width={NODE.w}
                height={NODE.h}
                rx={NODE.h / 2}
                fill="var(--color-bg)"
                stroke={row.open ? 'rgba(255,73,37,0.5)' : 'var(--color-line)'}
              />
              <circle cx={NODE.x + 20} cy={y} r={4} fill={row.open ? 'var(--color-accent)' : 'var(--color-fg)'}>
                {live && row.open && (
                  <animate attributeName="opacity" values="1;0.35;1" dur="1.4s" repeatCount="indefinite" />
                )}
              </circle>
              <text x={NODE.x + 36} y={y + 5} fill="var(--color-fg)" style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500 }}>
                {row.label.length > 24 ? `${row.label.slice(0, 23)}…` : row.label}
              </text>
              <text
                x={NODE.x + NODE.w - 18}
                y={y + 4}
                textAnchor="end"
                fill={row.open ? 'var(--color-accent-text)' : 'var(--color-muted)'}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.06em' }}
              >
                {row.state.toUpperCase()}
              </text>
            </m.g>
          </g>
        ))}

        {/* Hub */}
        <m.g
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
          variants={{
            hidden: { opacity: 0, scale: 0.6 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.9, delay: 0.5, ease } },
          }}
        >
          <circle cx={HUB.x} cy={HUB.y} r={HUB.r * 2.2} fill={`url(#${id}-hub)`} />
          {live && (
            <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="none" stroke="var(--color-accent)" strokeWidth={1}>
              <animate attributeName="r" values={`${HUB.r};${HUB.r * 1.7}`} dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r={HUB.r + 10}
            fill="none"
            stroke="var(--color-line)"
            strokeDasharray="2 6"
            className={live ? 'origin-center animate-[spin_18s_linear_infinite] [transform-box:fill-box]' : undefined}
          />
          <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth={1.25} />
          <text
            x={HUB.x}
            y={HUB.y + 11}
            textAnchor="middle"
            fill="var(--color-accent)"
            style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}
          >
            {String(index + 1).padStart(2, '0')}
          </text>
          <text
            x={HUB.x}
            y={HUB.y + HUB.r + 30}
            textAnchor="middle"
            fill="var(--color-muted)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em' }}
          >
            {tag.toUpperCase()}
          </text>
        </m.g>
      </m.svg>
    </div>
  );
}
