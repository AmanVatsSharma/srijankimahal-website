"use client";

import React from "react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Guest Testimonials</h2>
          <p className="text-lg text-gray-600">Hear from our blessed guests</p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 scroll-left" style={{ animation: 'scroll-left 40s linear infinite' }}>
            {/* Testimonial 1 */}
            <div className="flex-shrink-0 w-96 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;Sri Janaki Mahal provided us with a peaceful sanctuary during our pilgrimage. The spiritual atmosphere and warm hospitality made our stay truly memorable.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rajesh Kumar</p>
                  <p className="text-sm text-gray-600">Pilgrimage Visitor</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex-shrink-0 w-96 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;The rooms are clean, comfortable, and the staff is incredibly helpful. Perfect location for visiting the temples. Highly recommended!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  PS
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-600">Spiritual Seeker</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex-shrink-0 w-96 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;Excellent value for money. The dharmshala maintains high standards of cleanliness and provides authentic spiritual experience. Will visit again!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  AM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Amit Mishra</p>
                  <p className="text-sm text-gray-600">Returning Guest</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="flex-shrink-0 w-96 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;The peaceful environment and spiritual vibes of Sri Janaki Mahal helped me reconnect with my inner self. Truly a blessed place!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  VD
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Vandana Devi</p>
                  <p className="text-sm text-gray-600">Meditation Practitioner</p>
                </div>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="flex-shrink-0 w-96 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;Sri Janaki Mahal provided us with a peaceful sanctuary during our pilgrimage. The spiritual atmosphere and warm hospitality made our stay truly memorable.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rajesh Kumar</p>
                  <p className="text-sm text-gray-600">Pilgrimage Visitor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}