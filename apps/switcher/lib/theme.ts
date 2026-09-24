/**
 * Copied from apps/motion/lib/theme.ts (the apps share no code). Changes:
 * the storage key is the lab's own, so the lab and the Motion design keep
 * independent themes on the shared origin; THEME_BG matches this app's tokens.
 *
 * Site theme: dark by default, light when `<html data-theme="light">`. The
 * attribute flips CSS tokens only, so switching never re-renders page content.
 * The boot script in app/layout.tsx applies a stored choice before paint.
 */

export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'zb-lab-theme';

/** Background token per theme; must match --color-bg in app/globals.css. */
export const THEME_BG: Record<Theme, string> = {
  dark: '#0b0b0c',
  light: '#f4f2ee',
};

const listeners = new Set<() => void>();

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

/**
 * Switches the theme in one frame and remembers it. Transitions are paused
 * while the tokens flip; otherwise every element with a color transition
 * (header, buttons, links, cards) would fade from the old colors on its own
 * schedule, which reads as a flash inside the ripple reveal.
 */
export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add('theme-switching');
  if (theme === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_BG[theme]);
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', theme);
  // Force the whole document to compute the new colors while transitions are
  // off (a layout read, since a style read on one element may only update
  // that element), then restore them.
  void document.body.offsetHeight;
  requestAnimationFrame(() => root.classList.remove('theme-switching'));
  try {
    if (theme === 'light') localStorage.setItem(THEME_STORAGE_KEY, theme);
    else localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Storage blocked: the theme still applies to this page.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
