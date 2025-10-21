import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sri Janaki Mahal</h3>
            <p className="text-gray-400">
              A sacred dharmshala in Ayodhya, dedicated to providing pilgrims and spiritual seekers with sanctuary and warm hospitality amidst divinity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#home" className="hover:text-amber-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-amber-600 transition-colors">About Us</Link></li>
              <li><Link href="#rooms" className="hover:text-amber-600 transition-colors">Rooms</Link></li>
              <li><Link href="#gallery" className="hover:text-amber-600 transition-colors">Gallery</Link></li>
            </ul>
            
            {/* Legal Links */}
            <h3 className="text-xl font-bold mb-4 mt-8">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-amber-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-amber-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cancellation-refund" className="hover:text-amber-600 transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:+917250364323" className="hover:text-amber-600 transition-colors">
                  +91 7250364323
                </a>
              </li>
              <li>
                <a href="https://wa.me/917250364323" className="hover:text-amber-600 transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li>Ayodhya, Uttar Pradesh</li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Trust & Security</h3>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-500">🔒</span>
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🏛️</span>
                <span className="text-sm">Registered Trust</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm">4.5 Star Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">🕐</span>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">&copy; 2025 Sri Janaki Mahal Trust. All rights reserved.</p>
            <p className="text-sm mb-2">
              Registered Charitable Trust | Vasudev Gath, Karsewakpuram, Ayodhya, UP 224123
            </p>
            <p className="text-sm">
              Created with <span className="text-red-500">❤</span> and devotion for spiritual seekers and pilgrims by{" "}
              <a 
                href="https://vedpragya.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-600 hover:text-amber-500 transition-colors"
              >
                Vedpragya.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}