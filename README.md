# ZENBYTE Design Lab

One site, two design directions. The same ZENBYTE website, with the same pages and content, built twice with a different visual language each time. Each design runs as its own complete site.

| Design | Path | Look and feel | App |
|---|---|---|---|
| Classic | `/classic` | Editorial layout on warm paper, serif headlines, calm and static | [`apps/classic`](apps/classic) |
| Motion | `/motion` | Motion-led: smooth scrolling, intro loader, custom cursor, dark and light themes | [`apps/motion`](apps/motion) |

The landing page at `/` ([`apps/switcher`](apps/switcher)) explains the project: the idea, a side-by-side comparison, how it's built and how to explore. It has its own dark and light themes and smooth scrolling, and its designs section opens either one. Every design page has a small switch pill in the bottom-left corner that goes back to the lab or to the other design. Switching is always a full page load, so each design boots exactly like its own website.

## How it works

Each design is its own Next.js app ([Multi-Zones](https://nextjs.org/docs/app/guides/multi-zones)) with its own dependencies, styles, fonts and `public/` assets. Nothing is shared between them.

```
:3000  apps/switcher   "/" + rewrites /classic/** → :3001, /motion/** → :3002
:3001  apps/classic    basePath "/classic"
:3002  apps/motion     basePath "/motion"
```

## Getting started

Requires Node 20+ and pnpm 11.

```bash
pnpm install
pnpm dev        # runs all three apps
```

Open **http://localhost:3000**. Always browse through port 3000: the design apps answer only under their prefix (`localhost:3001/classic`), and their switch links rely on the switcher's rewrites.

Other root scripts: `pnpm build`, `pnpm start` (production, after a build), `pnpm lint`.

To point the switcher at design apps running elsewhere, set `CLASSIC_ZONE_URL` and `MOTION_ZONE_URL` (defaults `http://localhost:3001` and `http://localhost:3002`) when building/starting `apps/switcher`.

The design apps accept server actions (the start-a-project form) only from the lab's host. When the lab runs somewhere other than `localhost:3000`, set `LAB_ORIGIN` on `apps/classic` and `apps/motion` to its host, without the protocol (e.g. `zenbyte-lab.vercel.app`; comma-separate several).

