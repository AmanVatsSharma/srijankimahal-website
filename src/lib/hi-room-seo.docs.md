# Hindi Room Pages SEO Notes

## Scope

Tracks SEO behavior for `src/pages/hi/rooms/[slug].astro`.

## Purpose

Hindi room detail pages now use **language-native metadata** instead of reusing English descriptions.

## Implemented behavior

- Per-slug Hindi metadata map provides:
  - localized title
  - localized heading
  - localized meta description
  - localized Hindi keyword additions
  - localized highlight bullet points
- Price label localization:
  - converts shared `per night (all meals included)` phrase to Hindi display copy.
- Safe fallback keeps page functional if a slug is missing in the Hindi map:
  - fallback to shared `roomsConfig` values
- Structured data parity:
  - emits Hindi room `Product` schema (`inLanguage: hi-IN`)
  - emits per-image `ImageObject` schema entries

## SEO impact

- Removes EN/HI duplicate meta description collisions for room pages.
- Improves matching for Hindi-language intent queries.
- Keeps content consistent with official booking entity signals.
- Keeps Hindi room pages eligible for richer product/image understanding.

## Flow chart

```text
Room slug requested
  -> load shared roomsConfig object
    -> lookup Hindi localization map
      -> if hit: use localized title/heading/description/keywords
      -> if miss: fallback to shared metadata
        -> render Layout meta + on-page hero copy
          -> render Product + ImageObject JSON-LD
          -> produce Hindi-specific SERP snippet
```

## Validation checklist

1. `npm run build`
2. Verify `/hi/rooms/*` output contains Hindi meta descriptions.
3. Run duplicate meta-description audit on `dist`.
4. Confirm H1 integrity still equals one `<h1>` per page.
