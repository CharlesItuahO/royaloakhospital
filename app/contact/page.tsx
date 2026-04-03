'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Send, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { saveAppointment, saveMessage } from '@/lib/store';
import { saveAppointmentDb, saveMessageDb, checkDb } from '@/lib/actions';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  date: z.string().min(1, 'Date is required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'appointment' | 'contact'>('appointment');

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const appointmentForm = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const onContactSubmit = async (data: ContactFormValues) => {
    const hasDb = await checkDb();
    if (hasDb) {
      const res = await saveMessageDb(data);
      if (!res.success) {
        toast.error('Failed to send message. Please try again.');
        return;
      }
    } else {
      saveMessage(data);
    }
    toast.success('Message sent successfully! We will get back to you soon.');
    contactForm.reset();
  };

  const onAppointmentSubmit = async (data: AppointmentFormValues) => {
    const hasDb = await checkDb();
    if (hasDb) {
      const res = await saveAppointmentDb(data);
      if (!res.success) {
        toast.error('Failed to book appointment. Please try again.');
        return;
      }
    } else {
      saveAppointment(data);
    }
    toast.success('Appointment request submitted! We will contact you to confirm.');
    appointmentForm.reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We&apos;re here to help you with appointments, inquiries, and medical support. Reach out to Royal Oak Hospital today.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600 mt-1">House 3 B Cl, 1st Ave, Festac Town, Lagos 102102, Lagos</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                      <a href="tel:08033445809" className="text-blue-600 hover:underline mt-1 block">08033445809</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Operating Hours</h4>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                        Open 24 Hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 h-64 overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.316827083074!2d3.2764124!3d6.4674836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b86b515555555%3A0x5555555555555555!2sHouse%203%20B%20Cl%2C%201st%20Ave%2C%20Festac%20Town%2C%20Lagos!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Royal Oak Hospital Location"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors ${
                      activeTab === 'appointment'
                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('appointment')}
                  >
                    <Calendar className="inline-block mr-2 h-5 w-5" />
                    Book Appointment
                  </button>
                  <button
                    className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors ${
                      activeTab === 'contact'
                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('contact')}
                  >
                    <Send className="inline-block mr-2 h-5 w-5" />
                    Send Message
                  </button>
                </div>

                <div className="p-8">
                  {activeTab === 'appointment' ? (
                    <form onSubmit={appointmentForm.handleSubmit(onAppointmentSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                          <input
                            {...appointmentForm.register('name')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                          />
                          {appointmentForm.formState.errors.name && (
                            <p className="mt-1 text-sm text-red-600">{appointmentForm.formState.errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <input
                            {...appointmentForm.register('phone')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="08012345678"
                          />
                          {appointmentForm.formState.errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{appointmentForm.formState.errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            {...appointmentForm.register('email')}
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="john@example.com"
                          />
                          {appointmentForm.formState.errors.email && (
                            <p className="mt-1 text-sm text-red-600">{appointmentForm.formState.errors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                          <input
                            {...appointmentForm.register('date')}
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          {appointmentForm.formState.errors.date && (
                            <p className="mt-1 text-sm text-red-600">{appointmentForm.formState.errors.date.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Required *</label>
                        <select
                          {...appointmentForm.register('service')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a service...</option>
                          <option value="Obstetrics">Obstetrics (Maternal Care)</option>
                          <option value="Gynecology">Gynecology</option>
                          <option value="Fertility">Fertility and IVF Services</option>
                          <option value="General">Family Health & General Medical</option>
                          <option value="Other">Other</option>
                        </select>
                        {appointmentForm.formState.errors.service && (
                          <p className="mt-1 text-sm text-red-600">{appointmentForm.formState.errors.service.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                        <textarea
                          {...appointmentForm.register('message')}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Any specific concerns or symptoms?"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-md"
                      >
                        Book Appointment
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          {...contactForm.register('name')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                        />
                        {contactForm.formState.errors.name && (
                          <p className="mt-1 text-sm text-red-600">{contactForm.formState.errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input
                          {...contactForm.register('phone')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="08012345678"
                        />
                        {contactForm.formState.errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{contactForm.formState.errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                        <textarea
                          {...contactForm.register('message')}
                          rows={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="How can we help you?"
                        />
                        {contactForm.formState.errors.message && (
                          <p className="mt-1 text-sm text-red-600">{contactForm.formState.errors.message.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-md"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
