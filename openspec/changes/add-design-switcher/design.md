## Context

Source repo: `/home/mamun/morz/zenbyte/Zenbyte` (Next.js 16.2.4, React 19.2.4, Tailwind 4, pnpm, App Router). Both branches have the **same route tree** (`app/(site)/…`) and mostly the **same file paths**, but the contents differ:

| | `main` | `lenis-template` |
|---|---|---|
| Extra deps | none | `lenis`, `motion` |
| Extra dirs | none | `components/motion/*`, `components/theme/*` |
| `public/` | none | `images/case-studies/*.svg`, `sounds/water-drop.m4a` |
| Browser storage | none | `localStorage` theme key, `sessionStorage` `zb-intro` |
| Root layout | plain | inline theme and intro boot script |

`next.config.ts` is identical on both branches (one `/services → /how-we-work` redirect). Internal links go through `next/link` wrappers (`BackLink`, `ButtonLink`, `ArrowLink`). The exceptions are raw `<a href>` tags in `site-footer.tsx` and hard-coded `/images/...` and `/sounds/...` strings.

The target directory `zenbyte-design-lab` holds only OpenSpec/editor tooling and is not a git repo.

## Goals / Non-Goals

**Goals:**
- Each design keeps its source code almost unchanged, so later updates from the branches can be copied in with a small diff.
- Crossing between designs is always a full document load.
- One command runs everything locally.

**Non-Goals:**
- Sharing components, content or tokens between designs.
- Merging the branches in git or preserving their git history in this project.
- Production SEO for the combined site.
- A deployment pipeline (local dev and `next build` / `next start` only).

## Decisions

### D1. Next.js Multi-Zones: three apps in a pnpm workspace
```
zenbyte-design-lab/
├── package.json            # root scripts (dev/build/start/lint via pnpm -r --parallel)
├── pnpm-workspace.yaml     # packages: apps/*
└── apps/
    ├── switcher/  :3000    # "/" + rewrites /main/** → :3001, /lenis/** → :3002
    ├── main/      :3001    # basePath: "/main"   (snapshot of branch main)
    └── lenis/     :3002    # basePath: "/lenis"  (snapshot of branch lenis-template)
```
Next.js officially documents zones as a way to serve separate apps under one domain. Navigation between zones is a hard navigation by design, which is exactly the "opens like a new website" requirement.

**Alternatives considered:**
- *One Next app with two root layouts* (`app/(main)/main/...` and `app/(lenis)/lenis/...`). Next does full-reload between different root layouts. However, both branches import through `@/components/...` with identical file names, so every import in about 150 files would need rewriting to namespaced folders, and a single `tsconfig` path alias can't point to two places. It would also share one `package.json` and one PostCSS/Tailwind pipeline, and Tailwind 4 would scan both designs' classes into each stylesheet unless it's carefully scoped. This drifts too far from the branches.
- *Static export of each branch served from subfolders.* This loses the server action on start-a-project and the dynamic routes. Rejected.
- *Iframe switcher.* This isn't a real page load, and scrolling and Lenis inside an iframe would break. Rejected.

### D2. Snapshot the source with `git archive`, not by copying the working tree
`git -C <src> archive <branch> | tar -x -C apps/<name>` exports exactly the committed tree, excluding `node_modules`, `.next` and uncommitted work. Branch tooling that is irrelevant inside an app is removed after extraction: `.claude/`, `.cursor/`, `openspec/`, `AGENTS.md`, `CLAUDE.md`, and the per-branch `pnpm-workspace.yaml` / `pnpm-lock.yaml` (the root workspace owns these). Record the source commit SHA of each snapshot in `apps/<name>/SOURCE.md` so later re-syncs can diff from it.

### D3. Prefix awareness through `basePath` plus one small helper
- `next.config.ts` in each design gets `basePath: "/main"` or `"/lenis"`. This automatically prefixes `next/link`, `redirect()`, `next.config` redirects, `_next` assets and server-action posts.
- `basePath` does **not** prefix plain strings used in `<img src>`, `new Audio(src)`, `next/image` with string src, or raw `<a href>`. Add `lib/base-path.ts` in each design app exporting `withBasePath(path)`, which reads `process.env.NEXT_PUBLIC_BASE_PATH` (set in `next.config.ts` via `env`). Apply it only where the audit (task 3.x) finds bare absolute paths, and leave external, `mailto:` and `#` links untouched.
- `metadataBase`, `sitemap.ts` and `robots.ts` are left pointing at `siteConfig.url`. They are only cosmetic in this review tool.

### D4. Switch links are plain `<a>` tags, never `next/link`
Both the switcher page and the in-design control use `<a href="/lenis">`. Within a zone, `next/link` would try client routing to a path outside the app's basePath. Plain anchors guarantee a document load in dev and prod.

### D5. In-design switch control is a separate, isolated component
`components/design-switch.tsx` is added to each design app and rendered once in the root `app/layout.tsx`, after `{children}`. It is a small fixed pill in the bottom-left corner containing "ZENBYTE · Main | Lenis" with the current design marked `aria-current`. It uses inline, prefix-scoped styles, so it doesn't depend on either design's tokens, and it gets a high `z-index` that stays below the Lenis cursor and intro loader. It is the only visual addition to each design. Hosting it in the root layout rather than the `(site)` layout means `not-found` and `error` pages also get it.

### D6. Switcher app is minimal and self-contained
It is a single `app/page.tsx` with no header or footer, plus its own tiny `globals.css` (Tailwind 4) and a neutral dark background. The two choices are large cards with the design name and a one-line description. There's no client JS beyond what Next emits. `next.config.ts` holds the zone rewrites, with hosts taken from `MAIN_ZONE_URL` and `LENIS_ZONE_URL` env vars (defaults `http://localhost:3001` and `:3002`):
```
/main           → ${MAIN_ZONE_URL}/main
/main/:path*    → ${MAIN_ZONE_URL}/main/:path*
/lenis          → ${LENIS_ZONE_URL}/lenis
/lenis/:path*   → ${LENIS_ZONE_URL}/lenis/:path*
```

### D7. Storage isolation relies on existing key separation
All zones share one origin (`localhost:3000`), so they share `localStorage` and `sessionStorage`. `main` reads no storage, and `lenis` keys (`THEME_STORAGE_KEY`, `zb-intro`) are only read by `lenis`. No change is needed. If `main` later adds a theme key, namespace it then.

## Risks / Trade-offs

- **Hard-coded root paths missed by the audit** → broken image, sound or link under a prefix. Mitigation: grep for `['"\`]/[a-z]` in `app/`, `components/`, `content/` and `lib/`, then click through every route in both zones (task 6).
- **Developer opens `:3001` directly and sees assets fail or a 404 at `/`** → documented in the README: always use `:3000`. The zone apps still work at `:3001/main` directly.
- **Server actions through the rewrite proxy** can fail the Origin/Host check. Mitigation: set `experimental.serverActions.allowedOrigins: ["localhost:3000"]` in the design zones and verify the start-a-project form submits via `:3000`.
- **Three dev servers use more memory** and give slower cold starts. This is acceptable for a design lab.
- **Snapshots drift from the branches.** `SOURCE.md` records the SHA, and a re-sync means re-running the archive step and re-applying the small prefix diff.

## Migration Plan

This is a new project, so nothing needs migrating. To roll back, delete `apps/` and the root workspace files. The source repo is never modified.
