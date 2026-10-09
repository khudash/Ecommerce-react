import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  ArrowLeft, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { FAQS } from '../data/storeData';

export default function FaqPage({ onBack, onNavigateToContact, onNavigateToShop }) {
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    'ALL',
    'Results & Timeline',
    'Application & Routine',
    'Safety & Side Effects',
    'Ingredients & Science',
    'Shipping & Guarantee'
  ];

  const filteredFaqs = FAQS.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fadeIn min-h-screen bg-[#f8faf8] text-slate-900 pb-20 text-left">
      
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="bg-white border-b border-slate-200/80 relative z-20 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Previous Page</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="hidden sm:inline">FOLLILUXE™ Help Center</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-emerald-800">24/7 Clinical Support</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="py-12 sm:py-16 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Help Center & Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Frequently Asked <span className="emerald-gradient-text">Questions</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Find immediate answers regarding our Swiss peptide formulations, clinical test results, application techniques, shipping timelines, and refund guarantee.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5" />
            <input
              type="text"
              placeholder="Search questions (e.g. minoxidil, shedding, 60 days)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:border-emerald-500 outline-none shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'ALL' ? 'All Questions' : cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
        
        {/* Accordion Questions List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:border-emerald-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold shrink-0 border border-emerald-200 inline-block">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 block sm:inline">
                      {faq.q}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-1 sm:mt-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Contact Box */}
        <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-r from-[#072419] via-[#051a12] to-[#072419] border border-emerald-700/30 text-white shadow-2xl space-y-6">
          <div className="text-center sm:text-left space-y-1 max-w-xl">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Need Personal Trichology Guidance?
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Talk Directly with Our Formulators
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80">
              Our clinical consultation specialists can assess your scalp pattern and recommend the ideal treatment duration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-emerald-300 text-[11px] block">Customer Hotline & WhatsApp:</span>
                <a href="tel:03010008483" className="text-white font-bold text-sm hover:underline">0301 0008483</a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-emerald-300 text-[11px] block">Consultation Email:</span>
                <a href="mailto:Glorience2@gmail.com" className="text-white font-bold text-sm hover:underline">Glorience2@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-emerald-900/60">
            <span className="text-xs text-emerald-300">
              Hours: Mon - Sun (9:00 AM - 10:00 PM PKT)
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onNavigateToContact}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                Send Message
              </button>
              <button
                onClick={onNavigateToShop}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-colors"
              >
                Explore Shop
              </button>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
