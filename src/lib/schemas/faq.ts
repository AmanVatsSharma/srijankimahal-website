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
    answer: 'Sri Janaki Mahal Trust is a registered charitable trust providing comfortable hotel accommodation in Ayodhya, Uttar Pradesh. We offer comfortable rooms near Ram Mandir with all meals included, creating a peaceful environment for guests and visitors visiting Ayodhya.',
  },
  {
    question: 'How to book rooms at Sri Janaki Mahal?',
    answer: 'You can book rooms at Sri Janaki Mahal Trust by calling +91 7250364323 or messaging us on WhatsApp. We offer advance online booking for all room types. Our team is available 24/7 to assist with reservations and answer any questions.',
  },
  {
    question: 'Where is Sri Janaki Mahal located?',
    answer: 'Sri Janaki Mahal Trust is located at Vasudev Gath, Karsewakpuram, Ayodhya, Uttar Pradesh 224123. We are conveniently situated near Ram Mandir, making it easy for guests to visit the temple and other important sites in Ayodhya.',
  },
  {
    question: 'What amenities are available at Sri Janaki Mahal Trust?',
    answer: 'Sri Janaki Mahal Trust offers all meals included, 24/7 customer support, hot water, peaceful environment, and proximity to Ram Mandir. Our rooms are clean, comfortable, and designed for guests seeking a peaceful stay in Ayodhya.',
  },
  {
    question: 'Is Sri Janaki Mahal near Ram Mandir?',
    answer: 'Yes, Sri Janaki Mahal Trust is located near Ram Mandir in Ayodhya. Our location in Karsewakpuram makes it convenient for guests to visit Ram Mandir and other important landmarks in Ayodhya multiple times during their stay.',
  },
  {
    question: 'What are the room prices at Sri Janaki Mahal Trust?',
    answer: 'Room prices at Sri Janaki Mahal Trust range from ₹1,250 to ₹4,150 per night, depending on room type and amenities. All prices include meals. For current rates and availability, please call +91 7250364323 or message us on WhatsApp.',
  },
  {
    question: 'Does Sri Janaki Mahal Trust include meals?',
    answer: 'Yes, all meals are included in your stay at Sri Janaki Mahal Trust. We provide vegetarian meals (breakfast, lunch, and dinner) as part of our accommodation service, ensuring a complete and comfortable experience for our guests.',
  },
  {
    question: 'How to reach Sri Janaki Mahal Trust in Ayodhya?',
    answer: 'Sri Janaki Mahal Trust is located at Vasudev Gath, Karsewakpuram, Ayodhya. You can reach us by train (Ayodhya Railway Station), bus (Ayodhya Bus Stand), or by road. We are easily accessible from all major cities. For detailed directions, call +91 7250364323.',
  },
  {
    question: 'How to book room at Sri Janaki Mahal Trust?',
    answer: 'To book a room at Sri Janaki Mahal Trust, call our official number +91 7250364323, message us on WhatsApp at +91 7250364323, or visit our booking page. Provide your check-in date, check-out date, number of guests, and preferred room type. We will confirm availability and provide booking details.',
  },
  {
    question: 'Is Sri Janaki Mahal Trust official?',
    answer: 'Yes, Sri Janaki Mahal Trust is an official registered charitable trust. We are a legally registered organization providing comfortable accommodation in Ayodhya. Book only through our official channels: phone +91 7250364323, WhatsApp +91 7250364323, or official website srijanakimahaltrust.in.',
  },
  {
    question: 'What is Sri Janaki Mahal Trust phone number?',
    answer: 'The official phone number of Sri Janaki Mahal Trust is +91 7250364323. This is our official contact number available 24/7 for bookings, inquiries, and support. You can also reach us on WhatsApp at the same number.',
  },
  {
    question: 'What is Sri Janaki Mahal Trust official website?',
    answer: 'The official website of Sri Janaki Mahal Trust is srijanakimahaltrust.in. This is the only official website for booking rooms and getting information. Beware of third-party websites claiming to represent us.',
  },
  {
    question: 'How to contact Sri Janaki Mahal Trust?',
    answer: 'You can contact Sri Janaki Mahal Trust through: Phone: +91 7250364323 (24/7), WhatsApp: +91 7250364323, Email: srijanakimahaltrust7484@gmail.com, or visit our official website srijanakimahaltrust.in. Our team is available round the clock to assist you.',
  },
  {
    question: 'Is Sri Janaki Mahal Trust verified?',
    answer: 'Yes, Sri Janaki Mahal Trust is a verified and registered charitable trust. We are legally registered and operate with complete transparency. Our official contact details and registration information are available on our official website.',
  },
  {
    question: 'Can I book room at Sri Janaki Mahal Trust online?',
    answer: 'Yes, you can book rooms at Sri Janaki Mahal Trust online through our official channels. Contact us via WhatsApp (+91 7250364323) or phone (+91 7250364323) for instant booking. We also have a booking page on our official website for booking inquiries.',
  },
  {
    question: 'Is advance booking required for Sri Janaki Mahal Trust?',
    answer: 'Advance booking is recommended, especially during festivals and peak seasons (Ram Navami, Diwali). For regular days, same-day bookings may be available subject to availability. We recommend booking 2-4 weeks in advance for guaranteed availability.',
  },
  {
    question: 'What is Sri Janaki Mahal Trust address?',
    answer: 'The complete address of Sri Janaki Mahal Trust is: Vasudev Gath, Karsewakpuram, Ayodhya, Uttar Pradesh 224123, India. GPS coordinates: 26.8039286°N, 82.2109433°E. We are located just 5 minutes walk from Ram Mandir.',
  },
  {
    question: 'Is Sri Janaki Mahal Trust legitimate?',
    answer: 'Yes, Sri Janaki Mahal Trust is a legitimate registered charitable trust operating in Ayodhya since 2020. We are legally registered, verified, and provide authentic comfortable accommodation services. Always book through our official channels to avoid scams.',
  },
  {
    question: 'What is Sri Janaki Mahal Trust registration number?',
    answer: 'Sri Janaki Mahal Trust is a registered charitable trust established in 2020. For official registration details and verification, please contact us at +91 7250364323 or visit our official website. We operate with complete transparency and legal compliance.',
  },
  {
    question: 'Does Sri Janaki Mahal Trust have online booking?',
    answer: 'Yes, Sri Janaki Mahal Trust offers online booking through our official website and WhatsApp. Contact us at +91 7250364323 via phone or WhatsApp for instant booking confirmation. We provide booking confirmation immediately upon reservation.',
  },
  {
    question: 'How much does Sri Janaki Mahal Trust cost?',
    answer: 'Sri Janaki Mahal Trust room prices range from ₹1,250 to ₹4,150 per night, depending on room type (2-bed, 3-bed, 4-bed, deluxe, luxury) and AC/Non-AC preference. All prices include room accommodation + all meals (breakfast, lunch, dinner) + taxes.',
  },
  {
    question: 'What are Sri Janaki Mahal Trust room prices?',
    answer: 'Room prices at Sri Janaki Mahal Trust: 2-bed rooms ₹1,250-₹2,100, 3-bed rooms ₹1,800-₹3,000, 4-bed rooms ₹2,550-₹3,500, Deluxe/Luxury suites ₹3,200-₹4,150. All prices include all meals. Contact +91 7250364323 for current rates and availability.',
  },
  {
    question: 'Is Sri Janaki Mahal Trust authentic?',
    answer: 'Yes, Sri Janaki Mahal Trust is an authentic registered charitable trust providing genuine comfortable accommodation services in Ayodhya. We have been serving guests since 2020 with verified business credentials. Always verify through our official contact: +91 7250364323.',
  },
  {
    question: 'How to verify Sri Janaki Mahal Trust is official?',
    answer: 'To verify Sri Janaki Mahal Trust is official: 1) Check our official website srijanakimahaltrust.in, 2) Contact our official phone +91 7250364323, 3) Visit our official page for registration details, 4) Beware of third-party websites or agents claiming to represent us.',
  },
  {
    question: 'Can I book Sri Janaki Mahal Trust room in advance?',
    answer: 'Yes, Sri Janaki Mahal Trust accepts advance bookings. We recommend booking 2-4 weeks in advance for regular days, and 2-3 months in advance during festivals like Ram Navami and Diwali. Contact +91 7250364323 to make advance reservations.',
  },
  {
    question: 'What is the booking process at Sri Janaki Mahal Trust?',
    answer: 'Booking process: 1) Contact us via phone/WhatsApp (+91 7250364323), 2) Provide check-in/check-out dates, number of guests, room preference, 3) We confirm availability and pricing, 4) You receive booking confirmation, 5) Check-in at 2:00 PM on arrival date.',
  },
  {
    question: 'Is booking confirmation required for Sri Janaki Mahal Trust?',
    answer: 'Yes, booking confirmation is required and provided by Sri Janaki Mahal Trust. Once you book, we send you a booking confirmation with your reservation details, room type, dates, and total amount. Please keep this confirmation for smooth check-in.',
  },
  {
    question: 'What information do I need to book at Sri Janaki Mahal Trust?',
    answer: 'To book at Sri Janaki Mahal Trust, provide: your name, phone number, email (optional), check-in date, check-out date, number of guests, preferred room type (AC/Non-AC, bed count), and any special requirements. Valid ID proof required at check-in.',
  },
  {
    question: 'Is Sri Janaki Mahal Trust phone number correct?',
    answer: 'Yes, the official phone number of Sri Janaki Mahal Trust is +91 7250364323. This is our verified and correct contact number available 24/7. You can also reach us on WhatsApp at the same number. This is the only official contact number.',
  },
  {
    question: 'How to book room at Sri Janaki Mahal Trust Ayodhya?',
    answer: 'To book a room at Sri Janaki Mahal Trust in Ayodhya: Call +91 7250364323 or WhatsApp +91 7250364323. Provide your travel dates, number of guests, and room preference. We confirm availability instantly and provide booking confirmation. You can also visit our booking page.',
  },
  {
    question: 'Is Sri Janaki Mahal Trust official website safe?',
    answer: 'Yes, the official website srijanakimahaltrust.in is safe and secure. We use SSL encryption and follow security best practices. Always ensure you are on the official website (srijanakimahaltrust.in) and not a third-party or scam website.',
  },
  {
    question: 'What is the official booking number for Sri Janaki Mahal Trust?',
    answer: 'The official booking number for Sri Janaki Mahal Trust is +91 7250364323. This is our verified phone number for bookings, inquiries, and support. You can also book via WhatsApp at the same number. Available 24/7 for your convenience.',
  },
  {
    question: 'Can I trust Sri Janaki Mahal Trust?',
    answer: 'Yes, you can trust Sri Janaki Mahal Trust. We are a registered charitable trust operating since 2020, with verified credentials, 4.5-star guest ratings, and thousands of satisfied guests. We maintain transparency in pricing and services. Always book through official channels.',
  },
  {
    question: 'Is Sri Janaki Mahal Trust real?',
    answer: 'Yes, Sri Janaki Mahal Trust is a real, registered charitable trust providing comfortable accommodation in Ayodhya. We have a physical location at Vasudev Gath, Karsewakpuram, and have been serving guests since 2020. Visit our official website or call +91 7250364323 to verify.',
  },
  {
    question: 'How to book Sri Janaki Mahal Trust room online?',
    answer: 'To book Sri Janaki Mahal Trust room online: 1) Visit our official website srijanakimahaltrust.in, 2) Go to booking page, 3) Contact us via WhatsApp (+91 7250364323) or phone (+91 7250364323), 4) Provide booking details, 5) Receive instant confirmation.',
  },
  {
    question: 'What is Sri Janaki Mahal Trust contact number?',
    answer: 'Sri Janaki Mahal Trust contact number is +91 7250364323. This is our official phone and WhatsApp number available 24/7 for bookings, inquiries, and customer support. You can call or message us anytime for instant assistance.',
  },
  {
    question: 'Is Sri Janaki Mahal Trust booking safe?',
    answer: 'Yes, booking with Sri Janaki Mahal Trust is safe and secure. We are a registered trust with verified credentials. All bookings are confirmed directly by us. Always book through official channels (phone +91 7250364323, WhatsApp, or official website) to ensure safety.',
  },
  {
    question: 'Is Janaki Mahal Trust the same as Sri Janki Mahal Trust?',
    answer: 'Yes, Janaki Mahal Trust, Sri Janki Mahal Trust, and Shri Janki Mahal Trust all refer to the same registered charitable trust in Ayodhya. Regardless of spelling, the official helpline remains +91 7250364323 for bookings and verification.',
  },
  {
    question: 'What is the official contact number of Janaki Mahal Trust Ayodhya?',
    answer: 'The official contact number for Janaki Mahal Trust Ayodhya is +91 7250364323. This number is the same for Janaki, Janki, and Shri Janki Mahal Trust spellings and is available 24/7.',
  },
  {
    question: 'Does Shri Janki Mahal Trust issue a confirmation slip?',
    answer: 'Yes, every booking with Shri Janki Mahal Trust includes an official confirmation slip featuring the trust seal, booking ID, and stay details. This slip verifies your reservation at check-in.',
  },
  {
    question: 'How can I avoid fake Janaki Mahal Trust bookings?',
    answer: 'Avoid fake bookings by using only the official channels: phone/WhatsApp +91 7250364323, email srijanakimahaltrust7484@gmail.com, and the website srijanakimahaltrust.in. Decline offers from alternate numbers or third-party agents.',
  },
  {
    question: 'Which spellings does Sri Janaki Mahal Trust recognise?',
    answer: 'We recognise the following spellings: Sri Janaki Mahal Trust, Sri Janki Mahal Trust, Shri Janki Mahal Trust, Janaki Mahal Trust, and Janaki Mahal Ayodhya. All these variations represent the same trust with identical contact details.',
  },
  {
    question: 'Can I WhatsApp the official Janaki Mahal Trust contact number?',
    answer: 'Yes, the official Janaki Mahal Trust contact number +91 7250364323 is also active on WhatsApp. You can message us at any time for bookings, confirmation slips, or travel assistance.',
  },
  {
    question: 'Does Sri Janki Mahal Trust provide 24/7 emergency support?',
    answer: 'Sri Janki Mahal Trust offers 24/7 emergency support via the verified helpline +91 7250364323. Our team assists with medical needs, late check-ins, and pilgrimage-related guidance.',
  },
  {
    question: 'How do I verify a message claiming to be from Sri Janaki Mahal Trust?',
    answer: 'Verify any communication by cross-checking the sender’s number with our official helpline +91 7250364323. If the message originates from a different number or email, contact us directly to confirm authenticity.',
  },
  {
    question: 'Is Janaki Mahal official booking available through third-party apps?',
    answer: 'No, Janaki Mahal official booking is only available through direct contact—phone, WhatsApp, or the booking page on srijanakimahaltrust.in. We do not authorise third-party apps or travel portals.',
  },
  {
    question: 'What should I do if someone shares an alternate Janaki Mahal number?',
    answer: 'Politely decline and call our verified number +91 7250364323. Share details of the alternate number with our team so we can alert other devotees about potential scams.',
  },
  {
    question: 'Can international devotees contact Shri Janki Mahal Trust easily?',
    answer: 'International devotees can reach Shri Janki Mahal Trust through WhatsApp at +91 7250364323 or email srijanakimahaltrust7484@gmail.com. We provide confirmation slips and itineraries for overseas pilgrims.',
  },
  {
    question: 'Does Sri Janaki Mahal Trust send a payment link?',
    answer: 'Sri Janaki Mahal Trust shares payment details only after availability is confirmed and always from the official helpline or email. If you receive a payment link from another source, verify it with us before paying.',
  },
  {
    question: 'Are there different rates for Sri Janki Mahal Trust and Janaki Mahal Trust?',
    answer: 'No, all spellings refer to the same trust with the same transparent tariff. Prices range from ₹1,250 to ₹4,150 and include meals, regardless of the spelling you use while booking.',
  },
  {
    question: 'How can I confirm my booking is with the official Sri Janki Mahal Trust?',
    answer: 'Your booking is official when it is confirmed via +91 7250364323, you receive a trust-stamped confirmation slip, and the reference email is srijanakimahaltrust7484@gmail.com. These safeguards ensure authenticity.',
  },
  {
    question: 'Which keywords should I search to find the official Sri Janaki Mahal Trust website?',
    answer: 'Search keywords like “Janaki Mahal Trust official booking”, “Sri Janki Mahal Trust Ayodhya official website”, or “Shri Janki Mahal Trust verified contact” to find the correct site srijanakimahaltrust.in.',
  },
  {
    question: 'Can I request a GST invoice from Janaki Mahal Trust?',
    answer: 'Yes, you can request a GST invoice during or after booking. Provide the necessary GST details to our team via +91 7250364323, and we will issue the invoice from the official trust account.',
  },
  {
    question: 'Does the official trust number change during festivals?',
    answer: 'No, the official trust number remains +91 7250364323 throughout the year, including festivals like Ram Navami and Diwali. Additional support staff assist via the same number during peak seasons.',
  },
  {
    question: 'Is there a separate contact for “Shri Janki Mahal Trust Ayodhya official helpline”?',
    answer: 'There is only one helpline for all variations: +91 7250364323. Save this number as “Sri / Shri Janki Mahal Trust” to avoid confusion with fraudulent contacts.',
  },
  {
    question: 'What is the best way to share Janaki Mahal Trust details with family?',
    answer: 'Share the official website link srijanakimahaltrust.in and the helpline +91 7250364323. Mention that Sri Janaki Mahal Trust, Sri Janki Mahal Trust, and Shri Janki Mahal Trust are the same verified accommodation provider.',
  },
  {
    question: 'Can I get assistance in Hindi or English when contacting Sri Janaki Mahal Trust?',
    answer: 'Yes, our support team assists guests in Hindi and English. For other languages, let us know in advance via WhatsApp so we can arrange translation support where possible.',
  },
  {
    question: 'Does Sri Janaki Mahal Trust provide reminders before check-in?',
    answer: 'Yes, we send a reminder message with your booking details and official contact number a day before check-in. This ensures you have the latest information and the verified helpline handy.',
  },
  {
    question: 'What if I need to change my Janaki Mahal Trust booking dates?',
    answer: 'Contact us immediately at +91 7250364323. Date modifications are subject to availability, and our team will provide alternate options or waiting list assistance as needed.',
  },
];

