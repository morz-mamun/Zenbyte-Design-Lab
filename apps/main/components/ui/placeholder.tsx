import Image from 'next/image';

import type { ImageSlot } from '@/content/types';
import { cn } from '@/lib/utils';

type PlaceholderProps = {
  slot: ImageSlot;
  /** Sizing, radius and border overrides for the slot. */
  className?: string;
  /** `sizes` hint for next/image once a real `src` is provided. */
  sizes?: string;
  priority?: boolean;
};

/**
 * An image position. Renders the striped placeholder from the design until the
 * content entry supplies `src`, then renders the image at the same size.
 */
export function Placeholder({ slot, className, sizes = '100vw', priority }: PlaceholderProps) {
  if (slot.src) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image src={slot.src} alt={slot.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const a11y = slot.alt ? { role: 'img' as const, 'aria-label': slot.alt } : { 'aria-hidden': true };

  return (
    <div
      {...a11y}
      className={cn(
        'stripes type-mono flex items-center justify-center border border-line p-2.5 text-center md:p-3',
        className,
      )}
    >
      {slot.caption}
    </div>
  );
}

type AvatarProps = {
  initials?: string;
  image?: ImageSlot;
  className?: string;
};

/** Round avatar: image when available, otherwise a striped disc with initials. */
export function Avatar({ initials, image, className }: AvatarProps) {
  if (image?.src) {
    return <Placeholder slot={image} sizes="64px" className={cn('shrink-0 rounded-full', className)} />;
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'stripes type-mono flex shrink-0 items-center justify-center rounded-full border border-line',
        className,
      )}
    >
      {initials}
    </span>
  );
}
