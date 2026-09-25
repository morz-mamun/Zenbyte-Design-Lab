import type { Metadata } from 'next';
import { Anton, Geist, Instrument_Serif } from 'next/font/google';
import './globals.css';

import { Cursor } from '@/components/motion/cursor';
import { MotionProvider } from '@/components/motion/motion-provider';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { THEME_BG, THEME_STORAGE_KEY } from '@/lib/theme';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
});

// Preview faces only: each card hints at its design's headline type.
const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

/**
 * Runs before paint: flags JS for the reveal failsafe and applies a stored
 * light theme, so the page never flashes the wrong one.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light'){d.dataset.theme='light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','${THEME_BG.light}');var c=document.querySelector('meta[name="color-scheme"]');if(c)c.setAttribute('content','light')}}catch(e){}})();`;

/** Without JavaScript nothing animates, so show every revealed element. */
const noscriptStyles =
  '[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}';

export const metadata: Metadata = {
  title: 'ZENBYTE Design Lab',
  description:
    'One site, two design directions. See how the same ZENBYTE website reads as a calm editorial Classic design and a motion-led Motion design, and open either as its own site.',
  authors: [{ name: 'morz mamun', url: 'https://github.com/morz-mamun' }],
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrument.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Rendered here, before the boot script, so it can patch them for a stored light theme. */}
        <meta name="color-scheme" content="dark" suppressHydrationWarning />
        <meta name="theme-color" content={THEME_BG.dark} suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{noscriptStyles}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <MotionProvider>
          <SmoothScroll />
          {children}
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
