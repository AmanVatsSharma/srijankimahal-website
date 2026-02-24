## GSC Weekly Review Playbook (targets + iteration loop)

Goal: ensure Google is showing the **right page for the right intent** (avoid cannibalization) and continuously improve CTR + ranking using small, safe on-page edits (titles, descriptions, FAQs, internal links).

### Target pages to track (weekly)

Track these pages separately (EN + HI):

- Trust / conversion:
  - `/official-booking`, `/booking`, `/contact-number`
- New pillar pages:
  - `/room-prices`, `/amenities`, `/group-booking`, `/gallery`, `/reviews`
- Rooms:
  - `/rooms` and top room detail pages (2-bed, 3-bed, 4-bed, deluxe, family suite)
- Location:
  - `/location/near-ram-mandir`, `/location/karsewakpuram`, `/location/from-ayodhya-junction`

### Weekly workflow (15–30 minutes)

1) **Performance → Search results**
   - Date range: last 7 days vs previous 7 days
   - Check trends: impressions, clicks, CTR, avg position
   - **Device split**: Desktop vs Mobile (compare the same page/query clusters)

2) **Page filter (one page at a time)**
   - Start with: `/official-booking`, `/booking`, `/contact-number`
   - Then: `/room-prices`, `/amenities`, `/group-booking`

3) **Query review (per page)**
   - Confirm the top queries match page intent.
   - Red flags:
     - “contact number” queries showing on the wrong page (should be `/contact-number`)
     - “room prices / tariff” queries showing on random blog posts (should be `/room-prices`)
     - “amenities / meals included” queries showing on room detail pages (should be `/amenities`)

4) **Action decision (pick 1–2 small edits/week)**
   - Title tuning (keep brand + intent, avoid stuffing)
   - Meta description tuning (add a clarity line + official number mention if relevant)
   - Add/adjust 3–6 FAQ items on the relevant pillar page (avoid duplicating contact/booking/address FAQs across many pages)
   - Add 2–4 contextual internal links from high-traffic pages to the pillar (header/footer already linked; add within content when relevant)

5) **Validate + deploy**
   - Run `npm run seo:verify:strict`
   - Deploy only when strict audit passes

### Device split interpretation (what to look for)

- If **Desktop improves but Mobile is stuck**, the most common causes are:
  - mobile CWV (LCP/CLS/INP) worse than desktop
  - intrusive mobile UI covering content
  - heavy scripts/fonts competing with hero LCP resources on mobile networks
  - titles/snippets not matching mobile intent (users want “official number / verified booking” fast)

### What “good” looks like (2–6 weeks after deploy)

- Impressions shift from duplicate/older blog URLs → the intended pillar pages.
- CTR improves on branded queries (official booking/contact).
- Non-branded “near Ram Mandir / dharmshala with meals / group booking” queries start appearing on the correct pillars.

### Notes (avoid self-inflicted issues)

- Don’t create new pages for every query. Prefer improving the correct existing pillar.
- Don’t publish numeric rating claims on-site unless verifiable and compliant.
- Avoid editing many titles at once; change 1–2 pages/week and measure.

