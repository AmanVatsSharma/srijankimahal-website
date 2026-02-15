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
| `npm run seo:audit -- --report-file reports/seo-audit-report.json` | Run SEO audit and write JSON report artifact |
| `SEO_AUDIT_REPORT_FILE=reports/seo-audit-report.json npm run seo:audit` | Run SEO audit with report-file path from environment |
| `npm run seo:verify` | Build site and run full SEO integrity audit |

---

## SEO Integrity Automation

- Audit script: `scripts/seo-integrity-audit.mjs`
- Audit docs: `scripts/seo-integrity-audit.docs.md`
- CI workflow: `.github/workflows/seo-integrity.yml`

The audit validates canonical tags, hreflang integrity, JSON-LD validity, heading semantics, image metadata, internal links, and duplicate meta-description regressions. CI also uploads the generated JSON audit report for every run.
