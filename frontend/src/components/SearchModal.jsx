import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, INGREDIENTS } from '../data/storeData';

export default function SearchModal({ isOpen, onClose, onSelectProduct, onNavigate }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.features.some(f => f.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedIngredients = INGREDIENTS.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-700" />
          <input
            type="text"
            autoFocus
            placeholder="Search hair growth packages, Redensyl, reviews..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 text-sm outline-none placeholder-slate-400 font-medium"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5 text-left">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['3-Month Clinical Kit', 'Swiss Redensyl® 3%', 'Silicone Scalp Massager', '60-Day Guarantee', 'How to Apply'].map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(tag)}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Products match */}
              {matchedProducts.length > 0 && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold block mb-2">
                    Serum Packages ({matchedProducts.length})
                  </span>
                  <div className="space-y-2">
                    {matchedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onSelectProduct(prod);
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={prod.image} alt={prod.name} className="w-11 h-11 rounded-xl object-cover" />
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{prod.name}</span>
                            <span className="text-[11px] text-emerald-700 font-semibold">{prod.supplyDays}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients match */}
              {matchedIngredients.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-2">
                    Active Clinical Ingredients ({matchedIngredients.length})
                  </span>
                  <div className="space-y-2">
                    {matchedIngredients.map((ing) => (
                      <div
                        key={ing.name}
                        onClick={() => {
                          onNavigate('science');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{ing.name}</span>
                          <span className="text-[11px] text-slate-600 line-clamp-1">{ing.description}</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold shrink-0">{ing.stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedProducts.length === 0 && matchedIngredients.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No direct matches found for "{query}".
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
