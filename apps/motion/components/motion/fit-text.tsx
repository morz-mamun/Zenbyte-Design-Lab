'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Scales a single line of text so it exactly fills its container's width,
 * re-measuring on resize. `fallback` is the server-rendered font size.
 */
export function FitText({
  children,
  className,
  fallback = '18vw',
}: {
  children: ReactNode;
  className?: string;
  fallback?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    const fit = () => {
      text.style.fontSize = '100px';
      const natural = text.scrollWidth;
      if (natural > 0) text.style.fontSize = `${(box.clientWidth / natural) * 100}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    // Re-fit once the web font has loaded.
    document.fonts?.ready.then(fit).catch(() => {});
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={cn('w-full overflow-hidden', className)}>
      <span ref={textRef} className="inline-block whitespace-nowrap" style={{ fontSize: fallback }}>
        {children}
      </span>
    </div>
  );
}
