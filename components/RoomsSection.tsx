"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ROOMS, PRICING_TRANSPARENCY } from "../lib/rooms";
import { CONTACT_LINKS } from "../lib/constants";

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: typeof ROOMS[0] | null;
}

function RoomModal({ isOpen, onClose, room }: RoomModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, handleEscapeKey]);

  if (!isOpen || !room) return null;

  const whatsappMessage = `Hello Sri Janaki Mahal, I would like to book ${room.title} for ${room.currency}${room.price} per night`;

  return (
    <div 
      className="modal-overlay active" 
      onClick={handleBackdropClick}
    >
      <div className="modal-content w-full sm:w-11/12 md:w-3/4 lg:w-2/3 rounded-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{room.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Room Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${room.title} view ${index + 1} - Interior of accommodation at Sri Janaki Mahal Trust`}
                  width={250}
                  height={192}
                  className="rounded-lg w-full h-48 object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Room Features</h3>
            <ul className="space-y-2 text-gray-700">
              {room.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Price and CTA */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Price per night:</span>
              <span className="text-3xl font-bold text-amber-600">{room.currency}{room.price}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${CONTACT_LINKS.whatsapp}&text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.192-1.048 1.007-1.954 2.14-2.625 3.646-.735 1.7-1.14 3.6-.788 5.629.793 4.811 4.823 8.52 9.617 8.52 1.214 0 2.389-.184 3.514-.547 1.265-.41 2.439-1.04 3.466-1.872 1.048-.87 1.954-1.956 2.625-3.462.735-1.7 1.14-3.6.788-5.629-.793-4.811-4.823-8.52-9.617-8.52z" />
                </svg>
                Book on WhatsApp
              </a>
              <a
                href={CONTACT_LINKS.phone}
                className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<typeof ROOMS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (room: typeof ROOMS[0]) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="rooms" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Book Your Room in Advance
          </h2>
          <p className="text-lg text-gray-600">
            at <span className="text-amber-600 font-semibold">Sri Janaki Mahal Trust</span>
          </p>
          
          {/* Pricing Transparency Notice */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold text-green-800">Transparent Pricing</h3>
            </div>
            <p className="text-green-700 text-sm">
              <strong>All prices include:</strong> {PRICING_TRANSPARENCY.disclaimer}
            </p>
            <p className="text-green-700 text-sm mt-1">
              <strong>{PRICING_TRANSPARENCY.noHiddenCharges}</strong> {PRICING_TRANSPARENCY.checkInOut}
            </p>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ROOMS.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              onClick={() => openModal(room)}
            >
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-amber-100 to-amber-50">
                <Image
                  src={room.image}
                  alt={`${room.title} at Sri Janaki Mahal Trust - ${room.description}`}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className={`absolute top-3 right-3 ${room.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {room.badge}
                </div>
                <div className="absolute bottom-3 left-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                  </svg>
                  <span>Breakfast, Lunch & Dinner Included</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{room.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">{room.currency}{room.price}</span>
                  <button 
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(room);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Modal */}
      <RoomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        room={selectedRoom}
      />
    </section>
  );
}
