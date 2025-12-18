/**
 * SEO Utility Functions
 * 
 * This module provides utilities for generating dynamic SEO meta tags,
 * canonical URLs, Open Graph tags, and Twitter Card tags.
 * 
 * Flow:
 * 1. Generate title with site name suffix
 * 2. Generate description with defaults
 * 3. Generate canonical URL from path
 * 4. Generate keywords array
 * 5. Generate Open Graph tags
 * 6. Generate Twitter Card tags
 */

import { DISPLAY_PHONE } from './constants';

// Base site configuration
const SITE_URL = 'https://srijanakimahaltrust.in';
const SITE_NAME = 'Sri Janaki Mahal Trust';
const DEFAULT_TITLE = 'Sri Janaki Mahal - Comfortable Hotel in Ayodhya';
const DEFAULT_DESCRIPTION = `Sri Janaki Mahal Trust - Best hotel stay in Ayodhya. Book comfortable rooms near Ram Mandir. All meals included. Call ${DISPLAY_PHONE}.`;
const DEFAULT_KEYWORDS = [
  'Sri Janaki Mahal Trust',
  'Sri Janaki Mahal',
  'Sri Janaki Mahal Ayodhya',
  'Janaki Mahal Trust',
  'janaki mahal trust',
  'sri janki mahal trust ayodhya',
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
export function generateTitle(title?: string): string {
  console.log('[SEO] Generating title:', title);
  const pageTitle = title || DEFAULT_TITLE;
  return `${pageTitle} | ${SITE_NAME}`;
}

/**
 * Generate meta description with fallback
 * 
 * @param description - Page-specific description (optional)
 * @returns Meta description string
 */
export function generateDescription(description?: string): string {
  console.log('[SEO] Generating description:', description ? 'custom' : 'default');
  return description || DEFAULT_DESCRIPTION;
}

/**
 * Generate canonical URL from path
 * 
 * @param path - Page path (e.g., "/about", "/blog/post")
 * @returns Full canonical URL
 * 
 * Example:
 * - Input: "/about"
 * - Output: "https://srijanakimahaltrust.in/about"
 */
export function generateCanonical(path?: string): string {
  console.log('[SEO] Generating canonical URL for path:', path || '/');
  const cleanPath = path?.replace(/\/$/, '') || '';
  return `${SITE_URL}${cleanPath || ''}`;
}

/**
 * Generate keywords array with defaults
 * 
 * @param keywords - Additional page-specific keywords
 * @returns Combined keywords array
 */
export function generateKeywords(keywords?: string[]): string[] {
  console.log('[SEO] Generating keywords:', keywords?.length || 0, 'additional keywords');
  return keywords ? [...DEFAULT_KEYWORDS, ...keywords] : DEFAULT_KEYWORDS;
}

/**
 * Generate Open Graph image URL
 * 
 * @param image - Custom OG image path (optional)
 * @returns Full URL to OG image
 */
export function generateOGImage(image?: string): string {
  console.log('[SEO] Generating OG image URL:', image || 'default');
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
  const title = generateTitle(config.title);
  const description = generateDescription(config.description);
  const url = generateCanonical(config.canonical);
  const image = generateOGImage(config.ogImage);
  const type = config.ogType || 'website';
  const locale = config.lang === 'hi' ? 'hi_IN' : 'en_IN';

  console.log('[SEO] Generating Open Graph tags:', { title, type, locale });

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
  const title = generateTitle(config.title);
  const description = generateDescription(config.description);
  const image = generateOGImage(config.ogImage);
  const url = generateCanonical(config.canonical);

  console.log('[SEO] Generating Twitter Card tags');

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
  console.log('[SEO] Generating robots content:', noindex ? 'noindex, nofollow' : 'index, follow');
  return noindex ? 'noindex,nofollow' : 'index,follow';
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
  alternateLanguages?: { lang: string; url: string }[]
): Array<{ rel: string; hreflang: string; href: string }> {
  console.log('[SEO] Generating hreflang tags for path:', currentPath);
  
  const tags: Array<{ rel: string; hreflang: string; href: string }> = [];
  
  // Add current language
  const currentUrl = generateCanonical(currentPath);
  tags.push({ rel: 'alternate', hreflang: 'x-default', href: currentUrl });
  
  // Add alternate languages if provided
  if (alternateLanguages) {
    alternateLanguages.forEach(({ lang, url }) => {
      const fullUrl = url.startsWith('http') ? url : generateCanonical(url);
      tags.push({ rel: 'alternate', hreflang: lang, href: fullUrl });
    });
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
  console.log('[SEO] Generating complete SEO data for:', currentPath || '/');
  
  const canonical = generateCanonical(config.canonical || currentPath);
  const title = generateTitle(config.title);
  const description = generateDescription(config.description);
  const keywords = generateKeywords(config.keywords);
  const robots = generateRobotsContent(config.noindex);
  const ogTags = generateOGTags({ ...config, canonical });
  const twitterTags = generateTwitterTags({ ...config, canonical });
  const hreflangTags = config.alternateLanguages 
    ? generateHreflangTags(currentPath || '/', config.alternateLanguages)
    : [];

  return {
    title,
    description,
    keywords: keywords.join(', '),
    canonical,
    robots,
    ogTags,
    twitterTags,
    hreflangTags,
    lang: config.lang || 'en',
  };
}

