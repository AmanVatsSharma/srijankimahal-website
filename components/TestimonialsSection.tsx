export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      text: "Exceptional service and peaceful environment. The rooms are clean, meals are delicious, and the staff is very helpful. Perfect location near Ram Mandir. Highly recommended for spiritual seekers."
    },
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      text: "Stayed here during my Ayodhya pilgrimage. The dharmshala provides everything you need - comfortable accommodation, all meals included, and a serene atmosphere. Walking distance to temples."
    },
    {
      name: "Sunita Devi",
      location: "Bangalore",
      rating: 5,
      text: "A truly spiritual experience! The staff treats every guest like family. Clean rooms, hot water, and the food is prepared with devotion. The prayer room is perfect for meditation."
    },
    {
      name: "Amit Singh",
      location: "Pune",
      rating: 5,
      text: "Great value for money. All meals included, no hidden charges. The location is perfect - just 5 minutes walk to Ram Mandir. Staff is available 24/7 for any assistance."
    },
    {
      name: "Kavita Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Beautiful place with spiritual vibes. The rooms are spacious and well-maintained. The vegetarian meals are excellent. Highly recommend for families visiting Ayodhya."
    },
    {
      name: "Vikram Mehta",
      location: "Kolkata",
      rating: 5,
      text: "Excellent accommodation near Ram Mandir. The trust maintains high standards of cleanliness and hospitality. The all-inclusive pricing with meals makes it very convenient."
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real experiences from pilgrims who have stayed with us at Sri Janaki Mahal Trust
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Guest Info */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-600 font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-8 h-8 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">4.5/5 Average Rating</h3>
            <p className="text-gray-600">
              Based on reviews from hundreds of satisfied guests
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
