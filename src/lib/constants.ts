/**
 * Centralized Constants for Sri Janaki Mahal Trust
 * 
 * This file contains all frequently updated constants like contact numbers.
 * Update these values in one place to change them across the entire application.
 * 
 * Last Updated: 2025-01-XX
 */

// Mobile Number Constants
// Update this number to change it everywhere in the application
export const MOBILE_NUMBER = '7206021805';

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

// Console log helper for debugging
export const logPhoneUpdate = () => {
  console.log('[Constants] Mobile number loaded:', DISPLAY_PHONE);
};
