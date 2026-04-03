import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Best hospital ever. Dr. Akeredolu will make you feel you are the only one existing at the moment.",
    author: "Patient Review",
    rating: 5,
  },
  {
    text: "Good environment with wonderful health care services.",
    author: "Patient Review",
    rating: 4,
  },
  {
    text: "Dr. Akeredolu is truly God sent. He is one of the best Gynaecologist in the country.",
    author: "Patient Review",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Patient Testimonials</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Read what our patients have to say about their experience at Royal Oak Hospital.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 mb-4">
              <span className="text-2xl font-bold text-gray-900">4.7</span>
              <div className="flex text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current opacity-50" />
              </div>
              <span className="text-gray-600 font-medium">from 3 reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
                <Quote className="absolute top-6 right-6 h-10 w-10 text-blue-100" />
                <div className="flex text-yellow-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : 'fill-current opacity-30'}`} />
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-8 relative z-10">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">Verified Patient</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
