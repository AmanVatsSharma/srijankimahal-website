#!/usr/bin/env node
/**
 * SEO Integrity Audit
 *
 * Purpose:
 * - Run deterministic post-build checks against /dist HTML output.
 * - Catch high-impact SEO regressions before deployment.
 *
 * Usage:
 *   npm run build
 *   npm run seo:audit
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';

const AUDIT_PREFIX = '[seo-audit]';
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const SITE_ORIGIN = 'https://www.srijanakimahaltrustofficial.com';
const ABSOLUTE_HTTP_PATTERN = /^https?:\/\//i;
const XML_LOC_REGEX = /<loc>([^<]+)<\/loc>/gi;
const INTERNAL_LINK_IGNORE_PATTERNS = [
  /^\/404\/?$/i,
  /^\/hi\/404\/?$/i,
];

/**
 * Keep logs structured and easy to grep in CI.
 */
function logInfo(message, payload) {
  if (payload === undefined) {
    console.log(`${AUDIT_PREFIX} INFO ${message}`);
    return;
  }
  console.log(`${AUDIT_PREFIX} INFO ${message}`, payload);
}

function logWarn(message, payload) {
  if (payload === undefined) {
    console.warn(`${AUDIT_PREFIX} WARN ${message}`);
    return;
  }
  console.warn(`${AUDIT_PREFIX} WARN ${message}`, payload);
}

function logError(message, payload) {
  if (payload === undefined) {
    console.error(`${AUDIT_PREFIX} ERROR ${message}`);
    return;
  }
  console.error(`${AUDIT_PREFIX} ERROR ${message}`, payload);
}

/**
 * Recursively collect files with a target extension.
 */
async function collectFiles(rootDir, ext) {
  const queue = [rootDir];
  const files = [];

  while (queue.length > 0) {
    const current = queue.pop();
    if (!current) continue;

    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const absPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(absPath);
      } else if (entry.isFile() && absPath.endsWith(ext)) {
        files.push(absPath);
      }
    }
  }

  return files;
}

function countMatches(text, regex) {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function decodeBasicEntities(text) {
  return text
    .replaceAll('&quot;', '"')
    .replaceAll('&#34;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');
}

function toRelative(absPath) {
  return path.relative(DIST_DIR, absPath).replaceAll(path.sep, '/');
}

function resolveLocalTarget(urlPath) {
  const withoutHash = urlPath.split('#')[0] ?? '';
  const withoutQuery = withoutHash.split('?')[0] ?? '';
  const safePath = withoutQuery.trim();

  if (!safePath || safePath === '/') {
    return path.join(DIST_DIR, 'index.html');
  }

  const normalized = safePath.startsWith('/') ? safePath.slice(1) : safePath;
  const directFile = path.join(DIST_DIR, normalized);
  const nestedIndex = path.join(DIST_DIR, normalized, 'index.html');
  const htmlVariant = `${directFile}.html`;

  return { directFile, nestedIndex, htmlVariant };
}

function shouldIgnoreInternalHref(href) {
  return INTERNAL_LINK_IGNORE_PATTERNS.some((pattern) => pattern.test(href));
}

function getLocalHrefFromAny(href) {
  const value = href.trim();
  if (!value) return null;

  if (!ABSOLUTE_HTTP_PATTERN.test(value)) {
    return value;
  }

  try {
    const parsed = new URL(value);
    if (parsed.origin !== SITE_ORIGIN) {
      return null;
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}

async function hasDistTarget(localHref) {
  if (shouldIgnoreInternalHref(localHref)) {
    return true;
  }

  const target = resolveLocalTarget(localHref);
  if (typeof target === 'string') {
    return exists(target);
  }

  return (
    (await exists(target.directFile)) ||
    (await exists(target.nestedIndex)) ||
    (await exists(target.htmlVariant))
  );
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseXmlLocs(xmlText) {
  return Array.from(xmlText.matchAll(XML_LOC_REGEX))
    .map((match) => (match[1] ?? '').trim())
    .filter(Boolean);
}

async function run() {
  const startedAt = Date.now();
  logInfo('Starting SEO integrity audit', { distDir: DIST_DIR });

  if (!(await exists(DIST_DIR))) {
    logError('dist directory does not exist. Run `npm run build` first.');
    process.exitCode = 1;
    return;
  }

  const htmlFiles = await collectFiles(DIST_DIR, '.html');
  if (htmlFiles.length === 0) {
    logError('No HTML files found in dist output.');
    process.exitCode = 1;
    return;
  }

  const failures = [];
  const warnings = [];
  const descriptionsByContent = new Map();
  const noindexCanonicalPaths = new Set();
  const metrics = {
    htmlFiles: htmlFiles.length,
    pagesWithCanonicalIssue: 0,
    canonicalTargetMissing: 0,
    ogUrlTargetMissing: 0,
    twitterUrlTargetMissing: 0,
    socialImageTargetMissing: 0,
    invalidJsonLdScripts: 0,
    pagesWithH1Issue: 0,
    imagesMissingAlt: 0,
    imagesMissingDimensions: 0,
    pagesWithLiteralJsonStringify: 0,
    docsLikeRoutes: 0,
    brokenInternalLinks: 0,
    hreflangTargetMissing: 0,
    pagesWithDuplicateHreflangLangs: 0,
    pagesMissingXDefaultHreflang: 0,
    pagesWithOgLocaleIssues: 0,
    duplicateDescriptionGroups: 0,
    sitemapLocTargetMissing: 0,
    sitemapLocInvalidOrigin: 0,
    sitemapLocDuplicateUrls: 0,
    sitemapLocDisallowedUrls: 0,
    sitemapNoindexUrlLeaks: 0,
    robotsHasCrawlDelay: 0,
    robotsMissingSitemapRefs: 0,
    sitemapIndexMissingImageSitemapRef: 0,
  };

  for (const htmlPath of htmlFiles) {
    const relPath = toRelative(htmlPath);
    const html = await fs.readFile(htmlPath, 'utf-8');

    // Canonical: exactly one per page.
    const canonicalCount = countMatches(html, /<link rel="canonical" /gi);
    if (canonicalCount !== 1) {
      metrics.pagesWithCanonicalIssue += 1;
      failures.push({
        type: 'canonical-count',
        page: relPath,
        canonicalCount,
      });
    }
    const canonicalHrefMatch = html.match(/<link rel="canonical" href="([^"]+)"/i);
    if (canonicalHrefMatch?.[1]) {
      const canonicalHref = canonicalHrefMatch[1];
      const localCanonicalHref = getLocalHrefFromAny(canonicalHref);

      if (!localCanonicalHref && ABSOLUTE_HTTP_PATTERN.test(canonicalHref)) {
        failures.push({
          type: 'canonical-external-origin',
          page: relPath,
          canonicalHref,
        });
      } else if (localCanonicalHref && !(await hasDistTarget(localCanonicalHref))) {
        metrics.canonicalTargetMissing += 1;
        failures.push({
          type: 'canonical-target-missing',
          page: relPath,
          canonicalHref,
        });
      } else if (localCanonicalHref) {
        const robotsMetaMatch = html.match(/<meta name="robots" content="([^"]+)"/i);
        const robotsDirectives = (robotsMetaMatch?.[1] ?? '').toLowerCase();
        if (robotsDirectives.includes('noindex')) {
          noindexCanonicalPaths.add(localCanonicalHref.split('?')[0]?.split('#')[0] ?? localCanonicalHref);
        }
      }
    }

    const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]+)"/i);
    if (ogUrlMatch?.[1]) {
      const ogUrl = ogUrlMatch[1];
      const localOgUrl = getLocalHrefFromAny(ogUrl);
      if (!localOgUrl && ABSOLUTE_HTTP_PATTERN.test(ogUrl)) {
        failures.push({
          type: 'og-url-external-origin',
          page: relPath,
          ogUrl,
        });
      } else if (localOgUrl && !(await hasDistTarget(localOgUrl))) {
        metrics.ogUrlTargetMissing += 1;
        failures.push({
          type: 'og-url-target-missing',
          page: relPath,
          ogUrl,
        });
      }
    }

    const twitterUrlMatch = html.match(/<meta property="twitter:url" content="([^"]+)"/i);
    if (twitterUrlMatch?.[1]) {
      const twitterUrl = twitterUrlMatch[1];
      const localTwitterUrl = getLocalHrefFromAny(twitterUrl);
      if (!localTwitterUrl && ABSOLUTE_HTTP_PATTERN.test(twitterUrl)) {
        failures.push({
          type: 'twitter-url-external-origin',
          page: relPath,
          twitterUrl,
        });
      } else if (localTwitterUrl && !(await hasDistTarget(localTwitterUrl))) {
        metrics.twitterUrlTargetMissing += 1;
        failures.push({
          type: 'twitter-url-target-missing',
          page: relPath,
          twitterUrl,
        });
      }
    }

    const socialImageRegex = /<meta property="(?:og:image|twitter:image)" content="([^"]+)"/gi;
    for (const socialImageMatch of html.matchAll(socialImageRegex)) {
      const imageUrl = socialImageMatch[1] ?? '';
      const localImagePath = getLocalHrefFromAny(imageUrl);
      if (!localImagePath) {
        // External non-site image URLs are flagged for manual review.
        if (ABSOLUTE_HTTP_PATTERN.test(imageUrl)) {
          warnings.push({
            type: 'social-image-external-origin',
            page: relPath,
            imageUrl,
          });
        }
        continue;
      }

      const cleanImagePath = localImagePath.split('?')[0]?.split('#')[0] ?? '';
      const normalizedImagePath = cleanImagePath.startsWith('/') ? cleanImagePath.slice(1) : cleanImagePath;
      const absImagePath = path.join(DIST_DIR, normalizedImagePath);
      if (!(await exists(absImagePath))) {
        metrics.socialImageTargetMissing += 1;
        failures.push({
          type: 'social-image-target-missing',
          page: relPath,
          imageUrl,
        });
      }
    }

    const currentOgLocaleMatch = html.match(/<meta property="og:locale" content="([^"]+)"/i);
    const currentOgLocale = currentOgLocaleMatch?.[1]?.trim();
    const ogLocaleAltMatches = Array.from(
      html.matchAll(/<meta property="og:locale:alternate" content="([^"]+)"/gi)
    ).map((match) => (match[1] ?? '').trim()).filter(Boolean);
    if (ogLocaleAltMatches.length > 0) {
      const seenOgAlt = new Set();
      let hasOgLocaleIssue = false;
      for (const ogAlt of ogLocaleAltMatches) {
        if (seenOgAlt.has(ogAlt)) {
          hasOgLocaleIssue = true;
          failures.push({
            type: 'duplicate-og-locale-alternate',
            page: relPath,
            locale: ogAlt,
          });
          continue;
        }
        seenOgAlt.add(ogAlt);
        if (currentOgLocale && ogAlt === currentOgLocale) {
          hasOgLocaleIssue = true;
          failures.push({
            type: 'og-locale-alternate-matches-primary',
            page: relPath,
            locale: ogAlt,
          });
        }
      }
      if (hasOgLocaleIssue) {
        metrics.pagesWithOgLocaleIssues += 1;
      }
    }

    const descriptionMatch = html.match(/<meta name="description" content="([^"]*)"/i);
    if (descriptionMatch) {
      const descriptionText = decodeBasicEntities(descriptionMatch[1] ?? '').trim();
      if (descriptionText) {
        const pages = descriptionsByContent.get(descriptionText) ?? [];
        pages.push(relPath);
        descriptionsByContent.set(descriptionText, pages);
      }
    }

    // Exactly one H1 for semantic consistency.
    const h1Count = countMatches(html, /<h1\b/gi);
    if (h1Count !== 1) {
      metrics.pagesWithH1Issue += 1;
      failures.push({
        type: 'h1-count',
        page: relPath,
        h1Count,
      });
    }

    // Guard against literal JSON.stringify artifacts leaking to output.
    if (html.includes('{JSON.stringify(')) {
      metrics.pagesWithLiteralJsonStringify += 1;
      failures.push({
        type: 'literal-json-stringify',
        page: relPath,
      });
    }

    // JSON-LD parse validation.
    const jsonLdRegex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    for (const match of html.matchAll(jsonLdRegex)) {
      const rawScript = (match[1] ?? '').trim();
      if (!rawScript) continue;
      const normalizedJsonText = decodeBasicEntities(rawScript);

      try {
        JSON.parse(normalizedJsonText);
      } catch (error) {
        metrics.invalidJsonLdScripts += 1;
        failures.push({
          type: 'invalid-json-ld',
          page: relPath,
          reason: error instanceof Error ? error.message : String(error),
          preview: normalizedJsonText.slice(0, 120),
        });
      }
    }

    // Image audit for alt + dimensions.
    const imgRegex = /<img\b([^>]*?)>/gi;
    for (const imgMatch of html.matchAll(imgRegex)) {
      const attrs = imgMatch[1] ?? '';
      const hasAlt = /\balt\s*=\s*["'][^"']*["']/i.test(attrs);
      const hasWidth = /\bwidth\s*=\s*["'][^"']+["']/i.test(attrs);
      const hasHeight = /\bheight\s*=\s*["'][^"']+["']/i.test(attrs);

      if (!hasAlt) {
        metrics.imagesMissingAlt += 1;
        failures.push({
          type: 'image-missing-alt',
          page: relPath,
          snippet: imgMatch[0].slice(0, 120),
        });
      }

      if (!hasWidth || !hasHeight) {
        metrics.imagesMissingDimensions += 1;
        failures.push({
          type: 'image-missing-dimensions',
          page: relPath,
          hasWidth,
          hasHeight,
          snippet: imgMatch[0].slice(0, 120),
        });
      }
    }

    // Internal link existence check.
    const hrefRegex = /href="([^"]+)"/gi;
    for (const hrefMatch of html.matchAll(hrefRegex)) {
      const href = hrefMatch[1] ?? '';

      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('//')
      ) {
        continue;
      }

      const localHref = getLocalHrefFromAny(href);
      if (!localHref || shouldIgnoreInternalHref(localHref)) {
        continue;
      }

      if (!(await hasDistTarget(localHref))) {
        metrics.brokenInternalLinks += 1;
        failures.push({
          type: 'broken-internal-link',
          page: relPath,
          href,
        });
      }
    }

    // Hreflang integrity checks.
    const hreflangRegex = /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi;
    const hreflangEntries = Array.from(html.matchAll(hreflangRegex)).map((match) => ({
      hreflang: (match[1] ?? '').trim(),
      href: (match[2] ?? '').trim(),
    }));

    if (hreflangEntries.length > 0) {
      const seenLangs = new Set();
      let hasDuplicateLang = false;
      let hasXDefault = false;

      for (const entry of hreflangEntries) {
        if (!entry.hreflang || !entry.href) continue;

        if (seenLangs.has(entry.hreflang)) {
          hasDuplicateLang = true;
        } else {
          seenLangs.add(entry.hreflang);
        }

        if (entry.hreflang === 'x-default') {
          hasXDefault = true;
        }

        const localHref = getLocalHrefFromAny(entry.href);
        if (!localHref && ABSOLUTE_HTTP_PATTERN.test(entry.href)) {
          failures.push({
            type: 'hreflang-external-origin',
            page: relPath,
            hreflang: entry.hreflang,
            href: entry.href,
          });
          continue;
        }

        if (localHref && !(await hasDistTarget(localHref))) {
          metrics.hreflangTargetMissing += 1;
          failures.push({
            type: 'hreflang-target-missing',
            page: relPath,
            hreflang: entry.hreflang,
            href: entry.href,
          });
        }
      }

      if (hasDuplicateLang) {
        metrics.pagesWithDuplicateHreflangLangs += 1;
        failures.push({
          type: 'duplicate-hreflang-language',
          page: relPath,
        });
      }

      if (!hasXDefault) {
        metrics.pagesMissingXDefaultHreflang += 1;
        failures.push({
          type: 'missing-hreflang-x-default',
          page: relPath,
        });
      }
    }

    // Route hygiene: docs should never leak into dist routes.
    if (relPath.includes('.docs')) {
      metrics.docsLikeRoutes += 1;
      warnings.push({
        type: 'docs-route-output',
        page: relPath,
      });
    }
  }

  const duplicateDescriptionGroups = [];
  for (const [descriptionText, pages] of descriptionsByContent.entries()) {
    if (pages.length > 1) {
      duplicateDescriptionGroups.push({
        description: descriptionText.slice(0, 140),
        pageCount: pages.length,
        samplePages: pages.slice(0, 5),
      });
    }
  }

  metrics.duplicateDescriptionGroups = duplicateDescriptionGroups.length;
  if (duplicateDescriptionGroups.length > 0) {
    failures.push({
      type: 'duplicate-meta-description-groups',
      groups: duplicateDescriptionGroups.slice(0, 10),
    });
  }

  // Sitemap + robots checks (post-build crawlability integrity).
  const sitemapIndexPath = path.join(DIST_DIR, 'sitemap-index.xml');
  const sitemapPagesPath = path.join(DIST_DIR, 'sitemap-0.xml');
  const imageSitemapPath = path.join(DIST_DIR, 'image-sitemap.xml');
  const robotsPath = path.join(DIST_DIR, 'robots.txt');

  if (!(await exists(sitemapIndexPath))) {
    failures.push({ type: 'missing-sitemap-index', path: 'sitemap-index.xml' });
  } else {
    const sitemapIndexXml = await fs.readFile(sitemapIndexPath, 'utf-8');
    if (!sitemapIndexXml.includes(`${SITE_ORIGIN}/sitemap-0.xml`)) {
      failures.push({
        type: 'sitemap-index-missing-main-sitemap',
        expected: `${SITE_ORIGIN}/sitemap-0.xml`,
      });
    }
    if (!sitemapIndexXml.includes(`${SITE_ORIGIN}/image-sitemap.xml`)) {
      metrics.sitemapIndexMissingImageSitemapRef += 1;
      warnings.push({
        type: 'sitemap-index-missing-image-sitemap',
        expected: `${SITE_ORIGIN}/image-sitemap.xml`,
      });
    }
  }

  if (!(await exists(sitemapPagesPath))) {
    failures.push({ type: 'missing-main-sitemap', path: 'sitemap-0.xml' });
  } else {
    const sitemapXml = await fs.readFile(sitemapPagesPath, 'utf-8');
    const locs = parseXmlLocs(sitemapXml);
    const seenLocs = new Set();

    for (const loc of locs) {
      if (seenLocs.has(loc)) {
        metrics.sitemapLocDuplicateUrls += 1;
        failures.push({ type: 'duplicate-sitemap-url', url: loc });
      } else {
        seenLocs.add(loc);
      }

      const localHref = getLocalHrefFromAny(loc);
      if (!localHref) {
        metrics.sitemapLocInvalidOrigin += 1;
        failures.push({ type: 'sitemap-url-invalid-origin', url: loc });
        continue;
      }

      if (localHref.includes('.docs') || /^\/(?:hi\/)?404\/?$/i.test(localHref)) {
        metrics.sitemapLocDisallowedUrls += 1;
        failures.push({ type: 'sitemap-url-disallowed', url: loc });
      }

      if (!(await hasDistTarget(localHref))) {
        metrics.sitemapLocTargetMissing += 1;
        failures.push({ type: 'sitemap-url-target-missing', url: loc });
      }

      const noQueryNoHashHref = localHref.split('?')[0]?.split('#')[0] ?? localHref;
      if (noindexCanonicalPaths.has(noQueryNoHashHref)) {
        metrics.sitemapNoindexUrlLeaks += 1;
        failures.push({
          type: 'sitemap-contains-noindex-url',
          url: loc,
        });
      }
    }
  }

  if (!(await exists(imageSitemapPath))) {
    failures.push({ type: 'missing-image-sitemap', path: 'image-sitemap.xml' });
  }

  if (!(await exists(robotsPath))) {
    failures.push({ type: 'missing-robots-txt', path: 'robots.txt' });
  } else {
    const robotsText = await fs.readFile(robotsPath, 'utf-8');

    if (/crawl-delay\s*:/i.test(robotsText)) {
      metrics.robotsHasCrawlDelay += 1;
      failures.push({ type: 'robots-has-crawl-delay' });
    }

    const hasSitemapIndexRef = robotsText.includes(`${SITE_ORIGIN}/sitemap-index.xml`);
    const hasImageSitemapRef = robotsText.includes(`${SITE_ORIGIN}/image-sitemap.xml`);
    if (!hasSitemapIndexRef || !hasImageSitemapRef) {
      metrics.robotsMissingSitemapRefs += 1;
      failures.push({
        type: 'robots-missing-sitemap-references',
        missing: {
          sitemapIndex: !hasSitemapIndexRef,
          imageSitemap: !hasImageSitemapRef,
        },
      });
    }
  }

  const elapsedMs = Date.now() - startedAt;
  logInfo('Audit metrics', metrics);

  if (warnings.length > 0) {
    logWarn('Warnings detected', { count: warnings.length, sample: warnings.slice(0, 10) });
  }

  if (failures.length > 0) {
    logError('SEO integrity audit failed', {
      count: failures.length,
      sample: failures.slice(0, 20),
      elapsedMs,
    });
    process.exitCode = 1;
    return;
  }

  logInfo('SEO integrity audit passed', { elapsedMs, pagesAudited: htmlFiles.length, origin: SITE_ORIGIN });
}

run().catch((error) => {
  logError('Unexpected audit runtime failure', {
    reason: error instanceof Error ? error.message : String(error),
  });
  process.exitCode = 1;
});
