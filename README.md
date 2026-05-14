# Mahmoud & Raghda — Wedding Invitation

A bilingual (Arabic / English) wedding invitation web app built with **Next.js 14**, **Tailwind CSS**, and server-side RSVP storage.

> **26 · 6 · 26** — a date as symmetrical as the love it celebrates.

---

## Features

| Feature | Details |
|---|---|
| Bilingual | Full EN ↔ AR toggle with instant RTL layout flip |
| Countdown | Live countdown to the wedding hour |
| RSVP form | Solo / family attendance, meal preference, server-stored |
| Admin dashboard | `/admin?key=secret` — table of all RSVPs + clear button |
| Particle animation | Floating gold stars & petals on canvas |
| Fonts | Playfair Display + Cormorant Garamond (EN), Amiri (AR) |
| Mobile-ready | Responsive at all screen sizes |

---

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → http://localhost:3000

# 3. View admin dashboard
# → http://localhost:3000/admin?key=secret
```

RSVPs are stored in `data/rsvps.json`. The file is created automatically on first submission.

---

## Deploy to Vercel (Free)

### Option A — GitHub → Vercel (recommended, one click)

1. Push this folder to a GitHub repository:
   ```bash
   git init && git add -A && git commit -m "Wedding invitation"
   git remote add origin https://github.com/YOUR_USER/wedding-invite.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Click **Deploy** — done. Vercel auto-detects Next.js.

> **Important:** Vercel's serverless filesystem is read-only, so `data/rsvps.json` **will not persist** between deployments. Use one of the options below for persistent RSVPs on Vercel.

---

### Persistent RSVPs on Vercel — Vercel KV (free tier)

1. In Vercel dashboard → **Storage** → **Create KV Database** → connect to your project.
2. Vercel auto-injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars.
3. Install the Vercel KV SDK:
   ```bash
   npm install @vercel/kv
   ```
4. Replace `lib/rsvp-store.ts` with:
   ```typescript
   import { kv } from '@vercel/kv'
   import type { RsvpEntry } from './rsvp-store' // keep the interface

   export async function readRsvps(): Promise<RsvpEntry[]> {
     return (await kv.get<RsvpEntry[]>('rsvps')) ?? []
   }

   export async function appendRsvp(entry: RsvpEntry): Promise<void> {
     const list = await readRsvps()
     list.push(entry)
     await kv.set('rsvps', list)
   }

   export async function clearRsvps(): Promise<void> {
     await kv.set('rsvps', [])
   }
   ```
5. Make API route handlers `async` and `await` each store call. That's it.

---

### Option B — Self-host (VPS / Railway / Render)

Deploy as a regular Node.js app — the JSON file backend works perfectly:

```bash
npm run build
npm start        # runs on port 3000
```

Set `PORT` env var if needed. Use nginx / Caddy as a reverse proxy.

---

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `ADMIN_KEY` | `secret` | Key required to access `/admin` and the DELETE endpoint |

Create a `.env.local` file:
```
ADMIN_KEY=your_strong_secret_here
```

---

## Customise Content

All placeholder content lives in the component files:

| What | Where |
|---|---|
| Wedding date | `components/Countdown.tsx` — `WEDDING` constant |
| Venue & date text | `components/Details.tsx` — `CARDS` array |
| Couple names | `components/Hero.tsx` + `components/Footer.tsx` |
| RSVP deadline | `components/RsvpSection.tsx` |
| Map iframe | `components/Details.tsx` — replace the `src` URL |
| Admin key | `.env.local` → `ADMIN_KEY` |

---

## Project Structure

```
app/
  layout.tsx          Root layout (fonts, LangProvider)
  page.tsx            Main page
  admin/page.tsx      Admin dashboard (server component)
  api/rsvp/route.ts   RSVP REST API (GET / POST / DELETE)
  globals.css         Tailwind + animation keyframes

components/
  Hero.tsx            Full-bleed hero with countdown
  Countdown.tsx       Live countdown timer
  Details.tsx         Date, venue, map
  RsvpSection.tsx     RSVP form with server submission
  Footer.tsx          Thank-you footer
  AdminTable.tsx      Admin RSVP table (client)
  Divider.tsx         Ornamental SVG dividers
  Particles.tsx       Canvas floating stars/petals
  LangToggle.tsx      Fixed language toggle button
  Reveal.tsx          Scroll-reveal wrapper

lib/
  lang.tsx            Language context + useLang hook
  rsvp-store.ts       File-based RSVP storage (server-only)

data/
  rsvps.json          RSVP data store
```
