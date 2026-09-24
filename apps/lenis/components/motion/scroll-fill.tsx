'use client';

import { useScroll, useTransform, type MotionValue } from 'motion/react';
import * as m from 'motion/react-m';
import { Fragment, useRef, type ElementType } from 'react';

import { cn } from '@/lib/utils';

type ScrollFillProps = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
};

function Word({ word, index, total, progress }: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start, start + 1 / total], [0.18, 1]);
  return (
    <m.span data-reveal="" style={{ opacity }}>
      {word}
    </m.span>
  );
}

/**
 * A statement whose words brighten in reading order as it scrolls through
 * the viewport, in both directions. Screen readers get one plain text node.
 */
export function ScrollFill({ text, as: Tag = 'p', className, id }: ScrollFillProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag id={id} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && ' '}
            <Word word={word} index={index} total={words.length} progress={scrollYProgress} />
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
