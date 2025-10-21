import Image from "next/image";

export default function AboutJanakiMahal() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-in-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
              About Sri Janaki Mahal Trust
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sri Janaki Mahal Trust is dedicated to providing pilgrims and spiritual seekers with a sacred sanctuary 
              in Ayodhya, where devotion meets comfort. We believe that every pilgrim deserves a peaceful retreat 
              that nurtures both body and soul during their spiritual journey.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our name &ldquo;Janaki Mahal&rdquo; pays homage to Goddess Sita (Janaki), the divine consort of Lord Rama, 
              symbolizing purity, devotion, and divine grace. We strive to embody these qualities in our service 
              to every guest who walks through our doors.
            </p>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
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

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Registered Trust</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Safe & Secure</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">4.5★ Rating</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <Image
                src="/ayodhya-temple-spiritual.jpg"
                alt="Sri Janaki Mahal Trust - Sacred temple and spiritual architecture in Ayodhya"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
