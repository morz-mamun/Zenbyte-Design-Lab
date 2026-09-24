## 1. Workspace setup

- [x] 1.1 Create root `package.json` (private, `packageManager` pnpm) with scripts `dev`, `build`, `start` and `lint` that run all `apps/*` in parallel via `pnpm -r --parallel`
- [x] 1.2 Create root `pnpm-workspace.yaml` (`packages: [apps/*]`), carrying over any `onlyBuiltDependencies` / settings from the source repo's `pnpm-workspace.yaml`
- [x] 1.3 Add root `.gitignore` (`node_modules`, `.next`, `.env*.local`, `*.tsbuildinfo`, `next-env.d.ts`)

## 2. Snapshot the designs

- [x] 2.1 Export `main` into `apps/main` with `git -C /home/mamun/morz/zenbyte/Zenbyte archive main | tar -x -C apps/main`
- [x] 2.2 Export `lenis-template` into `apps/lenis` the same way
- [x] 2.3 In both apps, remove branch tooling: `.claude/`, `.cursor/`, `openspec/`, `AGENTS.md`, `CLAUDE.md`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`
- [x] 2.4 Write `apps/<name>/SOURCE.md` recording source repo, branch and commit SHA (`git rev-parse <branch>`)
- [x] 2.5 Rename packages to `@zenbyte/main` and `@zenbyte/lenis`, and set their `dev`/`start` scripts to ports 3001 and 3002

## 3. Make the design zones prefix-aware

- [ ] 3.1 In `apps/main/next.config.ts` add `basePath: "/main"`, `env.NEXT_PUBLIC_BASE_PATH`, and `experimental.serverActions.allowedOrigins: ["localhost:3000"]`, keeping the existing `/services` redirect
- [ ] 3.2 Do the same in `apps/lenis/next.config.ts` with `/lenis`
- [ ] 3.3 Add `lib/base-path.ts` (`withBasePath(path)`) to both apps
- [ ] 3.4 Audit `app/`, `components/`, `content/`, `constants/` and `lib/` in both apps for bare absolute URLs not handled by `next/link` or `redirect` (grep `['"\`]/[a-z_]`), and list the findings
- [ ] 3.5 In lenis, wrap public asset paths with `withBasePath`: `content/case-studies.ts` image `src`s (or at their render site) and `components/theme/drop-sound.ts` `SRC`
- [ ] 3.6 Fix raw internal `<a href>` in both `components/layout/site-footer.tsx` files (switch to `next/link` or `withBasePath`), and apply any other audit findings. Leave `mailto:`, external and `#hash` links as they are

## 4. In-design switch control

- [ ] 4.1 Add `components/design-switch.tsx` to both apps: a fixed bottom-left pill with plain `<a>` links to `/` ("ZENBYTE"), `/main` and `/lenis`, the current design marked `aria-current="page"`, visible focus styles, and self-contained styling
- [ ] 4.2 Render it in each app's root `app/layout.tsx` after `{children}`, and check that its z-index doesn't cover the lenis intro loader or custom cursor

## 5. Switcher app

- [ ] 5.1 Scaffold `apps/switcher` (`@zenbyte/switcher`, port 3000) with Next 16.2.4, React 19.2.4, Tailwind 4, TypeScript and ESLint config matching the design apps
- [ ] 5.2 Add `next.config.ts` rewrites for `/main`, `/main/:path*`, `/lenis` and `/lenis/:path*` to `MAIN_ZONE_URL` / `LENIS_ZONE_URL` (defaulting to localhost:3001 / 3002)
- [ ] 5.3 Build `app/layout.tsx`, `app/globals.css` and `app/page.tsx`: the ZENBYTE wordmark and two large `<a>` cards "Main Design" → `/main` and "Lenis Design" → `/lenis`, each with a one-line description and a visible focus ring
- [ ] 5.4 Add a README at the project root covering install, `pnpm dev`, using only `http://localhost:3000`, and how to re-sync a design from its branch using `SOURCE.md`

## 6. Verify

- [ ] 6.1 `pnpm install` at the root, then `pnpm build` succeeds for all three apps and `pnpm lint` passes
- [ ] 6.2 With `pnpm dev`, check that `/` shows the switcher and that each card does a full document load (DevTools Network shows a `document` request) to its design home
- [ ] 6.3 Click through every route in `/main` and `/lenis` (home, blog + a post, case studies + a detail, for-vendors, how-we-work, industries, start-a-project, a 404, `/services` redirect) and confirm there are no 404ed assets or links escaping the prefix
- [ ] 6.4 In lenis, confirm smooth scroll, the intro loader, the cursor, the theme toggle with its sound, and the case-study images. In main, confirm no lenis/motion chunks load
- [ ] 6.5 Submit the start-a-project form via `localhost:3000/main/...` and `/lenis/...` and confirm the server action succeeds through the rewrite
- [ ] 6.6 Set the light theme in lenis, switch to main, and confirm main is unaffected. Confirm the switch control works on each design's pages, including 404, and that browser back returns to `/`
