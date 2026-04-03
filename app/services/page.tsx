import Image from 'next/image';
import Link from 'next/link';
import { Baby, Activity, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Obstetrics (Maternal Care)',
    description: 'Comprehensive maternal care from preconception to postpartum, ensuring a safe and healthy journey for both mother and baby.',
    icon: Baby,
    image: 'https://picsum.photos/seed/obstetrics/800/600',
  },
  {
    title: 'Gynecology',
    description: 'Expert care for women\'s reproductive health, including routine screenings, diagnosis, and treatment of gynecological conditions.',
    icon: HeartPulse,
    image: 'https://picsum.photos/seed/gynecology/800/600',
  },
  {
    title: 'Fertility and IVF Services',
    description: 'Advanced assisted reproductive technology and compassionate support to help you build your family.',
    icon: Activity,
    image: 'https://picsum.photos/seed/fertility/800/600',
  },
  {
    title: 'Family Health & General Medical Services',
    description: 'Primary care and general medical services for all ages, focusing on preventive care and overall wellness.',
    icon: Stethoscope,
    image: 'https://picsum.photos/seed/general-medicine/800/600',
  },
];

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive healthcare solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col transition-transform hover:-translate-y-2">
                <div className="relative h-64 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-4">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg mb-6 flex-grow">{service.description}</p>
                  <Link href="/contact" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    Book an Appointment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
