import { Metadata } from "next";
import { generateMetadata as generateBaseMetadata } from "../../lib/metadata";
import { BUSINESS_INFO } from "../../lib/constants";

export const metadata: Metadata = generateBaseMetadata({
  title: "About Us",
  description: "Learn about Sri Janaki Mahal Trust - A sacred sanctuary in Ayodhya providing spiritual accommodation near Ram Mandir with warm hospitality and all meals included.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Sri Janaki Mahal Trust</h1>
          <p className="text-lg text-gray-600">A Sacred Sanctuary in the Heart of Ayodhya</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          {/* Mission Statement */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sri Janaki Mahal Trust is dedicated to providing pilgrims and spiritual seekers with a sacred sanctuary 
              in Ayodhya, where devotion meets comfort. We believe that every pilgrim deserves a peaceful retreat 
              that nurtures both body and soul during their spiritual journey.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-amber-50 rounded-lg">
                <div className="text-4xl mb-4">🕉️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Spiritual Sanctuary</h3>
                <p className="text-gray-600">A peaceful environment for meditation and prayer</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Comfortable Stay</h3>
                <p className="text-gray-600">Clean, comfortable rooms with all amenities</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Warm Hospitality</h3>
                <p className="text-gray-600">Caring service with traditional Indian hospitality</p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Established with the vision of serving pilgrims visiting the sacred city of Ayodhya, Sri Janaki Mahal Trust 
                  has been providing spiritual accommodation since its inception. Located in the heart of Karsewakpuram, 
                  our dharmshala offers easy access to the revered Ram Mandir and other sacred sites.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our name &ldquo;Janaki Mahal&rdquo; pays homage to Goddess Sita (Janaki), the divine consort of Lord Rama, 
                  symbolizing purity, devotion, and divine grace. We strive to embody these qualities in our service 
                  to every guest who walks through our doors.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Facts</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">📍</span>
                    Located in Karsewakpuram, Ayodhya
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">🏛️</span>
                    Walking distance to Ram Mandir
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">🍽️</span>
                    All meals included in room rates
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">🕐</span>
                    24/7 customer support
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">⭐</span>
                    4.5-star guest rating
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Location & Accessibility */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Prime Location</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Strategic Location</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our dharmshala is strategically located in Vasudev Gath, Karsewakpuram, providing easy access to 
                  all major spiritual sites in Ayodhya. Guests can walk to the Ram Mandir, visit other temples, 
                  and explore the sacred city without transportation hassles.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">🚶‍♂️</span>
                    <span className="text-gray-700">5-minute walk to Ram Mandir</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">🚶‍♂️</span>
                    <span className="text-gray-700">Walking distance to major temples</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">🚗</span>
                    <span className="text-gray-700">Easy access to railway station</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">✈️</span>
                    <span className="text-gray-700">Convenient airport connectivity</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Complete Address</h3>
                <div className="text-gray-700 space-y-2">
                  <p><strong>{BUSINESS_INFO.name}</strong></p>
                  <p>{BUSINESS_INFO.address.street}</p>
                  <p>{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.postalCode}</p>
                  <p>{BUSINESS_INFO.address.country}</p>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-sm text-gray-600">
                      <strong>Coordinates:</strong> {BUSINESS_INFO.address.coordinates.latitude}°N, {BUSINESS_INFO.address.coordinates.longitude}°E
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services & Amenities */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Accommodation</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Clean and comfortable rooms
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    AC and Non-AC options available
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Hot water facilities
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Room sizes: 2-bed, 3-bed, 4-bed, and suites
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Daily housekeeping
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Meals & Services</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    All meals included (breakfast, lunch, dinner)
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Traditional vegetarian cuisine
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    24/7 customer support
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Prayer room and meditation space
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Safe and secure premises
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Trust & Credentials */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Trust & Credentials</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl mb-4">🏆</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Registered Trust</h3>
                <p className="text-gray-600 text-sm">Legally registered charitable trust</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Safe & Secure</h3>
                <p className="text-gray-600 text-sm">24/7 security and surveillance</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-4">⭐</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Guest Satisfaction</h3>
                <p className="text-gray-600 text-sm">High guest satisfaction ratings</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-amber-600 mr-3">📞</span>
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="text-gray-700 hover:text-amber-600">{BUSINESS_INFO.phone}</a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-amber-600 mr-3">💬</span>
                    <a href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/\D/g, '')}`} className="text-gray-700 hover:text-amber-600">WhatsApp: {BUSINESS_INFO.whatsapp}</a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-amber-600 mr-3">📧</span>
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="text-gray-700 hover:text-amber-600">{BUSINESS_INFO.email}</a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-amber-600 mr-3">🕐</span>
                    <span className="text-gray-700">24/7 Customer Support</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Check-in:</strong> {BUSINESS_INFO.hours.checkIn}</p>
                  <p><strong>Check-out:</strong> {BUSINESS_INFO.hours.checkOut}</p>
                  <p><strong>Office Hours:</strong> {BUSINESS_INFO.hours.officeHours}</p>
                  <p><strong>Emergency:</strong> {BUSINESS_INFO.hours.emergency}</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
