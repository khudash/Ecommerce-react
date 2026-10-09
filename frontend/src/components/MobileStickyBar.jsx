import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, CURRENCIES } from '../data/storeData';

export default function MobileStickyBar({ onShopClick, currency }) {
  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency];
    const amount = (usd * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  const starterPrice = 49;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-800 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Save Up To 50%</span>
        </span>
        <span className="text-xs font-bold text-slate-900">
          From <strong className="text-amber-600 text-sm font-extrabold">{formatPrice(starterPrice)}</strong>
        </span>
      </div>

      <button
        onClick={onShopClick}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs shadow-md flex items-center gap-1.5 shrink-0"
      >
        <span>Shop Protocols</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
