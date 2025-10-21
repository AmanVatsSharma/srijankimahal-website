import { Metadata } from "next";
import { generateMetadata as generateBaseMetadata } from "../../lib/metadata";

export const metadata: Metadata = generateBaseMetadata({
  title: "Cancellation & Refund Policy",
  description: "Cancellation and Refund Policy for Sri Janaki Mahal Trust - Learn about our booking cancellation terms and refund procedures.",
  path: "/cancellation-refund"
});

export default function CancellationRefundPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation & Refund Policy</h1>
          <p className="text-lg text-gray-600">Sri Janaki Mahal Trust</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Cancellation and Refund Policy outlines the terms and conditions for canceling your booking 
              at Sri Janaki Mahal Trust and the refund process. Please read this policy carefully before making a booking.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By making a booking with us, you agree to the terms outlined in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cancellation Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Cancellation Timeframes</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="font-medium">More than 48 hours before check-in:</span>
                  <span className="text-green-600 font-semibold">Free cancellation</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="font-medium">24-48 hours before check-in:</span>
                  <span className="text-yellow-600 font-semibold">50% refund</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Less than 24 hours before check-in:</span>
                  <span className="text-red-600 font-semibold">No refund</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 How to Cancel</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To cancel your booking, please contact us through any of the following methods:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>WhatsApp:</strong> +91 7250364323</li>
              <li><strong>Phone:</strong> +91 7250364323</li>
              <li><strong>Email:</strong> vedpragyabharat@gmail.com</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Please provide your booking reference number and guest name for faster processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Process</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Refund Eligibility</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds will be processed according to the cancellation timeframes mentioned above. 
              Refunds are subject to the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Valid cancellation request made within the specified timeframe</li>
              <li>No damage to property or facilities</li>
              <li>Compliance with our terms of service</li>
              <li>Original payment method must be valid and active</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Refund Processing Time</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Cash payments:</strong> Immediate refund upon check-out</li>
              <li><strong>Bank transfers:</strong> 3-5 business days</li>
              <li><strong>UPI payments:</strong> 1-2 business days</li>
              <li><strong>Card payments:</strong> 5-7 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Special Circumstances</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Force Majeure Events</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In case of force majeure events (natural disasters, government restrictions, etc.), 
              we may offer alternative arrangements or full refunds at our discretion.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Medical Emergencies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              For medical emergencies that prevent travel, we may consider full or partial refunds 
              upon presentation of valid medical documentation.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 No-Show Policy</h3>
            <p className="text-gray-700 leading-relaxed">
              If you do not arrive by 11:00 PM on the check-in date and have not notified us, 
              your booking will be considered a no-show and no refund will be provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Partial Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In certain circumstances, partial refunds may be applicable:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Early departure (with 24-hour notice)</li>
              <li>Service disruptions due to maintenance</li>
              <li>Room changes due to availability issues</li>
              <li>Other circumstances at management discretion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Non-Refundable Items</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The following charges are non-refundable:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Processing fees (if applicable)</li>
              <li>Damages to property or facilities</li>
              <li>Lost or stolen items charges</li>
              <li>Any additional services already provided</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Booking Modifications</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Changes to your booking (dates, room type, number of guests) are subject to availability and may incur additional charges:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Modifications more than 48 hours in advance: No additional charges</li>
              <li>Modifications within 48 hours: Subject to availability and pricing</li>
              <li>Downgrading room type: Refund of difference (if applicable)</li>
              <li>Upgrading room type: Additional charges apply</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any concerns about your refund or cancellation, please contact us directly. 
              We will work with you to resolve any issues amicably.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For unresolved disputes, you may contact relevant consumer protection authorities in India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For cancellation requests or refund inquiries, please contact us:
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
                <p className="mt-4 text-sm text-gray-600">
                  <strong>Office Hours:</strong> 6:00 AM - 10:00 PM<br />
                  <strong>Emergency:</strong> 24/7 available
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
