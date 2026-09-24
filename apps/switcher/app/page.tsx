/**
 * Design lab entry page. Each design is a separate Next app (zone) behind the
 * rewrites in next.config.ts, so the cards are plain <a> tags: choosing one
 * is a full document load, exactly like opening a different website.
 */

type Design = {
  id: 'classic' | 'motion';
  name: string;
  href: string;
  summary: string;
};

const designs: Design[] = [
  {
    id: 'classic',
    name: 'Classic',
    href: '/classic',
    summary: 'Editorial layout on warm paper, serif headlines, calm and static.',
  },
  {
    id: 'motion',
    name: 'Motion',
    href: '/motion',
    summary: 'Motion-led: smooth scrolling, intro loader, custom cursor, dark and light themes.',
  },
];

function ClassicPreview() {
  return (
    <div className="flex h-full flex-col justify-between bg-classic-paper p-6 text-classic-ink sm:p-8">
      <div className="flex items-center justify-between font-sans text-[11px] font-medium text-classic-body">
        <span className="font-serif text-xl text-classic-ink">ZenByte</span>
        <span className="rounded-full bg-classic-accent px-3 py-1.5 text-white">Start a project</span>
      </div>
      <p className="font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl">
        The demo works.
        <br />
        The <em className="text-classic-accent">deployment</em>
        <br />
        is where it breaks.
      </p>
    </div>
  );
}

function MotionPreview() {
  return (
    <div className="flex h-full flex-col justify-between bg-motion-bg p-6 text-white sm:p-8">
      <div className="flex items-center justify-between font-sans text-[11px] font-medium tracking-wider uppercase">
        <span className="font-display text-xl tracking-normal">Zenbyte</span>
        <span className="rounded-full bg-motion-accent px-3 py-1.5 text-black">Start a project</span>
      </div>
      <p className="font-display text-4xl leading-[0.92] uppercase sm:text-5xl">
        The demo works. <span className="text-motion-accent">Deployment</span> is where it breaks.
      </p>
    </div>
  );
}

function DesignCard({ design }: { design: Design }) {
  return (
    <a
      href={design.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-[#111113] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#48484c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div
        aria-hidden="true"
        className={`aspect-[16/10] border-b ${design.id === 'classic' ? 'border-classic-line' : 'border-motion-line'}`}
      >
        {design.id === 'classic' ? <ClassicPreview /> : <MotionPreview />}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">{design.name}</h2>
          <span className="flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-fg">
            Open
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <p className="text-[15px] leading-relaxed text-muted">{design.summary}</p>
        <p className="mt-auto pt-2 font-mono text-xs text-muted">{design.href}</p>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-10 sm:px-8 sm:py-16">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-bold tracking-[0.28em]">ZENBYTE</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Design Lab</h1>
        <p className="max-w-xl text-base leading-relaxed text-muted">
          One site, two design directions. Each one opens as its own complete website. Use the switch in the
          bottom-left corner of either design to come back or jump to the other.
        </p>
      </header>

      <nav aria-label="Designs" className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 md:gap-6">
        {designs.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </nav>
    </main>
  );
}
