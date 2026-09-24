import { QuoteCard } from '@/components/sections/quote-card';
import { SectionIntro } from '@/components/sections/section-intro';
import { testimonials } from '@/content/home';

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="section-y bg-sand">
      <div className="container-site flex flex-col gap-7 xl:gap-12">
        <SectionIntro
          eyebrow={testimonials.eyebrow}
          heading={testimonials.heading}
          headingId="testimonials-heading"
          className="max-w-[800px]"
        />
        <ul className="grid gap-5 lg:grid-cols-3 xl:gap-6">
          {testimonials.items.map((item) => (
            <li key={item.name} className="flex">
              <QuoteCard testimonial={item} className="w-full xl:min-h-[340px]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
