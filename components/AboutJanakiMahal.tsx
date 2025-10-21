import Image from "next/image";

export default function AboutJanakiMahal() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
              About <span className="text-amber-600">Sri Janaki Mahal</span>
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Sri Janaki Mahal is a sacred dharmshala nestled in the spiritual heart of Ayodhya, dedicated to providing pilgrims and spiritual seekers with a peaceful sanctuary for their sacred journey.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our establishment honors the divine presence of Janaki (Sita) and offers a harmonious blend of traditional Indian hospitality with modern comfort. Every corner of our dharmshala resonates with spiritual energy and devotion.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Peaceful spiritual environment for meditation and prayer</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Warm hospitality and dedicated service</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Close proximity to sacred temples and pilgrimage sites</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Affordable rates for pilgrims and spiritual seekers</span>
              </div>
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251017-WA0022-PXibh1TA63gWyELctfvTwP5RiXXoiF.jpg" 
              alt="Sri Janaki Mahal Garden Courtyard - Beautiful peaceful garden area for meditation" 
              width={400}
              height={256}
              className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-xl transition-shadow"
              loading="lazy"
            />
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251017-WA0035-u3r4TYE42X2tAXLDxddjlUzcl69pbM.jpg" 
              alt="Sri Janaki Mahal Courtyard View - Serene courtyard with traditional architecture" 
              width={400}
              height={256}
              className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-xl transition-shadow"
              loading="lazy"
            />
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251017-WA0028-SNCPTXLv6DBG87wvT1V6X1K2pPshoT.jpg" 
              alt="Sri Janaki Mahal Exterior - Traditional spiritual architecture in Ayodhya" 
              width={400}
              height={256}
              className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-xl transition-shadow"
              loading="lazy"
            />
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251017-WA0034-Punqg4XPEqYevId5WKv6rmvmFxtw3d.jpg" 
              alt="Sri Janaki Mahal Interior - Comfortable and clean interior spaces" 
              width={400}
              height={256}
              className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-xl transition-shadow"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}