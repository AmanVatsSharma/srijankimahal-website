/**
 * FAQ Schema Utility
 * 
 * Generates FAQPage structured data for SEO.
 * This helps Google display FAQ rich results in search.
 * 
 * Flow:
 * 1. Define FAQ items (question + answer)
 * 2. Generate FAQPage schema with all questions
 * 3. Return JSON-LD script content
 */

/**
 * FAQ Item Interface
 * 
 * Represents a single FAQ question and answer pair
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQPage Schema
 * 
 * Creates structured data for FAQ sections following Schema.org FAQPage format.
 * 
 * @param faqs - Array of FAQ items
 * @returns JSON-LD schema object
 * 
 * Example:
 * ```ts
 * const faqs = [
 *   { question: "What is Sri Janaki Mahal Trust?", answer: "Sri Janaki Mahal Trust is..." }
 * ];
 * const schema = generateFAQSchema(faqs);
 * ```
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  console.log('[FAQ Schema] Generating schema for', faqs.length, 'FAQs');
  
  if (!faqs || faqs.length === 0) {
    console.warn('[FAQ Schema] No FAQs provided');
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  console.log('[FAQ Schema] Schema generated successfully');
  return schema;
}

/**
 * Default FAQ items for Sri Janaki Mahal Trust
 * 
 * Pre-defined FAQs targeting common search queries
 */
export const defaultFAQs: FAQItem[] = [
  {
    question: 'What is Sri Janaki Mahal Trust?',
    answer: 'Sri Janaki Mahal Trust is a registered charitable trust providing spiritual accommodation (dharmshala) in Ayodhya, Uttar Pradesh. We offer comfortable rooms near Ram Mandir with all meals included, creating a peaceful environment for devotees and pilgrims visiting Ayodhya.',
  },
  {
    question: 'How to book rooms at Sri Janaki Mahal?',
    answer: 'You can book rooms at Sri Janaki Mahal Trust by calling +91 7250364323 or messaging us on WhatsApp. We offer advance online booking for all room types. Our team is available 24/7 to assist with reservations and answer any questions.',
  },
  {
    question: 'Where is Sri Janaki Mahal located?',
    answer: 'Sri Janaki Mahal Trust is located at Vasudev Gath, Karsewakpuram, Ayodhya, Uttar Pradesh 224123. We are conveniently situated near Ram Mandir, making it easy for devotees to visit the temple and other spiritual sites in Ayodhya.',
  },
  {
    question: 'What amenities are available at Sri Janaki Mahal Trust?',
    answer: 'Sri Janaki Mahal Trust offers all meals included, 24/7 customer support, hot water, spiritual environment, and proximity to Ram Mandir. Our rooms are clean, comfortable, and designed for pilgrims seeking a peaceful stay in Ayodhya.',
  },
  {
    question: 'Is Sri Janaki Mahal near Ram Mandir?',
    answer: 'Yes, Sri Janaki Mahal Trust is located near Ram Mandir in Ayodhya. Our location in Karsewakpuram makes it convenient for devotees to visit Ram Mandir and other spiritual landmarks in Ayodhya multiple times during their stay.',
  },
  {
    question: 'What are the room prices at Sri Janaki Mahal Trust?',
    answer: 'Room prices at Sri Janaki Mahal Trust range from ₹1,250 to ₹4,150 per night, depending on room type and amenities. All prices include meals. For current rates and availability, please call +91 7250364323 or message us on WhatsApp.',
  },
  {
    question: 'Does Sri Janaki Mahal Trust include meals?',
    answer: 'Yes, all meals are included in your stay at Sri Janaki Mahal Trust. We provide vegetarian meals (breakfast, lunch, and dinner) as part of our spiritual accommodation service, ensuring a complete and comfortable experience for our guests.',
  },
  {
    question: 'How to reach Sri Janaki Mahal Trust in Ayodhya?',
    answer: 'Sri Janaki Mahal Trust is located at Vasudev Gath, Karsewakpuram, Ayodhya. You can reach us by train (Ayodhya Railway Station), bus (Ayodhya Bus Stand), or by road. We are easily accessible from all major cities. For detailed directions, call +91 7250364323.',
  },
];

