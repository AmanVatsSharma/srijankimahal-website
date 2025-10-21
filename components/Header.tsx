"use client";

import { useState } from "react";
import { CONTACT_LINKS } from "../lib/constants";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:animate-glow transition-all">
              ॐ
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">Sri Janaki Mahal</h1>
              <p className="text-xs text-gray-600">Ayodhya</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-gray-900">Sri Janaki</h1>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#home" 
              className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
            >
              About
            </a>
            <a 
              href="#rooms" 
              className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
            >
              Rooms
            </a>
            <a 
              href="#amenities" 
              className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
            >
              Amenities
            </a>
            <a 
              href="#gallery" 
              className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
            >
              Gallery
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.192-1.048 1.007-1.954 2.14-2.625 3.646-.735 1.7-1.14 3.6-.788 5.629.793 4.811 4.823 8.52 9.617 8.52 1.214 0 2.389-.184 3.514-.547 1.265-.41 2.439-1.04 3.466-1.872 1.048-.87 1.954-1.956 2.625-3.462.735-1.7 1.14-3.6.788-5.629-.793-4.811-4.823-8.52-9.617-8.52z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={CONTACT_LINKS.phone}
              className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`md:hidden pb-4 space-y-2 transition-all duration-300 ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}>
          <a 
            href="#home" 
            onClick={closeMobileMenu}
            className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={closeMobileMenu}
            className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            About
          </a>
          <a 
            href="#rooms" 
            onClick={closeMobileMenu}
            className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Rooms
          </a>
          <a 
            href="#amenities" 
            onClick={closeMobileMenu}
            className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Amenities
          </a>
          <a 
            href="#gallery" 
            onClick={closeMobileMenu}
            className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Gallery
          </a>
          <a 
            href="#contact" 
            onClick={closeMobileMenu}
            className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Contact
          </a>
          <div className="flex gap-2 pt-2">
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 text-center transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={CONTACT_LINKS.phone}
              onClick={closeMobileMenu}
              className="flex-1 px-3 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 text-center transition-colors"
            >
              Call
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
