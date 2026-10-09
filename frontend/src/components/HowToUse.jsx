import React from 'react';
import { 
  Droplet, 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  Lightbulb, 
  Clock
} from 'lucide-react';

export default function HowToUse({ onShopClick }) {
  const steps = [
    {
      num: '01',
      title: 'Targeted Dropper Application',
      timing: '30 Seconds',
      description: 'Fill 1 to 2 full pipettes (1ml) and apply directly along your scalp part line, receding hairline, and thinning crown areas on dry or damp hair.',
      icon: Droplet,
      highlight: 'Non-greasy, water-based serum'
    },
    {
      num: '02',
      title: 'Micro-Circulation Massage',
      timing: '2 to 3 Minutes',
      description: 'Use the included Jade Silicone Scalp Massager or your fingertips in gentle circular motions to awaken dormant root capillaries and accelerate peptide absorption.',
      icon: RotateCw,
      highlight: 'Stimulates root micro-vascularization'
    },
    {
      num: '03',
      title: 'Leave-In Cellular Nourishment',
      timing: 'Zero Rinse Needed',
      description: 'Leave the formula in to work overnight or throughout the day. It dries completely weightless and invisible without interfering with your everyday hairstyle.',
      icon: Sparkles,
      highlight: 'Leaves hair fresh, clean & full'
    }
  ];

  return (
    <section id="how-to-use" className="py-16 sm:py-20 bg-[#f4f8f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>3-Minute Daily Routine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            How To Use For <span className="emerald-gradient-text">Maximum Regrowth</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Designed to seamlessly fit into your morning or night routine with zero hassle, zero mess, and zero greasy residue.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((st, i) => {
            const IconComp = st.icon;
            return (
              <div 
                key={i}
                className="relative rounded-3xl p-7 bg-white border border-slate-200 hover:border-emerald-500 shadow-lg transition-all duration-300 group hover:-translate-y-1 text-left"
              >
                {/* Step Number Stamp */}
                <div className="text-4xl font-extrabold text-emerald-100 font-serif absolute top-4 right-6 select-none group-hover:text-emerald-200 transition-colors">
                  {st.num}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
                  <IconComp className="w-6 h-6 text-amber-300" />
                </div>

                <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold mb-2">
                  {st.timing}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {st.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{st.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trichologist Pro Tips Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-emerald-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md mt-1">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">Trichologist Clinical Advice</span>
                <span className="text-emerald-600 text-xs">• Verified Best Practice</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                Consistency Beats Quantity
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Applying once every night before bed allows the bio-peptides to penetrate uninterrupted for 8 hours during your body's natural cellular repair cycle. Do not skip days for the first 90 days.
              </p>
            </div>
          </div>

          <button
            onClick={onShopClick}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-lg shadow-emerald-950/10 transition-all hover:scale-105"
          >
            Start Your 90-Day Transformation
          </button>
        </div>

      </div>
    </section>
  );
}
