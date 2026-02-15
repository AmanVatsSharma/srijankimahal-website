/**
 * File: Astro/src/lib/seo.ts
 * Module: astro-seo
 * Purpose: Generate canonical/meta/OG/Twitter/hreflang values.
 * Author: Aman Sharma / NovologicAI
 * Last-updated: 2026-02-01
 * Notes:
 * - Keep output deterministic; avoid production console logging.
 * - `SITE_URL` is the canonical origin for all absolute URLs.
 */

import { DISPLAY_PHONE } from './constants';
import { detectLangFromPath, getHreflangTargets } from './i18n';

// Base site configuration
const SITE_URL = 'https://www.srijanakimahaltrustofficial.com';
const SITE_NAME = 'Sri Janaki Mahal Trust';
const SITE_NAME_HI = 'श्री जानकी महल ट्रस्ट';
const SITE_NAME_BY_LANG: Record<'en' | 'hi', string> = {
  en: SITE_NAME,
  hi: SITE_NAME_HI,
};
const SITE_NAME_ALIASES_BY_LANG: Record<'en' | 'hi', string[]> = {
  en: [SITE_NAME],
  hi: [SITE_NAME_HI],
};
const DEFAULT_TITLE = 'Sri Janaki Mahal - Comfortable Hotel in Ayodhya';
const DEFAULT_DESCRIPTION = `Sri Janaki Mahal Trust - Best hotel stay in Ayodhya. Book comfortable rooms near Ram Mandir. All meals included. Call ${DISPLAY_PHONE}.`;
const DEFAULT_KEYWORDS = [
  'Sri Janaki Mahal Trust',
  'Sri Janaki Mahal',
  'Sri Janaki Mahal Ayodhya',
  'Janaki Mahal Trust',
  'janaki mahal trust',
  'sri janki mahal trust ayodhya',
  'ram janki mahal',
  'ram janki mahal ayodhya',
  'ram janki mahal trust',
  'janaki mahal trust ayodhya',
  'shri janki mahal trust ayodhya',
  'janaki mahal official contact number',
  'sri janki mahal official booking',
  'janki mahal ayodhya',
  'shri janaki mahal trust',
  'Sri Janki Mahal',
  'Janaki Mahal',
  'official janaki mahal trust',
  'janaki mahal contact number',
  'janaki mahal booking',
  'Ayodhya hotel',
  'Ayodhya accommodation',
  'rooms near ram mandir',
  'Ayodhya hotel booking',
  'janaki mahal trust ayodhya'
];
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.jpg`;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;
const NORMALIZE_SPACES_PATTERN = /\s+/g;
const TITLE_MAX_LENGTH = 70;
const DESCRIPTION_MAX_LENGTH = 180;

function debugLog(message: string, data?: unknown) {
  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.debug(message, data ?? '');
  }
}

/**
 * Normalize strings for resilient SEO title comparisons.
 * - lowercase for case-insensitive checks
 * - collapse repeated whitespace
 * - trim leading/trailing spaces
 */
function normalizeForComparison(value: string): string {
  return value.toLowerCase().replace(NORMALIZE_SPACES_PATTERN, ' ').trim();
}

/**
 * Trim metadata text to a safe SERP-friendly maximum length.
 * - prefers cutting at word boundaries
 * - removes trailing separators before appending ellipsis
 * - keeps output deterministic for static generation
 */
function truncateMetaText(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  const slice = value.slice(0, Math.max(0, maxLength - 1));
  const lastWordBoundary = slice.lastIndexOf(' ');
  const cutoff = lastWordBoundary > Math.floor(maxLength * 0.6) ? lastWordBoundary : slice.length;
  const compact = slice
    .slice(0, cutoff)
    .replace(/[|,;:\-–—]+$/g, '')
    .trim();

  return `${compact || slice.trim()}…`;
}

/**
 * Detect whether a page title already includes the canonical site brand.
 * Prevents duplicate title suffix patterns such as:
 * "… | Sri Janaki Mahal Trust | Sri Janaki Mahal Trust"
 */
function hasSiteNameInTitleForLang(title: string, lang: 'en' | 'hi'): boolean {
  const normalizedTitle = normalizeForComparison(title);
  return SITE_NAME_ALIASES_BY_LANG[lang].some((brandName) =>
    normalizedTitle.includes(normalizeForComparison(brandName))
  );
}

/**
 * Normalize and de-duplicate keywords while preserving insertion order.
 * - trims whitespace
 * - removes empty values
 * - de-duplicates case-insensitively
 */
function normalizeAndDedupeKeywords(keywords: string[]): string[] {
  const seen = new Set<string>();
  const normalizedKeywords: string[] = [];

  keywords.forEach((keyword) => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      return;
    }

    const keywordKey = trimmedKeyword.toLowerCase();
    if (seen.has(keywordKey)) {
      return;
    }

    seen.add(keywordKey);
    normalizedKeywords.push(trimmedKeyword);
  });

  return normalizedKeywords;
}

/**
 * SEO Configuration Interface
 * 
 * Defines the structure for SEO meta data that can be passed to pages
 */
export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  lang?: 'en' | 'hi';
  alternateLanguages?: { lang: string; url: string }[];
  disableDefaultHreflangPair?: boolean;
}

/**
 * Generate full page title with site name
 * 
 * @param title - Page-specific title (optional)
 * @returns Full title with site name suffix
 * 
 * Example:
 * - Input: "About Us" 
 * - Output: "About Us | Sri Janaki Mahal Trust"
 */
export function generateTitle(title?: string, lang: 'en' | 'hi' = 'en'): string {
  debugLog('[SEO] Generating title', { title, lang });
  const pageTitle = (title || DEFAULT_TITLE).trim();

  // Keep title clean when callers already include the brand.
  // This improves SERP readability and avoids repeated entity strings.
  if (hasSiteNameInTitleForLang(pageTitle, lang)) {
    return truncateMetaText(pageTitle, TITLE_MAX_LENGTH);
  }

  const localizedSiteName = SITE_NAME_BY_LANG[lang] || SITE_NAME;
  const brandedTitle = `${pageTitle} | ${localizedSiteName}`;
  if (brandedTitle.length <= TITLE_MAX_LENGTH) {
    return brandedTitle;
  }

  // If the branded variant exceeds recommended length, prefer an unbranded
  // page title before truncating. This keeps key intent terms visible.
  if (pageTitle.length <= TITLE_MAX_LENGTH) {
    return pageTitle;
  }

  return truncateMetaText(pageTitle, TITLE_MAX_LENGTH);
}

/**
 * Generate meta description with fallback
 * 
 * @param description - Page-specific description (optional)
 * @returns Meta description string
 */
export function generateDescription(description?: string): string {
  debugLog('[SEO] Generating description', { hasCustom: Boolean(description) });
  const rawDescription = (description || DEFAULT_DESCRIPTION).trim();
  return truncateMetaText(rawDescription, DESCRIPTION_MAX_LENGTH);
}

/**
 * Generate canonical URL from path
 * 
 * @param path - Page path (e.g., "/about", "/blog/post")
 * @returns Full canonical URL
 * 
 * Example:
 * - Input: "/about"
 * - Output: "https://www.srijanakimahaltrustofficial.com/about"
 */
export function generateCanonical(path?: string): string {
  debugLog('[SEO] Generating canonical URL', { path: path || '/' });

  // Defensive canonical normalization:
  // - Accept absolute URL or relative path.
  // - Remove query/hash from canonical output.
  // - Keep canonical root as origin without trailing slash.
  if (!path) {
    return SITE_URL;
  }

  const inputPath = path.trim();
  if (!inputPath) {
    return SITE_URL;
  }

  if (ABSOLUTE_URL_PATTERN.test(inputPath)) {
    try {
      const parsed = new URL(inputPath);
      const normalizedPathname = parsed.pathname.replace(/\/$/, '');
      const canonicalAbsolute = `${parsed.origin}${normalizedPathname || ''}`;
      debugLog('[SEO] Canonical absolute URL normalized', { canonicalAbsolute });
      return canonicalAbsolute || SITE_URL;
    } catch (error) {
      debugLog('[SEO] Invalid absolute URL for canonical, fallback to site URL', { inputPath, error });
      return SITE_URL;
    }
  }

  const cleanRelativeInput = inputPath.split('?')[0]?.split('#')[0] || '/';
  const prefixedPath = cleanRelativeInput.startsWith('/') ? cleanRelativeInput : `/${cleanRelativeInput}`;
  const normalizedPath = prefixedPath.replace(/\/$/, '');
  const canonicalRelative = `${SITE_URL}${normalizedPath || ''}`;
  debugLog('[SEO] Canonical relative URL normalized', { canonicalRelative });
  return canonicalRelative;
}

/**
 * Generate keywords array with defaults
 * 
 * @param keywords - Additional page-specific keywords
 * @returns Combined keywords array
 */
export function generateKeywords(keywords?: string[]): string[] {
  debugLog('[SEO] Generating keywords', { additional: keywords?.length ?? 0 });
  const mergedKeywords = keywords ? [...DEFAULT_KEYWORDS, ...keywords] : [...DEFAULT_KEYWORDS];
  return normalizeAndDedupeKeywords(mergedKeywords);
}

/**
 * Generate Open Graph image URL
 * 
 * @param image - Custom OG image path (optional)
 * @returns Full URL to OG image
 */
export function generateOGImage(image?: string): string {
  debugLog('[SEO] Generating OG image', { image: image || 'default' });
  if (!image) return DEFAULT_OG_IMAGE;
  // If image is already a full URL, return as is
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  // Otherwise, prepend site URL
  return `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
}

/**
 * Generate Open Graph tags object
 * 
 * @param config - SEO configuration
 * @returns Object with Open Graph meta tags
 */
export function generateOGTags(config: SEOConfig) {
  const title = generateTitle(config.title, config.lang || 'en');
  const description = generateDescription(config.description);
  const url = generateCanonical(config.canonical);
  const image = generateOGImage(config.ogImage);
  const type = config.ogType || 'website';
  const locale = config.lang === 'hi' ? 'hi_IN' : 'en_IN';
  debugLog('[SEO] Generating Open Graph tags', { type, locale });

  return {
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:image': image,
    'og:type': type,
    'og:site_name': SITE_NAME,
    'og:locale': locale,
  };
}

/**
 * Generate Twitter Card tags object
 * 
 * @param config - SEO configuration
 * @returns Object with Twitter Card meta tags
 */
export function generateTwitterTags(config: SEOConfig) {
  const title = generateTitle(config.title, config.lang || 'en');
  const description = generateDescription(config.description);
  const image = generateOGImage(config.ogImage);
  const url = generateCanonical(config.canonical);
  debugLog('[SEO] Generating Twitter Card tags');

  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:url': url,
  };
}

/**
 * Generate robots meta content
 * 
 * @param noindex - Whether to prevent indexing
 * @returns Robots meta content string
 */
export function generateRobotsContent(noindex?: boolean): string {
  debugLog('[SEO] Generating robots content', { noindex: Boolean(noindex) });
  if (noindex) {
    // Keep strict crawl blocking for utility/private pages.
    return 'noindex,nofollow,noarchive';
  }

  // Encourage richer snippets/previews for indexable pages.
  return 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
}

/**
 * Generate hreflang tags for multilingual support
 * 
 * @param currentPath - Current page path
 * @param alternateLanguages - Array of alternate language URLs
 * @returns Array of hreflang link objects
 */
export function generateHreflangTags(
  currentPath: string,
  alternateLanguages?: { lang: string; url: string }[],
  options?: {
    disableDefaultPair?: boolean;
    lang?: 'en' | 'hi';
  }
): Array<{ rel: string; hreflang: string; href: string }> {
  debugLog('[SEO] Generating hreflang tags', { currentPath });

  const tags: Array<{ rel: string; hreflang: string; href: string }> = [];
  const disableDefaultPair = Boolean(options?.disableDefaultPair);
  const currentLang = options?.lang || detectLangFromPath(currentPath);

  const pushUniqueTag = (tag: { rel: string; hreflang: string; href: string }) => {
    const alreadyExists = tags.some((existing) => existing.hreflang === tag.hreflang && existing.href === tag.href);
    if (!alreadyExists) {
      tags.push(tag);
    }
  };

  const normalizeAlternateUrl = (url: string): string => {
    return url.startsWith('http') ? generateCanonical(url) : generateCanonical(url);
  };

  if (!disableDefaultPair) {
    // Always emit EN/HI hreflang pair for our URL strategy unless explicitly disabled.
    const { enPath, hiPath } = getHreflangTargets(currentPath);
    const enUrl = generateCanonical(enPath);
    const hiUrl = generateCanonical(hiPath);

    pushUniqueTag({ rel: 'alternate', hreflang: 'x-default', href: enUrl });
    pushUniqueTag({ rel: 'alternate', hreflang: 'en', href: enUrl });
    pushUniqueTag({ rel: 'alternate', hreflang: 'hi', href: hiUrl });
  }

  // Optionally add additional alternates if provided (future proof)
  if (alternateLanguages?.length) {
    alternateLanguages.forEach(({ lang, url }) => {
      const fullUrl = normalizeAlternateUrl(url);
      pushUniqueTag({ rel: 'alternate', hreflang: lang, href: fullUrl });
    });
  }

  if (disableDefaultPair) {
    const currentUrl = generateCanonical(currentPath);
    const englishTagUrl = tags.find((tag) => tag.hreflang === 'en')?.href;
    const defaultUrl = englishTagUrl || currentUrl;

    pushUniqueTag({ rel: 'alternate', hreflang: currentLang, href: currentUrl });
    pushUniqueTag({ rel: 'alternate', hreflang: 'x-default', href: defaultUrl });
  }

  return tags;
}

/**
 * Complete SEO data generator
 * 
 * Generates all SEO-related data for a page
 * 
 * @param config - SEO configuration
 * @param currentPath - Current page path (for canonical URL)
 * @returns Complete SEO data object
 */
export function generateSEOData(config: SEOConfig, currentPath?: string) {
  debugLog('[SEO] Generating complete SEO data', { currentPath: currentPath || '/' });

  const inferredLang = detectLangFromPath(currentPath || '/');
  const lang = config.lang || inferredLang;
  const effectivePath = config.canonical || currentPath;
  const canonical = generateCanonical(effectivePath);
  const title = generateTitle(config.title, lang);
  const description = generateDescription(config.description);
  const keywords = generateKeywords(config.keywords);
  const robots = generateRobotsContent(config.noindex);
  const ogTags = generateOGTags({ ...config, canonical, lang });
  const twitterTags = generateTwitterTags({ ...config, canonical, lang });
  const hreflangTags = generateHreflangTags(currentPath || '/', config.alternateLanguages, {
    disableDefaultPair: Boolean(config.disableDefaultHreflangPair),
    lang,
  });

  return {
    title,
    description,
    keywords: keywords.join(', '),
    canonical,
    robots,
    ogTags,
    twitterTags,
    hreflangTags,
    lang,
  };
}

