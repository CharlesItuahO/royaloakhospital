import Image from 'next/image';
import Link from 'next/link';
import { Phone, Calendar, Clock, Shield, Heart, Award, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/hospital-hero/1920/1080?blur=2"
            alt="Royal Oak Hospital Facility"
            fill
            className="object-cover opacity-20"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
              Welcome to Royal Oak Hospital
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Precision Care <span className="text-blue-600">Result</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Royal Oak Hospital delivers compassionate, world-class medical care 24/7. From emergency response to neonatal care, we&apos;re with you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
              <a
                href="tel:08033445809"
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-blue-600 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:text-lg transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 bg-white relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-1">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
            <p className="text-gray-600">Round-the-clock emergency and general medical services when you need them most.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-1">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Facilities</h3>
            <p className="text-gray-600">Equipped with state-of-the-art medical technology for accurate diagnosis and treatment.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-1">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Experienced Staff</h3>
            <p className="text-gray-600">A dedicated team of highly skilled doctors, nurses, and healthcare professionals.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Royal Oak Hospital</h2>
            <p className="text-lg text-gray-600">We are committed to providing exceptional healthcare services with a focus on patient comfort and positive outcomes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Highly Skilled Professionals', desc: 'Our team consists of top-tier specialists and compassionate nurses.', icon: Award },
              { title: 'Clean & Odor-Free Environment', desc: 'We maintain the highest standards of hygiene for your safety and comfort.', icon: Shield },
              { title: 'Compassionate Patient Care', desc: 'We treat every patient like family, ensuring a supportive healing journey.', icon: Heart },
              { title: 'Modern Equipment', desc: 'Utilizing advanced medical technology for precise diagnostics and treatment.', icon: Star },
              { title: 'Excellent Patient Satisfaction', desc: 'Rated 4.7/5 by our patients for outstanding care and service.', icon: Star },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex-shrink-0 mt-1">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
              <div className="flex items-center space-x-2 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-current' : 'fill-current opacity-50'}`} />
                ))}
                <span className="text-gray-700 font-medium ml-2">4.7/5 from 3 reviews</span>
              </div>
            </div>
            <Link href="/testimonials" className="hidden md:inline-flex text-blue-600 font-medium hover:text-blue-800 transition-colors">
              View All Reviews &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl relative">
              <div className="text-blue-600 mb-4">
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
              </div>
              <p className="text-gray-700 italic mb-6">&quot;Best hospital ever. Dr. Akeredolu will make you feel you are the only one existing at the moment.&quot;</p>
              <div className="font-semibold text-gray-900">- Patient Review</div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl relative">
              <div className="text-blue-600 mb-4">
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline opacity-50" />
              </div>
              <p className="text-gray-700 italic mb-6">&quot;Good environment with wonderful health care services.&quot;</p>
              <div className="font-semibold text-gray-900">- Patient Review</div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl relative hidden lg:block">
              <div className="text-blue-600 mb-4">
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
                <Star className="h-6 w-6 fill-current inline" />
              </div>
              <p className="text-gray-700 italic mb-6">&quot;Dr. Akeredolu is truly God sent. He is one of the best Gynaecologist in the country.&quot;</p>
              <div className="font-semibold text-gray-900">- Patient Review</div>
            </div>
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/testimonials" className="inline-flex text-blue-600 font-medium hover:text-blue-800 transition-colors">
              View All Reviews &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Precision Care?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our team is available 24/7 to provide you with the best medical attention. Book your appointment today.
          </p>
          <Link
            href="/contact"
            className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:text-lg transition-colors shadow-lg"
          >
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
