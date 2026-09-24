'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll-spy: the id of the section crossing a thin band at ~40% of the
 * viewport, or null above the first one (the hero). One IntersectionObserver
 * watches every section.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(',');

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        // Page order wins when two sections touch the band at once.
        const current = sections.find((section) => inBand.has(section.id));
        if (current) setActive(current.id);
        else if (sections[0].getBoundingClientRect().top > window.innerHeight * 0.4) setActive(null);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
