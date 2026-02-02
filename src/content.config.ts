/**
 * File: Astro/src/content.config.ts
 * Module: astro-content
 * Purpose: Define Astro content collections + frontmatter validation.
 * Author: Aman Sharma / NovologicAI
 * Last-updated: 2026-02-01
 * Notes:
 * - Keeps builds deterministic by validating blog frontmatter fields.
 * - Covers both EN (`src/content/blog/*.md`) and HI (`src/content/blog/hi/*.md`) via single `blog` collection.
 */

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // YAML may parse `YYYY-MM-DD` as a Date; accept both.
    date: z.coerce.date(),
    keywords: z.array(z.string()).optional(),
    readTime: z.string().optional(),
  }),
});

export const collections = {
  blog,
};

