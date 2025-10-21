export default function AmenitiesSection() {
  const amenities = [
    {
      icon: "🍽️",
      title: "All Meals Included",
      description: "Traditional vegetarian breakfast, lunch, and dinner served daily"
    },
    {
      icon: "🚿",
      title: "Hot Water",
      description: "24/7 hot water supply in all rooms and common areas"
    },
    {
      icon: "❄️",
      title: "AC & Non-AC Rooms",
      description: "Choose between air-conditioned or naturally ventilated rooms"
    },
    {
      icon: "🧹",
      title: "Daily Housekeeping",
      description: "Professional cleaning and maintenance of all rooms"
    },
    {
      icon: "🛏️",
      title: "Comfortable Bedding",
      description: "Clean beds, pillows, and linens for a restful sleep"
    },
    {
      icon: "🚗",
      title: "Parking Available",
      description: "Secure parking space for guests' vehicles"
    },
    {
      icon: "🕉️",
      title: "Prayer Room",
      description: "Dedicated meditation and prayer space for spiritual practice"
    },
    {
      icon: "🔒",
      title: "24/7 Security",
      description: "Round-the-clock security and surveillance for your safety"
    },
    {
      icon: "📞",
      title: "Customer Support",
      description: "24/7 assistance for all your needs and queries"
    },
    {
      icon: "🗺️",
      title: "Prime Location",
      description: "Walking distance to Ram Mandir and major temples"
    },
    {
      icon: "💧",
      title: "Safe Drinking Water",
      description: "Purified drinking water available throughout the premises"
    },
    {
      icon: "📱",
      title: "WiFi Access",
      description: "Complimentary internet connectivity for guests"
    }
  ];

  return (
    <section id="amenities" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Amenities & Facilities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need for a comfortable and spiritually enriching stay in Ayodhya
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {amenity.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {amenity.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Special Notice */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-bold text-amber-800">All Meals Included</h3>
          </div>
          <p className="text-amber-700 text-lg mb-4">
            <strong>No additional charges for food!</strong> All room prices include breakfast, lunch, and dinner.
          </p>
          <p className="text-amber-600">
            Enjoy traditional vegetarian cuisine prepared with devotion and served with warmth.
          </p>
        </div>
      </div>
    </section>
  );
}
