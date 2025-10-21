"use client";

import React, { useState } from "react";
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    src: "/ayodhya-temple-spiritual.jpg",
    alt: "Sri Janaki Mahal Trust - Sacred temple and spiritual architecture in Ayodhya",
    category: "temple"
  },
  {
    id: 2,
    src: "/ayodhya-spiritual-architecture.jpg",
    alt: "Spiritual architecture and temple design at Sri Janaki Mahal Trust",
    category: "architecture"
  },
  {
    id: 3,
    src: "/ayodhya-temple-interior-spiritual.jpg",
    alt: "Interior of spiritual temple space at Sri Janaki Mahal Trust",
    category: "interior"
  },
  {
    id: 4,
    src: "/ayodhya-room-interior.jpg",
    alt: "Clean and comfortable room interior at Sri Janaki Mahal Trust",
    category: "rooms"
  },
  {
    id: 5,
    src: "/ayodhya-courtyard-peaceful.jpg",
    alt: "Peaceful courtyard and outdoor space at Sri Janaki Mahal Trust",
    category: "courtyard"
  },
  {
    id: 6,
    src: "/ayodhya-prayer-room-meditation.jpg",
    alt: "Prayer room and meditation space at Sri Janaki Mahal Trust",
    category: "prayer"
  },
  {
    id: 7,
    src: "/rooms/2-Bed-01.jpg",
    alt: "2 Bed AC Room - Comfortable accommodation at Sri Janaki Mahal Trust",
    category: "rooms"
  },
  {
    id: 8,
    src: "/rooms/3-Bed-01.jpg",
    alt: "3 Bed AC Room - Spacious accommodation at Sri Janaki Mahal Trust",
    category: "rooms"
  },
  {
    id: 9,
    src: "/rooms/4-Bed-01.jpg",
    alt: "4 Bed AC Room - Family accommodation at Sri Janaki Mahal Trust",
    category: "rooms"
  },
  {
    id: 10,
    src: "/rooms/Deluxe.jpg",
    alt: "Deluxe Suite - Premium accommodation at Sri Janaki Mahal Trust",
    category: "rooms"
  },
  {
    id: 11,
    src: "/rooms/Suit-Luxury.jpg",
    alt: "Luxury Suite - High-end accommodation at Sri Janaki Mahal Trust",
    category: "rooms"
  },
  {
    id: 12,
    src: "/sri-janaki-mahal/IMG-20251017-WA0022.jpg",
    alt: "Sri Janaki Mahal Trust - Exterior view and building facade",
    category: "building"
  }
];

const categories = [
  { id: "all", label: "All" },
  { id: "temple", label: "Temple" },
  { id: "rooms", label: "Rooms" },
  { id: "architecture", label: "Architecture" },
  { id: "interior", label: "Interior" },
  { id: "courtyard", label: "Courtyard" },
  { id: "prayer", label: "Prayer Room" },
  { id: "building", label: "Building" }
];

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: typeof galleryImages[0] | null;
}

function ImageModal({ isOpen, onClose, image }: ImageModalProps) {
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

  if (!isOpen || !image) return null;

  return (
    <div 
      className="modal-overlay active" 
      onClick={handleBackdropClick}
    >
      <div className="modal-content max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            className="w-full h-auto max-h-[90vh] object-contain"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="text-white text-lg font-medium">{image.alt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Photo Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take a visual journey through our spiritual sanctuary and comfortable accommodations in Ayodhya
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={() => openModal(image)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Experience Our Sacred Sanctuary
            </h3>
            <p className="text-gray-600 mb-6">
              Book your stay and immerse yourself in the spiritual atmosphere of Ayodhya
            </p>
            <a
              href="#rooms"
              className="inline-flex items-center gap-2 px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              View Rooms & Pricing
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </section>
  );
}
