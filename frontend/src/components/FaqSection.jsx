import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search
} from 'lucide-react';
import { FAQS } from '../data/storeData';

export default function FaqSection({ faqs = null }) {
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqsList = (faqs && faqs.length > 0) ? faqs : FAQS;

  const filteredFaqs = faqsList.filter(
    (item) =>
      (item.q || item.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.a || item.answer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#f4f8f5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Frequently Asked <span className="emerald-gradient-text">Questions</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Everything you need to know about our Swiss peptide formulation, usage, and guarantee.
          </p>

          {/* Quick Search inside FAQ */}
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-7" />
            <input
              type="text"
              placeholder="Search questions (e.g. minoxidil, shedding, results)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:border-emerald-500 outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 text-left">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold shrink-0 border border-emerald-200">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.q}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-emerald-200 text-center space-y-2 shadow-md">
          <p className="text-xs sm:text-sm text-slate-600">
            Still have a question? Our certified trichologist support team is available 24/7.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-emerald-800">
            <span>Email: care@folliluxe.com</span>
            <span>•</span>
            <span>WhatsApp: +92 300 0000000</span>
          </div>
        </div>

      </div>
    </section>
  );
}
