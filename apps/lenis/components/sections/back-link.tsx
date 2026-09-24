import Link from 'next/link';

import { RollLabel } from '@/components/motion/roll-label';
import { BackIcon } from '@/components/ui/icons';

/** Breadcrumb back link used by the case-study and blog-post templates. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-2 text-muted transition-colors hover:text-fg"
    >
      <BackIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1 md:size-4" />
      <span className="type-mono tracking-[0.06em] text-current uppercase">
        <RollLabel>{label}</RollLabel>
      </span>
    </Link>
  );
}
