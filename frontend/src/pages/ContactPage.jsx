import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Truck,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Hair Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        topic: 'Hair Consultation',
        message: ''
      });
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#f8faf8] text-slate-900">
      
      {/* Hero Header */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>Customer Care & Trichology Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            We Are Here To <span className="emerald-gradient-text">Help You Grow</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto">
            Have questions regarding dosage, order tracking, or hair recovery timeline? Our trichology team is available 7 days a week.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Support Cards */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="space-y-1 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Direct Channels
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                Reach Out Directly
              </h3>
            </div>

            {/* WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Instant WhatsApp Support
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  +92 300 1234567
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Available for instant order booking & consultations.
                </p>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Email Support
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  care@folliluxe.com
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Average response time: within 2 hours.
                </p>
                <a
                  href="mailto:care@folliluxe.com"
                  className="inline-block mt-2 text-xs font-bold text-amber-700 hover:text-amber-800 underline"
                >
                  Send Email →
                </a>
              </div>
            </div>

            {/* Hours & Shipping */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Operating Hours: Mon - Sun (9:00 AM - 10:00 PM PKT)</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Nationwide Delivery: 2-3 Days via Express Courier</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>60-Day Guarantee & Cash on Delivery Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-xl text-left space-y-5">
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  Send Us a Message
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill out the form below and a hair care specialist will get back to you shortly.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2 animate-fadeIn">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-600">
                    Thank you for reaching out. One of our trichologists will review your query and reply within a few hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Usman Tariq"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="0300-1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="usman@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Topic / Concern
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                      >
                        <option value="Hair Consultation">Hair Regrowth Advice</option>
                        <option value="Order Status">Order Tracking / Status</option>
                        <option value="Cash on Delivery">Cash on Delivery Inquiry</option>
                        <option value="Guarantee">60-Day Guarantee Question</option>
                        <option value="Wholesale">Wholesale & Clinics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we assist you with your hair growth routine or order?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
