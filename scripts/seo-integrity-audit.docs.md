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
3. Core metadata presence:
   - non-empty `<title>`
   - non-empty `<meta name="description">`
   - no duplicate title groups
   - no duplicate description groups
4. Social URL targets (`og:url`, `twitter:url`) resolve to generated output.
   - `og:url` must match canonical target
   - `twitter:url` must match canonical target
5. Social image paths (`og:image`, `twitter:image`) exist in build output for same-origin assets.
6. `og:locale:alternate` hygiene:
   - no duplicate alternates
   - alternate cannot match primary `og:locale`
7. Language consistency checks:
   - `<html lang>` matches route locale (`/hi/*` -> `hi`, else `en`)
   - `og:locale` matches page language (`en_IN` or `hi_IN`)
8. H1 count is exactly `1` per page.
9. JSON-LD payloads parse as valid JSON.
10. No literal `{JSON.stringify(...)}` text leaked into output.
11. All `<img>` tags include:
   - `alt`
   - `width`
   - `height`
12. Internal local links resolve to generated output files.
13. Hreflang integrity:
   - no duplicate language entries
   - `x-default` exists when alternates are emitted
   - hreflang targets resolve to generated output
14. Sitemap integrity:
   - `sitemap-index.xml` exists and references main + image sitemap
   - `sitemap-0.xml` URLs are same-origin, unique, and resolvable in build output
   - `sitemap-0.xml` does not include canonical URLs from pages marked `noindex`
   - sitemap excludes disallowed utility/docs URLs (`/404`, `.docs`)
15. Robots integrity:
   - `robots.txt` exists
   - no `Crawl-delay`
   - includes sitemap index + image sitemap references
16. Dist route hygiene check for `.docs` tokens.

> Note: explicit `/404` and `/hi/404` link targets are ignored as controlled exceptions for error-page UX.
> Note: missing image sitemap reference in `sitemap-index.xml` is reported as a warning (not failure) because some setups expose image sitemap via `robots.txt` only.

---

## NPM commands

```bash
npm run seo:audit
```

Combined build + audit:

```bash
npm run seo:verify
```

Generate a JSON report file:

```bash
npm run seo:audit -- --report-file reports/seo-audit-report.json
```

Show CLI help:

```bash
node scripts/seo-integrity-audit.mjs --help
```

Use environment fallback for report file path:

```bash
SEO_AUDIT_REPORT_FILE=reports/seo-audit-report.json npm run seo:audit
```

Report payload fields:

- `status`: `passed` | `failed` | `error`
- `startedAt`, `finishedAt`, `elapsedMs`
- `metrics`: full numeric check counters
- `warnings`, `warningCount`
- `failures`, `failureCount`
- `distDir`, `siteOrigin`

CI runs this via:

- `.github/workflows/seo-integrity.yml`
- uses workflow concurrency to avoid duplicate runs on same ref
- always uploads report artifact `seo-audit-report` (warns if missing)
- publishes key metrics into GitHub step summary for quick triage
- marks workflow failed after upload when audit exit code is non-zero

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
  - title/description presence + duplicate tracking
  - social URL/image target checks + canonical parity
  - OG locale alternate checks
  - HTML lang + OG locale language checks
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

Then validate sitemap and robots artifacts before final pass/fail decision.

---

## Error handling & logging behavior

- Structured console logs with `[seo-audit]` prefix.
- Defensive CLI parsing with warning logs for unknown/invalid flags.
- Optional JSON report output via `--report-file`.
- Report file path can also be provided through `SEO_AUDIT_REPORT_FILE`.
- Audit exits non-zero on any failure.
- Reports concise samples to make debugging fast.
