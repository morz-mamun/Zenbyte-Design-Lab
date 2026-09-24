# ZenByte website

Marketing site for ZenByte's forward-deployed engineering practice. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build
```

## Project layout

| Path | What lives there |
| --- | --- |
| `app/(site)/` | Routes: `/`, `/how-we-work`, `/industries`, `/case-studies`, `/case-studies/[slug]`, `/blog`, `/blog/[slug]`, `/for-vendors`, `/start-a-project` |
| `content/` | All page copy and list data, typed in `content/types.ts`. Edit copy here, not in components. |
| `components/ui/` | Primitives: buttons, icons, logo, placeholder/avatar, status rows, check rows |
| `components/sections/` | Blocks shared across pages: page hero, CTA band, engineer diagram, case-study card, quote card |
| `components/pages/<page>/` | Sections used by a single page |
| `components/layout/` | Header, mobile menu, footer, skip link |
| `app/globals.css` | Design tokens (`@theme`), typography roles (`type-*`), surfaces (`card`, `chip`, `grid-paper`, `stripes`) |
| `lib/inquiry.ts` | "Start a project" form fields and validation, shared by client and server |

## Content

- **Placeholders.** Items marked `placeholder: true` in `content/` (stats, client names, metrics, testimonials, authors) came from the design as illustrative content and must be replaced before launch.
- **Images.** An `ImageSlot` without `src` renders the striped placeholder. Set `src` (and `alt`) to show a real image in the same slot.
- **Case studies and posts.** Detail pages are generated only for case studies with `detail` and posts with `body`. The others still appear on the listing pages, without a link.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `INQUIRY_WEBHOOK_URL` | For the contact form | The "Start a project" form POSTs each inquiry as JSON to this URL. Any endpoint that accepts JSON works, e.g. a Zapier or Make catch hook that forwards to email, Slack or a CRM. When it is unset, the form shows an error with the contact email as a fallback (and logs the inquiry in development). |

Payload shape:

```json
{
  "source": "https://zenbyte.com/start-a-project",
  "submittedAt": "2026-09-23T10:00:00.000Z",
  "name": "…",
  "email": "…",
  "company": "…",
  "kind": "Integrations",
  "message": "…"
}
```
