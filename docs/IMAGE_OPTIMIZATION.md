# Image Optimization Guide for Sri Janaki Mahal Trust Website

This document outlines the image optimization strategy and best practices for the website.

## Current Status

### Image Formats Used
- **Primary Format:** JPG/JPEG
- **Total Images:** 38+ images in public directory
- **Optimization:** Basic lazy loading implemented

### Optimization Goals
- Convert to WebP format (with fallbacks)
- Implement responsive images (srcset)
- Optimize file sizes
- Improve Core Web Vitals scores
- Reduce LCP (Largest Contentful Paint)

## Implementation Strategy

### 1. Image Optimization Checklist

#### Current Best Practices (Already Implemented)
- ✅ `loading="lazy"` on non-critical images
- ✅ `decoding="async"` for better performance
- ✅ `width` and `height` attributes to prevent layout shift
- ✅ Keyword-rich alt text for SEO

#### To Implement
- [ ] Convert images to WebP format
- [ ] Create responsive srcset for different screen sizes
- [ ] Implement picture element with fallbacks
- [ ] Optimize image compression
- [ ] Use appropriate image sizes for different contexts

### 2. Image Optimization Tools

#### Recommended Tools
1. **Online Tools:**
   - TinyPNG/TinyJPG (compression)
   - Squoosh (WebP conversion)
   - ImageOptim (batch optimization)

2. **Build Tools:**
   - Sharp (Node.js image processing)
   - imagemin (image optimization)
   - @astrojs/image (Astro image optimization)

3. **Command Line:**
   - cwebp (WebP conversion)
   - ImageMagick (image manipulation)

### 3. Image Optimization Standards

#### File Size Targets
- **Hero Images:** < 200KB (optimized)
- **Gallery Images:** < 150KB each
- **Room Images:** < 100KB each
- **Thumbnails:** < 50KB each

#### Dimensions
- **Hero Images:** 1920x1080 (Full HD)
- **Gallery Images:** 1200x800 (optimized)
- **Room Images:** 800x600 (optimized)
- **Thumbnails:** 400x300 (optimized)

#### Format Priority
1. **WebP** (modern browsers, ~30% smaller than JPG)
2. **JPG** (fallback for older browsers)
3. **AVIF** (future, even better compression)

### 4. Responsive Images Implementation

#### Using srcset
```html
<img 
  src="/image.jpg"
  srcset="/image-400w.jpg 400w,
          /image-800w.jpg 800w,
          /image-1200w.jpg 1200w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Description"
  loading="lazy"
  decoding="async"
/>
```

#### Using Picture Element (WebP + Fallback)
```html
<picture>
  <source srcset="/image.webp" type="image/webp">
  <source srcset="/image.jpg" type="image/jpeg">
  <img 
    src="/image.jpg" 
    alt="Description"
    loading="lazy"
    decoding="async"
  />
</picture>
```

### 5. Image Optimization Script

#### Hero LCP variants (recommended)

To generate responsive **AVIF/WebP** variants for the homepage hero (LCP) image, run:

```bash
npm run images:hero
```

This uses [`scripts/optimize-hero-lcp.mjs`](../scripts/optimize-hero-lcp.mjs) and outputs files like:

- `public/sri-janaki-mahal/IMG-20251017-WA0022-640w.avif`
- `public/sri-janaki-mahal/IMG-20251017-WA0022-960w.webp`
- `public/sri-janaki-mahal/IMG-20251017-WA0022-1062w.avif`

`HeroSection.astro` is wired to these variants via a `<picture>` + `srcset`.

#### Manual Conversion Script
Create a script to convert images to WebP:

```bash
#!/bin/bash
# convert-to-webp.sh

for file in public/**/*.{jpg,jpeg,png}; do
  if [ -f "$file" ]; then
    filename="${file%.*}"
    cwebp -q 80 "$file" -o "${filename}.webp"
  fi
done
```

### 6. Image Loading Strategy

#### Critical Images (Above Fold)
- Hero image: `loading="eager"` (already implemented)
- No lazy loading
- Preload for faster LCP

#### Non-Critical Images (Below Fold)
- Gallery images: `loading="lazy"`
- Room images: `loading="lazy"`
- Background images: CSS lazy loading

### 7. Core Web Vitals Optimization

#### LCP (Largest Contentful Paint) - Target: < 2.5s
- Optimize hero image
- Use WebP format
- Implement preload for hero image
- Reduce image size

#### CLS (Cumulative Layout Shift) - Target: < 0.1
- Set width/height attributes (already done)
- Use aspect-ratio CSS
- Reserve space for images

#### FID (First Input Delay) - Target: < 100ms
- Minimize JavaScript
- Defer non-critical scripts
- Use async/defer attributes

### 8. Image CDN Strategy

#### Current Setup
- Images served from same domain
- No CDN configured

#### Future Enhancement
- Consider CDN (Cloudflare, Vercel)
- Automatic image optimization
- Global edge caching

### 9. Image Optimization Checklist

#### For Each Image
- [ ] Converted to WebP
- [ ] JPG fallback available
- [ ] Optimized file size
- [ ] Appropriate dimensions
- [ ] Responsive srcset created
- [ ] Alt text optimized
- [ ] Width/height attributes set
- [ ] Lazy loading (if below fold)
- [ ] Decoding="async"

### 10. Implementation Priority

#### Phase 1: Critical Images (High Priority)
1. Hero image optimization
2. Room images optimization
3. Gallery thumbnail optimization

#### Phase 2: Secondary Images (Medium Priority)
1. Gallery full-size images
2. Background images
3. Icon images

#### Phase 3: Enhancement (Low Priority)
1. AVIF format support
2. CDN integration
3. Advanced lazy loading

## Monitoring

### Tools to Monitor
- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- Core Web Vitals report (GSC)

### Metrics to Track
- LCP score
- CLS score
- FID/INP score
- Image load times
- Total page weight

## Next Steps

1. **Install image optimization tools**
2. **Convert images to WebP format**
3. **Create responsive srcset versions**
4. **Implement picture elements**
5. **Test and measure improvements**
6. **Monitor Core Web Vitals**

## Resources

- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Astro Image Optimization](https://docs.astro.build/en/guides/images/)
- [WebP Guide](https://developers.google.com/speed/webp)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

---

**Last Updated:** 2025-02-05
**Status:** Documentation created, implementation pending

