# Mobile Number Constants Documentation

## Overview

The mobile number is now centralized in a single constants file to make updates easier. When you need to change the mobile number, update it in **one place** and it will change everywhere automatically.

## Constants File Location

**File:** `src/lib/constants.ts`

## How to Update Mobile Number

1. Open `src/lib/constants.ts`
2. Find the `MOBILE_NUMBER` constant (line ~12)
3. Update the value:
   ```typescript
   export const MOBILE_NUMBER = '8854944822'; // Change this number
   ```
4. Save the file - all references will automatically update!

## Available Constants

The constants file exports the following:

- `MOBILE_NUMBER` - Raw 10-digit number (e.g., '8854944822')
- `DISPLAY_PHONE` - Formatted for display (e.g., '+91 8854944822')
- `DISPLAY_PHONE_WITH_DASH` - With dash separator (e.g., '+91-8854944822')
- `TEL_LINK` - For tel: links (e.g., 'tel:+918854944822')
- `WHATSAPP_LINK` - Base WhatsApp link (e.g., 'https://wa.me/918854944822')
- `WHATSAPP_BOOKING_LINK` - WhatsApp with English booking message
- `WHATSAPP_BOOKING_LINK_HI` - WhatsApp with Hindi booking message
- `SCHEMA_TELEPHONE` - For structured data (e.g., '+91-8854944822')

## Usage in Code

### In Astro Components (.astro files)

```astro
---
import { DISPLAY_PHONE, TEL_LINK, WHATSAPP_LINK } from '../lib/constants';
---

<a href={TEL_LINK}>Call {DISPLAY_PHONE}</a>
<a href={WHATSAPP_LINK}>WhatsApp Us</a>
```

### In TypeScript Files (.ts files)

```typescript
import { DISPLAY_PHONE, TEL_LINK } from './constants';

const answer = `Call us at ${DISPLAY_PHONE} for booking.`;
```

### In Markdown Files (.md files)

**Note:** Markdown files cannot directly import constants. For blog posts and documentation:

1. **Option 1:** Use the formatted number directly (will need manual update)
2. **Option 2:** Use a build-time script to replace placeholders
3. **Option 3:** Document the current number in the markdown

For blog posts, we recommend documenting the pattern:
```markdown
Contact us at +91 8854944822 (update this when MOBILE_NUMBER changes)
```

## Files Using Constants

### Components (Auto-updated)
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/HeroSection.astro`
- `src/components/RoomsSection.astro`
- `src/components/FloatingWhatsApp.astro`
- `src/components/ContactSection.astro`

### Pages (Auto-updated)
- `src/pages/index.astro`
- `src/pages/contact-number.astro`
- `src/pages/rooms/[slug].astro`
- Most other page files

### Library Files (Auto-updated)
- `src/lib/seo.ts`
- `src/lib/schemas/faq.ts`
- `src/layouts/Layout.astro`

### Files Requiring Manual Update

These files contain hardcoded numbers and need manual updates:

1. **Blog Markdown Files** (`src/content/blog/*.md`)
   - These are static content files
   - Update manually or use a find/replace script
   - Pattern: Search for `+91 8854944822` and replace

2. **Documentation Files** (`docs/*.md`)
   - Update manually when number changes
   - Document the current number

3. **Public Files** (`public/.well-known/security.txt`)
   - Update manually for security contact

## Update Script (Optional)

For bulk updates in markdown files, you can use:

```bash
# Update all markdown files
find src/content/blog -name "*.md" -exec sed -i 's/OLD_NUMBER/NEW_NUMBER/g' {} \;
find docs -name "*.md" -exec sed -i 's/OLD_NUMBER/NEW_NUMBER/g' {} \;
```

## Verification

After updating `MOBILE_NUMBER`:

1. Run build: `npm run build`
2. Check for any TypeScript errors
3. Verify phone numbers appear correctly in:
   - Component links
   - Page content
   - Structured data (schema.org)
   - FAQ answers

## Best Practices

1. **Always update constants.ts first** - This ensures all TypeScript/Astro files update automatically
2. **Test the build** - Run `npm run build` to catch any issues
3. **Update markdown files** - Use find/replace for blog/docs
4. **Verify structured data** - Check that schema.org JSON-LD uses the correct number
5. **Update documentation** - Keep this file and other docs updated

## Example: Complete Update Process

```bash
# 1. Update constants file
# Edit src/lib/constants.ts: MOBILE_NUMBER = 'NEW_NUMBER'

# 2. Build to verify TypeScript files
npm run build

# 3. Update markdown files (if needed)
find src/content/blog -name "*.md" -exec sed -i 's/8854944822/NEW_NUMBER/g' {} \;

# 4. Update documentation
# Edit docs/MOBILE_NUMBER_CONSTANTS.md with new number

# 5. Test the site
npm run dev
```

## Support

If you encounter issues:
1. Check TypeScript compilation errors
2. Verify imports are correct
3. Ensure template literals use backticks (`) not quotes
4. Check that constants are exported correctly
