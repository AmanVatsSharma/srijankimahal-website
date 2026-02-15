# Navigation SEO Notes (`Header.astro`, `Footer.astro`, `LanguageSwitcher.astro`)

This document consolidates behavior for navigation components that influence crawl paths, internal linking quality, and multilingual UX.

---

## 1) Header (`Header.astro`)

### Current behavior
- Logo link is language-aware (`/` or `/hi`)
- Brand text uses `<p>` (not `<h1>`) to avoid adding extra H1s on every page
- Main nav links remain stable and crawlable
- Navigation labels and CTA text are locale-specific (English vs Hindi)
- Mobile menu toggles safely with close-on-outside-click

### SEO rationale
- Preventing repeated H1s from global chrome reduces heading-noise across pages.
- Language-aware logo/home links keep users and bots in the correct locale context.

---

## 2) Footer (`Footer.astro`)

### Current behavior
- Uses locale-aware route helper for key links:
  - home, about, rooms, blog
  - official verification/booking
  - privacy, terms, cancellation
- Footer labels/badges/contact copy are translated per locale to keep `/hi/*` pages fully Hindi-facing
- Home section anchor links are prefixed with localized home URL (`/` or `/hi`)

### SEO rationale
- Avoids dead hash-only links on non-home routes.
- Improves internal-link consistency and crawl discoverability for localized pages.

---

## 3) Language switcher (`LanguageSwitcher.astro`)

### Current behavior
- Determines current language from path
- Computes target language and default counterpart path
- Includes blog counterpart safeguards:
  - blog post slug existence check (EN/HI content maps)
  - pagination range check using known page counts
  - fallback to target language blog index (or nearest valid page)

### Flow chart

```text
User on current page
   |
   v
Detect current lang + next lang
   |
   v
Compute default switched path
   |
   +--> If blog post route:
   |       check target slug exists
   |       if missing -> fallback to target /blog
   |
   +--> If blog pagination route:
   |       check page number <= target total pages
   |       if missing -> fallback to target max page or /blog
   |
   v
Render safe switch link
```

---

## Validation checklist

After changes to nav components:

1. `npm run build`
2. Verify on generated HTML:
   - language switch links do not point to known-missing blog pages
   - footer links are localized correctly on `/hi/*`
   - header brand is no longer rendered as H1

