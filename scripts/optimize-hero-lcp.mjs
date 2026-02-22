/**
 * @file optimize-hero-lcp.mjs
 * @module astro-performance
 * @description Generates AVIF/WebP responsive variants for the homepage LCP hero image.
 * @author BharatERP
 * @created 2026-02-22
 */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = path.resolve(process.cwd());
const INPUT_RELATIVE = path.join('public', 'sri-janaki-mahal', 'IMG-20251017-WA0022.jpg');
const INPUT_PATH = path.join(ROOT_DIR, INPUT_RELATIVE);

const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'sri-janaki-mahal');
const OUTPUT_BASENAME = 'IMG-20251017-WA0022';

const TARGET_WIDTHS = [640, 960, 1280, 1920];

const AVIF_OPTIONS = { quality: 50, effort: 5 };
const WEBP_OPTIONS = { quality: 72, effort: 5 };

async function generateVariants() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const image = sharp(INPUT_PATH, { failOn: 'none' });
  const metadata = await image.metadata();
  const sourceWidth = metadata.width ?? 0;

  const tasks = TARGET_WIDTHS.map(async (width) => {
    const safeWidth = sourceWidth > 0 ? Math.min(width, sourceWidth) : width;

    const base = sharp(INPUT_PATH, { failOn: 'none' }).resize({
      width: safeWidth,
      withoutEnlargement: true,
    });

    const avifOut = path.join(OUTPUT_DIR, `${OUTPUT_BASENAME}-${width}w.avif`);
    const webpOut = path.join(OUTPUT_DIR, `${OUTPUT_BASENAME}-${width}w.webp`);

    await Promise.all([
      base.clone().avif(AVIF_OPTIONS).toFile(avifOut),
      base.clone().webp(WEBP_OPTIONS).toFile(webpOut),
    ]);
  });

  await Promise.all(tasks);
}

await generateVariants();

