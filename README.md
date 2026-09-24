# Zenbyte Design Lab

Two complete versions of the Zenbyte site, side by side:

| Design | Path | Source branch | App |
|---|---|---|---|
| Main Design | `/main` | `main` | [`apps/main`](apps/main) |
| Lenis Design | `/lenis` | `lenis-template` | [`apps/lenis`](apps/lenis) |

The entry page at `/` ([`apps/switcher`](apps/switcher)) lets you pick one. Every design page has a small switch pill in the bottom-left corner that goes back to the lab or to the other design. Switching is always a full page load, so each design boots exactly like its own website.

## How it works

Each design is its own Next.js app ([Multi-Zones](https://nextjs.org/docs/app/guides/multi-zones)) with its own dependencies, styles, fonts and `public/` assets. Nothing is shared between them.

```
:3000  apps/switcher   "/" + rewrites /main/** → :3001, /lenis/** → :3002
:3001  apps/main       basePath "/main"
:3002  apps/lenis      basePath "/lenis"
```

## Getting started

Requires Node 20+ and pnpm 11.

```bash
pnpm install
pnpm dev        # runs all three apps
```

Open **http://localhost:3000**. Always browse through port 3000: the design apps answer only under their prefix (`localhost:3001/main`), and their switch links rely on the switcher's rewrites.

Other root scripts: `pnpm build`, `pnpm start` (production, after a build), `pnpm lint`.

To point the switcher at design apps running elsewhere, set `MAIN_ZONE_URL` and `LENIS_ZONE_URL` (defaults `http://localhost:3001` and `http://localhost:3002`) when building/starting `apps/switcher`.

## Re-syncing a design from its branch

The designs are one-time snapshots taken with `git archive`. Each app's `SOURCE.md` records the source repo, branch and commit.

1. See what changed on the branch since the snapshot:
   ```bash
   git -C /home/mamun/morz/zenbyte/Zenbyte diff <commit-from-SOURCE.md> <branch>
   ```
2. Re-export the branch over the app folder, then delete the branch tooling (`.claude/`, `.cursor/`, `openspec/`, `AGENTS.md`, `CLAUDE.md`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`).
3. Re-apply the lab-only edits (review them with `git diff`):
   - `package.json`: package name `@zenbyte/<name>` and the fixed port in `dev`/`start`
   - `next.config.ts`: `basePath`, `env.NEXT_PUBLIC_BASE_PATH`, `experimental.serverActions.allowedOrigins`
   - `lib/base-path.ts` and its call sites (favicon in `app/layout.tsx`; in lenis also `components/ui/placeholder.tsx` and `components/theme/drop-sound.ts`)
   - `components/design-switch.tsx`, rendered in `app/layout.tsx`
4. Search for new hard-coded root paths that need `withBasePath` (anything that isn't a `next/link` href or a `redirect()`), for example: `grep -rnE "['\"\`]/(images|sounds|fonts)" app components content lib`.
5. Update the commit in `SOURCE.md`, then run `pnpm install && pnpm build`.

Dependency versions shared with the branches are pinned in `pnpm-workspace.yaml` (`overrides`) to match their lockfiles. Update them if a branch upgrades.
