import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.srijanakimahaltrustofficial.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.endsWith('.xml'),
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
