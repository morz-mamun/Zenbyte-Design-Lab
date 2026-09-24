export default function Loading() {
  return (
    <div role="status" className="flex min-h-[60vh] items-center justify-center">
      <span className="type-mono flex items-center gap-3 uppercase">
        <span aria-hidden="true" className="relative size-3">
          <span className="absolute inset-0 animate-ring rounded-full bg-accent" />
          <span className="absolute inset-0 rounded-full bg-accent" />
        </span>
        Loading…
      </span>
    </div>
  );
}
