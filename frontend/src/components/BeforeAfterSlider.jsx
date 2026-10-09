import React, { useState, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  Star, 
  UserCheck
} from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../data/storeData';

export default function BeforeAfterSlider({ cases = null }) {
  const casesList = (cases && cases.length > 0) ? cases : BEFORE_AFTER_CASES;
  const [sliderPos, setSliderPos] = useState(50);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const activeCase = casesList[activeCaseIdx] || casesList[0];


  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      updateSliderPosition(e.clientX);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  return (
    <section id="before-after" className="py-12 sm:py-16 md:py-20 bg-[#f0f7f3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Follicle Transformation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Real People. <span className="emerald-gradient-text">Real 90-Day Regrowth.</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-xl mx-auto">
            Drag the yellow slider horizontally across the head to reveal the Day 0 thinning scalp underneath the Day 90 dense hair.
          </p>
        </div>

        {/* Case Study Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 mb-6 sm:mb-8">
          {casesList.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCaseIdx(idx);
                setSliderPos(50);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeCaseIdx === idx
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white text-slate-700 hover:text-emerald-700 border border-slate-200'
              }`}
            >
              Case #{idx + 1}: {item.concern.split('&')[0]} ({item.duration})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left Column: Interactive Before/After Reveal Container */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-200 bg-slate-900 shadow-2xl select-none">
              
              <div 
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                style={{ touchAction: 'none' }}
                className="relative w-full aspect-[4/3] max-h-[380px] sm:max-h-[440px] cursor-ew-resize overflow-hidden bg-slate-900 mx-auto"
              >
                {/* 1. Base Layer (Thinning Scalp / Day 0 Baseline) */}
                <img 
                  src={activeCase.beforeImage} 
                  alt="Day 0 Baseline - Thinning Crown"
                  className="absolute inset-0 w-full h-full object-cover object-[center_30%] pointer-events-none select-none"
                />

                {/* 2. Top Layer (Dense Full Hair / Day 90 Treatment) clipped dynamically by slider position */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                  }}
                >
                  <img 
                    src={activeCase.afterImage} 
                    alt="Day 90 Full Dense Hair Regrowth"
                    className="absolute inset-0 w-full h-full object-cover object-[center_30%] pointer-events-none select-none"
                  />
                </div>

                {/* Left Floating Badge (Full Hair) */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-emerald-900/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[9px] sm:text-[11px] font-extrabold text-emerald-200 uppercase tracking-wider shadow-lg border border-emerald-500/40 pointer-events-none z-10 flex items-center gap-1.5">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400" />
                  <span>DAY 90 (FULL)</span>
                </div>

                {/* Right Floating Badge (Thinning Scalp) */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-slate-950/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[9px] sm:text-[11px] font-extrabold text-amber-300 uppercase tracking-wider shadow-lg border border-amber-500/40 pointer-events-none z-10 flex items-center gap-1.5">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-400" />
                  <span>DAY 0 (BEFORE)</span>
                </div>

                {/* Interactive Yellow Divider Line & Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.9)] pointer-events-none z-20"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl font-bold text-xs border-2 border-white transform transition-transform hover:scale-110">
                    <span className="text-[10px] sm:text-[11px] tracking-tighter font-extrabold">◀▶</span>
                  </div>
                </div>
              </div>

              {/* Helper instruction bar */}
              <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 text-center text-[11px] sm:text-xs text-slate-700 flex items-center justify-center gap-2 font-bold">
                <span>👈 Slide left & right to reveal before vs after scalp regrowth 👉</span>
              </div>

            </div>
          </div>

          {/* Right Column: Case Details & Testimonial Quote */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5 sm:space-y-4">
              
              {/* User Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{activeCase.name}</h3>
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xs text-slate-500">{activeCase.location}</span>
                </div>
                <div className="text-right">
                  <div className="flex text-amber-500">
                    {[...Array(activeCase.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                    Verified Customer
                  </span>
                </div>
              </div>

              {/* Specific Hair Concern */}
              <div className="space-y-0.5">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-800 font-bold block">
                  Targeted Condition:
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {activeCase.concern}
                </span>
              </div>

              {/* Protocol Used */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-slate-600">Protocol Used:</span>
                <span className="font-bold text-emerald-900 truncate max-w-[170px] sm:max-w-none">{activeCase.bundleUsed}</span>
              </div>

              {/* Quote */}
              <blockquote className="text-xs sm:text-sm text-slate-600 italic leading-relaxed pt-1">
                "{activeCase.review}"
              </blockquote>

              {/* 3-Stage Regrowth Timeline Preview */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="text-slate-900 font-bold">Observed Milestones:</div>
                <div className="space-y-1 text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span><strong>Day 14-21:</strong> Shower shedding dropped by ~80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span><strong>Day 45-60:</strong> Fine baby hairs sprouted on crown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span><strong>Day 90:</strong> Terminal strand thickening & coverage</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
