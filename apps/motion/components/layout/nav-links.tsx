'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { RollLabel } from '@/components/motion/roll-label';
import { primaryNav } from '@/content/site';
import type { NavItem } from '@/content/types';
import { cn } from '@/lib/utils';

export function isActive(pathname: string, item: NavItem) {
  return pathname === item.match || pathname.startsWith(`${item.match}/`);
}

/** Desktop primary navigation: rolling labels, accent dot on the current section. */
export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-9">
        {primaryNav.map((item) => {
          const active = isActive(pathname, item);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group flex items-center gap-2 py-2.5 text-[13px] leading-none font-medium tracking-[0.04em] uppercase transition-colors duration-300',
                  active ? 'text-fg' : 'text-fg-2 hover:text-fg',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1.5 rounded-full bg-accent transition-transform duration-300',
                    active ? 'scale-100' : 'scale-0',
                  )}
                />
                <RollLabel>{item.label}</RollLabel>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
