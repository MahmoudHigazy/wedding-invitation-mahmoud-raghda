# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (auto-picks port if 3000 is taken)
npm run build    # TypeScript check + production build (run before pushing)
npm run lint     # ESLint
```

Always run `npm run build` locally before pushing — Vercel deploys on every push to `main` and a TypeScript error will break production.

## Deployment

- **Auto-deploy**: every push to `main` triggers a Vercel production deployment
- **Manual deploy**: `npx vercel --prod --yes`
- **Env vars**: stored in Vercel dashboard. Pull with `npx vercel env pull` (only brings `development` vars). `ADMIN_KEY` is production-only (value: `kukus`). KV vars are production + preview only.
- **Admin dashboard**: `/admin?key=kukus`

## Architecture

Next.js 14 App Router. All pages and API routes live in `app/`, all UI in `components/`, shared logic in `lib/`.

### Bilingual system (`lib/lang.tsx`)

The entire site is EN/AR. Key pieces:
- `LangProvider` wraps the app in `app/layout.tsx` — stores lang in `localStorage`, exposes `ready` (false until language chosen)
- `useLang()` returns `{ lang, setLang, toggle, ready }`
- `tx(lang, 'English', 'عربي')` — inline string switcher (strings only, not JSX)
- For JSX: use `{lang === 'en' ? <en/> : <ar/>}` directly
- `ready === false` → `SplashScreen` is shown instead of page content (see `app/page.tsx`)
- `document.dir` / `document.lang` are set reactively in `LangProvider`

**Arabic letter-spacing**: `[dir="rtl"] * { letter-spacing: 0 !important }` in `globals.css` fixes Arabic character joining globally. The splash screen renders before `dir="rtl"` is set, so Arabic text there needs explicit `style={{ letterSpacing: 0 }}`.

### Font routing

Two fonts loaded in `app/layout.tsx`: Cormorant Garamond (`--font-cormorant`) and Amiri (`--font-amiri`).

CSS in `globals.css` routes them via CSS variables:
- LTR: `--font-heading` and `--font-body` → Cormorant
- RTL (`[dir="rtl"]`): both → Amiri

Tailwind classes `font-heading` and `font-body` consume these variables.

### Color palette (Tailwind)

Warm ivory & gold theme — all custom, no Tailwind defaults used for brand colors:
- `parchment` / `parchment-mid` / `parchment-dark` — backgrounds
- `walnut` / `walnut-light` / `walnut-muted` — text
- `gold` / `gold-light` / `gold-shimmer` — accents
- `rose` — error states and bride-side badges

### RSVP storage (`lib/rsvp-store.ts`)

Uses `@vercel/kv` (Upstash Redis wrapper). All RSVPs stored as a single JSON array under the key `'rsvps'`. The `readRsvps()` function backfills `side: 'groom'` for old entries that predate the bride/groom field.

`RsvpEntry` shape: `{ id, name, side: 'bride'|'groom', attendance: 'solo'|'family', partySize, at }`

Both `/app/api/rsvp/route.ts` and `/app/admin/page.tsx` have `export const dynamic = 'force-dynamic'` to prevent Next.js caching stale data.

### Scroll reveal

`components/Reveal.tsx` uses `IntersectionObserver` to add `.visible` to elements with `.reveal`. Styles in `globals.css`. Hero section uses staggered `.h-a1`–`.h-a6` CSS animation classes instead.

### Particles

`components/Particles.tsx` — CSS keyframe animation (`particleFall` in `globals.css`), not canvas. Generated client-side only via `useEffect` to avoid hydration mismatch. Using CSS (not `requestAnimationFrame`) so animation continues during mobile scroll.

### Section z-index layering

- `z-20` — all content sections (Hero, Details, RsvpSection, Footer)
- `z-30` — Particles (floats above sections)
- `z-50` — SplashScreen
