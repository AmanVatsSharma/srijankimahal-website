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
   - canonical link must include non-empty `href`
2. Canonical URL target resolves to generated output (same-origin only).
   - canonical target must match current generated route (self-canonical)
   - canonical URL must not include query string or fragment
3. Core metadata presence:
   - non-empty `<title>`
   - non-empty `<meta name="description">`
   - no duplicate title groups
   - no duplicate description groups
   - warning-only checks for recommended title/description length ranges (aggregated counts + sample pages)
   - description/robots/OG/Twitter extraction is attribute-order agnostic (`name|property` + `content`)
4. Social URL targets (`og:url`, `twitter:url`) resolve to generated output.
   - `og:url` must match canonical target
   - `twitter:url` must match canonical target
   - canonical/OG/Twitter URLs must stay on canonical site origin
   - `og:url` / `twitter:url` must not include query strings or fragments
5. Social image paths (`og:image`, `twitter:image`) exist in build output for same-origin assets.
6. Social meta completeness:
   - required OG/Twitter tags must exist exactly once and be non-empty
   - `twitter:card` must be `summary` or `summary_large_image`
   - social text parity (`og:title`, `twitter:title`, `og:description`, `twitter:description`) must match page title/description
   - meta-key/content extraction is attribute-order agnostic (`name|property` + `content`)
7. `og:locale:alternate` hygiene:
   - no duplicate alternates
   - alternate cannot match primary `og:locale`
   - alternate locales must match hreflang-derived locale set
8. Language consistency checks:
   - `<html lang>` matches route locale (`/hi/*` -> `hi`, else `en`)
   - `og:locale` matches page language (`en_IN` or `hi_IN`)
9. Page-level robots meta integrity:
   - exactly one `<meta name="robots">` tag per page
   - `noindex` pages must also include `nofollow,noarchive`
   - indexable pages must include `index,follow`
10. H1 count is exactly `1` per page.
11. JSON-LD payloads parse as valid JSON.
12. JSON-LD structure integrity:
   - at least one `@context` exists per JSON-LD script payload
   - schema nodes include valid `@type`
   - JSON-LD script extraction is attribute-order/quote-style agnostic for script `type`
13. No literal `{JSON.stringify(...)}` text leaked into output.
14. All `<img>` tags include:
   - `alt`
   - `width`
   - `height`
15. Internal local links resolve to generated output files.
16. Hreflang integrity:
   - each hreflang alternate link must include non-empty `hreflang` and `href`
   - no duplicate language entries
   - `x-default` exists when alternates are emitted
   - current page language hreflang must self-reference canonical page URL
   - `x-default` must align with English hreflang target when both are present
   - hreflang targets resolve to generated output
   - alternate pages include reciprocal hreflang links back
   - canonical/hreflang `<link>` extraction is attribute-order agnostic
17. Sitemap integrity:
   - `sitemap-index.xml` exists and references primary sitemap shard(s) + image sitemap
   - sitemap-index URLs are same-origin, unique, XML-only, and resolvable in build output
   - sitemap-index and primary sitemap URLs must not include query strings or fragments
   - sitemap duplicate detection is normalized by canonical comparable path (not raw string only)
   - all referenced primary sitemap shard URLs are resolvable in build output
   - primary sitemap shards do not include canonical URLs from pages marked `noindex`
   - all indexable canonical URLs are present across primary sitemap shards
   - sitemap excludes disallowed utility/docs URLs (`/404`, `.docs`)
18. Robots integrity:
   - `robots.txt` exists
   - no `Crawl-delay`
   - sitemap references are unique, same-origin, and resolve in build output
   - robots sitemap references must not include query strings or fragments
   - includes sitemap index + image sitemap references
19. Dist route hygiene check for `.docs` tokens.

> Note: explicit `/404` and `/hi/404` link targets are ignored as controlled exceptions for error-page UX.
> Note: image sitemap reference warning is only emitted when `image-sitemap.xml` is missing from **both** `sitemap-index.xml` and `robots.txt`.
> Note: title/description length checks are warnings (not failures) to allow editorial flexibility.

---

## NPM commands

```bash
npm run seo:audit
```

Strict audit (warnings fail run):

```bash
npm run seo:audit:strict
```

Combined build + audit:

```bash
npm run seo:verify
```

Combined build + strict audit:

```bash
npm run seo:verify:strict
```

Generate a JSON report file:

```bash
npm run seo:audit -- --report-file reports/seo-audit-report.json
```

Show CLI help:

```bash
node scripts/seo-integrity-audit.mjs --help
```

Fail on warnings (strict mode):

```bash
npm run seo:audit -- --strict-warnings
```

Use environment fallback for report file path:

```bash
SEO_AUDIT_REPORT_FILE=reports/seo-audit-report.json npm run seo:audit
```

Enable strict warning mode via environment:

```bash
SEO_AUDIT_STRICT_WARNINGS=true npm run seo:audit
```

Report payload fields:

- `status`: `passed` | `failed` | `error`
- `startedAt`, `finishedAt`, `elapsedMs`
- `metrics`: full numeric check counters
- `warnings`, `warningCount`
- `warningTypeCounts`: warning types grouped by count
- `failures`, `failureCount`
- `failureTypeCounts`: failure types grouped by count
- `distDir`, `siteOrigin`
- `options` (effective strict mode + metadata length recommendation ranges)

CI runs this via:

- `.github/workflows/seo-integrity.yml`
- uses workflow concurrency to avoid duplicate runs on same ref
- runs audit in strict warning mode (`--strict-warnings`)
- always uploads report artifact `seo-audit-report` (warns if missing)
- publishes key metrics into GitHub step summary for quick triage
- publishes top warning/failure types in step summary for faster root-cause isolation
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
  - social tag completeness + URL/image target checks + canonical parity
  - OG locale alternate checks
  - HTML lang + OG locale language checks
  - robots meta directive checks
  - h1 count
  - JSON-LD parse + structure checks
  - image attr checks
  - internal href target checks
  - hreflang integrity + reciprocity checks
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
Sitemap validation also enforces indexable canonical coverage in the primary sitemap.

---

## Error handling & logging behavior

- Structured console logs with `[seo-audit]` prefix.
- Defensive CLI parsing with warning logs for unknown/invalid flags.
- Optional JSON report output via `--report-file`.
- Report file path can also be provided through `SEO_AUDIT_REPORT_FILE`.
- Internal dist-target lookups are cached to keep large-site audits fast and deterministic.
- Audit exits non-zero on any failure.
- Reports concise samples to make debugging fast.
