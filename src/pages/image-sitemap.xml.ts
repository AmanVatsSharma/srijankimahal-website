/**
 * @file image-sitemap.xml.ts
 * @module seo
 * @description Automatically generates image sitemap from public assets.
 * @author BharatERP
 * @created 2026-02-15
 */

import { readdir, stat } from 'node:fs/promises';
import { extname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://www.srijanakimahaltrustofficial.com';
const PUBLIC_DIR = fileURLToPath(new URL('../../public', import.meta.url));
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

type SitemapImageEntry = {
  imageUrl: string;
  title: string;
  caption: string;
  lastmod: string;
};

type GroupedSitemapEntry = {
  pagePath: string;
  lastmod: string;
  images: SitemapImageEntry[];
};

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toTitleFromFile(relativePath: string): string {
  const filename = relativePath.split('/').pop() ?? relativePath;
  const baseName = filename.replace(/\.[^.]+$/, '');
  return baseName
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function inferPagePath(relativePath: string): string {
  const lowerPath = relativePath.toLowerCase();

  if (lowerPath.startsWith('rooms/')) return '/rooms';
  if (lowerPath.includes('booking')) return '/booking';
  if (lowerPath.includes('official')) return '/official';
  if (lowerPath.includes('contact')) return '/contact-number';
  if (lowerPath.includes('gallery')) return '/';
  if (lowerPath.includes('location') || lowerPath.includes('ayodhya')) return '/location/ayodhya';

  return '/';
}

async function discoverImages(directoryPath: string, basePath = ''): Promise<Array<{ relativePath: string; lastmod: string }>> {
  const directoryEntries = await readdir(directoryPath, { withFileTypes: true });
  const discovered: Array<{ relativePath: string; lastmod: string }> = [];

  for (const entry of directoryEntries) {
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    const absolutePath = join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      const nestedImages = await discoverImages(absolutePath, relativePath);
      discovered.push(...nestedImages);
      continue;
    }

    const extension = extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    if (entry.name.toLowerCase().includes('placeholder')) {
      continue;
    }

    const fileStats = await stat(absolutePath);
    discovered.push({
      relativePath: relativePath.split('\\').join('/'),
      lastmod: fileStats.mtime.toISOString(),
    });
  }

  return discovered;
}

function buildGroupedEntries(images: Array<{ relativePath: string; lastmod: string }>): GroupedSitemapEntry[] {
  const groupedMap = new Map<string, GroupedSitemapEntry>();

  for (const image of images) {
    const pagePath = inferPagePath(image.relativePath);
    const currentGroup = groupedMap.get(pagePath) ?? {
      pagePath,
      lastmod: image.lastmod,
      images: [],
    };

    const normalizedPath = posix.normalize(`/${image.relativePath}`).replace(/\/{2,}/g, '/');
    const imageUrl = `${SITE_URL}${encodeURI(normalizedPath)}`;
    const title = toTitleFromFile(image.relativePath);

    currentGroup.images.push({
      imageUrl,
      title,
      caption: `${title} - Sri Janaki Mahal Trust`,
      lastmod: image.lastmod,
    });

    if (image.lastmod > currentGroup.lastmod) {
      currentGroup.lastmod = image.lastmod;
    }

    groupedMap.set(pagePath, currentGroup);
  }

  return Array.from(groupedMap.values()).sort((a, b) => a.pagePath.localeCompare(b.pagePath));
}

export async function GET() {
  const discoveredImages = await discoverImages(PUBLIC_DIR);
  const groupedEntries = buildGroupedEntries(discoveredImages);

  const urlBlocks = groupedEntries
    .map((entry) => {
      const pageUrl = `${SITE_URL}${entry.pagePath === '/' ? '/' : entry.pagePath}`;
      const imageBlocks = entry.images
        .map((image) => {
          return [
            '    <image:image>',
            `      <image:loc>${escapeXml(image.imageUrl)}</image:loc>`,
            `      <image:caption>${escapeXml(image.caption)}</image:caption>`,
            `      <image:title>${escapeXml(image.title)}</image:title>`,
            '      <image:geo_location>Ayodhya, Uttar Pradesh</image:geo_location>',
            `      <image:license>${escapeXml(SITE_URL)}</image:license>`,
            '    </image:image>',
          ].join('\n');
        })
        .join('\n');

      return [
        '  <url>',
        `    <loc>${escapeXml(pageUrl)}</loc>`,
        `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
        imageBlocks,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urlBlocks,
    '</urlset>',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
