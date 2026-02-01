/**
 * File: Astro/src/lib/schemas/booking.ts
 * Module: astro-seo
 * Purpose: Generate booking-related structured data (ReservationAction/BookAction).
 * Author: Aman Sharma / NovologicAI
 * Last-updated: 2026-02-01
 * Notes:
 * - Avoid production console logging.
 * - Ensure booking URLs match actual booking flows.
 */

function debugLog(message: string, data?: unknown) {
  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.debug(message, data ?? '');
  }
}

/**
 * Booking Item Interface
 * 
 * Represents a bookable item (room, service, etc.)
 */
export interface BookingItem {
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url?: string;
}

/**
 * Generate ReservationAction Schema
 * 
 * Creates structured data for booking/reservation functionality following Schema.org ReservationAction format.
 * This enables rich snippets for booking actions in search results.
 * 
 * @param targetUrl - URL where booking can be performed
 * @param bookingUrl - URL of the booking page
 * @param businessName - Name of the business
 * @returns JSON-LD schema object
 * 
 * Example:
 * ```ts
 * const schema = generateReservationActionSchema(
 *   'https://www.srijanakimahaltrustofficial.com/booking',
 *   'https://www.srijanakimahaltrustofficial.com/booking',
 *   'Sri Janaki Mahal Trust'
 * );
 * ```
 */
export function generateReservationActionSchema(
  targetUrl: string,
  bookingUrl: string,
  businessName: string = 'Sri Janaki Mahal Trust'
) {
  debugLog('[Booking Schema] Generating ReservationAction schema', { targetUrl });
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ReservationAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: targetUrl,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
        'https://schema.org/WhatsApp'
      ],
      httpMethod: 'GET'
    },
    object: {
      '@type': 'LodgingReservation',
      name: `Book Room at ${businessName}`,
      description: `Book comfortable accommodation at ${businessName} in Ayodhya near Ram Mandir`,
      url: bookingUrl
    },
    provider: {
      '@type': 'Organization',
      name: businessName,
      url: 'https://www.srijanakimahaltrustofficial.com'
    }
  };

  return schema;
}

/**
 * Generate ReservationPackage Schema
 * 
 * Creates structured data for booking packages (room + meals, etc.)
 * 
 * @param packageName - Name of the package
 * @param description - Package description
 * @param price - Package price
 * @param currency - Currency code (default: INR)
 * @param includes - What's included in the package
 * @returns JSON-LD schema object
 */
export function generateReservationPackageSchema(
  packageName: string,
  description: string,
  price: string,
  currency: string = 'INR',
  includes: string[] = []
) {
  debugLog('[Booking Schema] Generating ReservationPackage schema', { packageName });
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ReservationPackage',
    name: packageName,
    description: description,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: 'https://www.srijanakimahaltrustofficial.com/booking'
    },
    ...(includes.length > 0 && {
      includes: includes.map(item => ({
        '@type': 'Thing',
        name: item
      }))
    })
  };

  return schema;
}

/**
 * Generate BookAction Schema
 * 
 * Creates structured data for book action (simpler than ReservationAction)
 * 
 * @param bookingUrl - URL where booking can be performed
 * @param businessName - Name of the business
 * @returns JSON-LD schema object
 */
export function generateBookActionSchema(
  bookingUrl: string,
  businessName: string = 'Sri Janaki Mahal Trust'
) {
  debugLog('[Booking Schema] Generating BookAction schema', { bookingUrl });
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BookAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: bookingUrl,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
        'https://schema.org/WhatsApp'
      ]
    },
    object: {
      '@type': 'LodgingReservation',
      name: `Room Booking at ${businessName}`,
      description: `Book your stay at ${businessName} - Best hotel in Ayodhya near Ram Mandir`
    },
    provider: {
      '@type': 'LodgingBusiness',
      name: businessName,
      url: 'https://www.srijanakimahaltrustofficial.com'
    }
  };

  return schema;
}

/**
 * Generate complete booking schema for a page
 * 
 * Combines ReservationAction with other relevant schemas
 * 
 * @param bookingUrl - URL of booking page
 * @param businessName - Name of business
 * @param includePackage - Whether to include package schema
 * @returns Array of schema objects
 */
export function generateCompleteBookingSchema(
  bookingUrl: string,
  businessName: string = 'Sri Janaki Mahal Trust',
  includePackage: boolean = true
) {
  debugLog('[Booking Schema] Generating complete booking schema', { bookingUrl, includePackage });
  
  const schemas = [
    generateReservationActionSchema(bookingUrl, bookingUrl, businessName)
  ];

  if (includePackage) {
    // Add default package (Room + Meals)
    schemas.push(
      generateReservationPackageSchema(
        'Room with All Meals',
        'Comfortable room accommodation with breakfast, lunch, and dinner included',
        '1250-4150',
        'INR',
        [
          'Room Accommodation',
          'Breakfast',
          'Lunch',
          'Dinner',
          'Hot Water',
          '24/7 Support'
        ]
      )
    );
  }

  return schemas;
}

