/**
 * Theme switch with a water-drop transition. A drop forms under the toggle,
 * falls and splashes, then the new theme ripples out from the impact point:
 * a View Transition clips the new page to a growing ellipse while a WebGL
 * layer draws the water and (in Chromium) an SVG filter warps the page.
 * Reduced motion or no View Transitions: the theme switches instantly.
 */

import { getTheme, setTheme, THEME_BG, type Theme } from '@/lib/theme';
import { playDropSound } from './drop-sound';
import { FLATTEN, renderWater } from './water-shader';

/** Splash droplets thrown out at impact: x offset, rise and size in px. */
const SPLASH = [
  { dx: -34, rise: 18, size: 4, duration: 500 },
  { dx: -20, rise: 26, size: 5, duration: 560 },
  { dx: -8, rise: 30, size: 4, duration: 600 },
  { dx: 9, rise: 28, size: 5, duration: 580 },
  { dx: 22, rise: 23, size: 4, duration: 540 },
  { dx: 35, rise: 16, size: 3, duration: 490 },
];

const DROP_H = 42;

const OVERLAY_HTML = `
<canvas class="theme-water"></canvas>
<svg class="theme-drop" viewBox="0 0 40 56">
  <path d="M20 1C20 1 5 21.5 5 36a15 15 0 0 0 30 0C35 21.5 20 1 20 1Z"></path>
  <ellipse cx="13.5" cy="35" rx="3.5" ry="5.5"></ellipse>
</svg>
<div class="theme-drop-bead"></div>
<svg width="0" height="0" style="position:absolute">
  <filter id="theme-water-warp" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="7" result="noise"></feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
      <animate attributeName="scale" values="0;26;9;3;0" keyTimes="0;0.12;0.5;0.8;1" dur="2.1s" begin="indefinite"></animate>
    </feDisplacementMap>
  </filter>
</svg>`;

type Run = {
  next: Theme;
  overlay: HTMLDivElement;
  animations: Animation[];
  abort: AbortController;
  transition?: ViewTransition;
  /** The reveal has finished; a click now starts a new run instead of cancelling. */
  revealed: boolean;
  cancelled: boolean;
};

let current: Run | null = null;

const opposite = (theme: Theme): Theme => (theme === 'dark' ? 'light' : 'dark');

function browser() {
  const ua = navigator.userAgent;
  const iOS = /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const safari = /AppleWebKit/.test(ua) && !/Chrome|CriOS|FxiOS|Edg/.test(ua);
  // The displacement filter on a view-transition snapshot is Chromium-only.
  return { iOS, warp: !iOS && !safari && !/Firefox|FxiOS/.test(ua) };
}

function teardown(run: Run) {
  run.abort.abort();
  run.animations.forEach((animation) => animation.cancel());
  run.overlay.remove();
  document.documentElement.classList.remove('theme-rippling');
}

/** Toggle handler: switches to the other theme, animated when allowed. */
export function toggleTheme(button: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduced) {
    if (current) {
      current.cancelled = true;
      teardown(current);
      current = null;
    }
    setTheme(opposite(getTheme()));
    return;
  }

  if (current) {
    const run = current;
    current = null;
    run.cancelled = true;
    teardown(run);
    if (!run.revealed) {
      // Clicked again mid-transition: go back to where the user started.
      run.transition?.skipTransition();
      setTheme(opposite(run.next));
      return;
    }
  }

  const run: Run = {
    next: opposite(getTheme()),
    overlay: document.createElement('div'),
    animations: [],
    abort: new AbortController(),
    revealed: false,
    cancelled: false,
  };
  current = run;
  play(run, button)
    .catch(() => {})
    .finally(() => {
      if (current !== run) return;
      current = null;
      teardown(run);
      if (getTheme() !== run.next) setTheme(run.next);
    });
}

async function play(run: Run, button: HTMLElement) {
  const { iOS, warp } = browser();
  const root = document.documentElement;
  const vw = window.visualViewport?.width ?? window.innerWidth;
  const vh = window.visualViewport?.height ?? window.innerHeight;
  const rect = button.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const top = rect.bottom - 8;
  const impactY = Math.min(Math.max(vh * 0.42, top + 180), vh - 60);
  const rx = Math.hypot(Math.max(cx, vw - cx), Math.max(impactY, vh - impactY) / FLATTEN) + 40;

  root.style.setProperty('--ripple-x', `${cx}px`);
  root.style.setProperty('--ripple-y', `${impactY}px`);
  root.style.setProperty('--ripple-rx', `${rx}px`);
  root.style.setProperty('--ripple-ry', `${rx * FLATTEN}px`);

  const { overlay } = run;
  overlay.className = 'theme-drop-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.setProperty('--drop-color', THEME_BG[run.next]);
  overlay.innerHTML = OVERLAY_HTML;
  document.body.append(overlay);

  const animate = (el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
    const animation = el.animate(keyframes, options);
    run.animations.push(animation);
    return animation;
  };

  // Form under the toggle, then fall.
  const drop = overlay.querySelector<SVGSVGElement>('.theme-drop')!;
  const at = (y: number) => `translate(-50%, ${y}px)`;
  drop.style.left = `${cx}px`;
  drop.style.transformOrigin = '50% 0%';
  await animate(
    drop,
    [
      { transform: `${at(top)} scale(0.25)`, opacity: 0 },
      { transform: `${at(top)} scale(0.8, 0.66)`, opacity: 1, offset: 0.45 },
      { transform: `${at(top)} scale(1.06, 0.9)`, offset: 0.75 },
      { transform: `${at(top)} scale(1)` },
    ],
    { duration: 340, easing: 'cubic-bezier(0.25, 0, 0.3, 1)', fill: 'forwards' },
  ).finished;
  if (run.cancelled) return;

  const land = impactY - DROP_H;
  const distance = Math.max(60, land - top);
  drop.style.transformOrigin = '50% 100%';
  await animate(
    drop,
    [
      { transform: `${at(top)} scale(1)` },
      { transform: `${at(top + 10)} scale(0.93, 1.12)`, offset: 0.14 },
      { transform: `${at(land)} scale(0.95, 1.1)` },
    ],
    { duration: Math.max(360, Math.sqrt(distance) * 27), easing: 'cubic-bezier(0.33, 0, 0.67, 0.33)', fill: 'forwards' },
  ).finished;
  if (run.cancelled) return;

  // Impact.
  playDropSound();
  animate(
    drop,
    [
      { transform: `${at(land)} scale(0.95, 1.1)`, opacity: 1 },
      { transform: `${at(land)} scale(1.9, 0.2)`, opacity: 0 },
    ],
    { duration: 170, easing: 'cubic-bezier(0.15, 0.6, 0.4, 1)', fill: 'forwards' },
  );
  if (warp) root.classList.add('theme-rippling');
  const transition = document.startViewTransition(() => {
    if (!run.cancelled) setTheme(run.next);
  });
  run.transition = transition;
  await transition.ready.catch(() => {});
  if (run.cancelled) return;

  const pending: Promise<unknown>[] = [transition.finished];
  const revealed = () => {
    run.revealed = true;
  };
  transition.finished.then(revealed, revealed);

  if (warp) {
    try {
      overlay.querySelector<SVGAnimationElement>('animate')?.beginElement();
    } catch {
      // No SMIL: the ripple plays without the warp.
    }
  }
  pending.push(
    renderWater(overlay.querySelector('canvas')!, cx, impactY, rx, { lowRes: iOS, signal: run.abort.signal }),
  );

  for (const splash of SPLASH) {
    const el = document.createElement('div');
    el.className = 'theme-splash-drop';
    Object.assign(el.style, {
      left: `${cx - splash.size / 2}px`,
      top: `${impactY - splash.size}px`,
      width: `${splash.size}px`,
      height: `${splash.size}px`,
    });
    el.innerHTML = '<i></i>';
    overlay.append(el);
    pending.push(
      animate(el, [{ transform: 'translateX(0)' }, { transform: `translateX(${splash.dx}px)` }], {
        duration: splash.duration,
        easing: 'linear',
        fill: 'both',
      }).finished,
      animate(
        el.firstElementChild!,
        [
          { transform: 'translateY(0) scale(1)', opacity: 0.95, easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)' },
          {
            transform: `translateY(${-splash.rise}px) scale(0.8)`,
            opacity: 0.95,
            offset: 0.52,
            easing: 'cubic-bezier(0.6, 0, 0.85, 0.45)',
          },
          { transform: 'translateY(5px) scale(0.4)', opacity: 0 },
        ],
        { duration: splash.duration, fill: 'both' },
      ).finished,
    );
  }

  const bead = overlay.querySelector<HTMLDivElement>('.theme-drop-bead')!;
  bead.style.left = `${cx}px`;
  bead.style.top = `${impactY - 5}px`;
  pending.push(
    animate(
      bead,
      [
        { transform: 'translate(-50%, 0) scale(1)', opacity: 0.9, easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)' },
        { transform: 'translate(-50%, -46px) scale(0.7)', opacity: 0.9, offset: 0.5, easing: 'cubic-bezier(0.55, 0, 0.8, 0.4)' },
        { transform: 'translate(-50%, 4px) scale(0.45)', opacity: 0 },
      ],
      { delay: 90, duration: 480, fill: 'both' },
    ).finished,
  );

  await Promise.allSettled(pending);
}
