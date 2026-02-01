/**
 * File: Astro/src/lib/schemas/breadcrumb.ts
 * Module: astro-seo
 * Purpose: Generate BreadcrumbList JSON-LD for pages.
 * Author: Aman Sharma / NovologicAI
 * Last-updated: 2026-02-01
 * Notes:
 * - Keep URLs absolute in output to avoid Rich Results parsing issues.
 * - Avoid production console logging.
 */

function debugLog(message: string, data?: unknown) {
  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.debug(message, data ?? '');
  }
}

/**
 * Breadcrumb Item Interface
 * 
 * Represents a single breadcrumb navigation item
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList Schema
 * 
 * Creates structured data for breadcrumb navigation following Schema.org BreadcrumbList format.
 * 
 * @param items - Array of breadcrumb items (should include home page first)
 * @param baseUrl - Base URL for the site (defaults to https://www.srijanakimahaltrustofficial.com)
 * @returns JSON-LD schema object
 * 
 * Example:
 * ```ts
 * const breadcrumbs = [
 *   { name: "Home", url: "/" },
 *   { name: "About", url: "/about" }
 * ];
 * const schema = generateBreadcrumbSchema(breadcrumbs);
 * ```
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  baseUrl: string = 'https://www.srijanakimahaltrustofficial.com'
) {
  debugLog('[Breadcrumb Schema] Generating schema', { items: items.length });
  
  if (!items || items.length === 0) {
    return null;
  }

  // Ensure all URLs are absolute
  const breadcrumbItems = items.map((item, index) => {
    let fullUrl = item.url;
    
    // Make URL absolute if it's relative
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `${baseUrl}${fullUrl.startsWith('/') ? fullUrl : `/${fullUrl}`}`;
    }
    
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: fullUrl,
    };
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  return schema;
}

/**
 * Generate breadcrumbs for common pages
 * 
 * Helper function to create standard breadcrumb paths
 * 
 * @param pageName - Name of current page
 * @param pageUrl - URL of current page (relative)
 * @returns Array of breadcrumb items
 */
export function generateStandardBreadcrumbs(
  pageName: string,
  pageUrl: string
): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: pageName, url: pageUrl },
  ];
}

