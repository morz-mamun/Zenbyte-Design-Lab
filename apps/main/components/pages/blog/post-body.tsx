import type { PostBlock } from '@/content/types';

/** Renders a post's structured body blocks in the 720px reading column. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-[22px] xl:gap-7">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="type-body">
                {block.text}
              </p>
            );
          case 'heading':
            return (
              <h2 key={index} className="type-h2 xl:mt-3">
                {block.text}
              </h2>
            );
          case 'list':
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item} className="type-body flex gap-3 border-t border-line-panel py-2 xl:gap-3.5 xl:py-2.5">
                    <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent-ink xl:mt-[11px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote
                key={index}
                className="my-2 rounded-r-[10px] border-l-[3px] border-accent bg-sand p-5 font-serif text-[21px] leading-[1.3] text-pretty text-ink xl:my-5 xl:px-7 xl:py-6 xl:text-[24px] xl:leading-[1.35]"
              >
                {block.text}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
