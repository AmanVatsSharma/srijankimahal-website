# Mobile SEO Diagnosis (Google Search Console)

This guide helps you quickly identify **why mobile rankings/visibility lag** even when desktop SEO looks strong.

> Key idea: Google uses **mobile-first indexing**. If Mobile Core Web Vitals / usability / rendering is weaker, mobile rankings often drop first.

---

## 1) Performance report (Mobile vs Desktop)

In **Google Search Console → Performance → Search results**:

1. Set **Date**: last **28 days** (also check last **7 days** for recent changes).
2. Add filter **Device → Mobile**.
3. Note the top:
   - **Queries** losing on mobile (low clicks / low position)
   - **Pages** losing on mobile
4. Repeat for **Device → Desktop**.
5. Compare Mobile vs Desktop:
   - **Clicks/Impressions gap**: Mobile impressions high but clicks low → usually SERP layout/CTR or snippet issues.\n+   - **Position gap**: Mobile avg position worse → often performance/UX or local-pack competition.

**Export** both views (Mobile + Desktop) so you can track improvements after fixes.

---

## 2) Core Web Vitals (mobile-first ranking signal)

In **Experience → Core Web Vitals**:

- Check Mobile groups for **Poor** / **Need improvement**.
- Identify which metric is driving the issue:
  - **LCP** (Largest Contentful Paint): usually heavy hero image / render-blocking CSS
  - **INP** (Interaction to Next Paint): usually too much JavaScript / long-running loops
  - **CLS** (Layout shift): missing image dimensions, late-loading banners, font swaps

Open a sample URL from the worst Mobile group and then **URL Inspection** it.

---

## 3) Mobile usability (phone-only UX breakpoints)

In **Experience → Mobile Usability**:

- Look for failures like:
  - **Content wider than screen**
  - **Clickable elements too close together**
  - **Text too small**

These can reduce engagement on mobile and indirectly harm rankings over time.

---

## 4) URL inspection (Googlebot smartphone rendering)

In **URL Inspection** (test homepage + 1 important internal page):

- Confirm:\n+  - **Crawled as**: *Googlebot smartphone*\n+  - **Page is indexable**: Yes\n+  - **User-declared canonical** matches **Google-selected canonical** (or is at least consistent)\n+  - Rendered screenshot looks correct (no hidden/overlapping content)

If Mobile is worse but Desktop is fine, the screenshot often exposes the reason (blocked resources, slow LCP, layout issues).

---

## 5) Mobile SERP reality check (local pack / ads)

Many Ayodhya/hotel queries on mobile are dominated by:\n+- **Ads**\n+- **Local Pack (Maps)**\n+- **Hotel/Travel aggregators**

If Mobile position is worse mainly for “near me / hotel / booking” intents, the fastest win is usually:\n+- **Google Business Profile (GBP)** setup + reviews + correct NAP\n+- plus mobile CWV fixes (so users don’t bounce)

---

## 6) What to record (so we can measure improvement)

Paste these into your tracking note weekly:\n+\n+- **Top 10 mobile queries** (clicks, impressions, avg position)\n+- **Top 10 mobile pages** (clicks, impressions, avg position)\n+- Core Web Vitals Mobile status (Pass / NI / Poor) + sample affected URLs\n+- Any Mobile Usability errors + sample affected URLs\n+\n+After deploying performance fixes, re-check after **7–14 days** (CWV updates can take time to reflect).\n+
