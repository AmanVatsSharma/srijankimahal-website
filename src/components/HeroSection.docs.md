# HeroSection Component

Purpose: render the homepage hero with a strong SEO heading hierarchy, high-LCP-priority image, and direct booking CTAs.

---

## Current structure

- Section ID: `#home`
- Min height strategy:
  - mobile: `min-h-[calc(100svh-4rem)]`
  - desktop: `md:min-h-screen`
- Background image:
  - `/sri-janaki-mahal/IMG-20251017-WA0022.jpg`
  - eager load + high fetch priority
  - dark gradient overlay for text legibility

---

## SEO heading hierarchy

- Primary heading (`h1`): `Sri Janaki Mahal Trust`
- Secondary heading (`h2`): `Book AC Non AC Rooms`
- Supporting copy includes local intent terms:
  - Ayodhya
  - Ram Mandir
  - official/verified booking messaging

---

## CTA block

Two primary conversion actions are presented in hero:

1. **Call CTA**
   - `href={TEL_LINK}`
   - conversion helper: `gtag_report_conversion(...)`
2. **WhatsApp CTA**
   - `href={WHATSAPP_LINK}`
   - `target="_blank" rel="noopener noreferrer"`
   - conversion helper enabled

All phone/WhatsApp values are sourced from centralized constants in `src/lib/constants.ts`.

---

## Flow chart

```text
Homepage render
  -> Hero section mounts
    -> LCP image preloaded + eager image request
      -> User reads H1/H2 + location/value proposition
        -> User clicks Call or WhatsApp CTA
          -> Conversion event callback fires
            -> User reaches official booking contact channel
```

---

## Maintenance checklist

When editing HeroSection:

1. Keep a single clear H1 for homepage intent.
2. Preserve high-priority loading for the hero image.
3. Keep CTA links tied to constants (avoid hardcoded numbers).
4. Rebuild (`npm run build`) and verify:
   - heading hierarchy remains valid
   - CTA links are correct
   - no visual clipping on mobile.


