# SEO Changes Log — 2026-02-24

This file records the on-site SEO + content changes made on **2026-02-24** to improve ranking for branded queries (Janki/Janaki/Shri/Sri/Shree variants) and reduce internal keyword cannibalization.

## Baseline + verification

- Strict SEO gate passing: `npm run seo:verify:strict`
- Baseline audit report: `reports/seo-audit-baseline-2026-02-24.json`

## Phase 1 — High-impact on-site fixes

- **Schema validity**
  - Fixed `ContactPoint.hoursAvailable` to use `OpeningHoursSpecification` (was an invalid string) in:
    - `src/layouts/Layout.astro`
    - `src/pages/contact-number.astro`
    - `src/pages/hi/contact-number.astro`
- **Local SEO entity linking**
  - Added Google Maps/GBP listing URL to `Organization.sameAs` in `src/layouts/Layout.astro`
  - Added room offers (`makesOffer`) to the global `LodgingBusiness` graph in `src/layouts/Layout.astro`
  - Linked room `Product` schema back to the main entities using `@id` in:
    - `src/pages/rooms/[slug].astro`
    - `src/pages/hi/rooms/[slug].astro`
- **WhatsApp link correctness**
  - Removed `wa.me/+91...` patterns and standardized on `WHATSAPP_LINK`:
    - `src/pages/contact-number.astro`
    - `src/pages/hi/contact-number.astro`
    - `src/pages/rooms/[slug].astro`
- **Homepage extraction/UX quality**
  - Room modal markup is now injected only when opened (prevents crawler-visible placeholder text like “₹0”): `src/components/RoomsSection.astro`
  - Added real room-page links to room cards in `src/components/RoomsSection.astro`
- **404 hygiene**
  - Removed canonical from `src/pages/404.astro` (kept `noindex`)
- **Copy fix**
  - Fixed “Stayy” typo in `src/components/HeroSection.astro`

## Phase 2 — Reduce blog cannibalization (redirect + prune)

- Removed high-overlap duplicate-intent blog posts in booking/contact/location clusters (21 files) under `src/content/blog/`
- Added permanent redirects (301) from removed blog URLs to primary pages in `vercel.json`
- Fixed one internal link in `src/content/blog/ayodhya-meti-ghat-to-janaki-mahal-walking-route.md` to point to `/location/karsewakpuram`

## Phase 3 — Keyword expansion pillars + controlled clusters

- **New pillar landing pages (EN + HI)**
  - Added new high-intent pages:
    - `src/pages/room-prices.astro` and `src/pages/hi/room-prices.astro`
    - `src/pages/amenities.astro` and `src/pages/hi/amenities.astro`
    - `src/pages/group-booking.astro` and `src/pages/hi/group-booking.astro`
    - `src/pages/gallery.astro` and `src/pages/hi/gallery.astro`
    - `src/pages/reviews.astro` and `src/pages/hi/reviews.astro` (compliance-first; links to Google Maps listing)
- **Navigation + internal linking upgrades**
  - Added pillar links into:
    - `src/components/Header.astro` (desktop “More” menu + mobile links)
    - `src/components/Footer.astro` (quick links)
  - Strengthened contextual links to pillars in:
    - `src/components/RoomsSection.astro`
    - `src/pages/rooms/index.astro` and `src/pages/hi/rooms/index.astro`
    - `src/pages/rooms/[slug].astro` and `src/pages/hi/rooms/[slug].astro`
    - `src/pages/blog/[slug].astro` and `src/pages/hi/blog/[slug].astro`
- **Content consolidation for new pillars (anti-cannibalization)**
  - Removed duplicate-intent blog posts (prices/amenities/group/reviews) and added 301 redirects to pillars in `vercel.json`.
  - Updated internal links in remaining posts to point to the pillar URLs (not removed blog URLs).
- **Off-page + measurement ops**
  - Added owner-facing templates:
    - `docs/GBP_POST_TEMPLATES.md`
    - `docs/citation-tracker-template.csv`
    - `docs/backlink-outreach-tracker-template.csv`
    - `docs/GSC_WEEKLY_REVIEW_PLAYBOOK.md`
    - `docs/gsc-weekly-tracker-template.csv`
  - Added cluster governance: `docs/CONTENT_CLUSTERS_V2.md`

## Current integrity signals

- Post-change strict SEO audit: passing (404 HTML pages, 0 failures)

