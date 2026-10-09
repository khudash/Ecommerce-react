import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { CURRENCIES } from '../data/storeData';

export default function Hero({ currency, onShopClick }) {
  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency];
    const amount = (usd * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  return (
    <section id="hero" className="relative pt-6 pb-12 sm:pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#f0f7f3] via-[#ffffff] to-[#f8faf8]">
      {/* Soft Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 sm:w-80 h-48 sm:h-80 bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 text-left space-y-4 sm:space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-bold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-amber-800 font-extrabold tracking-wide">SWISS REDENSYL® 3% + PEPTIDES</span>
              <span className="text-emerald-400">•</span>
              <span className="text-slate-600 font-medium">CLINICALLY PROVEN</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 leading-[1.18]">
              Reactivate Dormant Follicles & Restore <span className="emerald-gradient-text">Visible Hair Density</span> in 90 Days.
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              A high-potency, drug-free botanical peptide formulation engineered with <strong className="text-emerald-800 font-semibold">3% Redensyl®</strong>, <strong className="text-emerald-800 font-semibold">AnaGain™</strong>, and <strong className="text-emerald-800 font-semibold">Procapil®</strong> to stop chronic shedding, thicken miniaturized strands, and stimulate root regrowth.
            </p>

            {/* Social Proof Stars */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5">
              <div className="flex items-center gap-1 bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 ml-1">4.95 / 5.0</span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-600 font-medium">
                Based on <strong className="text-slate-900">4,850+ Verified Clinical Reviews</strong>
              </span>
            </div>

            {/* Key Clinical Benefits Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>+214% Follicle Growth</strong> vs untreated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>94% Saw Thicker Hair</strong> in 8-12 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>0% Minoxidil Chemicals</strong> (No Dread Shed)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>60-Day 100% Refund</strong> Money-Back Guarantee</span>
              </div>
            </div>

            {/* Clean Call To Action Button */}
            <div className="pt-2 sm:pt-3">
              <button
                onClick={onShopClick}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 shadow-xl shadow-amber-500/25 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span>Shop Bundles (Save Up To 50%)</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Guarantee Note */}
            <div className="flex items-center gap-2 pt-0.5 text-[11px] sm:text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Try FOLLILUXE risk-free for 60 days. If you don't see results, receive a 100% full refund.</span>
            </div>
          </div>

          {/* Right Column: Hero Product Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center w-full">
            
            <div className="relative w-full max-w-md rounded-3xl p-3 sm:p-3.5 bg-white border border-slate-200/80 shadow-2xl shadow-emerald-950/10 overflow-hidden group">
              
              {/* Top Luxury Banner inside card */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase bg-amber-400 text-slate-950 shadow-md">
                  ★ #1 Scalp Serum 2026
                </span>
              </div>

              {/* Main Product Image */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3] flex items-center justify-center">
                <img 
                  src="/assets/hero-serum.jpg" 
                  alt="FOLLILUXE Botanical Hair Growth Serum Bottle"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Before/After Preview Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <img 
                      src="/assets/crown-after.jpg" 
                      alt="Hair regrowth proof thumbnail" 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-emerald-300 shrink-0"
                    />
                    <div className="text-left min-w-0 truncate">
                      <div className="text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>90-Day Clinical Trial</span>
                        <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-600 shrink-0" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold truncate">
                        +29% Hair Density Increase
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0 pl-2">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">From</span>
                    <span className="text-xs sm:text-sm font-extrabold text-amber-600">
                      {formatPrice(49)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Tickers */}
              <div className="pt-3 px-1 grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-[11px]">
                <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="block font-extrabold text-emerald-700 text-xs sm:text-sm">3%</span>
                  <span className="text-slate-600 text-[9px] sm:text-[10px] font-medium">Redensyl®</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                  <span className="block font-extrabold text-amber-700 text-xs sm:text-sm">94%</span>
                  <span className="text-slate-600 text-[9px] sm:text-[10px] font-medium">Regrowth</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="block font-extrabold text-emerald-700 text-xs sm:text-sm">100%</span>
                  <span className="text-slate-600 text-[9px] sm:text-[10px] font-medium">Vegan</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
