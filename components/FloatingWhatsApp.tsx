"use client";

import { CONTACT_LINKS } from "../lib/constants";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating WhatsApp Button */}
      <a
        href={CONTACT_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-ring"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulse Ring Animation */}
        <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75"></div>
        
        {/* WhatsApp Icon */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-green-600 rounded-full">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.192-1.048 1.007-1.954 2.14-2.625 3.646-.735 1.7-1.14 3.6-.788 5.629.793 4.811 4.823 8.52 9.617 8.52 1.214 0 2.389-.184 3.514-.547 1.265-.41 2.439-1.04 3.466-1.872 1.048-.87 1.954-1.956 2.625-3.462.735-1.7 1.14-3.6.788-5.629-.793-4.811-4.823-8.52-9.617-8.52z" />
          </svg>
        </div>
        
        {/* Text Label (shown on hover) */}
        <div className="hidden group-hover:block bg-white text-green-600 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap mr-2">
          <span className="text-sm font-semibold">Book on WhatsApp</span>
          <div className="text-xs text-gray-500">Instant booking support</div>
        </div>
      </a>

      {/* Quick Actions (appears on hover) */}
      <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
        <a
          href="tel:+917250364323"
          className="flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Call us directly"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm font-medium">Call Now</span>
        </a>
      </div>

      {/* Scroll to Top Button (appears when scrolled down) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-32 right-0 w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
