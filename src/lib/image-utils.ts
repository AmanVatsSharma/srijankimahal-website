/**
 * Image Optimization Utilities
 * 
 * Provides utilities for responsive images, WebP conversion detection,
 * and image optimization helpers for SEO and performance.
 * 
 * Flow:
 * 1. Check browser support for WebP
 * 2. Generate responsive image srcsets
 * 3. Provide optimized image paths
 * 4. Helper functions for image optimization
 */

/**
 * Check if browser supports WebP format
 * 
 * @returns Promise<boolean> - True if WebP is supported
 */
export async function supportsWebP(): Promise<boolean> {
  if (typeof window === 'undefined') return true; // SSR default to true
  
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Generate responsive image srcset
 * 
 * @param basePath - Base image path without extension
 * @param widths - Array of widths for srcset
 * @param format - Image format ('webp' | 'jpg' | 'jpeg')
 * @returns srcset string
 * 
 * Example:
 * ```ts
 * generateSrcset('/rooms/room-1', [400, 800, 1200], 'webp')
 * // Returns: '/rooms/room-1-400w.webp 400w, /rooms/room-1-800w.webp 800w, /rooms/room-1-1200w.webp 1200w'
 * ```
 */
export function generateSrcset(
  basePath: string,
  widths: number[],
  format: 'webp' | 'jpg' | 'jpeg' = 'webp'
): string {
  const extension = format === 'webp' ? 'webp' : 'jpg';
  return widths
    .map((width) => `${basePath}-${width}w.${extension} ${width}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * 
 * @param breakpoints - Breakpoint configuration
 * @returns sizes string
 * 
 * Example:
 * ```ts
 * generateSizes({ mobile: '100vw', tablet: '50vw', desktop: '33vw' })
 * // Returns: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
 * ```
 */
export function generateSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const parts: string[] = [];
  
  if (breakpoints.mobile) {
    parts.push(`(max-width: 768px) ${breakpoints.mobile}`);
  }
  if (breakpoints.tablet) {
    parts.push(`(max-width: 1200px) ${breakpoints.tablet}`);
  }
  if (breakpoints.desktop) {
    parts.push(breakpoints.desktop);
  }
  
  return parts.join(', ') || '100vw';
}

/**
 * Get optimized image path with WebP fallback
 * 
 * @param basePath - Base image path
 * @param preferWebP - Whether to prefer WebP (default: true)
 * @returns Object with webp and fallback paths
 */
export function getOptimizedImagePaths(
  basePath: string,
  preferWebP: boolean = true
): { webp: string; fallback: string } {
  const webpPath = basePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const fallbackPath = basePath.replace(/\.webp$/i, '.jpg');
  
  return {
    webp: preferWebP ? webpPath : basePath,
    fallback: preferWebP ? basePath : fallbackPath,
  };
}

/**
 * Image optimization configuration
 */
export const IMAGE_CONFIG = {
  // Standard image widths for srcset
  widths: {
    thumbnail: [200, 400],
    small: [400, 800],
    medium: [600, 1200],
    large: [800, 1600],
    hero: [1200, 1920],
  },
  
  // Quality settings
  quality: {
    webp: 80,
    jpg: 85,
    thumbnail: 75,
  },
  
  // Breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1200,
    desktop: 1920,
  },
} as const;

/**
 * Generate complete responsive image attributes
 * 
 * @param basePath - Base image path
 * @param alt - Alt text
 * @param options - Additional options
 * @returns Object with image attributes
 */
export function generateResponsiveImage(
  basePath: string,
  alt: string,
  options: {
    widths?: number[];
    sizes?: string;
    loading?: 'lazy' | 'eager';
    decoding?: 'async' | 'sync' | 'auto';
    priority?: 'high' | 'low' | 'auto';
  } = {}
) {
  const {
    widths = IMAGE_CONFIG.widths.medium,
    sizes = generateSizes({ mobile: '100vw', tablet: '50vw', desktop: '33vw' }),
    loading = 'lazy',
    decoding = 'async',
  } = options;

  const webpSrcset = generateSrcset(basePath, widths, 'webp');
  const jpgSrcset = generateSrcset(basePath, widths, 'jpg');
  const { webp, fallback } = getOptimizedImagePaths(basePath);

  return {
    alt,
    loading,
    decoding,
    sizes,
    webpSrcset,
    jpgSrcset,
    webpSrc: webp,
    fallbackSrc: fallback,
  };
}

console.log('[Image Utils] Image optimization utilities loaded');

