/**
 * Service Schema Utility
 * 
 * Generates Service structured data for SEO.
 * Helps Google understand the services offered by the business.
 * 
 * Flow:
 * 1. Define service items (name, description, provider)
 * 2. Generate Service schema
 * 3. Return JSON-LD script content
 */

/**
 * Service Item Interface
 * 
 * Represents a single service offered
 */
export interface ServiceItem {
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string;
  provider?: {
    name: string;
    url: string;
  };
}

/**
 * Generate Service Schema
 * 
 * Creates structured data for services following Schema.org Service format.
 * 
 * @param services - Array of service items
 * @param businessName - Name of the business providing services
 * @param businessUrl - URL of the business
 * @returns JSON-LD schema object
 * 
 * Example:
 * ```ts
 * const services = [
 *   {
 *     name: "Room Booking Service",
 *     description: "Book comfortable rooms near Ram Mandir",
 *     serviceType: "Accommodation"
 *   }
 * ];
 * const schema = generateServiceSchema(services);
 * ```
 */
export function generateServiceSchema(
  services: ServiceItem[],
  businessName: string = 'Sri Janaki Mahal Trust',
  businessUrl: string = 'https://www.srijanakimahaltrustofficial.com'
) {
  console.log('[Service Schema] Generating schema for', services.length, 'services');
  
  if (!services || services.length === 0) {
    console.warn('[Service Schema] No services provided');
    return null;
  }

  const serviceSchemas = services.map((service) => ({
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: service.provider || {
      '@type': 'Organization',
      name: businessName,
      url: businessUrl,
    },
    areaServed: service.areaServed || {
      '@type': 'Country',
      name: 'India',
    },
    ...(service.serviceType && { serviceType: service.serviceType }),
  }));

  // If multiple services, wrap in ItemList
  if (serviceSchemas.length > 1) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: serviceSchemas.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: service,
      })),
    };
    console.log('[Service Schema] Multiple services - wrapped in ItemList');
    return schema;
  }

  // Single service - return directly
  const schema = {
    '@context': 'https://schema.org',
    ...serviceSchemas[0],
  };

  console.log('[Service Schema] Schema generated successfully');
  return schema;
}

/**
 * Default Services for Sri Janaki Mahal Trust
 * 
 * Pre-defined services targeting search queries
 */
export const defaultServices: ServiceItem[] = [
  {
    name: 'Spiritual Accommodation Service',
    description: 'Comfortable and peaceful accommodation for pilgrims and devotees visiting Ayodhya. Located near Ram Mandir with all meals included.',
    serviceType: 'Accommodation',
    areaServed: 'Ayodhya, Uttar Pradesh, India',
  },
  {
    name: 'Room Booking Service',
    description: 'Online and phone booking service for rooms at Sri Janaki Mahal Trust. Available 24/7 for advance reservations.',
    serviceType: 'Booking Service',
    areaServed: 'India',
  },
  {
    name: 'Meal Service',
    description: 'Vegetarian meals included with all room bookings. Breakfast, lunch, and dinner provided as part of spiritual accommodation.',
    serviceType: 'Food Service',
    areaServed: 'Ayodhya, Uttar Pradesh, India',
  },
];

