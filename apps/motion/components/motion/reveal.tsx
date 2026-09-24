'use client';

import * as m from 'motion/react-m';
import type { Variants } from 'motion/react';
import type { AriaAttributes, ReactNode } from 'react';

import { useMotionPrefs } from './motion-provider';

type Tag = 'div' | 'li' | 'ul' | 'ol' | 'p' | 'span' | 'section' | 'article' | 'figure' | 'dl';

const ease = [0.16, 1, 0.3, 1] as const;

function itemVariants(distance: number): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
  };
}

type BaseProps = {
  as?: Tag;
  children?: ReactNode;
  className?: string;
  id?: string;
  /** Rise distance in px (24–40). */
  distance?: number;
  delay?: number;
  /** `intro`: play once the intro loader is done instead of on scroll-in. */
  trigger?: 'view' | 'intro';
  /** Extra DOM attributes, e.g. aria-labelledby or data-cursor. */
  attrs?: AriaAttributes & { role?: string; [data: `data-${string}`]: string | undefined };
};

function usePlay(trigger: 'view' | 'intro', amount: number) {
  const { introDone } = useMotionPrefs();
  return trigger === 'intro'
    ? { animate: introDone ? 'show' : 'hidden' }
    : { whileInView: 'show', viewport: { once: true, amount } };
}

/** Fades a block in while it rises, the first time it enters the viewport. */
export function Reveal({
  as = 'div',
  children,
  className,
  id,
  distance = 32,
  delay = 0,
  trigger = 'view',
  attrs,
}: BaseProps) {
  const Component = m[as] as typeof m.div;
  const play = usePlay(trigger, 0.2);
  const variants = itemVariants(distance);
  return (
    <Component
      {...attrs}
      id={id}
      data-reveal=""
      className={className}
      initial="hidden"
      variants={{ ...variants, show: { ...variants.show, transition: { duration: 0.9, ease, delay } } }}
      {...play}
    >
      {children}
    </Component>
  );
}

/** A list or grid whose `RevealItem` children appear one after another. */
export function RevealGroup({
  as = 'div',
  children,
  className,
  id,
  delay = 0,
  stagger = 0.09,
  trigger = 'view',
  attrs,
}: BaseProps & { stagger?: number }) {
  const Component = m[as] as typeof m.div;
  const play = usePlay(trigger, 0.15);
  return (
    <Component
      {...attrs}
      id={id}
      className={className}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...play}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ as = 'div', children, className, id, distance = 32, attrs }: BaseProps) {
  const Component = m[as] as typeof m.div;
  return (
    <Component {...attrs} id={id} data-reveal="" className={className} variants={itemVariants(distance)}>
      {children}
    </Component>
  );
}
