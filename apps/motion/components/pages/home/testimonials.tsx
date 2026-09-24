import { SectionIntro } from '@/components/sections/section-intro';
import { testimonials } from '@/content/home';
import { TestimonialSpotlight } from './testimonial-spotlight';

/** Sized to fit in one viewport on desktop: header + tabs left, quote right. */
export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="pb-16 md:pb-20 lg:pb-28 lg:flex lg:items-center "
    >
      <div className="container-site w-full">
        <TestimonialSpotlight
          items={testimonials.items}
          header={
            <SectionIntro
              eyebrow={testimonials.eyebrow}
              heading={testimonials.heading}
              headingId="testimonials-heading"
              className="max-w-[860px]"
              by="word"
              headingClassName="text-[clamp(2.75rem,4.6vw,5rem)] text-balance"
            />
          }
        />
      </div>
    </section>
  );
}
