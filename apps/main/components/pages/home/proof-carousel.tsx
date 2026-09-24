'use client';

import { useCallback, useEffect, useRef, useState, type FocusEvent } from 'react';

import { CaseStudyCard } from '@/components/sections/case-study-card';
import { SectionIntro } from '@/components/sections/section-intro';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons';
import type { CaseStudy } from '@/content/types';
import { cn } from '@/lib/utils';

type ProofCarouselProps = {
  eyebrow: string;
  heading: string;
  studies: CaseStudy[];
};

/** Matches Tailwind's `lg` breakpoint: arrow-driven track from here up. */
const DESKTOP_QUERY = '(min-width: 64rem)';

type Metrics = { step: number; maxIndex: number };

/**
 * Case-study track. At `lg+` the arrow buttons slide it one card at a time;
 * below that it is a native, snap-scrolling horizontal list.
 */
export function ProofCarousel({ eyebrow, heading, studies }: ProofCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>({ step: 0, maxIndex: 0 });

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    if (!window.matchMedia(DESKTOP_QUERY).matches) {
      setMetrics({ step: 0, maxIndex: 0 });
      setIndex(0);
      return;
    }

    const first = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first ? first.offsetWidth + gap : 0;
    const styles = getComputedStyle(viewport);
    const visible =
      viewport.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
    const overflow = Math.max(0, track.scrollWidth - visible);
    const maxIndex = step > 0 ? Math.ceil(overflow / step) : 0;

    setMetrics({ step, maxIndex });
    setIndex((current) => Math.min(current, maxIndex));
  }, []);

  // ResizeObserver reports once on observe(), which covers the initial measure.
  useEffect(() => {
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const go = (next: number) => setIndex(Math.max(0, Math.min(metrics.maxIndex, next)));

  // Keep keyboard focus visible: bring a focused, off-screen card into view.
  const onFocus = (event: FocusEvent<HTMLUListElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || metrics.step === 0) return;
    viewport.scrollLeft = 0;
    const item = (event.target as HTMLElement).closest('li');
    const position = item ? Array.prototype.indexOf.call(event.currentTarget.children, item) : -1;
    if (position < 0) return;
    const visibleCount = Math.max(1, Math.floor(viewport.clientWidth / metrics.step));
    if (position < index) go(position);
    else if (position >= index + visibleCount) go(position - visibleCount + 1);
  };

  const buttonBase =
    'flex size-12 cursor-pointer items-center justify-center rounded-full border border-ink transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <section aria-labelledby="proof-heading" className="overflow-hidden py-14 md:py-[72px] xl:py-[100px]">
      <div className="container-site flex items-end justify-between gap-10">
        <SectionIntro eyebrow={eyebrow} heading={heading} headingId="proof-heading" className="max-w-[800px]" />
        <div className="hidden gap-3 lg:flex">
          <button
            type="button"
            aria-label="Previous case study"
            aria-controls="proof-track"
            disabled={index === 0}
            onClick={() => go(index - 1)}
            className={cn(buttonBase, 'bg-transparent text-ink')}
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            aria-label="Next case study"
            aria-controls="proof-track"
            disabled={metrics.step > 0 && index >= metrics.maxIndex}
            onClick={() => go(index + 1)}
            className={cn(buttonBase, 'bg-ink text-paper')}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={cn(
          'scrollbar-none mt-7 snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 pb-2 md:scroll-px-12 md:px-12',
          'lg:snap-none lg:overflow-hidden lg:pr-0 lg:pb-0 lg:pl-16 xl:mt-12 xl:pl-[max(120px,calc((100%_-_1200px)/2))]',
        )}
      >
        <ul
          id="proof-track"
          ref={trackRef}
          onFocus={onFocus}
          className="flex w-max gap-4 transition-transform duration-[400ms] ease-[ease] xl:gap-6"
          style={metrics.step ? { transform: `translateX(${-index * metrics.step}px)` } : undefined}
        >
          {studies.map((study) => (
            <li key={study.slug} className="flex snap-start">
              <CaseStudyCard study={study} className="w-[290px] md:w-[340px] xl:h-[480px] xl:w-[400px]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
