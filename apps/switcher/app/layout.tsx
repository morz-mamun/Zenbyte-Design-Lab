import type { Metadata, Viewport } from 'next';
import { Anton, Geist, Instrument_Serif } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'ZENBYTE Design Lab',
  description: 'One site, two design directions: open the Classic or the Motion design of ZENBYTE as its own site.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable} ${anton.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
