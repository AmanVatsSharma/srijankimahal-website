# HeroSection Component

Purpose: Render the homepage hero with a high-contrast background image, top booking banner, bold title, and primary/secondary CTAs.

## Key Elements

- Background image: `/sri-janaki-mahal/IMG-20251017-WA0022.jpg` with brightness/contrast/saturation enhancements and dark gradient overlay for legibility.
- Trust badge: "Sri Janaki Mahal Trust" pill shown above the booking badge.
- Top banner: "Online Room Booking Advance" pill shown above the main heading.
- Heading: "Book Your Sacred Stay at Sri Janaki Mahal Trust" (accent color, bold, with small text shadow for legibility).
- CTAs:
- Book Now (white outlined, centered, bold text): WhatsApp deep-link with preset message for quick booking.
  - Call Now (orange/amber) and WhatsApp (green) buttons side-by-side below the Book Now button.
- Phone/WhatsApp number used: `+91 8679304702` (`tel:+918679304702`, `https://wa.me/918679304702`).
- Accessibility: semantic `section` with clear `aria-label` for CTAs.

## Interaction Flow

```text
[Hero mounts]
   |
   v
[Bind CTA click listeners]
   |
   v
[User clicks CTA] --> [console.log("[Hero] CTA clicked:", id)]
   |
   +--> Book Now  -> WhatsApp link with preset text
   |
   +--> Call Now  -> tel: link invokes dialer
   |
   +--> WhatsApp  -> wa.me link opens chat
```

## Customization Notes

- Image: replace the image path in `HeroSection.astro` if needed. Keep a strong dark overlay (`from-black/70 via-black/50 to-black/20`) for readability.
- Copy: adjust heading/subtitle and banner text inline in the component.
- Numbers: update all instances of phone/WhatsApp numbers in `Header.astro`, `HeroSection.astro`, `RoomsSection.astro`, `ContactSection.astro`, and `Footer.astro` to keep consistency if you ever change them.

## Troubleshooting

- If the hero text looks washed out, increase overlay opacity or tweak `brightness-110 contrast-125 saturate-125` utilities.
- If Tailwind classes seem missing, ensure the file path is included in `tailwind.config.cjs -> content` (it is by default for `src/**/*.astro`).
- Open DevTools console to confirm CTA logs appear on click. If not, check that element IDs (`hero-book-now`, `hero-call`, `hero-whatsapp`) exist.


