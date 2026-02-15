# Blog Detail SEO Notes (`/blog/[slug]`, `/hi/blog/[slug]`)

This document covers SEO behavior shared by blog detail pages in English and Hindi routes.

---

## 1) Route-level SEO responsibilities

Each blog detail page is responsible for:

- language-correct canonical URL
- language-correct hreflang alternates (only when translated counterpart exists)
- article-specific structured data (`Article`)
- breadcrumb structured data (`BreadcrumbList`)
- social meta support through layout (`og:type=article`)

---

## 2) Reading metadata enrichment

During `getStaticPaths()` generation:

- markdown content is loaded and analyzed
- reading stats are derived:
  - `readTime`
  - `wordCount`
- frontmatter may override defaults if explicit values are provided

This provides stable article metadata for both on-page UI and schema payloads.

---

## 3) Article schema enrichment (EN + HI)

Both routes emit `Article` schema with:

- `headline`, `description`, `datePublished`, `dateModified`
- `mainEntityOfPage`
- `author` and `publisher`
- `image`
- `inLanguage`
- `articleSection`
- `keywords`
- `wordCount`

Language values:

- EN route: `inLanguage = en-IN`
- HI route: `inLanguage = hi-IN`

---

## 4) Hindi copy-localization guarantees

Hindi blog detail route localizes non-content chrome labels:

- breadcrumb labels
- verified links heading
- related articles heading
- read-more label
- read-time fallback text

This avoids mixed-language UI wrappers on `/hi/blog/*`.

---

## 5) Flow chart

```text
Load markdown entry for slug
        |
        v
Extract/compute readTime + wordCount
        |
        v
Build page SEO inputs (title/description/keywords/canonical)
        |
        +--> Detect translated counterpart?
        |       |
        |       +--> yes: emit en/hi hreflang pair
        |       +--> no: emit only current-language hreflang
        |
        v
Render page + inject:
  - BreadcrumbList JSON-LD
  - Article JSON-LD (language-aware)
```

---

## Validation checklist

After blog detail SEO edits:

1. `npm run build`
2. Verify in built HTML:
   - each blog detail page has `Article` schema
   - `Article` includes `inLanguage`, `keywords`, `wordCount`
   - Hindi pages do not show English wrapper labels (e.g., "Related Articles", "5 min read")
3. Confirm hreflang alternates only point to existing translated pages.
