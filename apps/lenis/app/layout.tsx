import type { Metadata } from 'next';
import { Anton, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { siteConfig } from '@/constants/site-config';
import { DesignSwitch } from '@/components/design-switch';
import { withBasePath } from '@/lib/base-path';
import { THEME_BG, THEME_STORAGE_KEY } from '@/lib/theme';

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

/**
 * Runs before paint: flags JS for the reveal failsafe, applies a stored light
 * theme, and shows the intro loader on the first load of a session (never
 * under reduced motion).
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light'){d.dataset.theme='light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','${THEME_BG.light}');var c=document.querySelector('meta[name="color-scheme"]');if(c)c.setAttribute('content','light')}}catch(e){}try{if(!sessionStorage.getItem('zb-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro')}}catch(e){}})();`;

/** Without JavaScript nothing animates, so show every revealed element. */
const noscriptStyles = '[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}';

const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'forward-deployed engineering',
    'embedded engineers',
    'software deployment',
    'workflow automation',
    'integrations',
    'AI agents',
    'legacy modernization',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: defaultTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: withBasePath('/favicon.ico'),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${geist.variable} ${geistMono.variable}`}
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
        {children}
        <DesignSwitch />
      </body>
    </html>
  );
}
