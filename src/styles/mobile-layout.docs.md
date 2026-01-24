# Mobile Layout Alignment Guide

This document explains the **mobile-first layout rules** used across the site to prevent common issues like:

- horizontal “sideways scroll” on phones
- clipped carousel cards (content starting off-screen)
- inconsistent section padding between pages
- unstable hero height due to mobile browser UI (address bar)

## Standard Container (All Pages + Sections)

Use the same container everywhere so alignment is consistent across routes:

- Outer section/page background: `bg-*` + vertical padding (e.g. `py-12`, `py-16 sm:py-24`)
- Inner container: `max-w-* mx-auto px-4 sm:px-6 lg:px-8`

Why: mixing `md:px-12 lg:px-24` with other sections causes **visible left/right misalignment** on tablet/desktop and “tight vs wide” shifts on mobile.

## Global Overflow Guard (Side-Scroll Prevention)

In `src/styles/global.css` we enforce:

- `html, body { overflow-x: hidden; max-width: 100%; }`

This is a safety net for transforms/animations (marquees, carousels) that can otherwise push content outside the viewport and create mobile side-scroll.

## Carousels / Auto-Scrolling Galleries

### Gallery lanes (`src/components/GallerySection.astro`)

Rules:

- Use **responsive card widths** on mobile: `w-[85vw] max-w-sm`
- Keep desktop fixed cards: `sm:w-80`
- Add lane padding: `px-4` and track padding `pr-4` so the first/last cards are not clipped.

### Testimonials (`src/components/TestimonialsSection.astro`)

Rules:

- On mobile: allow **manual swipe** (`overflow-x-auto`) + `snap-x snap-mandatory` so each card aligns cleanly.
- Only enable **auto-scroll animation** on `md+` to avoid the “content drifting” feeling on phones.

## Hero Height Stability

In `src/components/HeroSection.astro`:

- Use `min-h-[calc(100svh-4rem)] md:min-h-screen`

This prevents the hero from feeling “too tall” on phones with a sticky header and reduces layout jumpiness caused by mobile browser UI changes.

## Debug Logging (For Later Troubleshooting)

Key components log setup/runtime events:

- `Header`: mobile menu open/close and initialization
- `HeroSection`: CTA binding + click events
- `RoomsSection`: modal open/close + listener counts
- `FloatingWhatsApp`: bubble show/close events

## Quick QA Checklist (Mobile)

- No horizontal scroll when swiping left/right on any page
- Header menu opens/closes cleanly and closes on outside click
- Hero CTAs are full-width on mobile and centered
- Gallery/testimonials cards are not clipped on the left edge
- Modal content has comfortable padding on small screens

## Flow Chart (Layout Alignment)

```text
Route renders
  -> Layout.astro loads global.css
    -> Global overflow guard prevents side-scroll
      -> Page/section uses standard container (max-w + px-*)
        -> Carousels use mobile-responsive widths + padding
          -> QA: swipe + scroll + modal open/close
```

