/**
 * Breadcrumb Schema Utility
 * 
 * Generates BreadcrumbList structured data for SEO.
 * Helps Google understand page hierarchy and display breadcrumbs in search results.
 * 
 * Flow:
 * 1. Define breadcrumb items (name + URL)
 * 2. Generate BreadcrumbList schema
 * 3. Return JSON-LD script content
 */

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
 * @param baseUrl - Base URL for the site (defaults to https://srijanakimahaltrust.in)
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
  baseUrl: string = 'https://srijanakimahaltrust.in'
) {
  console.log('[Breadcrumb Schema] Generating schema for', items.length, 'items');
  
  if (!items || items.length === 0) {
    console.warn('[Breadcrumb Schema] No breadcrumb items provided');
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

  console.log('[Breadcrumb Schema] Schema generated successfully');
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
  console.log('[Breadcrumb Schema] Generating standard breadcrumbs for:', pageName);
  
  return [
    { name: 'Home', url: '/' },
    { name: pageName, url: pageUrl },
  ];
}

