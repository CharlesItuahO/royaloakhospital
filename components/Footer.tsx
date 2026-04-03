import Link from 'next/link';
import { MapPin, Phone, Clock, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Intro */}
          <div>
            <div className="flex flex-col mb-6">
              <span className="text-2xl font-bold text-white leading-tight">Royal Oak</span>
              <span className="text-sm font-medium text-blue-400 tracking-wider">HOSPITAL</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We&apos;re here to help you with appointments, inquiries, and medical support. Reach out to Royal Oak Hospital today, our team is always ready to provide guidance, answer your questions, and ensure you receive the care you deserve.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Our Services</Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Testimonials</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Contact Us</Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Obstetrics (Maternal Care)</li>
              <li className="text-gray-400 text-sm">Gynecology</li>
              <li className="text-gray-400 text-sm">Fertility and IVF Services</li>
              <li className="text-gray-400 text-sm">Family Health</li>
              <li className="text-gray-400 text-sm">General Medical Services</li>
              <li className="text-gray-400 text-sm">24/7 Emergency Care</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">House 3 B Cl, 1st Ave, Festac Town, Lagos 102102, Lagos</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">08033445809</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@royaloakhospital.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Open 24 Hours, 7 Days a Week</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Royal Oak Hospital. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
