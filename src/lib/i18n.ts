/**
 * File: Astro/src/lib/i18n.ts
 * Module: astro-i18n
 * Purpose: Lightweight URL-based i18n helpers for EN/HI routes.
 * Author: Aman Sharma / NovologicAI
 * Last-updated: 2026-02-01
 * Notes:
 * - URL strategy: English is default (no prefix), Hindi uses `/hi`.
 * - These helpers only deal with paths; they do not translate content.
 */

export type SupportedLang = 'en' | 'hi';

const HI_PREFIX = '/hi';

export function detectLangFromPath(pathname: string): SupportedLang {
  return pathname === HI_PREFIX || pathname.startsWith(`${HI_PREFIX}/`) ? 'hi' : 'en';
}

export function stripLangPrefix(pathname: string): string {
  if (pathname === HI_PREFIX) return '/';
  if (pathname.startsWith(`${HI_PREFIX}/`)) return pathname.replace(HI_PREFIX, '') || '/';
  return pathname || '/';
}

export function withLangPrefix(pathname: string, lang: SupportedLang): string {
  const base = stripLangPrefix(pathname);
  if (lang === 'hi') {
    return base === '/' ? HI_PREFIX : `${HI_PREFIX}${base}`;
  }
  return base;
}

export function getAlternateLang(lang: SupportedLang): SupportedLang {
  return lang === 'hi' ? 'en' : 'hi';
}

export function getHreflangTargets(pathname: string): {
  currentLang: SupportedLang;
  enPath: string;
  hiPath: string;
} {
  const currentLang = detectLangFromPath(pathname);
  const base = stripLangPrefix(pathname);
  return {
    currentLang,
    enPath: base,
    hiPath: withLangPrefix(base, 'hi'),
  };
}

