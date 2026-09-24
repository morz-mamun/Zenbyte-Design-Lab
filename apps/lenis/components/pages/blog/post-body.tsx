import type { PostBlock } from '@/content/types';

/** Renders a post's structured body blocks in the 720px reading column. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-6 xl:gap-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="type-body text-[17px] leading-[1.7] text-fg-2 xl:text-[18px]">
                {block.text}
              </p>
            );
          case 'heading':
            return (
              <h2 key={index} className="mt-4 font-display text-[34px] leading-[0.95] uppercase xl:mt-6 xl:text-[48px]">
                {block.text}
              </h2>
            );
          case 'list':
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="type-body flex gap-3.5 border-t border-line-soft py-3 text-[17px] text-fg-2 last:border-b"
                  >
                    <span aria-hidden="true" className="mt-[10px] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote
                key={index}
                className="my-4 border-l-2 border-accent py-1 pl-6 text-[24px] leading-[1.3] font-medium tracking-[-0.02em] text-pretty text-fg xl:my-6 xl:pl-8 xl:text-[30px]"
              >
                {block.text}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
