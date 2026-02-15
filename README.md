# Sri Janaki Mahal Trust Website

Production Astro website for Sri Janaki Mahal Trust with multilingual pages (EN/HI), booking flows, and SEO-first architecture.

---

## Core Commands

All commands are run from the repository root.

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start local Astro development server |
| `npm run build` | Build static site into `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run seo:audit` | Run SEO integrity audit against existing `dist/` output |
| `npm run seo:audit:strict` | Run SEO integrity audit and fail on warnings |
| `npm run seo:audit -- --report-file reports/seo-audit-report.json` | Run SEO audit and write JSON report artifact |
| `npm run seo:audit -- --strict-warnings` | Run SEO audit and fail if warnings are present |
| `SEO_AUDIT_REPORT_FILE=reports/seo-audit-report.json npm run seo:audit` | Run SEO audit with report-file path from environment |
| `SEO_AUDIT_STRICT_WARNINGS=true npm run seo:audit` | Run SEO audit in strict warning mode via environment |
| `npm run seo:verify` | Build site and run full SEO integrity audit |
| `npm run seo:verify:strict` | Build site and run strict SEO integrity audit |

---

## SEO Integrity Automation

- Audit script: `scripts/seo-integrity-audit.mjs`
- Audit docs: `scripts/seo-integrity-audit.docs.md`
- CI workflow: `.github/workflows/seo-integrity.yml`

The audit validates canonical tags (including non-empty href, self-canonical route alignment, same-origin enforcement, and query/fragment rejection), social/canonical URL parity (including same-origin enforcement and query/fragment rejection), social meta completeness (including social title/description parity with HTML-entity normalization), hreflang integrity (including valid entry shape + valid hreflang value syntax + self-reference + reciprocal alternates), OG locale alignment with hreflang, page-level robots meta semantics, JSON-LD validity + schema-structure integrity, heading semantics, image metadata, internal links, sitemap-index/robots reference hygiene (including query/fragment checks), indexable-canonical sitemap coverage across sitemap shards, and duplicate meta-description regressions. CI also uploads the generated JSON audit report for every run.
It also emits aggregated warning-level signals for out-of-range title/description lengths so content can be tuned without forcing hard build failures.
Dist-target resolution in the audit is cached to keep runtime stable as URL and content volume grows.
CI executes the audit in strict warning mode, so any warning becomes a failing signal after report artifact upload.
The workflow is configured to upload the report artifact first and then fail the job when the audit exit code is non-zero, so debugging data is always preserved.
The CI run also publishes a compact SEO metrics summary plus top warning/failure issue types in the workflow step summary to speed up regression triage.
