import { cn } from '@/lib/utils';

/**
 * Hand-built previews of each design's home hero, in that design's type and
 * colors (fixed swatches, the same in both lab themes). Everything is sized
 * in container units, so a preview scales like a screenshot: the parent sets
 * the width and aspect ratio. Decorative; callers hide them from assistive
 * tech. Hover details key off a `group/card` ancestor when there is one.
 */

type PreviewProps = { className?: string };

export function ClassicPreview({ className }: PreviewProps) {
  return (
    <div className={cn('@container h-full w-full', className)}>
      <div className="flex h-full flex-col bg-classic-paper p-[4.5cqw] text-classic-ink">
        <div className="flex items-center justify-between border-b border-classic-line pb-[2.2cqw] font-sans text-[1.35cqw] font-medium text-classic-body">
          <span className="font-serif text-[3.2cqw] leading-none text-classic-ink">ZenByte</span>
          <span className="hidden gap-[2.6cqw] @[22rem]:flex">
            <span>How we work</span>
            <span>Industries</span>
            <span>Case studies</span>
          </span>
          <span className="rounded-full bg-classic-accent px-[2cqw] py-[1cqw] text-white">Talk to an engineer</span>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-[2.4cqw]">
          <p className="flex items-center gap-[1.4cqw] font-sans text-[1.3cqw] font-medium tracking-[0.18em] text-classic-body uppercase">
            <span className="h-px w-[4cqw] bg-classic-accent" />
            Forward-deployed engineering
          </p>
          <p className="font-serif text-[7.4cqw] leading-[0.94] tracking-[-0.01em]">
            The demo works.
            <br />
            The{' '}
            <em className="relative text-classic-accent">
              deployment
              <span className="absolute inset-x-0 -bottom-[0.3cqw] h-[0.35cqw] origin-left scale-x-0 bg-classic-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-x-100" />
            </em>
            <br />
            is where it breaks.
          </p>
          <p className="max-w-[62%] font-sans text-[1.55cqw] leading-[1.5] text-classic-body">
            Forward-deployed engineers inside your operation. A first version goes live in weeks, not quarters.
          </p>
        </div>
      </div>
    </div>
  );
}

export function MotionPreview({ className }: PreviewProps) {
  return (
    <div className={cn('@container h-full w-full', className)}>
      <div className="relative flex h-full flex-col overflow-hidden bg-motion-bg p-[4.5cqw] text-white">
        {/* Accent glow, echoing the Motion hero's lighting. */}
        <div className="pointer-events-none absolute -right-[12cqw] -bottom-[18cqw] size-[46cqw] rounded-full bg-motion-accent/25 blur-[8cqw] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-x-[6cqw] group-hover/card:-translate-y-[4cqw]" />

        <div className="relative flex items-center justify-between font-sans text-[1.3cqw] font-medium tracking-[0.12em] uppercase">
          <span className="font-display text-[3.2cqw] leading-none tracking-normal">Zenbyte</span>
          <span className="hidden gap-[2.6cqw] text-white/70 @[22rem]:flex">
            <span>How we work</span>
            <span>Industries</span>
            <span>Work</span>
          </span>
          <span className="rounded-full bg-motion-accent px-[2cqw] py-[1cqw] text-black">Start a project</span>
        </div>

        <div className="relative flex flex-1 flex-col justify-center gap-[2.4cqw]">
          <p className="flex items-center gap-[1.4cqw] font-sans text-[1.3cqw] font-medium tracking-[0.18em] text-white/70 uppercase">
            <span className="size-[1cqw] rounded-full bg-motion-accent" />
            Forward-deployed engineering
          </p>
          <p className="font-display text-[8.6cqw] leading-[0.9] uppercase">
            The demo works.{' '}
            <span className="inline-block text-motion-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-[0.6cqw] group-hover/card:skew-x-[-6deg]">
              Deployment
            </span>{' '}
            is where it breaks.
          </p>
        </div>

        <div className="relative flex items-center gap-[2cqw] font-sans text-[1.2cqw] tracking-[0.16em] text-white/60 uppercase">
          <span>Scroll</span>
          <span className="relative h-px flex-1 overflow-hidden bg-motion-line">
            <span className="absolute inset-y-0 left-0 w-1/4 bg-motion-accent transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:w-full" />
          </span>
          <span>01 / 07</span>
        </div>
      </div>
    </div>
  );
}
