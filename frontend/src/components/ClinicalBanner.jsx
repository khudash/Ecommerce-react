import React from 'react';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function ClinicalBanner() {
  return (
    <section className="bg-white border-y border-slate-200/80 py-8 sm:py-10 relative overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Metric Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6 text-center">
          
          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-emerald-100 shadow-xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold gold-gradient-text tracking-tight">
              +214%
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 mt-1">
              Stem Cell Growth
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
              vs Untreated Follicles
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-emerald-100 shadow-xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold emerald-gradient-text tracking-tight">
              -89%
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 mt-1">
              Shower Shedding
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
              In first 21 days
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-emerald-100 shadow-xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-600 tracking-tight">
              94%
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 mt-1">
              Density Increase
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
              90-day clinical study
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-emerald-100 shadow-xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-700 tracking-tight">
              60 Days
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 mt-1">
              Risk-Free Guarantee
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
              100% Full Money-Back
            </div>
          </div>

        </div>

        {/* Clinical Quality Standards Badges */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Dermatologist Tested</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>100% Drug & Hormone-Free</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>No Greasy Residue (Leave-in)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Paraben & Sulfate Free</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Cruelty-Free & Vegan</span>
          </div>
        </div>

      </div>
    </section>
  );
}
