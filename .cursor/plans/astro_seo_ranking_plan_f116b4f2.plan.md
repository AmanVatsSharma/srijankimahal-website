---
name: Astro SEO ranking plan
overview: "Improve on-site technical SEO + schema validity, reduce blog cannibalization, and strengthen local/brand authority via GBP + citations/backlinks so `srijanakimahaltrustofficial.com` becomes the #1 result for the “Janki/Janaki/Shri/Shree …” branded booking/contact keywords."
todos:
  - id: baseline-audit
    content: "Establish baseline: review GSC coverage/query performance; run local build + SEO integrity audit to confirm technical status before changes."
    status: completed
  - id: fix-on-site-seo-bugs
    content: "Implement Phase 1 fixes: schema hoursAvailable validity, add GBP sameAs, fix Hero typo, fix WhatsApp link formatting, hide modal placeholder content, 404 canonical cleanup."
    status: completed
  - id: reduce-blog-cannibalization
    content: Consolidate/prune duplicate-intent blog posts in booking/contact/location clusters; strengthen internal linking to the primary landing pages.
    status: completed
  - id: local-authority-plan
    content: "Execute Phase 3 off-site: GBP optimization, citation cleanup for correct phone/website, backlink outreach, and impersonation reports."
    status: completed
  - id: measure-iterate
    content: "Post-change: re-run SEO audit, monitor GSC for ranking movement, iterate titles/content/internal links based on query performance."
    status: completed
isProject: false
---

# Goal: Rank #1 for Janki/Janaki branded keywords

## Current assessment (score out of 100)

- **Overall SEO score (today)**: **68/100**
  - **Technical/on-page**: ~**90/100** (canonical + hreflang + sitemap + robots + OG/Twitter + JSON‑LD are already strong)
  - **Content quality**: ~**55/100** (312 blogs with many near-duplicates → cannibalization risk)
  - **Authority/local trust**: ~**45/100** (SERPs show other domains/numbers competing; strongest wins come from GBP + citation cleanup + backlinks)
  - **Performance/CWV**: ~**78/100** (static + caching is good, but fonts/third‑party/scripts + map iframe can be improved)

## Keyword → target page mapping (what should rank)

- **"janki mahal ayodhya room booking" + “Sri Janaki Mahal booking” variants** → `[src/pages/booking.astro](src/pages/booking.astro)` and `[src/pages/official-booking.astro](src/pages/official-booking.astro)`
- **"… contact number" variants** → `[src/pages/contact-number.astro](src/pages/contact-number.astro)`
- **"Janki/Janaki Mahal Ayodhya" + trust name variants** → `[src/pages/index.astro](src/pages/index.astro)` + `[src/pages/official.astro](src/pages/official.astro)` + `[src/pages/about.astro](src/pages/about.astro)`
- **"rooms / prices" intent** → `[src/pages/rooms/index.astro](src/pages/rooms/index.astro)` + `[src/pages/rooms/[slug].astro](src/pages/rooms/[slug].astro)`

## Phase 1 — Fix high-impact on-site issues (1–2 days)

- **Typos/quality**
  - Fix “Book Your Stayy” typo in `[src/components/HeroSection.astro](src/components/HeroSection.astro)`.
- **WhatsApp link correctness**
  - Standardize all WhatsApp CTAs to `WHATSAPP_LINK` / `WHATSAPP_BOOKING_LINK` from `[src/lib/constants.ts](src/lib/constants.ts)` (avoid `https://wa.me/+91…` patterns currently used on contact pages).
- **Remove “₹0 / modal text” from crawler-visible extraction**
  - Update the room modal in `[src/components/RoomsSection.astro](src/components/RoomsSection.astro)` to be `hidden` by default and only inserted/shown when opened (prevents hidden placeholder text like `₹0` from appearing in content extraction and improves accessibility).
- **Structured data validity (local SEO)**
  - Fix `ContactPoint.hoursAvailable` to use `OpeningHoursSpecification` (currently string) in:
    - `[src/layouts/Layout.astro](src/layouts/Layout.astro)`
    - `[src/pages/contact-number.astro](src/pages/contact-number.astro)`
    - `[src/pages/hi/contact-number.astro](src/pages/hi/contact-number.astro)`
  - Add **Google Business Profile URL** (and any official social profiles) into `Organization.sameAs` in `[src/layouts/Layout.astro](src/layouts/Layout.astro)`.
  - Add `offers` to the global `LodgingBusiness` graph (linking to your real `/rooms/`* pages) in `[src/layouts/Layout.astro](src/layouts/Layout.astro)`.
  - Link room `Product` schema back to the main entity via `@id` in `[src/pages/rooms/[slug].astro](src/pages/rooms/[slug].astro)` (and Hindi equivalent).
- **404 hygiene**
  - Remove canonical from `[src/pages/404.astro](src/pages/404.astro)` and keep `noindex`.

## Phase 2 — Stop blog cannibalization (3–7 days)

Because this repo enforces **self-canonical per route** (see `[scripts/seo-integrity-audit.mjs](scripts/seo-integrity-audit.mjs)`), we should **not** canonicalize duplicate blogs to “money pages”. Instead:

- **Pick one URL per intent** (booking/contact/location/name/pricing).
- **Merge the best content** into those chosen pages.
- **Remove or redirect** near-duplicate markdown posts so they don’t compete in SERPs.

Initial consolidation targets (highest risk clusters):

- **Contact number cluster**: keep `/contact-number` as primary; prune duplicate “official number” blogs under `[src/content/blog/](src/content/blog/)`.
- **Booking process cluster**: keep `/booking` + `/official-booking` as primary; prune duplicate “how to book” blogs.
- **Location cluster**: keep `/location/`* pages as primary; prune near-duplicate address/directions blogs.

Implementation approach:

- Build a short “duplicate intent list” of slugs under `[src/content/blog/](src/content/blog/)` and remove/redirect them.
- Strengthen internal linking from remaining blogs to primary pages (already partially done via “Verified Booking Links” on blog detail pages).

## Phase 3 — Brand authority + local SEO (highest ROI; ongoing)

You confirmed other domains are not yours and you have **GSC + GBP access**, so do this aggressively:

- **Google Business Profile**
  - Ensure website = `https://www.srijanakimahaltrustofficial.com/` and primary phone matches the site.
  - Weekly GBP posts linking to `/booking`, `/official-booking`, `/contact-number`.
  - Upload real photos regularly; reply to every review.
- **Citation cleanup (NAP)**
  - Find top listings ranking for your keywords (Justdial/Mappls/travel directories/blogs) and correct: **phone + website + address**.
  - This directly fixes the “wrong number outranks you” problem.
- **Backlinks (entity authority)**
  - Acquire 10–30 high-quality local/travel/temple backlinks pointing to the official domain (prefer to `/official` and `/contact-number` too).
- **Impersonation defense**
  - File Google spam/phishing/impersonation reports for domains using your name + wrong phone.

## Phase 4 — Measurement + guardrails

- Run and keep passing: `npm run seo:verify:strict` (build + audit).
- In Search Console:
  - Monitor **Queries** for your target keywords → confirm the right target pages win.
  - Monitor **Pages**: impressions/clicks for `/booking`, `/contact-number`, `/official`.
  - Watch **Enhancements** (structured data) for errors after schema fixes.

## Visualization (high-level)

```mermaid
flowchart TD
  brandedQuery[BrandedQueries] --> homePage[Home_/]
  brandedQuery --> bookingPage[/booking]
  brandedQuery --> contactPage[/contact-number]
  brandedQuery --> officialPage[/official]

  blogPosts[ManyBlogPosts] -->|InternalLinks| bookingPage
  blogPosts -->|InternalLinks| contactPage
  blogPosts -->|InternalLinks| officialPage

  gbp[GoogleBusinessProfile] -->|Website+Posts| homePage
  gbp -->|Calls| contactPage

  citations[CitationsDirectories] -->|CorrectNAP| homePage
  citations -->|CorrectNAP| contactPage
```



