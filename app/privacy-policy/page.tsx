import { Metadata } from "next";
import { generateMetadata as generateBaseMetadata } from "../../lib/metadata";

export const metadata: Metadata = generateBaseMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Sri Janaki Mahal Trust - Learn how we collect, use, and protect your personal information in compliance with GDPR and Indian data protection laws.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Sri Janaki Mahal Trust</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sri Janaki Mahal Trust (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              srijanakimahaltrust.in or use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website and services, you consent to the data practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Book accommodation through our website or WhatsApp</li>
              <li>Contact us via phone, email, or WhatsApp</li>
              <li>Subscribe to our newsletter or updates</li>
              <li>Provide feedback or reviews</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              This information may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Name and contact information (phone number, email address)</li>
              <li>Booking details and preferences</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may automatically collect certain information about your device and usage, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Website usage patterns and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Process and manage your accommodation bookings</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send booking confirmations and updates</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights, property, or safety</li>
              <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
              <li>In case of a business transfer or merger</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Unauthorized access, use, or disclosure</li>
              <li>Accidental loss or destruction</li>
              <li>Data breaches and cyberattacks</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission over the internet or electronic storage is 100% secure. 
              While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              comply with legal obligations, resolve disputes, and enforce our agreements. When personal information is no longer needed, 
              we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to delete your personal information</li>
              <li>Right to restrict processing of your information</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, please contact us using the information provided in the &ldquo;Contact Us&rdquo; section below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. 
              Cookies are small text files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve website functionality and performance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control cookie settings through your browser preferences. However, disabling cookies may affect 
              the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices 
              or content of these external sites. We encourage you to review the privacy policies of any third-party 
              websites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for children under the age of 13. We do not knowingly collect personal 
              information from children under 13. If we become aware that we have collected personal information 
              from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any material changes by posting the updated policy on our website with a new &ldquo;Last updated&rdquo; date. 
              Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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
