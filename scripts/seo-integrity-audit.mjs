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
const ROBOTS_SITEMAP_REGEX = /^\s*sitemap:\s*(\S+)\s*$/gim;
const XML_FILE_PATTERN = /\.xml$/i;
const PRIMARY_SITEMAP_FILE_PATTERN = /^sitemap-\d+\.xml$/i;
const IMAGE_SITEMAP_FILE_NAME = 'image-sitemap.xml';
const HREFLANG_VALUE_PATTERN = /^(x-default|[a-z]{2,3}(?:-[a-z]{2})?)$/i;
const REPORT_FILE_ENV_KEY = 'SEO_AUDIT_REPORT_FILE';
const STRICT_WARNINGS_ENV_KEY = 'SEO_AUDIT_STRICT_WARNINGS';
const TITLE_LENGTH_RECOMMENDED = { min: 20, max: 70 };
const DESCRIPTION_LENGTH_RECOMMENDED = { min: 70, max: 180 };
const DIST_TARGET_EXISTS_CACHE = new Map();
const SOCIAL_META_REQUIRED_KEYS = [
  'og:title',
  'og:description',
  'og:url',
  'og:image',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:url',
  'twitter:image',
];
const TWITTER_CARD_ALLOWED_VALUES = new Set(['summary', 'summary_large_image']);
const INTERNAL_LINK_IGNORE_PATTERNS = [
  /^\/404\/?$/i,
  /^\/hi\/404\/?$/i,
];

/**
 * Parse CLI flags with defensive validation.
 * Supported:
 * - --report-file <path>
 * - --report-file=<path>
 * - --help
 */
function parseCliOptions(args) {
  const options = {
    reportFile: null,
    strictWarnings: false,
    showHelp: false,
    cliWarnings: [],
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg) continue;

    if (arg === '--help' || arg === '-h') {
      options.showHelp = true;
      continue;
    }

    if (arg === '--strict-warnings') {
      options.strictWarnings = true;
      continue;
    }

    if (arg === '--report-file') {
      const nextValue = args[index + 1];
      if (nextValue && !nextValue.startsWith('--')) {
        options.reportFile = nextValue;
        index += 1;
      } else {
        options.cliWarnings.push({
          type: 'missing-report-file-value',
          flag: '--report-file',
        });
      }
      continue;
    }

    if (arg.startsWith('--report-file=')) {
      const [, value] = arg.split('=');
      if (value) {
        options.reportFile = value;
      } else {
        options.cliWarnings.push({
          type: 'empty-report-file-value',
          flag: '--report-file=',
        });
      }
      continue;
    }

    if (arg.startsWith('--')) {
      options.cliWarnings.push({
        type: 'unknown-cli-flag',
        flag: arg,
      });
    }
  }

  if (!options.reportFile) {
    const envReportFile = process.env[REPORT_FILE_ENV_KEY]?.trim();
    if (envReportFile) {
      options.reportFile = envReportFile;
    }
  }

  if (typeof options.reportFile === 'string') {
    const trimmed = options.reportFile.trim();
    options.reportFile = trimmed || null;
  }

  const strictWarningsEnvRaw = process.env[STRICT_WARNINGS_ENV_KEY];
  if (strictWarningsEnvRaw !== undefined) {
    const normalized = strictWarningsEnvRaw.trim().toLowerCase();
    if (['1', 'true', 'yes', 'on'].includes(normalized)) {
      options.strictWarnings = true;
    } else if (['0', 'false', 'no', 'off'].includes(normalized)) {
      options.strictWarnings = false;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
SEO Integrity Audit

Usage:
  node scripts/seo-integrity-audit.mjs [options]

Options:
  --report-file <path>     Write JSON report to file.
  --report-file=<path>     Same as above.
  --strict-warnings        Fail audit when warnings exist.
  --help, -h               Show this help output.

Environment:
  ${REPORT_FILE_ENV_KEY}   Default report file path when CLI flag is absent.
  ${STRICT_WARNINGS_ENV_KEY}  Toggle warning strictness (true/false).
`.trim());
}

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
    .replaceAll('&amp;', '&')
    .replaceAll('&nbsp;', ' ')
    .replace(/&#(\d+);/g, (_, decimalCode) => {
      const numericCode = Number.parseInt(decimalCode, 10);
      if (!Number.isFinite(numericCode)) return _;
      try {
        return String.fromCodePoint(numericCode);
      } catch {
        return _;
      }
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hexCode) => {
      const numericCode = Number.parseInt(hexCode, 16);
      if (!Number.isFinite(numericCode)) return _;
      try {
        return String.fromCodePoint(numericCode);
      } catch {
        return _;
      }
    });
}

function normalizeComparableText(value) {
  return decodeBasicEntities(value)
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function parseMetaDirectives(content) {
  return new Set(
    content
      .split(',')
      .map((directive) => directive.trim().toLowerCase())
      .filter(Boolean)
  );
}

function extractTagAttributes(tagMarkup) {
  const attributes = new Map();
  const attributeRegex = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;

  for (const match of tagMarkup.matchAll(attributeRegex)) {
    const key = (match[1] ?? '').trim().toLowerCase();
    if (!key) continue;
    const rawValue = match[2] ?? match[3] ?? match[4] ?? '';
    attributes.set(key, rawValue.trim());
  }

  return attributes;
}

function hasRelToken(relValue, targetToken) {
  const normalizedRelValue = relValue.trim().toLowerCase();
  if (!normalizedRelValue) return false;
  return normalizedRelValue.split(/\s+/).includes(targetToken);
}

function extractLinkTagEntries(html) {
  const entries = [];
  const linkTagRegex = /<link\b[^>]*>/gi;

  for (const match of html.matchAll(linkTagRegex)) {
    const tagMarkup = match[0] ?? '';
    const attributes = extractTagAttributes(tagMarkup);
    entries.push({
      rel: attributes.get('rel') ?? '',
      href: attributes.get('href') ?? '',
      hreflang: attributes.get('hreflang') ?? '',
    });
  }

  return entries;
}

function extractScriptContentsByType(html, scriptType) {
  const normalizedType = scriptType.trim().toLowerCase();
  if (!normalizedType) return [];

  const contents = [];
  const scriptTagRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(scriptTagRegex)) {
    const attributes = extractTagAttributes(match[1] ?? '');
    const typeValue = (attributes.get('type') ?? '').trim().toLowerCase();
    if (typeValue !== normalizedType) {
      continue;
    }
    contents.push((match[2] ?? '').trim());
  }

  return contents;
}

function extractHrefAttributeEntries(html) {
  const entries = [];
  const tagRegex = /<([a-zA-Z][\w:-]*)\b([^>]*)>/gi;

  for (const match of html.matchAll(tagRegex)) {
    const attributes = extractTagAttributes(match[2] ?? '');
    if (!attributes.has('href')) {
      continue;
    }
    entries.push({
      tag: (match[1] ?? '').toLowerCase(),
      href: (attributes.get('href') ?? '').trim(),
    });
  }

  return entries;
}

function extractMetaContentsByKey(html, metaKey) {
  const normalizedMetaKey = metaKey.trim().toLowerCase();
  if (!normalizedMetaKey) return [];

  const values = [];
  const metaTagRegex = /<meta\b[^>]*>/gi;
  for (const tagMatch of html.matchAll(metaTagRegex)) {
    const tagMarkup = tagMatch[0] ?? '';
    const attributes = extractTagAttributes(tagMarkup);
    const resolvedKey = (attributes.get('property') || attributes.get('name') || '').trim().toLowerCase();
    if (!resolvedKey || resolvedKey !== normalizedMetaKey) {
      continue;
    }

    values.push((attributes.get('content') ?? '').trim());
  }

  return values;
}

function isNonNullObject(value) {
  return typeof value === 'object' && value !== null;
}

function hasJsonLdContextValue(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isNonNullObject(value)) {
    return Object.keys(value).length > 0;
  }
  return false;
}

function hasJsonLdTypeValue(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.some((entry) => typeof entry === 'string' && entry.trim().length > 0);
  }
  return false;
}

function extractJsonLdNodesForTypeValidation(payload) {
  if (Array.isArray(payload)) {
    return payload.filter(isNonNullObject);
  }

  if (!isNonNullObject(payload)) {
    return [];
  }

  if (Array.isArray(payload['@graph'])) {
    return payload['@graph'].filter(isNonNullObject);
  }

  return [payload];
}

function hasAnyJsonLdContext(payload) {
  if (Array.isArray(payload)) {
    return payload.some((entry) => isNonNullObject(entry) && hasJsonLdContextValue(entry['@context']));
  }

  if (!isNonNullObject(payload)) {
    return false;
  }

  if (hasJsonLdContextValue(payload['@context'])) {
    return true;
  }

  if (Array.isArray(payload['@graph'])) {
    return payload['@graph'].some((entry) => isNonNullObject(entry) && hasJsonLdContextValue(entry['@context']));
  }

  return false;
}

function toRelative(absPath) {
  return path.relative(DIST_DIR, absPath).replaceAll(path.sep, '/');
}

function routePathFromDistRelative(relPath) {
  const normalized = relPath.replaceAll('\\', '/');
  if (normalized === 'index.html') return '/';
  if (normalized.endsWith('/index.html')) {
    return `/${normalized.slice(0, -'/index.html'.length)}`;
  }
  if (normalized.endsWith('.html')) {
    return `/${normalized.slice(0, -'.html'.length)}`;
  }
  return `/${normalized}`;
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

async function persistReport(reportFile, payload) {
  if (!reportFile) return;

  const targetPath = path.isAbsolute(reportFile)
    ? reportFile
    : path.resolve(process.cwd(), reportFile);

  try {
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8');
    logInfo('Wrote audit report file', { reportFile: targetPath });
  } catch (error) {
    logWarn('Failed writing audit report file', {
      reportFile: targetPath,
      reason: error instanceof Error ? error.message : String(error),
    });
  }
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

function normalizeComparableHref(href) {
  const localHref = getLocalHrefFromAny(href);
  if (!localHref) return null;

  const withoutHash = localHref.split('#')[0] ?? '';
  const withoutQuery = withoutHash.split('?')[0] ?? '';
  const trimmed = withoutQuery.trim();
  if (!trimmed || trimmed === '/') return '/';

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

async function hasDistTarget(localHref) {
  if (shouldIgnoreInternalHref(localHref)) {
    return true;
  }

  const cacheKey = normalizeComparableHref(localHref) || localHref.trim();
  if (cacheKey && DIST_TARGET_EXISTS_CACHE.has(cacheKey)) {
    return DIST_TARGET_EXISTS_CACHE.get(cacheKey) === true;
  }

  const target = resolveLocalTarget(localHref);
  let existsInDist = false;

  if (typeof target === 'string') {
    existsInDist = await exists(target);
  } else {
    existsInDist =
      (await exists(target.directFile)) ||
      (await exists(target.nestedIndex)) ||
      (await exists(target.htmlVariant));
  }

  if (cacheKey) {
    DIST_TARGET_EXISTS_CACHE.set(cacheKey, existsInDist);
  }

  return existsInDist;
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

function parseRobotsSitemapLocs(robotsText) {
  return Array.from(robotsText.matchAll(ROBOTS_SITEMAP_REGEX))
    .map((match) => (match[1] ?? '').trim())
    .filter(Boolean);
}

function toNormalizedLocalFileHref(localHref) {
  const withoutHash = localHref.split('#')[0] ?? '';
  const withoutQuery = withoutHash.split('?')[0] ?? '';
  const trimmed = withoutQuery.trim();
  if (!trimmed) return null;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function toDistRelativeFilePath(localHref) {
  const normalizedLocalHref = toNormalizedLocalFileHref(localHref);
  if (!normalizedLocalHref) return null;
  return normalizedLocalHref.slice(1);
}

function getLocalFileName(localHref) {
  const distRelativePath = toDistRelativeFilePath(localHref);
  if (!distRelativePath) return '';
  return path.posix.basename(distRelativePath);
}

function hasQueryOrFragment(localHref) {
  return localHref.includes('?') || localHref.includes('#');
}

/**
 * Build deterministic issue-type counters for quick triage.
 */
function summarizeIssueTypes(issues) {
  const counters = new Map();

  for (const issue of issues) {
    const type = issue?.type;
    if (typeof type !== 'string' || !type.trim()) {
      continue;
    }
    counters.set(type, (counters.get(type) ?? 0) + 1);
  }

  return Array.from(counters.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .map(([type, count]) => ({ type, count }));
}

async function run(options = { reportFile: null, strictWarnings: false }) {
  const startedAt = Date.now();
  logInfo('Starting SEO integrity audit', { distDir: DIST_DIR });
  const startIso = new Date(startedAt).toISOString();
  DIST_TARGET_EXISTS_CACHE.clear();

  if (!(await exists(DIST_DIR))) {
    logError('dist directory does not exist. Run `npm run build` first.');
    await persistReport(options.reportFile, {
      status: 'failed',
      startedAt: startIso,
      finishedAt: new Date().toISOString(),
      reason: 'dist directory missing',
      distDir: DIST_DIR,
      siteOrigin: SITE_ORIGIN,
    });
    process.exitCode = 1;
    return;
  }

  const htmlFiles = await collectFiles(DIST_DIR, '.html');
  if (htmlFiles.length === 0) {
    logError('No HTML files found in dist output.');
    await persistReport(options.reportFile, {
      status: 'failed',
      startedAt: startIso,
      finishedAt: new Date().toISOString(),
      reason: 'no html files in dist',
      distDir: DIST_DIR,
      siteOrigin: SITE_ORIGIN,
    });
    process.exitCode = 1;
    return;
  }

  const failures = [];
  const warnings = [];
  const descriptionsByContent = new Map();
  const titlesByContent = new Map();
  const noindexCanonicalPaths = new Set();
  const indexableCanonicalPaths = new Set();
  const sitemapComparablePaths = new Set();
  const titleLengthWarningPages = [];
  const descriptionLengthWarningPages = [];
  const hreflangGraphByPage = new Map();
  const hreflangReciprocalIssuePages = new Set();
  const metrics = {
    htmlFiles: htmlFiles.length,
    pagesWithCanonicalIssue: 0,
    pagesWithCanonicalMissingHref: 0,
    canonicalTargetMissing: 0,
    canonicalExternalOrigin: 0,
    canonicalWithQueryOrFragment: 0,
    pagesWithCanonicalRouteMismatch: 0,
    pagesWithSocialMetaIssues: 0,
    pagesWithSocialTextMismatch: 0,
    pagesWithJsonLdStructureIssues: 0,
    pagesMissingTitle: 0,
    pagesMissingDescription: 0,
    titlesOutsideRecommendedRange: 0,
    descriptionsOutsideRecommendedRange: 0,
    pagesMissingRobotsMeta: 0,
    pagesWithMultipleRobotsMeta: 0,
    pagesWithRobotsDirectiveIssues: 0,
    ogUrlTargetMissing: 0,
    ogUrlExternalOrigin: 0,
    ogUrlWithQueryOrFragment: 0,
    twitterUrlTargetMissing: 0,
    twitterUrlExternalOrigin: 0,
    twitterUrlWithQueryOrFragment: 0,
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
    pagesWithInvalidHreflangEntries: 0,
    pagesWithInvalidHreflangValues: 0,
    pagesWithHreflangSelfReferenceIssue: 0,
    pagesWithHreflangReciprocalIssue: 0,
    pagesWithOgLocaleIssues: 0,
    pagesWithOgLocaleAltMismatch: 0,
    pagesWithLangAttrIssues: 0,
    pagesWithOgLocaleMismatch: 0,
    pagesWithOgCanonicalMismatch: 0,
    pagesWithTwitterCanonicalMismatch: 0,
    duplicateTitleGroups: 0,
    duplicateDescriptionGroups: 0,
    sitemapLocTargetMissing: 0,
    sitemapLocInvalidOrigin: 0,
    sitemapLocDuplicateUrls: 0,
    sitemapLocDisallowedUrls: 0,
    sitemapIndexLocInvalidOrigin: 0,
    sitemapIndexLocDuplicateUrls: 0,
    sitemapIndexLocNonXmlUrls: 0,
    sitemapIndexLocTargetMissing: 0,
    sitemapIndexLocWithQueryOrFragment: 0,
    sitemapLocWithQueryOrFragment: 0,
    sitemapNoindexUrlLeaks: 0,
    indexableCanonicalMissingFromSitemap: 0,
    robotsHasCrawlDelay: 0,
    robotsMissingSitemapRefs: 0,
    robotsSitemapInvalidOrigin: 0,
    robotsSitemapDuplicateUrls: 0,
    robotsSitemapTargetMissing: 0,
    robotsSitemapWithQueryOrFragment: 0,
    sitemapIndexMissingImageSitemapRef: 0,
  };

  for (const htmlPath of htmlFiles) {
    const relPath = toRelative(htmlPath);
    const html = await fs.readFile(htmlPath, 'utf-8');
    const expectedLang = relPath.startsWith('hi/') ? 'hi' : 'en';
    const linkTagEntries = extractLinkTagEntries(html);
    const canonicalLinkEntries = linkTagEntries.filter((entry) => hasRelToken(entry.rel, 'canonical'));
    const alternateLinkEntriesRaw = linkTagEntries.filter((entry) => hasRelToken(entry.rel, 'alternate'));
    const alternateLinkEntries = alternateLinkEntriesRaw
      .filter((entry) => entry.hreflang && entry.href)
      .map((entry) => ({
        hreflang: entry.hreflang.trim(),
        href: entry.href.trim(),
      }));

    const htmlLangMatch = html.match(/<html[^>]*\blang="([^"]+)"/i);
    const htmlLang = htmlLangMatch?.[1]?.trim();
    if (!htmlLang || htmlLang !== expectedLang) {
      metrics.pagesWithLangAttrIssues += 1;
      failures.push({
        type: 'html-lang-mismatch',
        page: relPath,
        expectedLang,
        actualLang: htmlLang || '(missing)',
      });
    }

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const pageTitle = decodeBasicEntities((titleMatch?.[1] ?? '').trim());
    if (!pageTitle) {
      metrics.pagesMissingTitle += 1;
      failures.push({
        type: 'missing-or-empty-title',
        page: relPath,
      });
    } else {
      const pages = titlesByContent.get(pageTitle) ?? [];
      pages.push(relPath);
      titlesByContent.set(pageTitle, pages);

      const titleLength = pageTitle.length;
      if (titleLength < TITLE_LENGTH_RECOMMENDED.min || titleLength > TITLE_LENGTH_RECOMMENDED.max) {
        metrics.titlesOutsideRecommendedRange += 1;
        titleLengthWarningPages.push({
          page: relPath,
          length: titleLength,
          preview: pageTitle.slice(0, 120),
        });
      }
    }

    // Canonical: exactly one per page.
    const canonicalCount = canonicalLinkEntries.length;
    if (canonicalCount !== 1) {
      metrics.pagesWithCanonicalIssue += 1;
      failures.push({
        type: 'canonical-count',
        page: relPath,
        canonicalCount,
      });
    }
    const robotsMetaValues = extractMetaContentsByKey(html, 'robots');
    const robotsMetaCount = robotsMetaValues.length;
    const robotsMetaContent = decodeBasicEntities(robotsMetaValues[0] ?? '').trim();
    const robotsDirectives = parseMetaDirectives(robotsMetaContent);
    const hasNoindexDirective = robotsDirectives.has('noindex');

    if (robotsMetaCount === 0) {
      metrics.pagesMissingRobotsMeta += 1;
      metrics.pagesWithRobotsDirectiveIssues += 1;
      failures.push({
        type: 'missing-robots-meta',
        page: relPath,
      });
    } else {
      if (robotsMetaCount > 1) {
        metrics.pagesWithMultipleRobotsMeta += 1;
        metrics.pagesWithRobotsDirectiveIssues += 1;
        failures.push({
          type: 'multiple-robots-meta',
          page: relPath,
          count: robotsMetaCount,
        });
      }

      if (hasNoindexDirective) {
        const missingNoindexCompanions = ['nofollow', 'noarchive'].filter(
          (directive) => !robotsDirectives.has(directive)
        );
        if (missingNoindexCompanions.length > 0) {
          metrics.pagesWithRobotsDirectiveIssues += 1;
          failures.push({
            type: 'robots-noindex-missing-companion-directives',
            page: relPath,
            missing: missingNoindexCompanions,
            robots: robotsMetaContent,
          });
        }
      } else {
        const missingIndexDirectives = ['index', 'follow'].filter(
          (directive) => !robotsDirectives.has(directive)
        );
        if (missingIndexDirectives.length > 0) {
          metrics.pagesWithRobotsDirectiveIssues += 1;
          failures.push({
            type: 'robots-index-missing-directives',
            page: relPath,
            missing: missingIndexDirectives,
            robots: robotsMetaContent,
          });
        }
      }
    }

    let canonicalComparableHref = null;
    const canonicalHref = canonicalLinkEntries[0]?.href?.trim();
    if (canonicalCount === 1 && !canonicalHref) {
      metrics.pagesWithCanonicalMissingHref += 1;
      failures.push({
        type: 'canonical-missing-href',
        page: relPath,
      });
    }

    if (canonicalHref) {
      const localCanonicalHref = getLocalHrefFromAny(canonicalHref);
      canonicalComparableHref = normalizeComparableHref(canonicalHref);
      const expectedCanonicalHref = normalizeComparableHref(routePathFromDistRelative(relPath));

      if (!localCanonicalHref && ABSOLUTE_HTTP_PATTERN.test(canonicalHref)) {
        metrics.canonicalExternalOrigin += 1;
        failures.push({
          type: 'canonical-external-origin',
          page: relPath,
          canonicalHref,
        });
      } else if (localCanonicalHref && hasQueryOrFragment(localCanonicalHref)) {
        metrics.canonicalWithQueryOrFragment += 1;
        failures.push({
          type: 'canonical-url-has-query-or-fragment',
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
      } else if (
        canonicalComparableHref &&
        expectedCanonicalHref &&
        canonicalComparableHref !== expectedCanonicalHref
      ) {
        metrics.pagesWithCanonicalRouteMismatch += 1;
        failures.push({
          type: 'canonical-route-mismatch',
          page: relPath,
          expectedCanonical: expectedCanonicalHref,
          actualCanonical: canonicalComparableHref,
        });
      } else if (localCanonicalHref) {
        if (hasNoindexDirective && canonicalComparableHref) {
          noindexCanonicalPaths.add(canonicalComparableHref);
        } else if (canonicalComparableHref) {
          indexableCanonicalPaths.add(canonicalComparableHref);
        }
      }
    }

    const ogUrl = extractMetaContentsByKey(html, 'og:url')[0]?.trim();
    if (ogUrl) {
      const localOgUrl = getLocalHrefFromAny(ogUrl);
      const ogComparableHref = normalizeComparableHref(ogUrl);
      if (!localOgUrl && ABSOLUTE_HTTP_PATTERN.test(ogUrl)) {
        metrics.ogUrlExternalOrigin += 1;
        failures.push({
          type: 'og-url-external-origin',
          page: relPath,
          ogUrl,
        });
      } else if (localOgUrl && hasQueryOrFragment(localOgUrl)) {
        metrics.ogUrlWithQueryOrFragment += 1;
        failures.push({
          type: 'og-url-has-query-or-fragment',
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
      } else if (
        canonicalComparableHref &&
        ogComparableHref &&
        canonicalComparableHref !== ogComparableHref
      ) {
        metrics.pagesWithOgCanonicalMismatch += 1;
        failures.push({
          type: 'og-url-canonical-mismatch',
          page: relPath,
          canonicalHref: canonicalComparableHref,
          ogUrl: ogComparableHref,
        });
      }
    }

    const twitterUrl = extractMetaContentsByKey(html, 'twitter:url')[0]?.trim();
    if (twitterUrl) {
      const localTwitterUrl = getLocalHrefFromAny(twitterUrl);
      const twitterComparableHref = normalizeComparableHref(twitterUrl);
      if (!localTwitterUrl && ABSOLUTE_HTTP_PATTERN.test(twitterUrl)) {
        metrics.twitterUrlExternalOrigin += 1;
        failures.push({
          type: 'twitter-url-external-origin',
          page: relPath,
          twitterUrl,
        });
      } else if (localTwitterUrl && hasQueryOrFragment(localTwitterUrl)) {
        metrics.twitterUrlWithQueryOrFragment += 1;
        failures.push({
          type: 'twitter-url-has-query-or-fragment',
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
      } else if (
        canonicalComparableHref &&
        twitterComparableHref &&
        canonicalComparableHref !== twitterComparableHref
      ) {
        metrics.pagesWithTwitterCanonicalMismatch += 1;
        failures.push({
          type: 'twitter-url-canonical-mismatch',
          page: relPath,
          canonicalHref: canonicalComparableHref,
          twitterUrl: twitterComparableHref,
        });
      }
    }

    const socialImageValues = [
      ...extractMetaContentsByKey(html, 'og:image'),
      ...extractMetaContentsByKey(html, 'twitter:image'),
    ];
    for (const imageUrl of socialImageValues) {
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

    const currentOgLocale = extractMetaContentsByKey(html, 'og:locale')[0]?.trim();
    const expectedOgLocale = expectedLang === 'hi' ? 'hi_IN' : 'en_IN';
    let hasOgLocaleIssueForPage = false;
    if (!currentOgLocale || currentOgLocale !== expectedOgLocale) {
      metrics.pagesWithOgLocaleMismatch += 1;
      failures.push({
        type: 'og-locale-mismatch',
        page: relPath,
        expectedOgLocale,
        actualOgLocale: currentOgLocale || '(missing)',
      });
    }
    const ogLocaleAltMatches = extractMetaContentsByKey(html, 'og:locale:alternate')
      .map((value) => value.trim())
      .filter(Boolean);
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
      hasOgLocaleIssueForPage = hasOgLocaleIssueForPage || hasOgLocaleIssue;
    }
    const expectedOgAltLocales = new Set();
    const hreflangForOgLocale = alternateLinkEntries.map((entry) => ({
      hreflang: entry.hreflang.toLowerCase(),
      href: entry.href,
    }));
    for (const entry of hreflangForOgLocale) {
      if (!entry.hreflang || !entry.href) continue;
      if (entry.hreflang === 'x-default') continue;

      const mappedLocale = entry.hreflang === 'hi' ? 'hi_IN' : entry.hreflang === 'en' ? 'en_IN' : null;
      if (!mappedLocale) continue;
      expectedOgAltLocales.add(mappedLocale);
    }
    if (currentOgLocale) {
      expectedOgAltLocales.delete(currentOgLocale);
    }
    const actualOgAltLocales = new Set(ogLocaleAltMatches);
    const ogAltMatchesExpected =
      actualOgAltLocales.size === expectedOgAltLocales.size &&
      Array.from(expectedOgAltLocales).every((locale) => actualOgAltLocales.has(locale));
    if (!ogAltMatchesExpected) {
      metrics.pagesWithOgLocaleAltMismatch += 1;
      hasOgLocaleIssueForPage = true;
      failures.push({
        type: 'og-locale-alternate-hreflang-mismatch',
        page: relPath,
        expected: Array.from(expectedOgAltLocales).sort(),
        actual: Array.from(actualOgAltLocales).sort(),
      });
    }
    if (hasOgLocaleIssueForPage) {
      metrics.pagesWithOgLocaleIssues += 1;
    }

    const descriptionText = decodeBasicEntities(extractMetaContentsByKey(html, 'description')[0] ?? '').trim();
    if (!descriptionText) {
      metrics.pagesMissingDescription += 1;
      failures.push({
        type: 'missing-or-empty-meta-description',
        page: relPath,
      });
    } else {
      const pages = descriptionsByContent.get(descriptionText) ?? [];
      pages.push(relPath);
      descriptionsByContent.set(descriptionText, pages);

      const descriptionLength = descriptionText.length;
      if (
        descriptionLength < DESCRIPTION_LENGTH_RECOMMENDED.min ||
        descriptionLength > DESCRIPTION_LENGTH_RECOMMENDED.max
      ) {
        metrics.descriptionsOutsideRecommendedRange += 1;
        descriptionLengthWarningPages.push({
          page: relPath,
          length: descriptionLength,
          preview: descriptionText.slice(0, 140),
        });
      }
    }

    const socialMetaIssues = [];
    let hasSocialTextMismatch = false;
    for (const socialMetaKey of SOCIAL_META_REQUIRED_KEYS) {
      const values = extractMetaContentsByKey(html, socialMetaKey);
      if (values.length === 0) {
        socialMetaIssues.push({ type: 'missing', key: socialMetaKey });
        continue;
      }

      if (values.length > 1) {
        socialMetaIssues.push({ type: 'duplicate', key: socialMetaKey, count: values.length });
      }

      if (values.some((value) => !value.trim())) {
        socialMetaIssues.push({ type: 'empty', key: socialMetaKey });
      }
    }

    const twitterCardValues = extractMetaContentsByKey(html, 'twitter:card');
    const normalizedTwitterCard = twitterCardValues[0]?.toLowerCase();
    if (normalizedTwitterCard && !TWITTER_CARD_ALLOWED_VALUES.has(normalizedTwitterCard)) {
      socialMetaIssues.push({
        type: 'invalid-twitter-card',
        key: 'twitter:card',
        value: twitterCardValues[0],
      });
    }

    const socialTextParityChecks = [
      { key: 'og:title', expected: pageTitle },
      { key: 'twitter:title', expected: pageTitle },
      { key: 'og:description', expected: descriptionText },
      { key: 'twitter:description', expected: descriptionText },
    ];
    for (const parityCheck of socialTextParityChecks) {
      const actualValue = extractMetaContentsByKey(html, parityCheck.key)[0] ?? '';
      const hasExpected = parityCheck.expected.trim().length > 0;
      const hasActual = actualValue.trim().length > 0;
      if (!hasExpected || !hasActual) {
        continue;
      }

      const expectedComparable = normalizeComparableText(parityCheck.expected);
      const actualComparable = normalizeComparableText(actualValue);
      if (expectedComparable !== actualComparable) {
        hasSocialTextMismatch = true;
        socialMetaIssues.push({
          type: 'content-mismatch',
          key: parityCheck.key,
          expected: parityCheck.expected.slice(0, 120),
          actual: decodeBasicEntities(actualValue).slice(0, 120),
        });
      }
    }

    if (socialMetaIssues.length > 0) {
      metrics.pagesWithSocialMetaIssues += 1;
      if (hasSocialTextMismatch) {
        metrics.pagesWithSocialTextMismatch += 1;
      }
      failures.push({
        type: 'social-meta-integrity',
        page: relPath,
        issues: socialMetaIssues,
      });
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
    const jsonLdScripts = extractScriptContentsByType(html, 'application/ld+json');
    let pageHasJsonLdStructureIssue = false;
    for (const rawScript of jsonLdScripts) {
      if (!rawScript) continue;
      const normalizedJsonText = decodeBasicEntities(rawScript);

      try {
        const parsedJsonLd = JSON.parse(normalizedJsonText);
        const hasContext = hasAnyJsonLdContext(parsedJsonLd);
        const nodesForTypeValidation = extractJsonLdNodesForTypeValidation(parsedJsonLd);
        const missingTypeCount = nodesForTypeValidation.filter(
          (node) => !hasJsonLdTypeValue(node['@type'])
        ).length;

        if (!hasContext || missingTypeCount > 0 || nodesForTypeValidation.length === 0) {
          pageHasJsonLdStructureIssue = true;
          failures.push({
            type: 'json-ld-structure',
            page: relPath,
            hasContext,
            nodesChecked: nodesForTypeValidation.length,
            nodesMissingType: missingTypeCount,
            preview: normalizedJsonText.slice(0, 120),
          });
        }
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
    if (pageHasJsonLdStructureIssue) {
      metrics.pagesWithJsonLdStructureIssues += 1;
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
    const hrefEntries = extractHrefAttributeEntries(html);
    for (const hrefEntry of hrefEntries) {
      const href = hrefEntry.href;

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
    const hreflangEntries = alternateLinkEntries;
    const invalidHreflangEntries = alternateLinkEntriesRaw.filter(
      (entry) => !entry.hreflang.trim() || !entry.href.trim()
    );
    if (invalidHreflangEntries.length > 0) {
      metrics.pagesWithInvalidHreflangEntries += 1;
      failures.push({
        type: 'invalid-hreflang-entry',
        page: relPath,
        count: invalidHreflangEntries.length,
      });
    }

    if (hreflangEntries.length > 0) {
      const seenLangs = new Set();
      let hasDuplicateLang = false;
      let hasXDefault = false;
      let hasHreflangSelfReferenceIssue = false;
      let hasInvalidHreflangValue = false;
      const currentPageLang = relPath.startsWith('hi/') ? 'hi' : 'en';
      const pageComparableHref =
        canonicalComparableHref ?? normalizeComparableHref(routePathFromDistRelative(relPath));
      const comparableHreflangTargets = [];
      const hreflangByLang = new Map();

      for (const entry of hreflangEntries) {
        if (!entry.hreflang || !entry.href) continue;

        if (!HREFLANG_VALUE_PATTERN.test(entry.hreflang)) {
          hasInvalidHreflangValue = true;
          failures.push({
            type: 'invalid-hreflang-value',
            page: relPath,
            hreflang: entry.hreflang,
          });
        }

        if (!hreflangByLang.has(entry.hreflang)) {
          hreflangByLang.set(entry.hreflang, entry.href);
        }

        if (seenLangs.has(entry.hreflang)) {
          hasDuplicateLang = true;
        } else {
          seenLangs.add(entry.hreflang);
        }

        if (entry.hreflang === 'x-default') {
          hasXDefault = true;
        }

        const localHref = getLocalHrefFromAny(entry.href);
        const comparableHreflangHref = normalizeComparableHref(entry.href);
        if (comparableHreflangHref) {
          comparableHreflangTargets.push({
            hreflang: entry.hreflang,
            href: comparableHreflangHref,
          });
        }

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

      const currentLangHref = hreflangByLang.get(currentPageLang);
      const currentLangComparableHref = currentLangHref ? normalizeComparableHref(currentLangHref) : null;
      if (!currentLangHref || !currentLangComparableHref) {
        hasHreflangSelfReferenceIssue = true;
        failures.push({
          type: 'missing-current-lang-hreflang',
          page: relPath,
          expectedLang: currentPageLang,
        });
      } else if (pageComparableHref && currentLangComparableHref !== pageComparableHref) {
        hasHreflangSelfReferenceIssue = true;
        failures.push({
          type: 'hreflang-self-reference-mismatch',
          page: relPath,
          expectedHref: pageComparableHref,
          actualHref: currentLangComparableHref,
          lang: currentPageLang,
        });
      }

      const xDefaultHref = hreflangByLang.get('x-default');
      const englishHref = hreflangByLang.get('en');
      if (xDefaultHref && englishHref) {
        const xDefaultComparableHref = normalizeComparableHref(xDefaultHref);
        const englishComparableHref = normalizeComparableHref(englishHref);
        if (
          xDefaultComparableHref &&
          englishComparableHref &&
          xDefaultComparableHref !== englishComparableHref
        ) {
          hasHreflangSelfReferenceIssue = true;
          failures.push({
            type: 'x-default-hreflang-mismatch',
            page: relPath,
            xDefaultHref: xDefaultComparableHref,
            englishHref: englishComparableHref,
          });
        }
      }

      if (!hasXDefault) {
        metrics.pagesMissingXDefaultHreflang += 1;
        failures.push({
          type: 'missing-hreflang-x-default',
          page: relPath,
        });
      }

      if (hasInvalidHreflangValue) {
        metrics.pagesWithInvalidHreflangValues += 1;
      }

      if (hasHreflangSelfReferenceIssue) {
        metrics.pagesWithHreflangSelfReferenceIssue += 1;
      }

      if (pageComparableHref) {
        hreflangGraphByPage.set(pageComparableHref, comparableHreflangTargets);
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

  if (titleLengthWarningPages.length > 0) {
    warnings.push({
      type: 'title-length-outside-recommended-range',
      count: titleLengthWarningPages.length,
      recommended: TITLE_LENGTH_RECOMMENDED,
      samplePages: titleLengthWarningPages.slice(0, 20),
    });
  }

  if (descriptionLengthWarningPages.length > 0) {
    warnings.push({
      type: 'description-length-outside-recommended-range',
      count: descriptionLengthWarningPages.length,
      recommended: DESCRIPTION_LENGTH_RECOMMENDED,
      samplePages: descriptionLengthWarningPages.slice(0, 20),
    });
  }

  for (const [pageHref, entries] of hreflangGraphByPage.entries()) {
    for (const entry of entries) {
      if (entry.hreflang === 'x-default') continue;
      if (entry.href === pageHref) continue;

      const targetEntries = hreflangGraphByPage.get(entry.href);
      if (!targetEntries) continue;

      const hasReciprocalLink = targetEntries.some((targetEntry) => targetEntry.href === pageHref);
      if (!hasReciprocalLink) {
        hreflangReciprocalIssuePages.add(pageHref);
        failures.push({
          type: 'hreflang-reciprocal-missing',
          page: pageHref,
          target: entry.href,
          hreflang: entry.hreflang,
        });
      }
    }
  }
  metrics.pagesWithHreflangReciprocalIssue = hreflangReciprocalIssuePages.size;

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

  const duplicateTitleGroups = [];
  for (const [titleText, pages] of titlesByContent.entries()) {
    if (pages.length > 1) {
      duplicateTitleGroups.push({
        title: titleText.slice(0, 140),
        pageCount: pages.length,
        samplePages: pages.slice(0, 5),
      });
    }
  }

  metrics.duplicateTitleGroups = duplicateTitleGroups.length;
  if (duplicateTitleGroups.length > 0) {
    failures.push({
      type: 'duplicate-title-groups',
      groups: duplicateTitleGroups.slice(0, 10),
    });
  }

  // Sitemap + robots checks (post-build crawlability integrity).
  const sitemapIndexPath = path.join(DIST_DIR, 'sitemap-index.xml');
  const legacyMainSitemapPath = path.join(DIST_DIR, 'sitemap-0.xml');
  const imageSitemapPath = path.join(DIST_DIR, 'image-sitemap.xml');
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  let hasImageSitemapRefInIndex = false;
  let hasImageSitemapRefInRobots = false;
  let hasParsedPrimarySitemap = false;
  const primarySitemapRefs = new Set();
  const seenSitemapIndexLocs = new Set();

  if (!(await exists(sitemapIndexPath))) {
    failures.push({ type: 'missing-sitemap-index', path: 'sitemap-index.xml' });
  } else {
    const sitemapIndexXml = await fs.readFile(sitemapIndexPath, 'utf-8');
    const sitemapIndexLocs = parseXmlLocs(sitemapIndexXml);
    if (sitemapIndexLocs.length === 0) {
      failures.push({
        type: 'sitemap-index-empty',
      });
    }

    for (const loc of sitemapIndexLocs) {
      const normalizedLoc = loc.trim();
      const comparableIndexLoc = normalizeComparableHref(loc);
      const sitemapIndexDedupKey = comparableIndexLoc || normalizedLoc.toLowerCase();
      if (seenSitemapIndexLocs.has(sitemapIndexDedupKey)) {
        metrics.sitemapIndexLocDuplicateUrls += 1;
        failures.push({
          type: 'duplicate-sitemap-index-url',
          url: loc,
        });
        continue;
      }
      seenSitemapIndexLocs.add(sitemapIndexDedupKey);

      const localHref = getLocalHrefFromAny(loc);
      if (!localHref) {
        metrics.sitemapIndexLocInvalidOrigin += 1;
        failures.push({
          type: 'sitemap-index-url-invalid-origin',
          url: loc,
        });
        continue;
      }

      if (!XML_FILE_PATTERN.test(localHref)) {
        metrics.sitemapIndexLocNonXmlUrls += 1;
        failures.push({
          type: 'sitemap-index-url-non-xml',
          url: loc,
        });
        continue;
      }

      if (hasQueryOrFragment(localHref)) {
        metrics.sitemapIndexLocWithQueryOrFragment += 1;
        failures.push({
          type: 'sitemap-index-url-has-query-or-fragment',
          url: loc,
        });
      }

      if (!(await hasDistTarget(localHref))) {
        metrics.sitemapIndexLocTargetMissing += 1;
        failures.push({
          type: 'sitemap-index-url-target-missing',
          url: loc,
        });
        continue;
      }

      const localFileName = getLocalFileName(localHref).toLowerCase();
      if (localFileName === IMAGE_SITEMAP_FILE_NAME) {
        hasImageSitemapRefInIndex = true;
        continue;
      }

      if (!PRIMARY_SITEMAP_FILE_PATTERN.test(localFileName)) {
        continue;
      }

      const normalizedRef = toNormalizedLocalFileHref(localHref);
      if (normalizedRef) {
        primarySitemapRefs.add(normalizedRef);
      }
    }

    if (primarySitemapRefs.size === 0) {
      failures.push({
        type: 'sitemap-index-missing-main-sitemap',
      });
    }
  }

  // Backward-compatible fallback:
  // if index references are missing but legacy sitemap-0.xml exists, still parse
  // so indexable canonical coverage checks remain actionable.
  if (primarySitemapRefs.size === 0 && (await exists(legacyMainSitemapPath))) {
    primarySitemapRefs.add('/sitemap-0.xml');
  }

  const seenLocs = new Set();
  for (const sitemapRef of primarySitemapRefs) {
    const sitemapRelativePath = toDistRelativeFilePath(sitemapRef);
    if (!sitemapRelativePath) {
      continue;
    }
    const sitemapAbsolutePath = path.join(DIST_DIR, sitemapRelativePath);
    if (!(await exists(sitemapAbsolutePath))) {
      failures.push({ type: 'missing-main-sitemap', path: sitemapRelativePath });
      continue;
    }

    hasParsedPrimarySitemap = true;
    const sitemapXml = await fs.readFile(sitemapAbsolutePath, 'utf-8');
    const locs = parseXmlLocs(sitemapXml);
    for (const loc of locs) {
      const comparableSitemapHref = normalizeComparableHref(loc);
      const sitemapDedupKey = comparableSitemapHref || loc.trim().toLowerCase();
      if (seenLocs.has(sitemapDedupKey)) {
        metrics.sitemapLocDuplicateUrls += 1;
        failures.push({ type: 'duplicate-sitemap-url', sitemap: sitemapRelativePath, url: loc });
      } else {
        seenLocs.add(sitemapDedupKey);
      }

      const localHref = getLocalHrefFromAny(loc);
      if (comparableSitemapHref) {
        sitemapComparablePaths.add(comparableSitemapHref);
      }
      if (!localHref) {
        metrics.sitemapLocInvalidOrigin += 1;
        failures.push({ type: 'sitemap-url-invalid-origin', url: loc });
        continue;
      }

      if (localHref.includes('.docs') || /^\/(?:hi\/)?404\/?$/i.test(localHref)) {
        metrics.sitemapLocDisallowedUrls += 1;
        failures.push({ type: 'sitemap-url-disallowed', url: loc });
      }

      if (hasQueryOrFragment(localHref)) {
        metrics.sitemapLocWithQueryOrFragment += 1;
        failures.push({
          type: 'sitemap-url-has-query-or-fragment',
          sitemap: sitemapRelativePath,
          url: loc,
        });
      }

      if (!(await hasDistTarget(localHref))) {
        metrics.sitemapLocTargetMissing += 1;
        failures.push({ type: 'sitemap-url-target-missing', url: loc });
      }

      if (comparableSitemapHref && noindexCanonicalPaths.has(comparableSitemapHref)) {
        metrics.sitemapNoindexUrlLeaks += 1;
        failures.push({
          type: 'sitemap-contains-noindex-url',
          sitemap: sitemapRelativePath,
          url: loc,
        });
      }
    }
  }

  if (!hasParsedPrimarySitemap && primarySitemapRefs.size === 0) {
    failures.push({ type: 'missing-main-sitemap', path: 'sitemap-0.xml' });
  }

  if (hasParsedPrimarySitemap) {
    const missingIndexableCanonicals = [];
    for (const canonicalPath of indexableCanonicalPaths) {
      if (!sitemapComparablePaths.has(canonicalPath)) {
        missingIndexableCanonicals.push(canonicalPath);
      }
    }
    if (missingIndexableCanonicals.length > 0) {
      metrics.indexableCanonicalMissingFromSitemap += missingIndexableCanonicals.length;
      failures.push({
        type: 'indexable-canonical-missing-from-sitemap',
        count: missingIndexableCanonicals.length,
        samplePaths: missingIndexableCanonicals.slice(0, 20),
      });
    }
  }

  if (!(await exists(imageSitemapPath))) {
    failures.push({ type: 'missing-image-sitemap', path: 'image-sitemap.xml' });
  }

  if (!(await exists(robotsPath))) {
    failures.push({ type: 'missing-robots-txt', path: 'robots.txt' });
  } else {
    const robotsText = await fs.readFile(robotsPath, 'utf-8');
    const robotsSitemapLocs = parseRobotsSitemapLocs(robotsText);
    const seenRobotsSitemapLocs = new Set();
    const robotsSitemapComparableRefs = new Set();

    if (/crawl-delay\s*:/i.test(robotsText)) {
      metrics.robotsHasCrawlDelay += 1;
      failures.push({ type: 'robots-has-crawl-delay' });
    }

    for (const loc of robotsSitemapLocs) {
      const comparableLoc = normalizeComparableHref(loc);
      const sitemapKey = comparableLoc || loc.toLowerCase();
      if (seenRobotsSitemapLocs.has(sitemapKey)) {
        metrics.robotsSitemapDuplicateUrls += 1;
        failures.push({
          type: 'duplicate-robots-sitemap-reference',
          url: loc,
        });
        continue;
      }
      seenRobotsSitemapLocs.add(sitemapKey);

      const localHref = getLocalHrefFromAny(loc);
      if (!localHref) {
        metrics.robotsSitemapInvalidOrigin += 1;
        failures.push({
          type: 'robots-sitemap-invalid-origin',
          url: loc,
        });
        continue;
      }

      if (!(await hasDistTarget(localHref))) {
        metrics.robotsSitemapTargetMissing += 1;
        failures.push({
          type: 'robots-sitemap-target-missing',
          url: loc,
        });
      }

      if (hasQueryOrFragment(localHref)) {
        metrics.robotsSitemapWithQueryOrFragment += 1;
        failures.push({
          type: 'robots-sitemap-has-query-or-fragment',
          url: loc,
        });
      }

      if (comparableLoc) {
        robotsSitemapComparableRefs.add(comparableLoc);
      }
    }

    const expectedSitemapIndexRef = normalizeComparableHref(`${SITE_ORIGIN}/sitemap-index.xml`);
    const expectedImageSitemapRef = normalizeComparableHref(`${SITE_ORIGIN}/image-sitemap.xml`);
    const hasSitemapIndexRef = expectedSitemapIndexRef
      ? robotsSitemapComparableRefs.has(expectedSitemapIndexRef)
      : false;
    hasImageSitemapRefInRobots = expectedImageSitemapRef
      ? robotsSitemapComparableRefs.has(expectedImageSitemapRef)
      : false;
    if (!hasSitemapIndexRef || !hasImageSitemapRefInRobots) {
      metrics.robotsMissingSitemapRefs += 1;
      failures.push({
        type: 'robots-missing-sitemap-references',
        missing: {
          sitemapIndex: !hasSitemapIndexRef,
          imageSitemap: !hasImageSitemapRefInRobots,
        },
      });
    }
  }

  if (!hasImageSitemapRefInIndex && !hasImageSitemapRefInRobots) {
    metrics.sitemapIndexMissingImageSitemapRef += 1;
    warnings.push({
      type: 'image-sitemap-reference-missing',
      expectedEither: [
        `${SITE_ORIGIN}/image-sitemap.xml in sitemap-index.xml`,
        `${SITE_ORIGIN}/image-sitemap.xml in robots.txt`,
      ],
    });
  }

  const elapsedMs = Date.now() - startedAt;
  logInfo('Audit metrics', metrics);

  if (warnings.length > 0) {
    logWarn('Warnings detected', { count: warnings.length, sample: warnings.slice(0, 10) });
  }

  if (options.strictWarnings && warnings.length > 0) {
    failures.push({
      type: 'strict-warnings-triggered',
      warningCount: warnings.length,
      warningTypes: summarizeIssueTypes(warnings),
    });
  }

  const reportPayload = {
    status: failures.length > 0 ? 'failed' : 'passed',
    startedAt: startIso,
    finishedAt: new Date().toISOString(),
    elapsedMs,
    distDir: DIST_DIR,
    siteOrigin: SITE_ORIGIN,
    metrics,
    warningCount: warnings.length,
    warnings,
    warningTypeCounts: summarizeIssueTypes(warnings),
    failureCount: failures.length,
    failures,
    failureTypeCounts: summarizeIssueTypes(failures),
    options: {
      strictWarnings: Boolean(options.strictWarnings),
      titleLengthRecommended: TITLE_LENGTH_RECOMMENDED,
      descriptionLengthRecommended: DESCRIPTION_LENGTH_RECOMMENDED,
    },
  };
  await persistReport(options.reportFile, reportPayload);

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

const cliOptions = parseCliOptions(process.argv.slice(2));

if (cliOptions.showHelp) {
  printHelp();
  process.exit(0);
}

if (cliOptions.cliWarnings.length > 0) {
  logWarn('CLI option warnings detected', { count: cliOptions.cliWarnings.length, warnings: cliOptions.cliWarnings });
}

run(cliOptions).catch(async (error) => {
  const reason = error instanceof Error ? error.message : String(error);
  logError('Unexpected audit runtime failure', { reason });
  await persistReport(cliOptions.reportFile, {
    status: 'error',
    startedAt: new Date().toISOString(),
    finishedAt: new Date().toISOString(),
    distDir: DIST_DIR,
    siteOrigin: SITE_ORIGIN,
    reason,
  });
  process.exitCode = 1;
});
