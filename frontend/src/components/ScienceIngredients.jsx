import React, { useState } from 'react';
import { 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Zap, 
  Flame, 
  ChevronRight, 
  Microscope,
  CheckCircle2
} from 'lucide-react';
import { INGREDIENTS } from '../data/storeData';

const iconMap = {
  Sparkles: Sparkles,
  Leaf: Leaf,
  ShieldCheck: ShieldCheck,
  Zap: Zap,
  Flame: Flame,
};

export default function ScienceIngredients({ ingredients = null }) {
  const ingredientsList = (ingredients && ingredients.length > 0) ? ingredients : INGREDIENTS;
  const [selectedIngredient, setSelectedIngredient] = useState(ingredientsList[0]);


  return (
    <section id="science" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      
      {/* Background blur orb */}
      <div className="absolute top-1/2 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <Microscope className="w-3.5 h-3.5 text-amber-500" />
            <span>Cellular Bio-Active Formulation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            The Science Behind <span className="gold-gradient-text">Follicle Rejuvenation</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-xl mx-auto">
            Engineered with high clinical concentrations of Swiss-patented peptides, organic phyto-nutrients, and botanical DHT blockers.
          </p>
        </div>

        {/* 2-Column Science Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Interactive Ingredient Selector List */}
          <div className="lg:col-span-6 space-y-2.5 sm:space-y-3">
            {ingredientsList.map((item) => {
              const IconComp = iconMap[item.icon] || Sparkles;
              const isSelected = selectedIngredient.name === item.name;

              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedIngredient(item)}
                  className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-md text-slate-900'
                      : 'bg-[#fafcfb] border-slate-200 hover:border-emerald-300 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected 
                        ? 'bg-emerald-700 text-white font-bold shadow-xs' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    <div className="text-left min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="font-bold text-xs sm:text-sm md:text-base text-slate-900 truncate">
                          {item.name}
                        </span>
                        <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold whitespace-nowrap">
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <span className="text-[11px] sm:text-xs font-bold text-amber-700 block whitespace-nowrap">
                      {item.stat}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ml-auto mt-0.5 transition-transform ${
                      isSelected ? 'text-emerald-700 translate-x-1' : 'text-slate-400'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Ingredient Deep Dive & Visual */}
          <div className="lg:col-span-6">
            <div className="h-full p-5 sm:p-7 md:p-8 rounded-3xl bg-[#f7faf8] border border-emerald-200 shadow-xl flex flex-col justify-between text-left">
              
              <div className="space-y-4 sm:space-y-5">
                {/* Visual Dropper / Lab Asset Preview */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-200">
                  <img 
                    src="/assets/serum-dropper.jpg" 
                    alt="Active botanical hair serum droplet" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2.5 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-200 text-[11px] sm:text-xs text-emerald-800 font-bold shadow-xs">
                    🔬 Cellular Penetration Technology
                  </div>
                </div>

                {/* Ingredient Title & Bio Details */}
                <div>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-emerald-700">
                      Biomolecular Analysis
                    </span>
                    <span className="text-slate-500">
                      Origin: <strong className="text-slate-800">{selectedIngredient.origin}</strong>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
                    {selectedIngredient.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-amber-700 mt-0.5">
                    Target Function: {selectedIngredient.role}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedIngredient.description}
                </p>

                {/* Key Bio Highlights */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Efficacy Metric</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-700">{selectedIngredient.stat}</span>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Side Effect Risk</span>
                    <span className="text-sm sm:text-base font-extrabold text-amber-700">0% Irritation / Safe</span>
                  </div>
                </div>
              </div>

              {/* Bottom Guarantee note */}
              <div className="mt-5 pt-3.5 border-t border-slate-200 flex items-center gap-2 text-[11px] sm:text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Formulated without Minoxidil, Parabens, Silicones, Sulfates or Synthetic Hormones.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
