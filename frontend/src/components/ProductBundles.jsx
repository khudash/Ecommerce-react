import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Gift, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Flame, 
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, CURRENCIES } from '../data/storeData';

export default function ProductBundles({ 
  currency, 
  onAddToCart, 
  onBuyNow,
  products = PRODUCTS
}) {
  const bundleList = (products && products.length > 0) ? products : PRODUCTS;
  const [selectedBundleId, setSelectedBundleId] = useState('serum-3-bottles');
  const [liveViewers] = useState(41);


  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency];
    const amount = (usd * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  return (
    <section id="bundles" className="py-12 sm:py-16 bg-[#f8faf8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Select Your Hair Regrowth Routine</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Choose Your <span className="emerald-gradient-text">Clinical Protocol</span>
          </h2>
          
          <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-xl mx-auto">
            Hair follicles grow in 90-day cycles. For permanent root density, the <strong className="text-slate-900">3-Month Clinical Kit</strong> is dermatologist-recommended.
          </p>

          {/* Real-time viewer & stock alert */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-1 text-[10px] sm:text-[11px]">
            <span className="flex items-center gap-1.5 text-amber-900 font-bold bg-amber-50 px-2.5 sm:px-3 py-1 rounded-full border border-amber-200 shadow-xs">
              <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
              <span>{liveViewers} people currently viewing</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-900 font-medium bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
              <Clock className="w-3 h-3 text-emerald-600" />
              <span>Today's Batch: High Demand</span>
            </span>
          </div>
        </div>

        {/* 3 Bundle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch pt-2">
          {bundleList.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;

            return (
              <div
                key={bundle.id}
                onClick={() => setSelectedBundleId(bundle.id)}
                className={`relative rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 ${
                  bundle.bestValue 
                    ? 'bg-gradient-to-b from-[#fffef7] via-white to-[#fbfdfb] border-2 border-amber-400 shadow-xl scale-100 lg:scale-105 z-20 md:col-span-2 lg:col-span-1' 
                    : bundle.popular 
                      ? 'bg-white border-2 border-emerald-600 shadow-lg' 
                      : 'bg-white border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md'
                } ${isSelected ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}
              >
                {/* Top Badge */}
                {bundle.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                    <span className={`px-3 sm:px-3.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-sm whitespace-nowrap ${
                      bundle.bestValue 
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950' 
                        : bundle.popular 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-800 text-white'
                    }`}>
                      {bundle.tag}
                    </span>
                  </div>
                )}

                <div>
                  {/* Product Header */}
                  <div className="text-center pt-1 pb-3 border-b border-slate-100">
                    <div className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold mb-0.5">
                      {bundle.supplyDays}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                      {bundle.name.replace('FOLLILUXE™ ', '')}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {bundle.subtitle}
                    </p>
                  </div>

                  {/* Compact Product Image Preview */}
                  <div className="relative my-3 rounded-2xl overflow-hidden bg-slate-50 aspect-[16/9] max-h-[145px] flex items-center justify-center group/img border border-slate-100">
                    <img 
                      src={bundle.image} 
                      alt={bundle.name} 
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-700 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                      SAVE {bundle.discountPercent}%
                    </div>
                  </div>

                  {/* Compact Pricing Box */}
                  <div className="flex items-baseline justify-center gap-2 py-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {formatPrice(bundle.priceUSD)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(bundle.originalPriceUSD)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {bundle.bottlesCount} {bundle.bottlesCount > 1 ? 'Bottles' : 'Bottle'}
                    </span>
                  </div>

                  {/* Free Gifts Highlights */}
                  {bundle.freeGifts.length > 0 && (
                    <div className="my-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200 space-y-0.5">
                      {bundle.freeGifts.map((gift, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-amber-900">
                          <Gift className="w-3 h-3 shrink-0 text-amber-600" />
                          <span>{gift}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Feature Checklist */}
                  <ul className="space-y-1.5 my-3 text-[11px] text-slate-700">
                    {bundle.features.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(bundle);
                    }}
                    className={`w-full py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 transform active:scale-98 shadow-xs cursor-pointer ${
                      bundle.bestValue
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 hover:brightness-105 shadow-amber-400/20'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart • {formatPrice(bundle.priceUSD)}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyNow(bundle);
                    }}
                    className="w-full py-2 px-3 rounded-xl font-bold text-[11px] text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3 h-3 text-amber-600" />
                    <span>Express Checkout (1-Click)</span>
                  </button>

                  <div className="text-center text-[10px] text-slate-500 pt-0.5 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>60-Day Money-Back Guarantee</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Banner */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-3xl bg-white border border-emerald-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 text-left">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                Our 100% "Thicker Hair or Free" Guarantee
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
                Take photos on Day 1. Use the serum daily for 60 days. If you don't notice reduced shedding, send back the bottles for a 100% refund.
              </p>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(PRODUCTS[2])}
            className="w-full md:w-auto shrink-0 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform hover:scale-105 cursor-pointer"
          >
            <span>Claim 3-Bottle Kit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
