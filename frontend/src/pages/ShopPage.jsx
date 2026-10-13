import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Gift, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Star, 
  Check, 
  Truck, 
  RotateCcw,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';
import { PRODUCTS, CURRENCIES } from '../data/storeData';

export default function ShopPage({ currency, onAddToCart, onBuyNow, openQuiz }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedBundleId, setSelectedBundleId] = useState('serum-3-bottles');
  const [liveViewers] = useState(43);

  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency];
    const amount = (usd * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'BUNDLES') return p.bottlesCount > 1;
    if (activeCategory === 'STARTER') return p.bottlesCount === 1;
    return true;
  });

  return (
    <div className="animate-fadeIn min-h-screen bg-[#f8faf8] text-slate-900 pb-20">
      
      {/* Shop Hero Banner */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100 text-center overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Clinical Follicle Protocols</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight">
            Shop FOLLILUXE™ <span className="emerald-gradient-text">Regrowth Protocols</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Choose your targeted 30, 60, or 90-day Swiss peptide regimen. Every order includes our unconditional 60-day money-back guarantee.
          </p>

          {/* Real-time viewer & stock alert */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-3 text-xs">
            <span className="flex items-center gap-1.5 text-amber-900 font-bold bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>{liveViewers} people currently ordering</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-900 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-sm">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Express Delivery & Cash on Delivery Available</span>
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-6">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'ALL'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Packages ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveCategory('BUNDLES')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'BUNDLES'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Multi-Month Transformation Kits (Best Value)
            </button>
            <button
              onClick={() => setActiveCategory('STARTER')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'STARTER'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              1-Month Starter
            </button>
          </div>
        </div>
      </section>

      {/* Main Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProducts.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;

            return (
              <div
                key={bundle.id}
                onClick={() => setSelectedBundleId(bundle.id)}
                className={`relative rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 ${
                  bundle.bestValue 
                    ? 'bg-gradient-to-b from-[#fffef7] via-white to-[#fbfdfb] border-2 border-amber-400 shadow-2xl shadow-emerald-950/10 scale-100 lg:scale-105 z-20' 
                    : bundle.popular 
                      ? 'bg-white border-2 border-emerald-600 shadow-xl' 
                      : 'bg-white border border-slate-200 hover:border-emerald-400 shadow-md'
                } ${isSelected ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}
              >
                {/* Top Badge */}
                {bundle.tag && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span className={`px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md ${
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
                  <div className="text-center pt-2 pb-4 border-b border-slate-100">
                    <div className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-1">
                      {bundle.supplyDays}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">
                      {bundle.name.replace('FOLLILUXE™ ', '')}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {bundle.subtitle}
                    </p>
                  </div>

                  {/* Product Image Preview */}
                  <div className="relative my-4 rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] flex items-center justify-center group/img border border-slate-100">
                    <img 
                      src={bundle.image} 
                      alt={bundle.name} 
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-emerald-700 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm">
                      SAVE {bundle.discountPercent}%
                    </div>
                  </div>

                  {/* Pricing Box */}
                  <div className="flex items-baseline justify-center gap-2.5 py-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      {formatPrice(bundle.priceUSD)}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(bundle.originalPriceUSD)}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {bundle.bottlesCount} {bundle.bottlesCount > 1 ? 'Bottles' : 'Bottle'}
                    </span>
                  </div>

                  {/* Free Gifts Highlights */}
                  {bundle.freeGifts.length > 0 && (
                    <div className="my-3 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                      {bundle.freeGifts.map((gift, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-amber-900">
                          <Gift className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                          <span>{gift}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 my-5 text-xs text-slate-700">
                    {bundle.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(bundle);
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-98 shadow-md ${
                      bundle.bestValue
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 hover:brightness-105 shadow-amber-400/30'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • {formatPrice(bundle.priceUSD)}</span>
                  </button>

                  <div className="text-center text-[11px] text-slate-500 pt-1 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>60-Day Satisfaction Money-Back Guarantee</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Bundle Comparison Matrix */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="p-7 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold text-slate-900 font-serif">
              Protocol Comparison Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Why 83% of dermatologists recommend the 3-Month Clinical Regrowth Kit
            </p>
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full min-w-[540px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Protocol Feature</th>
                  <th className="py-3 px-4">1-Month Starter</th>
                  <th className="py-3 px-4">2-Month Transformation</th>
                  <th className="py-3 px-4 text-emerald-700 font-bold bg-emerald-50/60 rounded-t-xl">3-Month Clinical (Best)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Duration & Supply</td>
                  <td className="py-3 px-4">30 Days (1 Bottle)</td>
                  <td className="py-3 px-4">60 Days (2 Bottles)</td>
                  <td className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/60">90 Days (3 Bottles Full Cycle)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Total Savings</td>
                  <td className="py-3 px-4">30% OFF</td>
                  <td className="py-3 px-4">44% OFF</td>
                  <td className="py-3 px-4 font-bold text-amber-700 bg-emerald-50/60">50% OFF (Save $105)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Free Jade Scalp Massager</td>
                  <td className="py-3 px-4 text-slate-400">—</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">✓ Included ($18 Value)</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold bg-emerald-50/60">✓ Included ($18 Value)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Free Rosemary Mist Gift</td>
                  <td className="py-3 px-4 text-slate-400">—</td>
                  <td className="py-3 px-4 text-slate-400">—</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold bg-emerald-50/60">✓ Included ($12 Value)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Tracked Express Delivery</td>
                  <td className="py-3 px-4">Standard Delivery</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">FREE Express</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold bg-emerald-50/60">FREE VIP Priority Express</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">60-Day Full Refund Guarantee</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">✓ 100% Risk Free</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">✓ 100% Risk Free</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold bg-emerald-50/60">✓ 100% Risk Free</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
