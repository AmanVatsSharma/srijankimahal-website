import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const NOINDEX_BLOG_SLUGS = new Set([
  'how-to-contact-janaki-mahal-trust-official-number',
  'verified-contact-number-shri-janki-mahal',
  'janaki-mahal-trust-ayodhya-official-helpline-number',
  'sri-janaki-mahal-trust-contact-number-address',
  'sri-janki-mahal-trust-contact-details-phone-email-address',

  'sri-janaki-mahal-trust-official-booking-number',
  'sri-janki-mahal-official-booking-guide-2025',

  'sri-janaki-mahal-trust-room-booking-online-number',
  'sri-janaki-mahal-trust-room-booking-online',
  'janaki-mahal-trust-ayodhya-online-booking-steps',
  'sri-janaki-mahal-trust-ayodhya-complete-booking-guide',
  'sri-janaki-mahal-trust-advance-booking-guide',
  'step-by-step-janaki-mahal-booking-whatsapp',

  'sri-janaki-mahal-trust-location-map-address',
  'sri-janaki-mahal-trust-karsewakpuram-address',
  'sri-janki-mahal-trust-vasudev-gath-address',
  'janaki-mahal-karsewakpuram-location-guide',
  'janki-mahal-near-ram-mandir-distance-directions',
  'how-to-reach-sri-janaki-mahal-trust',
  'how-to-reach-sri-janaki-mahal-trust-from-ayodhya-station',
  'reach-janaki-mahal-trust-from-ayodhya-junction',

  'janaki-mahal-trust-room-prices-2025-all-types',
  'sri-janaki-mahal-trust-room-prices-pricing-guide',
  'shri-janki-mahal-amenities-facilities-list',
  'sri-janaki-mahal-trust-services-amenities-facilities',
  'sri-janaki-mahal-trust-group-booking',
  'janaki-mahal-trust-reviews-guest-testimonials',
  'sri-janaki-mahal-trust-reviews-and-ratings',
]);

export default defineConfig({
  site: 'https://www.srijanakimahaltrustofficial.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        if (page.includes('/404') || page.endsWith('.xml')) return false;
        let pathname = page;
        try {
          if (page.startsWith('http://') || page.startsWith('https://')) {
            pathname = new URL(page).pathname;
          }
        } catch {
          pathname = page;
        }

        const normalized = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

        if (normalized.startsWith('/blog/') || normalized.startsWith('/hi/blog/')) {
          const parts = normalized.split('/');
          const slug = parts[2];
          if (slug && NOINDEX_BLOG_SLUGS.has(slug)) return false;
        }

        return true;
      },
    }),
  ],
  vite: {
    ssr: {
      external: ['svgo']
    }
  },
  // Security headers configuration for Vercel
  output: 'static',
  build: {
    assets: '_astro'
  }
});
