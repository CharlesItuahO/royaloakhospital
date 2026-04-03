import Image from 'next/image';
import { Target, Eye, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Royal Oak Hospital</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Precision Care Result
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview of Sirona Hospital Limited: Precision Care Result</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Royal Oak Hospital, founded October 1st 2001, is a family health care center and specialist hospital that delivers quality, specialized health care in Obstetrics, Gynecology and Fertility medicine while ensuring compassionate ethical and result driven care for every patient.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="ml-4 text-gray-700 font-medium">Professional healthcare staff</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="ml-4 text-gray-700 font-medium">Clean and serene environment</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="ml-4 text-gray-700 font-medium">Patient-centered care</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative h-96 w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/seed/hospital-about/800/600"
                alt="Royal Oak Hospital Interior"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-10 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide comprehensive, high quality, evidence based family and specialist health care services with a focus on Obstetrics, Gynecology, and assisted reproductive care delivering safe, evidence based and patient – centered care.
              </p>
            </div>
            
            <div className="bg-blue-50 p-10 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To set the benchmark for clinical innovation and compassionate care in family health, women&apos;s health and Reproductive Medicine.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
