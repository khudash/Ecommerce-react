import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Gift, 
  ShieldCheck, 
  Zap, 
  Star,
  Check,
  Filter
} from 'lucide-react';
import { PRODUCTS, CURRENCIES } from '../data/storeData';

export default function CollectionsPage({ currency, onAddToCart, onBuyNow, openQuiz }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

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
      
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Complete Product Line</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            FOLLILUXE™ <span className="emerald-gradient-text">Collections</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto">
            Explore our clinically backed peptide serums, scalp stimulators, and multi-month regrowth protocols.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'ALL'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Formulations ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveCategory('BUNDLES')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'BUNDLES'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Clinical Multi-Packs (Save Up To 50%)
            </button>
            <button
              onClick={() => setActiveCategory('STARTER')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'STARTER'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Single Starter Bottles
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProducts.map((bundle) => (
            <div
              key={bundle.id}
              className={`relative rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left ${
                bundle.bestValue ? 'border-2 border-amber-400' : ''
              }`}
            >
              {bundle.tag && (
                <div className="absolute -top-3 left-6 z-20">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-sm ${
                    bundle.bestValue ? 'bg-amber-400 text-slate-950' : 'bg-emerald-700 text-white'
                  }`}>
                    {bundle.tag}
                  </span>
                </div>
              )}

              <div>
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/11] mb-4 border border-slate-100">
                  <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 bg-emerald-700 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    SAVE {bundle.discountPercent}%
                  </span>
                </div>

                <div className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider mb-1">
                  {bundle.supplyDays}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  {bundle.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {bundle.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 my-2.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    ({bundle.reviewsCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 my-3">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {formatPrice(bundle.priceUSD)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(bundle.originalPriceUSD)}
                  </span>
                </div>

                {/* Free Gifts */}
                {bundle.freeGifts.length > 0 && (
                  <div className="my-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 space-y-1">
                    {bundle.freeGifts.map((g, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Gift className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-1.5 my-4 text-xs text-slate-600">
                  {bundle.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onAddToCart(bundle)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    bundle.bestValue
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart • {formatPrice(bundle.priceUSD)}</span>
                </button>

                <button
                  onClick={() => onBuyNow(bundle)}
                  className="w-full py-2 px-4 rounded-xl font-bold text-xs text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>1-Click Buy Now</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
