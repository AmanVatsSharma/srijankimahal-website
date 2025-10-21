export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600">We&apos;re here to help with your booking and queries</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* WhatsApp Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.192-1.048 1.007-1.954 2.14-2.625 3.646-.735 1.7-1.14 3.6-.788 5.629.793 4.811 4.823 8.52 9.617 8.52 1.214 0 2.389-.184 3.514-.547 1.265-.41 2.439-1.04 3.466-1.872 1.048-.87 1.954-1.956 2.625-3.462.735-1.7 1.14-3.6.788-5.629-.793-4.811-4.823-8.52-9.617-8.52z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp Us</h3>
            <p className="text-gray-700 mb-4">Quick response on WhatsApp</p>
            <p className="text-lg font-semibold text-green-600 mb-4">+91 7250364323</p>
            <a href="https://wa.me/917250364323" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Chat Now
            </a>
          </div>

          {/* Call Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-700 mb-4">Available 24/7 for your queries</p>
            <p className="text-lg font-semibold text-amber-600 mb-4">+91 7250364323</p>
            <a href="tel:+917250364323" className="inline-block px-6 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Call Now
            </a>
          </div>

          {/* Visit Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-700 mb-2 font-semibold">Sri Janaki Mahal Trust</p>
            <p className="text-gray-700 mb-1">Vasudev Gath, Karsewakpuram</p>
            <p className="text-sm text-gray-600 mb-2">Ayodhya, Uttar Pradesh 224123</p>
            <p className="text-sm text-gray-600 mb-4">India • ~1km from Ram Mandir</p>
            <div className="text-sm text-gray-600 mb-4">
              <p><strong>Check-in:</strong> 2:00 PM</p>
              <p><strong>Check-out:</strong> 12:00 PM</p>
            </div>
            <a href="https://maps.google.com/?q=Sri+Janaki+Mahal+Trust+Karsewakpuram+Vasudev+Gath+Ayodhya" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Directions
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-700 mb-4">For detailed inquiries and bookings</p>
            <p className="text-lg font-semibold text-purple-600 mb-4">vedpragyabharat@gmail.com</p>
            <a href="mailto:vedpragyabharat@gmail.com" className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Send Email
            </a>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-lg overflow-hidden shadow-lg h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.131896046942!2d82.2109433!3d26.8039286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a0788e791a125%3A0xb699c999e6e42610!2sSri%20Janaki%20Mahal%20Trust!5e0!3m2!1sen!2sin!4v1760852226695!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sri Janaki Mahal Trust Location Map"
          />
        </div>
        
        {/* Alternative: Direct Link to Google Maps */}
        <div className="mt-4 text-center">
          <a 
            href="https://maps.google.com/?q=Sri+Janaki+Mahal+Trust+Karsewakpuram+Vasudev+Gath+Ayodhya+Uttar+Pradesh+224123" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}