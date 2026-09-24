'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { primaryNav } from '@/content/site';
import type { NavItem } from '@/content/types';
import { cn } from '@/lib/utils';

export function isActive(pathname: string, item: NavItem) {
  return pathname === item.match || pathname.startsWith(`${item.match}/`);
}

/** Desktop primary navigation with the active-section underline. */
export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-10">
        {primaryNav.map((item) => {
          const active = isActive(pathname, item);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'block border-b-2 py-2.5 text-[15px] leading-none font-medium text-ink transition-colors duration-150',
                  active ? 'border-ink' : 'border-transparent hover:border-ink',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
