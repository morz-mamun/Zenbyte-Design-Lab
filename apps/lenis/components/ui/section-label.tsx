import { cn } from '@/lib/utils';

/** Parenthetical mono section label, e.g. "(APPROACH)". */
export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return <p className={cn('label', className)}>({children})</p>;
}
