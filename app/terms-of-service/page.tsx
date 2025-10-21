import { Metadata } from "next";
import { generateMetadata as generateBaseMetadata } from "../../lib/metadata";

export const metadata: Metadata = generateBaseMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Sri Janaki Mahal Trust - Read our terms and conditions for accommodation booking and services in Ayodhya.",
  path: "/terms-of-service"
});

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Sri Janaki Mahal Trust</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using the services of Sri Janaki Mahal Trust (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), 
              you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sri Janaki Mahal Trust provides spiritual accommodation services in Ayodhya, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Room accommodation for pilgrims and spiritual seekers</li>
              <li>All meals included (breakfast, lunch, dinner)</li>
              <li>Basic amenities and facilities</li>
              <li>Customer support and assistance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking and Reservations</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Booking Process</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Bookings can be made via WhatsApp, phone, or email</li>
              <li>Advance booking is recommended, especially during peak seasons</li>
              <li>All bookings are subject to availability</li>
              <li>We reserve the right to refuse service to anyone</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Pricing and Payment</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All prices are inclusive of taxes and meals</li>
              <li>Payment can be made upon arrival or as agreed</li>
              <li>We accept cash payments (preferred)</li>
              <li>No hidden charges - all costs are transparent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Check-in and Check-out</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Check-in time:</strong> 2:00 PM onwards</li>
              <li><strong>Check-out time:</strong> 12:00 PM</li>
              <li>Early check-in or late check-out subject to availability</li>
              <li>Valid government-issued ID required at check-in</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Guest Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Guests are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Maintaining the cleanliness and condition of their rooms</li>
              <li>Respecting other guests and maintaining peaceful environment</li>
              <li>Following the spiritual and cultural guidelines of the premises</li>
              <li>Reporting any damages or issues immediately</li>
              <li>Complying with local laws and regulations</li>
              <li>Ensuring the safety of their personal belongings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The following activities are strictly prohibited:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Smoking or consumption of alcohol on premises</li>
              <li>Non-vegetarian food consumption</li>
              <li>Loud music or disruptive behavior</li>
              <li>Damage to property or facilities</li>
              <li>Illegal activities or substances</li>
              <li>Unauthorized commercial activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Liability and Limitations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sri Janaki Mahal Trust shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Loss or damage to personal belongings</li>
              <li>Injuries or accidents on premises</li>
              <li>Delays or cancellations due to circumstances beyond our control</li>
              <li>Third-party services or external factors</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our liability is limited to the amount paid for the accommodation service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Force Majeure</h2>
            <p className="text-gray-700 leading-relaxed">
              We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, 
              including but not limited to acts of God, natural disasters, war, terrorism, government actions, or other unforeseeable events.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to protecting your privacy. Please refer to our Privacy Policy for information on how we collect, 
              use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. 
              Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms 
              or our services shall be subject to the exclusive jurisdiction of the courts in Ayodhya, Uttar Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For any questions regarding these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2 text-gray-700">
                <p><strong>Sri Janaki Mahal Trust</strong></p>
                <p>Vasudev Gath, Karsewakpuram</p>
                <p>Ayodhya, Uttar Pradesh 224123</p>
                <p>India</p>
                <p className="mt-4">
                  <strong>Email:</strong> <a href="mailto:vedpragyabharat@gmail.com" className="text-amber-600 hover:underline">vedpragyabharat@gmail.com</a>
                </p>
                <p>
                  <strong>Phone:</strong> <a href="tel:+917250364323" className="text-amber-600 hover:underline">+91 7250364323</a>
                </p>
                <p>
                  <strong>WhatsApp:</strong> <a href="https://wa.me/917250364323" className="text-amber-600 hover:underline">+91 7250364323</a>
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
