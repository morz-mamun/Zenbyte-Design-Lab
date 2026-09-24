export default function Loading() {
  return (
    <div role="status" className="grid-paper flex min-h-[60vh] items-center justify-center">
      <span className="flex items-center gap-3 type-mono">
        <span aria-hidden="true" className="relative size-3">
          <span className="absolute inset-0 animate-ring rounded-full bg-accent" />
          <span className="absolute inset-0 rounded-full bg-accent" />
        </span>
        Loading…
      </span>
    </div>
  );
}
