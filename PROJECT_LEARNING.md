# ZENBYTE Design Lab: Understand Core Logic

## 1. What it is

One marketing website (ZenByte) built in **two designs**, plus a landing page that links them:

| App | URL | Port | Look |
|---|---|---|---|
| `apps/switcher` (Lab) | `/` | 3000 | Landing page: explains and compares the designs |
| `apps/classic` | `/classic/...` | 3001 | Calm editorial design, no animation library |
| `apps/motion` | `/motion/...` | 3002 | Motion-heavy: Lenis smooth scroll, intro loader, custom cursor, dark/light theme |

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion (formerly Framer Motion), Lenis, pnpm workspaces.

```bash
pnpm install
pnpm dev     # runs all 3 apps → open http://localhost:3000
```

---

## 2. Next.js Multi-Zones (the core architecture)

Each design is a **separate Next.js app** with its own dependencies, CSS and fonts. No code is shared between them. The Lab app acts as the front door and proxies the other two.

```
Browser ──▶ :3000 switcher  (serves "/")
              │  rewrites in next.config.ts
              ├── /classic/**  ──▶ :3001 classic  (basePath "/classic")
              └── /motion/**   ──▶ :3002 motion   (basePath "/motion")
```

**`apps/switcher/next.config.ts`**: rewrites (a server-side proxy; the URL in the browser doesn't change):
```ts
{ source: '/motion/:path*', destination: `${MOTION_ZONE_URL}/motion/:path*` }
```

**`apps/motion/next.config.ts`**: `basePath: '/motion'`. With this, the app treats `/motion/blog` as its `/blog` route, and all its links and `/_next/` assets start with `/motion`. That's why one rewrite rule per app also covers its JS and CSS files.

### Why three apps instead of one?
- Both designs use the same file paths (`@/components/...`) with different contents, so merging them would mean rewriting most imports.
- Each app keeps its own Tailwind build, so the designs' styles never mix.
- Switching designs becomes a **full page load**, like visiting a different website.
- **The cost:** three servers, and some code is duplicated (the Lab copied Motion's animation files).

### Switching between designs
- Links across apps are **plain `<a href="/motion">`**, not `next/link`. `next/link` does client-side navigation only inside its own app, so a plain anchor is needed to force a full page load.
- `components/design-switch.tsx` is the small pill in the bottom-left corner (`ZENBYTE | Classic | Motion`). It's rendered in the root `app/layout.tsx`, so it also appears on 404 and error pages.

### `withBasePath()` (`lib/base-path.ts`)
`basePath` prefixes `next/link`, redirects, `_next` assets and server actions automatically, but **not plain string URLs**. This helper adds the prefix to those:
```ts
withBasePath('/sounds/water-drop.m4a')  // → '/motion/sounds/water-drop.m4a'
```
It's used for the favicon, `next/image` `src`, and the theme sound. External, `mailto:` and `#hash` URLs are returned unchanged.

### Shared browser storage
All three apps run on one origin (`localhost:3000`), so they share `localStorage`. Separate keys keep them apart: Motion uses `zb-theme` and the Lab uses `zb-lab-theme`. Classic stores nothing.

---

## 3. Routing (Classic and Motion)

```
app/
├── layout.tsx         <html>, fonts, metadata, <DesignSwitch/>
├── error.tsx          error boundary (client component)
├── not-found.tsx      404 page
├── robots.ts, sitemap.ts
└── (site)/            route group: shared header/footer, no URL segment
    ├── page.tsx                 /
    ├── blog/[slug]/page.tsx     /blog/:slug
    ├── case-studies/[slug]/...  /case-studies/:slug
    ├── how-we-work, industries, for-vendors
    └── start-a-project/  page.tsx + actions.ts (server action)
```

Dynamic pages are **generated at build time**:
```ts
export const dynamicParams = false;             // unknown slug → 404
export function generateStaticParams() {         // pre-render these slugs
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}
export default async function Page({ params }) {
  const { slug } = await params;                 // Next 15+: params is a Promise
  const post = getPost(slug);
  if (!post) notFound();
}
```

The Lab is a single page. Its "routes" are in-page anchors (`#idea`, `#designs`, `#compare`...).

---

## 4. Content layer

There's no CMS or database. All text lives in typed TypeScript files in `content/`:

```
content/*.ts  ──▶  page.tsx (Server Component)  ──▶  section components  ──▶  HTML
```

- `content/types.ts` defines the shapes (`CaseStudy`, `Post`, `ImageSlot`...).
- A case study or post only gets a detail page if it has `detail` or `body`. Cards link to it only when that page exists, so there are no broken links:
  ```ts
  getCaseStudiesWithDetail = () => caseStudies.filter((s): s is PublishedCaseStudy => Boolean(s.detail));
  ```
- Blog bodies are typed blocks (`paragraph | heading | list | quote`) rendered with a `switch`, not raw HTML.
- `Placeholder` shows a striped box until an image `src` exists, then renders `next/image` at the same size.

---

## 5. Contact form (the only business logic)

These files are the same in both designs:

| File | Job |
|---|---|
| `lib/inquiry.ts` | Validation rules, shared by the browser and the server |
| `app/(site)/start-a-project/actions.ts` | Server action `submitInquiry` |
| `components/pages/start-project/inquiry-form.tsx` | Form UI, using `useActionState` |

The flow:
```
submit → browser validation (validateInquiry)
       │ errors → show them, focus the first bad field, stop
       ▼
server action submitInquiry:
  1. honeypot field filled? → pretend success (it's a bot)
  2. validate again on the server (the real check)
  3. no INQUIRY_WEBHOOK_URL? → error message with the contact email
  4. POST JSON to the webhook (10s timeout)
  5. return { status: 'success' | 'invalid' | 'error' }
```
- `<form action={serverAction}>` **works without JavaScript**. JavaScript only adds instant validation.
- **Proxy issue:** server actions reject requests whose origin doesn't match the host. Requests arrive through `:3000`, so each design sets `serverActions.allowedOrigins: ['localhost:3000']`. A real deployment would need its domain added there.

---

## 6. Styling: Tailwind 4 + design tokens

Tailwind 4 is configured in CSS (`app/globals.css`). There's no JS config file.
```css
@theme { --color-accent: #ff4925; }      /* creates bg-accent, text-accent... */
:root[data-theme='light'] { --color-bg: #f4f2ee; ... }   /* light theme = new token values */
```
- **Themes (Motion and Lab):** changing `data-theme` on `<html>` swaps the CSS variables, so the whole page changes color with no React re-render.
- `cn()` = `clsx` + `tailwind-merge`, so a component can accept `className` overrides safely.
- The Lab's design previews use container-query units (`cqw`), so they scale like screenshots at any size.

---

## 7. Animation system (Motion app, copied into the Lab)

### MotionProvider: one place that holds the user's preferences
```ts
reduced     = useMediaQuery('(prefers-reduced-motion: reduce)')
finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')   // i.e. a mouse
introDone   = has the intro loader finished?
```
`useMediaQuery` uses **`useSyncExternalStore`** with a server value of `false`. The server and the first client render therefore always match, so there are no hydration errors. After that it switches to the real value.

`LazyMotion` + `m.div` (instead of `motion.div`) loads only the animation features used, which keeps the bundle small.

### Lenis smooth scroll
```tsx
if (!finePointer || reduced) return null;            // touch & reduced motion → native scroll
return <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }} />;
```
- `useSmoothScrollTo()` uses Lenis when it's running, otherwise native `scrollTo`.
- Anchors land below the fixed header using CSS `scroll-margin-top`.
- In Motion, `RouteScrollReset` scrolls to the top on each page change, because Lenis would otherwise keep the old scroll position.
- The Lab's mobile menu calls `lenis.stop()` while open.

### Reveal-on-scroll components
`Reveal`, `SplitText` and `CountUp` fade content in or count numbers up when they scroll into view. Every animated element carries `data-reveal`, so content can never stay hidden:
1. **No JavaScript:** a `<noscript>` style shows everything.
2. **JavaScript never finishes loading:** a CSS rule reveals everything after 3s, unless `html.motion-ready` has been added.
3. **Reduced motion:** a CSS override shows everything immediately.

Animated text keeps one `sr-only` plain copy for screen readers.

### Scroll-linked effects
They all follow one pattern: `useScroll({ target })` gives a 0→1 `scrollYProgress`, `useTransform` maps it to a value, and that value goes into `style`. No React state changes per frame.

| Component | Effect |
|---|---|
| `Parallax` | Content drifts vertically as you scroll |
| `StickyStack` | Cards pin and stack on top of each other |
| `HorizontalScroll` | Section pins; vertical scroll moves a horizontal track |
| `ScrollFill` | Words brighten as you read |
| `DeployStory` | Pinned SVG diagram that draws itself as you scroll |

Each of these falls back to a plain layout on mobile or under reduced motion.

### Intro loader (Motion only)
1. An inline script in `<head>` runs **before first paint**. If this is the first visit of the session, it adds `html.intro`.
2. CSS shows the loader only when `html.intro` is present, so there's no flash.
3. The animation finishes, adds `intro-out`, and saves `sessionStorage['zb-intro']` so the loader doesn't replay in the same session.
4. `MotionProvider` watches `<html>`'s classes with a `MutationObserver`, so the hero animation starts as the loader leaves.

### Custom cursor
A dot that follows the mouse with a spring and grows over links. It only appears for mouse users without reduced motion, and the normal cursor stays visible.

---

## 8. Theme toggle with the water-drop effect (Motion and Lab)

**No flash on load:** the same `<head>` script reads `localStorage` and sets `data-theme="light"` before first paint. `<html suppressHydrationWarning>` tells React that change is expected.

**`lib/theme.ts`** is a small store. The theme is read from the `<html>` attribute, and React reads it with `useSyncExternalStore`.

**When you click the toggle** (`theme-transition.ts`):
1. A drop animates down from the button (Web Animations API).
2. On impact: the sound plays, then `document.startViewTransition(() => setTheme(next))`.
3. CSS grows a clip-path ellipse that reveals the new theme from the impact point.
4. A WebGL shader draws water ripples in sync with that ellipse.
5. If you click again mid-animation, the transition is cancelled and the theme reverts.

**Fallbacks:** no View Transitions support, or reduced motion → the theme switches instantly. No WebGL or no audio → the rest still works.

The Lab loads the transition code only when you hover or focus the button (`import()` on demand).

---

## 9. Quick answers

- **Why Multi-Zones?** It keeps two independent apps under one domain, and switching between them is a real page load.
- **How does `/motion/blog` reach the Motion app?** The switcher rewrites it to `:3002/motion/blog`; `basePath` maps it to the `/blog` route.
- **What doesn't basePath handle?** Plain string URLs. That's what `withBasePath()` is for.
- **Why plain `<a>` for switching?** `next/link` can't navigate outside its own app.
- **Why `allowedOrigins`?** Server actions reject requests from the proxy's origin unless it's explicitly allowed.
- **How do you avoid a theme flash?** An inline `<head>` script sets `data-theme` before paint.
- **Why `useSyncExternalStore`?** It reads browser values safely: the server and hydration get a fixed value, then React switches to the real one.
- **Why is Lenis only for mouse users?** Touch devices already scroll smoothly, and some users prefer reduced motion.

---

## 10. Where things live

| Topic | File |
|---|---|
| Rewrites (proxy) | `apps/switcher/next.config.ts` |
| basePath, allowedOrigins | `apps/{classic,motion}/next.config.ts` |
| basePath helper | `lib/base-path.ts` |
| Switch pill | `components/design-switch.tsx` |
| Content | `content/*.ts` |
| Form | `lib/inquiry.ts`, `start-a-project/actions.ts`, `inquiry-form.tsx` |
| Tokens and themes | `app/globals.css`, `lib/theme.ts` |
| Head script (theme + intro) | `app/layout.tsx` (Motion, Lab) |
| Animation preferences | `components/motion/motion-provider.tsx` |
| Lenis | `components/motion/smooth-scroll.tsx` |
| Theme effect | `components/theme/theme-transition.ts`, `water-shader.ts` |
| Intro loader | `apps/motion/components/motion/intro-loader.tsx` |
