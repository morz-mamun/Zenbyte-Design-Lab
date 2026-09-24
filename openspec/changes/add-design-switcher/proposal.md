## Why

The Zenbyte site exists as two competing designs on separate branches of `/home/mamun/morz/zenbyte/Zenbyte`: `main` (the static design) and `lenis-template` (the motion-heavy design built on Lenis smooth scroll and `motion`). Comparing them today means checking out branches and restarting the dev server. A single combined project lets anyone open either complete design side by side from one URL, without the two codebases bleeding into each other.

## What Changes

- Create a new pnpm-workspace project in `zenbyte-design-lab` holding three Next.js apps:
  - `apps/switcher`: the entry app at `/`, showing the ZENBYTE wordmark and two choices, **Main Design** and **Lenis Design**.
  - `apps/main`: a verbatim snapshot of the `main` branch, served under `/main`.
  - `apps/lenis`: a verbatim snapshot of the `lenis-template` branch, served under `/lenis`.
- Each design app keeps its own root layout, `globals.css`, fonts, theme boot script, dependencies and `public/` assets. No components are shared or merged between the designs.
- Choosing a design performs a full document navigation (no client-side transition), so the chosen design boots exactly as it would as its own website.
- Each design gets a small, self-contained "Switch design" control that links back to the switcher or to the other design, also with a full reload.
- Adapt only what serving under a path prefix requires: `basePath` config, prefixing hard-coded `public/` asset URLs (case-study images, the water-drop sound), and prefixing any internal raw `<a href>` links.
- One root command (`pnpm dev` / `pnpm build`) runs all three apps together.

## Capabilities

### New Capabilities
- `design-switcher`: the entry page at `/` that lists the available designs and sends the visitor to one with a full page reload, plus the in-design control for switching back.
- `design-isolation`: each design is served as a complete, independent experience under its own path prefix, with every route, asset, style and behavior of its source branch working unchanged.

### Modified Capabilities
<!-- None: openspec/specs/ is empty. -->

## Impact

- **New code**: the whole workspace (`package.json`, `pnpm-workspace.yaml`, `apps/*`). The target directory currently holds only OpenSpec/tooling files.
- **Source repo**: read-only. Snapshots are taken with `git archive` from the `main` and `lenis-template` branches, and the original repo is not modified.
- **Dependencies**: `apps/lenis` adds `lenis` and `motion`, while `apps/main` and `apps/switcher` do not. All three use Next 16.2.4, React 19.2.4 and Tailwind 4.
- **URLs**: the designs move from `/…` to `/main/…` and `/lenis/…`. SEO files (`robots.ts`, `sitemap.ts`) are served per zone. The combined site is a design review tool, not the production site.
- **Dev workflow**: three Next dev servers on separate ports, with the switcher proxying `/main` and `/lenis` to them.
