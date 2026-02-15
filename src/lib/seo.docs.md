# SEO Utility Module (`src/lib/seo.ts`)

This document reflects the **current** behavior of the shared SEO utility after the latest technical SEO hardening.

---

## What this module owns

- Canonical URL generation
- Title generation with brand suffix de-duplication
- OpenGraph and Twitter meta object generation
- Robots directive generation (snippet preview aware)
- Hreflang generation (default pair mode + explicit mode)
- Final merged SEO payload consumed by `Layout.astro`

---

## Canonical URL normalization (critical fix)

`generateCanonical(path)` now supports both:
- relative paths (`/blog/page/3`)
- absolute URLs (`https://.../blog/page/3`)

### Guardrails
- trims whitespace
- strips trailing slash (except origin behavior)
- strips query/hash from relative canonical inputs
- safely parses absolute URLs with `URL`
- falls back to site origin on malformed absolute input

### Why this matters
Previously, some pages emitted malformed social URLs such as:

`https://domain.comhttps://domain.com/page`

This module now prevents double-prefix canonicalization.

---

## Title suffix de-duplication (language-aware)

`generateTitle(title, lang)` now appends a localized site suffix only when needed.

### Behavior
- If incoming title already contains the brand alias for the current page language, keep it as-is.
- Otherwise append localized suffix based on page language:
  - `en` → `Sri Janaki Mahal Trust`
  - `hi` → `श्री जानकी महल ट्रस्ट`

### Why this matters
- Prevents repeated SERP titles like:
  - `... | Sri Janaki Mahal Trust | Sri Janaki Mahal Trust`
- Improves title readability and keeps Hindi SERP snippets language-consistent.

---

## Hreflang modes

### 1) Default pair mode (legacy-safe, automatic)
When `disableDefaultHreflangPair` is not set:
- emits `x-default` + `en` + `hi`
- uses route-based EN/HI path mapping

### 2) Explicit alternate mode (new, strict)
When `disableDefaultHreflangPair = true`:
- relies on page-provided `alternateLanguages`
- adds current page language tag if missing
- adds `x-default` (prefers `en` alternate, else current page URL)

This mode is used on blog routes where translated counterparts may not exist for every slug/page.

---

## Robots directive policy

`generateRobotsContent(noindex)` now emits:

- For indexable pages:  
  `index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1`

- For non-indexable pages:  
  `noindex,nofollow,noarchive`

This keeps private/utility routes strict while enabling richer previews on primary landing pages.

---

## Data flow chart

```text
Page passes SEO props
   |
   v
generateSEOData(config, currentPath)
   |
   +--> generateCanonical()
   +--> generateTitle()
   +--> generateDescription()
   +--> generateKeywords()
   +--> generateRobotsContent()
   +--> generateOGTags()
   +--> generateTwitterTags()
   +--> generateHreflangTags()
   |
   v
Layout.astro renders final meta/link tags
```

---

## Debug logging policy

All helper debug logs are routed through `debugLog(...)`, which is DEV-only:
- safe for local diagnostics
- no noisy production console output

---

## Update checklist (when editing this module)

1. Build with `npm run build`
2. Inspect generated HTML for:
   - valid canonical URL
   - valid `og:url` and `twitter:url`
   - expected hreflang tags
3. Ensure no unresolved constants remain in rendered output.

