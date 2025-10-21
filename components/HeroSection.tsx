import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sri-janaki-mahal/IMG-20251017-WA0022.jpg"
          alt="Sri Janaki Mahal Trust - Spiritual Dharmshala in Ayodhya with beautiful architecture and peaceful courtyard"
          fill
          priority
          className="object-cover filter brightness-110 contrast-125 saturate-125"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
        {/* Trust Badge */}
        <div className="mb-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white px-5 py-2.5 shadow-lg" aria-label="Sri Janaki Mahal Trust">
            <span className="text-sm md:text-base font-extrabold uppercase tracking-wider">Sri Janaki Mahal Trust</span>
          </div>
        </div>
        {/* Top Banner: Online Room Booking Advance */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white px-4 py-2 shadow-lg" aria-label="Online Room Booking Advance">
            <span className="text-xs font-bold uppercase tracking-wider">Online Room Booking Advance</span>
          </div>
        </div>
        <div className="mb-6 inline-block">
          <span className="text-amber-300 text-sm font-semibold tracking-widest uppercase">Welcome to Ayodhya</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-shadow-sm">
          Book Your Sacred Stay at <span className="text-amber-400">Sri Janaki Mahal Trust</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Experience divine hospitality in the spiritual heart of Ayodhya. Comfortable rooms, warm service, and sacred ambiance await you.
        </p>

        {/* Primary CTA (white outlined) and secondary row (orange/green) */}
        <div className="flex flex-col items-center justify-center gap-5">
          {/* Book Now (white) */}
          <a
            id="hero-book-now"
            href="https://wa.me/917250364323?text=I%20would%20like%20to%20book%20a%20room%20at%20Sri%20Janaki%20Mahal%20Trust"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
            aria-label="Book Now on WhatsApp"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Book Now
          </a>

          {/* Side-by-side Call and WhatsApp buttons */}
          <div className="flex flex-row gap-4 justify-center items-center">
            <a
              id="hero-call"
              href="tel:+917250364323"
              className="px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <a
              id="hero-whatsapp"
              href="https://wa.me/917250364323"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.192-1.048 1.007-1.954 2.14-2.625 3.646-.735 1.7-1.14 3.6-.788 5.629.793 4.811 4.823 8.52 9.617 8.52 1.214 0 2.389-.184 3.514-.547 1.265-.41 2.439-1.04 3.466-1.872 1.048-.87 1.954-1.956 2.625-3.462.735-1.7 1.14-3.6.788-5.629-.793-4.811-4.823-8.52-9.617-8.52z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
        {/* Mobile Number Displayed Nicely and Clickable */}
        <div className="mt-6 flex flex-col items-center">
          <a
            href="tel:+917250364323"
            className="text-lg sm:text-xl font-semibold text-gray-700 bg-white/70 px-6 py-3 rounded-lg shadow inline-flex items-center gap-2 border border-amber-200 hover:bg-amber-50 transition cursor-pointer select-all"
            title="Click to Call"
          >
            <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.144l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            +91 7250364323
          </a>
          <span className="mt-2 text-xs text-gray-400 tracking-widest select-all">For bookings & info</span>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-amber-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
