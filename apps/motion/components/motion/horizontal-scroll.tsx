'use client';

import { useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { Children, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery, useMotionPrefs } from './motion-provider';

type HorizontalScrollProps = {
  /** Section intro shown above the track, in the same pinned view. */
  header: ReactNode;
  /** One child per card. Each is wrapped in an `<li>`. */
  children: ReactNode;
  label?: string;
  itemClassName?: string;
  /** Extra vertical scroll per px of horizontal travel (slower = larger). */
  pace?: number;
};

function PinnedTrack({ header, items, label, itemClassName, pace }: {
  header: ReactNode;
  items: ReactNode[];
  label?: string;
  itemClassName?: string;
  pace: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (value) => -value * travel);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - viewport.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="relative" style={{ height: `calc(100svh + ${Math.round(travel * pace)}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-[var(--header-h)]">
        <div className="container-site">
          {header}
          <div ref={viewportRef} className="mt-10 xl:mt-14">
            <m.ol ref={trackRef} aria-label={label} style={{ x }} className="flex w-max gap-6">
              {items.map((child, index) => (
                <li key={index} className={cn('w-[520px] shrink-0 xl:w-[640px]', itemClassName)}>
                  {child}
                </li>
              ))}
            </m.ol>
          </div>
          <div aria-hidden="true" className="relative mt-10 h-px bg-line xl:mt-12">
            <m.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ≥1024px: the section pins to the viewport and vertical scrolling slides the
 * card track horizontally, with a progress bar. Below that, or under reduced
 * motion, a native swipeable row with snap.
 */
export function HorizontalScroll({ header, children, label, itemClassName, pace = 1.4 }: HorizontalScrollProps) {
  const wide = useMediaQuery('(min-width: 1024px)');
  const { reduced } = useMotionPrefs();
  const items = Children.toArray(children);

  if (wide && !reduced) {
    return <PinnedTrack header={header} items={items} label={label} itemClassName={itemClassName} pace={pace} />;
  }

  return (
    <div className="section-y container-site">
      {header}
      <ol
        aria-label={label}
        className="-mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] md:gap-5"
      >
        {items.map((child, index) => (
          <li key={index} className={cn('w-[85%] shrink-0 snap-start md:w-[55%]', itemClassName)}>
            {child}
          </li>
        ))}
      </ol>
    </div>
  );
}
