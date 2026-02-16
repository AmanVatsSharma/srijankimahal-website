# Blog Listing Data Notes (`src/lib/blog.ts`)

This module powers blog index + pagination data for both English and Hindi routes.

---

## Responsibilities

- Discover markdown posts via `import.meta.glob()`
- Parse frontmatter and lightweight content stats
- Compute deterministic `readTime` fallback
- Sort entries by newest date first
- Return normalized `BlogListItem[]` for route rendering

---

## Locale-aware read-time behavior

`calculateReadTime(content, lang)` now localizes fallback/read-time labels:

- English: `X min read`
- Hindi: `X मिनट पढ़ें`

This keeps `/hi/blog` listings and pagination cards linguistically consistent.

---

## Data flow

```text
glob markdown imports
      |
      v
resolve frontmatter + raw content
      |
      v
strip YAML frontmatter from raw content
      |
      v
compute readTime fallback (language-aware)
      |
      v
shape BlogListItem + sort by date desc
      |
      v
return list to page routes
```

---

## Validation checklist

After editing this module:

1. `npm run build`
2. Verify on built pages:
   - `/blog` cards show `min read`
   - `/hi/blog` cards show `मिनट पढ़ें`
3. Confirm pagination pages (`/blog/page/*`, `/hi/blog/page/*`) retain localized read-time labels.
