# SEO Integrity Audit Script (`scripts/seo-integrity-audit.mjs`)

This script performs post-build checks on generated static HTML under `dist/`.

---

## Why this exists

SEO regressions can silently slip into generated output even when page components look correct.

Examples:

- malformed JSON-LD in final HTML
- missing canonical tags
- multiple or missing H1 tags
- broken internal links
- missing image accessibility/performance attributes
- accidental docs-like route leakage

This audit catches those issues deterministically before deployment.

---

## Checks performed

1. Canonical tag count is exactly `1` per page.
2. Canonical URL target resolves to generated output (same-origin only).
2. H1 count is exactly `1` per page.
3. JSON-LD payloads parse as valid JSON.
4. No literal `{JSON.stringify(...)}` text leaked into output.
5. All `<img>` tags include:
   - `alt`
   - `width`
   - `height`
6. Internal local links resolve to generated output files.
7. Hreflang integrity:
   - no duplicate language entries
   - `x-default` exists when alternates are emitted
   - hreflang targets resolve to generated output
8. Duplicate meta-description groups are rejected.
9. Dist route hygiene check for `.docs` tokens.

> Note: explicit `/404` and `/hi/404` link targets are ignored as controlled exceptions for error-page UX.

---

## NPM commands

```bash
npm run seo:audit
```

Combined build + audit:

```bash
npm run seo:verify
```

---

## Flow chart

```text
Start audit
   |
   v
Validate dist exists
   |
   v
Collect all .html files
   |
   v
For each page:
  - canonical count
  - canonical target existence
  - h1 count
  - JSON-LD parse
  - image attr checks
  - internal href target checks
  - hreflang integrity checks
  - docs-route token check
   |
   v
Aggregate metrics + duplicate-description groups + failures
   |
   +--> failures > 0 ? exit 1
   |
   +--> else pass (exit 0)
```

---

## Error handling & logging behavior

- Structured console logs with `[seo-audit]` prefix.
- Audit exits non-zero on any failure.
- Reports concise samples to make debugging fast.
