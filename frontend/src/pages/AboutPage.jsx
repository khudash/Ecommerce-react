import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Microscope, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

export default function AboutPage({ onShopClick, openQuiz }) {
  return (
    <div className="animate-fadeIn min-h-screen bg-[#f8faf8] text-slate-900">
      
      {/* Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] overflow-hidden border-b border-emerald-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/60 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Our Clinical Heritage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.15]">
            Bridging Swiss Bio-Peptides & <span className="emerald-gradient-text">Pure Botanical Science</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            FOLLILUXE™ was founded with a singular purpose: to engineer high-potency, drug-free hair regrowth therapies that deliver visible density without chemical side effects.
          </p>
        </div>
      </section>

      {/* Brand Story & Philosophy */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Dropper / Lab Bottle */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-2xl p-3">
              <img 
                src="/assets/hero-serum.jpg" 
                alt="FOLLILUXE Serum Lab Bottle" 
                className="w-full h-auto rounded-2xl object-cover"
              />
              <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-bold">
                <span>Dermatologist Certified</span>
                <span className="text-amber-700">100% Drug-Free</span>
              </div>
            </div>
          </div>

          {/* Story Copy */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 block">
                The Formulation Dilemma
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Why We Rejected Synthetic Chemicals
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              For decades, individuals struggling with thinning hair had only two choices: heavy, greasy oils that never reached the root bulb, or synthetic pharmaceuticals that caused severe shedding, scalp inflammation, and hormonal disruption.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              We partnered with Swiss dermatological laboratories to utilize <strong className="text-slate-900">Redensyl® (3%)</strong>, <strong className="text-slate-900">AnaGain™ Organic Pea Sprouts</strong>, and <strong className="text-slate-900">Procapil®</strong> in a water-light cellular carrier system. The result is a non-greasy serum that feeds dormant hair stem cells directly.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>0% Minoxidil Chemicals</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Greasy Residue</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>60-Day Full Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Our Formulation Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Every drop of FOLLILUXE™ adheres to strict pharmaceutical-grade purity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            
            <div className="p-7 rounded-3xl bg-[#fbfdfc] border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Microscope className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                1. Swiss Clinical Actives
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We formulate with maximum clinical active percentages (3% Redensyl® + 2% Procapil®), never diluting our actives for cost reduction.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#fbfdfc] border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                2. 100% Clean & Vegan
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Free of parabens, sulfates, silicones, artificial fragrances, and synthetic hormones. Gentle on all scalp types, color-treated hair, and daily routines.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#fbfdfc] border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                3. Total Accountability
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Backed by our unconditional 60-day money-back guarantee. If you don't see thicker, fuller hair, your purchase is completely refunded.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-900 to-[#063b2c] text-white space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold">
            Ready to Start Your 90-Day Transformation?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mx-auto">
            Join over 4,850+ men and women who have restored hair density and stopped shedding with FOLLILUXE™.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onShopClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Shop Clinical Bundles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openQuiz}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors cursor-pointer"
            >
              Take Free Scalp Quiz
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
