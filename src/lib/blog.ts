/**
 * File: Astro/src/lib/blog.ts
 * Module: astro-content
 * Purpose: Load blog markdown frontmatter for listings and pagination.
 * Author: Aman Sharma / NovologicAI
 * Last-updated: 2026-02-01
 * Notes:
 * - Uses `import.meta.glob()` to discover markdown posts at build time.
 * - Keeps parsing lightweight (frontmatter + rough read-time).
 */

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  keywords?: string[];
  readTime?: string;
};

type MarkdownModule = {
  frontmatter: BlogFrontmatter;
  rawContent?: string | (() => Promise<string>);
  compiledContent?: () => Promise<string>;
};

export type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
};

function stripFrontmatter(raw: string): string {
  // Remove leading YAML frontmatter if present (--- ... ---)
  if (!raw.startsWith('---')) return raw;
  const parts = raw.split('---');
  // parts[0] is empty string before first ---; parts[1] is frontmatter; rest is content
  return parts.slice(2).join('---').trim();
}

function calculateReadTime(content: string | undefined): string {
  const safeContent = content?.trim();
  if (!safeContent) return '5 min read';
  const words = safeContent.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

async function resolveRawContent(mod: MarkdownModule): Promise<string> {
  if (typeof mod.rawContent === 'string') return mod.rawContent;
  if (typeof mod.rawContent === 'function') return await mod.rawContent();
  if (typeof mod.compiledContent === 'function') return await mod.compiledContent();
  return '';
}

export async function getAllBlogPosts(): Promise<BlogListItem[]> {
  const blogImports = import.meta.glob('../content/blog/*.md');

  const entries = await Promise.all(
    Object.entries(blogImports).map(async ([path, resolver]) => {
      const mod = (await resolver()) as MarkdownModule;
      const slug = path.split('/').pop()?.replace('.md', '') ?? '';
      const raw = await resolveRawContent(mod);
      const readTime = mod.frontmatter.readTime ?? calculateReadTime(stripFrontmatter(raw));

      return {
        slug,
        title: mod.frontmatter.title,
        description: mod.frontmatter.description,
        date: mod.frontmatter.date,
        readTime,
      } satisfies BlogListItem;
    })
  );

  // Sort newest first
  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return entries;
}

export async function getAllBlogPostsByLang(lang: 'en' | 'hi'): Promise<BlogListItem[]> {
  const imports = lang === 'hi' ? import.meta.glob('../content/blog/hi/*.md') : import.meta.glob('../content/blog/*.md');

  const entries = await Promise.all(
    Object.entries(imports).map(async ([path, resolver]) => {
      const mod = (await resolver()) as MarkdownModule;
      const slug = path.split('/').pop()?.replace('.md', '') ?? '';
      const raw = await resolveRawContent(mod);
      const readTime = mod.frontmatter.readTime ?? calculateReadTime(stripFrontmatter(raw));

      return {
        slug,
        title: mod.frontmatter.title,
        description: mod.frontmatter.description,
        date: mod.frontmatter.date,
        readTime,
      } satisfies BlogListItem;
    })
  );

  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return entries;
}

