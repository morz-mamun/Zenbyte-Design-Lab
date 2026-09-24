export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110]"
    >
      Skip to content
    </a>
  );
}
