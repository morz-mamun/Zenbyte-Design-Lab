import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from '@/components/ui/icons';
import { footer, site } from '@/content/landing';
import { FooterWordmark } from './footer-wordmark';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

/** Closing call to action, credit and source link, over the filling wordmark. */
export function SiteFooter() {
  return (
    <footer aria-labelledby="footer-title" className="relative overflow-hidden border-t border-line pt-24 sm:pt-32">
      <div className="container-lab flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SplitText
          as="h2"
          id="footer-title"
          by="word"
          text={footer.heading}
          className="max-w-3xl text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1] font-semibold tracking-[-0.035em]"
        />
        <Reveal delay={0.2} distance={20}>
          <a
            href={footer.cta.href}
            className={`group inline-flex h-14 items-center gap-2 rounded-full bg-accent pr-6 pl-7 text-lg font-medium text-on-accent transition-transform hover:scale-[1.03] ${focusRing}`}
          >
            {footer.cta.label}
            <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>

      <div className="mt-20 sm:mt-28">
        <FooterWordmark text={site.wordmark} />
      </div>

      <div className="container-lab flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {footer.credit}{' '}
          <a
            href={site.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent ${focusRing}`}
          >
            {site.author}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
        <a
          href={site.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-sm text-fg transition-colors hover:text-accent-text ${focusRing}`}
        >
          <GitHubIcon size={16} />
          {footer.repoLabel}
          <ArrowUpRightIcon />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
