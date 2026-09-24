'use client';

import { animate, stagger } from 'motion/react';
import { useEffect, useRef } from 'react';

const WORDMARK = 'ZENBYTE';

function finish() {
  const html = document.documentElement;
  html.classList.remove('intro', 'intro-out');
  try {
    sessionStorage.setItem('zb-intro', '1');
  } catch {
    // Storage blocked: the intro may replay next load, which is harmless.
  }
}

/**
 * First-load intro: a 0→100 counter and the rising wordmark, then the panel
 * wipes upward and hands off to the hero reveal. The overlay is rendered on
 * the server but only shown when the boot script adds `html.intro`.
 */
export function IntroLoader() {
  const panelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const panel = panelRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    const word = wordRef.current;
    if (!html.classList.contains('intro') || !panel || !counter || !bar || !word) return;

    const ease = [0.65, 0, 0.35, 1] as const;
    const letters = panel.querySelectorAll('[data-intro-letter]');
    const count = animate(0, 100, {
      duration: 1.3,
      ease,
      onUpdate: (latest) => {
        counter.textContent = String(Math.round(latest)).padStart(3, '0');
        bar.style.transform = `scaleX(${latest / 100})`;
      },
    });
    const rise = animate(
      letters,
      { y: ['110%', '0%'], opacity: [0, 1] },
      { duration: 0.9, delay: stagger(0.06, { startDelay: 0.1 }), ease: [0.16, 1, 0.3, 1] },
    );
    // A slow settle of the whole wordmark while the letters land.
    const settle = animate(word, { scale: [1.08, 1], letterSpacing: ['0.04em', '-0.01em'] }, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });

    let wipe: ReturnType<typeof animate> | undefined;
    const timer = window.setTimeout(() => {
      // Hero reveals start as the panel lifts away.
      html.classList.add('intro-out');
      wipe = animate(
        panel,
        { clipPath: ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'] },
        { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      );
      wipe.then(finish);
    }, 1450);

    return () => {
      window.clearTimeout(timer);
      count.stop();
      rise.stop();
      settle.stop();
      wipe?.stop();
    };
  }, []);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className="intro-loader fixed inset-0 z-[90] flex-col overflow-hidden bg-bg p-[var(--gutter)] text-fg"
    >
      {/* Brand glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 glow [--glow:0.15]" />

      <p className="relative font-mono text-sm tracking-[0.06em] text-muted uppercase md:text-sm">
        (Forward-deployed engineering)
      </p>

      <div className="relative flex flex-1 items-center justify-center">
        <span
          ref={wordRef}
          className="flex overflow-clip py-[0.04em] font-display text-[24vw] leading-[0.85] text-fg uppercase md:text-[18vw] xl:text-[15vw]"
        >
          {Array.from(WORDMARK).map((letter, index) => (
            <span
              key={index}
              data-intro-letter=""
              className="inline-block"
              style={{ transform: 'translateY(110%)', opacity: 0 }}
            >
              {letter}
            </span>
          ))}
        </span>
      </div>

      <div className="relative flex flex-col gap-4 md:gap-6">
        <span className="relative block h-px w-full bg-line">
          <span ref={barRef} className="absolute inset-0 origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
        </span>
        <div className="flex items-end justify-between gap-6 font-display leading-[0.85] uppercase">
          <span className="text-[40px] text-fg md:text-[64px] xl:text-[88px]">Loading</span>
          <span className="text-[40px] text-accent tabular-nums md:text-[64px] xl:text-[88px]">
            <span ref={counterRef}>000</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
