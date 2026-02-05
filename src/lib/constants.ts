/**
 * File: Astro/src/lib/constants.ts
 * Module: astro-core
 * Purpose: Centralized site constants (contact + links).
 * Author: Aman Sharma / NovologicAI
 * Last-updated: 2026-02-01
 * Notes:
 * - Keep these values consistent with on-site NAP and schema.org JSON-LD.
 * - Avoid adding production console logging here (policy + CWV).
 */

// Mobile Number Constants
// Update this number to change it everywhere in the application
export const MOBILE_NUMBER = '8679304702';

// Official contact email (chosen as primary in SEO plan)
export const OFFICIAL_EMAIL = 'srijanakimahaltrust7484@gmail.com';

// Formatted display versions
export const DISPLAY_PHONE = `+91 ${MOBILE_NUMBER}`;
export const DISPLAY_PHONE_WITH_DASH = `+91-${MOBILE_NUMBER}`;

// URL formats for links
export const TEL_LINK = `tel:+91${MOBILE_NUMBER}`;
export const WHATSAPP_LINK = `https://wa.me/91${MOBILE_NUMBER}`;

// For WhatsApp links with pre-filled messages
export const WHATSAPP_BOOKING_MESSAGE = 'Hello%20Sri%20Janaki%20Mahal%2C%20I%20would%20like%20to%20book%20a%20room';
export const WHATSAPP_BOOKING_LINK = `${WHATSAPP_LINK}?text=${WHATSAPP_BOOKING_MESSAGE}`;

// Hindi WhatsApp message
export const WHATSAPP_BOOKING_MESSAGE_HI = 'नमस्ते%20श्री%20जानकी%20महल%2C%20मुझे%20कमरा%20बुक%20करना%20है।';
export const WHATSAPP_BOOKING_LINK_HI = `${WHATSAPP_LINK}?text=${WHATSAPP_BOOKING_MESSAGE_HI}`;

// For structured data (schema.org)
export const SCHEMA_TELEPHONE = `+91-${MOBILE_NUMBER}`;
