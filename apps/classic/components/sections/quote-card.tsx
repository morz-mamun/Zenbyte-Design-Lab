import { QuoteMark } from '@/components/ui/icons';
import { Avatar } from '@/components/ui/placeholder';
import type { Testimonial } from '@/content/types';
import { cn } from '@/lib/utils';

/** Testimonial card: quote mark, serif quote, avatar, name and role. */
export function QuoteCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  return (
    <figure className={cn('card m-0 flex flex-col p-6 xl:p-7', className)}>
      <QuoteMark className="h-[21px] w-[26px] text-accent xl:h-6 xl:w-[30px]" />
      <blockquote className="mt-3 font-serif text-[22px] leading-[1.28] text-pretty text-ink xl:mt-4 xl:text-[26px] xl:leading-[1.25]">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 xl:mt-auto xl:gap-3.5 xl:pt-6">
        <Avatar
          initials={testimonial.initials}
          image={testimonial.avatar}
          className="size-10 xl:size-12"
        />
        <span className="flex flex-col gap-1">
          <span className="text-sm leading-none font-semibold xl:text-[15px]">{testimonial.name}</span>
          <span className="type-mono">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
