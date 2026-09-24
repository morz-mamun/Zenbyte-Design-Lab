'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

import { useMotionPrefs } from '@/components/motion/motion-provider';
import { getTheme, subscribeTheme, type Theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

/**
 * dust: faint pinpoints that give the sky depth.
 * glow: a soft haloed star.
 * sparkle: a bright star with diffraction spikes that glint as it twinkles.
 */
type StarKind = 'dust' | 'glow' | 'sparkle';
type Tint = 'white' | 'cool' | 'warm';

type Star = {
  kind: StarKind;
  tint: Tint;
  /** Position as a fraction of the canvas size. */
  x: number;
  y: number;
  /** 0 = far, 2 = near: nearer stars move more with the pointer and drift faster. */
  layer: number;
  /** Radius for dust, sprite size in CSS pixels for glow and sparkle. */
  size: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  born: number;
  life: number;
};

const serverTheme = (): Theme => 'dark';

/** Wraps a coordinate into [0, size) so drifting stars re-enter on the other side. */
const wrap = (value: number, size: number) => ((value % size) + size) % size;

/** Pixels of pointer parallax per layer, far to near. */
const PARALLAX = [4, 10, 18];
/** Drift speed in pixels per second per layer, far to near: the sky slowly turns. */
const DRIFT = [5, 10, 18];
/** Drift direction: mostly leftward, slightly down. */
const DRIFT_X = -0.96;
const DRIFT_Y = 0.28;
/** One star per this many square pixels, capped for large screens. */
const DENSITY = 3500;
const MAX_STARS = 150;
/** One bright sparkle per this many square pixels, capped. */
const SPARKLE_DENSITY = 70000;
const MAX_SPARKLES = 16;
/** Sprites may overhang an edge by this much before wrapping to the other side. */
const EDGE = 40;

const TINTS: Record<Tint, string> = {
  white: '255,255,255',
  cool: '205,222,255',
  warm: '255,196,176',
};

const pickTint = (): Tint => {
  const roll = Math.random();
  return roll < 0.72 ? 'white' : roll < 0.9 ? 'cool' : 'warm';
};

/** Renders a sprite once into an offscreen canvas so each frame only blits it. */
function makeSprite(size: number, paint: (ctx: CanvasRenderingContext2D, center: number) => void) {
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext('2d');
  if (ctx) paint(ctx, size / 2);
  return sprite;
}

function paintGlow(ctx: CanvasRenderingContext2D, center: number, rgb: string) {
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, `rgba(255,255,255,1)`);
  gradient.addColorStop(0.08, `rgba(${rgb},0.9)`);
  gradient.addColorStop(0.22, `rgba(${rgb},0.28)`);
  gradient.addColorStop(0.5, `rgba(${rgb},0.06)`);
  gradient.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, center * 2, center * 2);
}

/** A tapered spike through the center, bright in the middle and fading at both tips. */
function paintSpike(ctx: CanvasRenderingContext2D, center: number, angle: number, length: number, width: number, rgb: string, alpha: number) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(angle);
  const gradient = ctx.createLinearGradient(-length, 0, length, 0);
  gradient.addColorStop(0, `rgba(${rgb},0)`);
  gradient.addColorStop(0.5, `rgba(255,255,255,${alpha})`);
  gradient.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(-length, 0);
  ctx.quadraticCurveTo(0, -width, length, 0);
  ctx.quadraticCurveTo(0, width, -length, 0);
  ctx.fill();
  ctx.restore();
}

function paintSparkle(ctx: CanvasRenderingContext2D, center: number, rgb: string) {
  // Soft halo, then the long cross, the short diagonals, and a hot core.
  const halo = ctx.createRadialGradient(center, center, 0, center, center, center * 0.42);
  halo.addColorStop(0, `rgba(${rgb},0.45)`);
  halo.addColorStop(0.35, `rgba(${rgb},0.12)`);
  halo.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, center * 2, center * 2);

  paintSpike(ctx, center, 0, center, center * 0.07, rgb, 0.95);
  paintSpike(ctx, center, Math.PI / 2, center, center * 0.07, rgb, 0.95);
  paintSpike(ctx, center, Math.PI / 4, center * 0.38, center * 0.05, rgb, 0.45);
  paintSpike(ctx, center, -Math.PI / 4, center * 0.38, center * 0.05, rgb, 0.45);

  const core = ctx.createRadialGradient(center, center, 0, center, center, center * 0.12);
  core.addColorStop(0, 'rgba(255,255,255,1)');
  core.addColorStop(0.4, `rgba(${rgb},0.85)`);
  core.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(center, center, center * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Night sky for the dark theme: faint dust, haloed stars and a few bright
 * sparkles with diffraction spikes, drifting in three depth layers with
 * pointer parallax, plus an occasional shooting star. Static under
 * reduced motion, paused off screen, and not drawn at all in the light theme.
 */
export function StarField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduced, finePointer, introDone } = useMotionPrefs();
  const dark = useSyncExternalStore(subscribeTheme, getTheme, serverTheme) === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !dark || !introDone) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shooting: ShootingStar | null = null;
    let nextShot = performance.now() + 1500 + Math.random() * 1500;
    let frame = 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const tints = Object.keys(TINTS) as Tint[];
    const sprites = {
      glow: Object.fromEntries(tints.map((tint) => [tint, makeSprite(64, (g, c) => paintGlow(g, c, TINTS[tint]))])),
      sparkle: Object.fromEntries(tints.map((tint) => [tint, makeSprite(128, (g, c) => paintSparkle(g, c, TINTS[tint]))])),
    } as Record<'glow' | 'sparkle', Record<Tint, HTMLCanvasElement>>;

    const seed = () => {
      const area = width * height;
      const count = Math.min(MAX_STARS, Math.round(area / DENSITY));
      const sparkles = Math.min(MAX_SPARKLES, Math.max(4, Math.round(area / SPARKLE_DENSITY)));
      stars = Array.from({ length: count }, (_, index): Star => {
        const base = { x: Math.random(), y: Math.random(), tint: pickTint(), phase: Math.random() * Math.PI * 2 };
        if (index < sparkles) {
          return { ...base, kind: 'sparkle', layer: 2, size: 24 + Math.random() * 16, alpha: 0.85 + Math.random() * 0.15, twinkleSpeed: 0.5 + Math.random() * 0.9 };
        }
        if (Math.random() < 0.28) {
          const layer = Math.random() < 0.5 ? 1 : 2;
          return { ...base, kind: 'glow', layer, size: 8 + layer * 3 + Math.random() * 7, alpha: 0.6 + Math.random() * 0.4, twinkleSpeed: 0.7 + Math.random() * 1.6 };
        }
        return { ...base, kind: 'dust', layer: 0, size: 0.35 + Math.random() * 0.45, alpha: 0.25 + Math.random() * 0.35, twinkleSpeed: 0.8 + Math.random() * 2.2 };
      });
    };

    const glint = (now: number, star: Star) => 0.5 + 0.5 * Math.sin(now * 0.001 * star.twinkleSpeed + star.phase);

    const spawnShootingStar = (now: number) => {
      const angle = (Math.PI / 180) * (150 + Math.random() * 25);
      const speed = 0.9 + Math.random() * 0.5;
      shooting = {
        x: width * (0.35 + Math.random() * 0.6),
        y: height * Math.random() * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 110 + Math.random() * 90,
        born: now,
        life: 900 + Math.random() * 400,
      };
      nextShot = now + 3000 + Math.random() * 2000;
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      // Additive blending: overlapping halos brighten like real light.
      ctx.globalCompositeOperation = 'lighter';
      for (const star of stars) {
        const shift = PARALLAX[star.layer];
        const travel = reduced ? 0 : (now / 1000) * DRIFT[star.layer];
        const x = wrap(star.x * width + travel * DRIFT_X + EDGE, width + EDGE * 2) - EDGE + pointer.x * shift;
        const y = wrap(star.y * height + travel * DRIFT_Y + EDGE, height + EDGE * 2) - EDGE + pointer.y * shift;
        const phase = reduced ? 0.75 : glint(now, star);

        if (star.kind === 'dust') {
          ctx.globalAlpha = star.alpha * (0.25 + 0.75 * phase);
          ctx.fillStyle = `rgb(${TINTS[star.tint]})`;
          ctx.beginPath();
          ctx.arc(x, y, star.size, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // Sparkles glint sharply at the peak; glows breathe more gently.
        const intensity = star.kind === 'sparkle' ? 0.55 + 0.45 * phase ** 3 : 0.4 + 0.6 * phase;
        const scale = star.kind === 'sparkle' ? 0.7 + 0.45 * phase ** 2 : 0.85 + 0.15 * phase;
        const size = star.size * scale;
        ctx.globalAlpha = star.alpha * intensity;
        ctx.drawImage(sprites[star.kind][star.tint], x - size / 2, y - size / 2, size, size);
      }
      ctx.globalCompositeOperation = 'source-over';

      if (!reduced) {
        if (!shooting && now >= nextShot) spawnShootingStar(now);
        if (shooting) {
          const age = now - shooting.born;
          const progress = age / shooting.life;
          if (progress >= 1) {
            shooting = null;
          } else {
            const headX = shooting.x + shooting.vx * age;
            const headY = shooting.y + shooting.vy * age;
            const tailX = headX - shooting.vx * shooting.length;
            const tailY = headY - shooting.vy * shooting.length;
            // Fade in fast, out slow.
            const fade = Math.min(1, progress * 6) * (1 - progress);
            const gradient = ctx.createLinearGradient(headX, headY, tailX, tailY);
            gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.globalAlpha = fade;
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(headX, headY);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
            ctx.drawImage(sprites.glow.white, headX - 9, headY - 9, 18, 18);
          }
        }
      }

      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame && !reduced) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Only animate while the hero is on screen.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (finePointer && !reduced) window.addEventListener('pointermove', onPointerMove, { passive: true });

    canvas.dataset.on = '';

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      delete canvas.dataset.on;
      ctx.clearRect(0, 0, width, height);
    };
  }, [dark, reduced, finePointer, introDone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-[1.6s] ease-out data-on:opacity-100 in-data-[theme=light]:hidden',
        className,
      )}
    />
  );
}
