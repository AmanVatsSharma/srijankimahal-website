/**
 * Review Schema Utility
 * 
 * Generates Review and AggregateRating structured data for SEO.
 * Helps Google display star ratings and reviews in search results.
 * 
 * Flow:
 * 1. Define review items (author, rating, date, text)
 * 2. Generate AggregateRating from all reviews
 * 3. Generate individual Review schemas
 * 4. Return combined JSON-LD schema
 */

/**
 * Review Item Interface
 * 
 * Represents a single customer review
 */
export interface ReviewItem {
  author: string;
  rating: number; // 1-5
  datePublished: string; // ISO date string
  reviewBody: string;
  reviewTitle?: string;
}

/**
 * Generate Review Schema
 * 
 * Creates structured data for customer reviews following Schema.org Review format.
 * 
 * @param reviews - Array of review items
 * @param businessName - Name of the business (defaults to "Sri Janaki Mahal Trust")
 * @param businessUrl - URL of the business
 * @returns JSON-LD schema object with AggregateRating and individual Reviews
 * 
 * Example:
 * ```ts
 * const reviews = [
 *   {
 *     author: "Rajesh Kumar",
 *     rating: 5,
 *     datePublished: "2024-01-15",
 *     reviewBody: "Excellent stay..."
 *   }
 * ];
 * const schema = generateReviewSchema(reviews);
 * ```
 */
export function generateReviewSchema(
  reviews: ReviewItem[],
  businessName: string = 'Sri Janaki Mahal Trust',
  businessUrl: string = 'https://srijanakimahaltrust.in'
) {
  console.log('[Review Schema] Generating schema for', reviews.length, 'reviews');
  
  if (!reviews || reviews.length === 0) {
    console.warn('[Review Schema] No reviews provided');
    return null;
  }

  // Calculate aggregate rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  const reviewCount = reviews.length;

  // Generate individual review schemas
  const reviewSchemas = reviews.map((review) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    ...(review.reviewTitle && { name: review.reviewTitle }),
  }));

  // Generate aggregate rating schema
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: averageRating.toFixed(1),
    reviewCount: reviewCount,
    bestRating: 5,
    worstRating: 1,
  };

  // Combine into main schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    url: businessUrl,
    aggregateRating,
    review: reviewSchemas,
  };

  console.log('[Review Schema] Schema generated successfully with average rating:', averageRating.toFixed(1));
  return schema;
}

/**
 * Generate AggregateRating Only
 * 
 * Creates just the aggregate rating schema without individual reviews.
 * Useful when you want to show overall rating without listing all reviews.
 * 
 * @param averageRating - Average rating value (1-5)
 * @param reviewCount - Total number of reviews
 * @returns JSON-LD schema object
 */
export function generateAggregateRatingOnly(
  averageRating: number,
  reviewCount: number
) {
  console.log('[Review Schema] Generating aggregate rating:', averageRating, 'from', reviewCount, 'reviews');
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: averageRating.toFixed(1),
    reviewCount: reviewCount,
    bestRating: 5,
    worstRating: 1,
  };

  return schema;
}

