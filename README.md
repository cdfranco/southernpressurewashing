# Athena Boards — marketing site

The marketing site for **Athena Boards**: branded digital menu boards and lobby screens, designed, installed and kept current, from Athens, Georgia.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript. The copy, prices and portfolio come from the live site at athena-boards.vercel.app. The layout takes its cues from modern SaaS marketing sites: a two-column hero with a rotating photo card, a framed product film with chapter tabs, proof band, line-of-business tabs, package cards, a scrolling gallery, FAQ and a closing call-to-action card.

## Pages

| Route           | Purpose                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------- |
| `/`             | Hero, what you get, the film, live boards, lines of business, trust, packages, gallery, chains, FAQ |
| `/how-it-works` | Design, equipment, software, after go-live, FAQ                                           |
| `/pricing`      | Packages, care plans, chain bands, rollout calculator, change fees, FAQ                    |
| `/franchise`    | Chain program: live multi-location demo, rollout, per-location pricing, IT/Legal answers   |
| `/work`         | The 21-board portfolio by category                                                        |
| `/trust`        | Security and trust, written for IT, Legal and Purchasing                                  |
| `/about`        | Company, organization, facts                                                              |
| `/contact`      | Contact details and the lead form                                                         |
| `/privacy`, `/terms` | Legal pages                                                                          |
| `/api/lead`     | Receives the lead form (see below)                                                        |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Node 20+ (see `.nvmrc`).

## Where things live

- `src/content/site.ts` — shared content: brand details, navigation, footer, the board portfolio, chain pricing bands, film chapters, hero slides. Every page reads prices and board data from here.
- `src/app/<page>/page.tsx` — each page's own copy sits next to its layout.
- `src/app/globals.css` — design tokens (`@theme`): Athena navy and teal, surfaces, shadows, fonts, gradient backgrounds, the few keyframe animations.
- `src/components/` — header with dropdown navigation, footer, buttons, sections, cards, tables, tabs, FAQ, the TV frame, lazy live-board embed, store picker, pricing calculator, lead form, hero carousel, film player.
- `public/img/` — board screenshots (`<slug>-sm.webp`, `<slug>-lg.webp`) and `scenes/` (the hero stills).
- `public/video/` — the rendered film.
- `video/` — the film's source and renderer (see below).

Fonts (Inter and Plus Jakarta Sans) are loaded with `next/font/google`, which self-hosts them at build time.

## The lead form

`src/components/lead-form.tsx` posts JSON to `/api/lead`. The route validates the submission, quietly drops spam (honeypot field, or a form submitted in under 1.5 seconds), and forwards real leads to the URL in the `LEAD_WEBHOOK_URL` environment variable as a JSON `POST`.

**Until `LEAD_WEBHOOK_URL` is set, the form tells visitors to email or call instead** — it never pretends a lead was saved. Point the variable at whatever should receive leads (a Zapier/Make webhook, a small serverless function that emails you, your CRM's inbound endpoint).

## The film

`public/video/athena-boards-film.mp4` (and `.webm`, `.jpg`) is an original 41-second motion-graphics film of the four-step process. It is not screen-recorded: it is drawn in HTML and CSS and rendered frame by frame, so it can be edited like code.

- `video/film.html`, `film.css` — the 1920×1080 stage: scenes, the demo board, phone, captions.
- `video/film.js` — the timeline. Every element is driven from one clock by keyframes, e.g. `A("#s3 .phone", { opacity: [[10.05, 0], [10.5, 1]] })`.
- `video/venues.js` — the illustrated interiors and the demo board markup, shared with the hero stills.
- `video/render.cjs` — renders the film and the stills.

Open `video/film.html` in a browser to watch it loop, or add `?t=12.5` to hold a single frame. To re-render after an edit (needs Playwright and ffmpeg):

```bash
node video/render.cjs            # → public/video/athena-boards-film.{mp4,webm,jpg}
node video/render.cjs --stills   # → public/img/scenes/*.webp (hero photos)
```

If you change scene timings, update the chapter `start` times in `src/content/site.ts` (`film.chapters`) to match.

The café in the film ("Goldfinch Café") is a made-up example. The boards shown on the other walls, and in the hero stills, are real boards from the portfolio.

## Deploy

Works on Netlify or Vercel with the defaults (`npm run build`). A `netlify.toml` is included. Set `LEAD_WEBHOOK_URL` in the host's environment settings.
