import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Gift, 
  ShoppingBag,
  Award,
  TrendingUp
} from 'lucide-react';
import { QUIZ_QUESTIONS, PRODUCTS, CURRENCIES } from '../data/storeData';
import confetti from 'canvas-confetti';

export default function HairQuizModal({ 
  isOpen, 
  onClose, 
  onAddToCart, 
  currency 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (opt) => {
    const updated = { ...answers, [currentStep]: opt };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setShowResults(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1200);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency];
    const amount = (usd * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  const recommendedBundle = PRODUCTS[2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-left">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Personalized Hair & Scalp Diagnostic
              </h3>
              <p className="text-[11px] text-emerald-800 font-semibold">
                60-Second Clinical Regrowth Assessment
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-emerald-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          
          {/* Progress Bar */}
          {!showResults && !isCalculating && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-slate-500 mb-2 font-bold">
                <span>Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="text-emerald-700">{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Loading Animation during calculation */}
          {isCalculating && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin" />
              <h4 className="text-lg font-bold text-slate-900">
                Analyzing Follicle Bio-Profile...
              </h4>
              <p className="text-xs text-slate-500">
                Calculating cellular peptide dosage & expected 90-day regrowth timeline
              </p>
            </div>
          )}

          {/* Active Question View */}
          {!showResults && !isCalculating && (
            <div className="space-y-6 text-left">
              <div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  {currentQ.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {currentQ.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="p-4 rounded-2xl text-left bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-500 text-slate-800 transition-all duration-200 flex items-center justify-between group shadow-sm"
                  >
                    <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      {opt.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 opacity-60 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-semibold transition-colors pt-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Question</span>
                </button>
              )}
            </div>
          )}

          {/* Result View */}
          {showResults && (
            <div className="space-y-6 animate-fadeIn text-left">
              
              {/* Top Result Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-amber-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    High Regrowth Candidate (94% Responsiveness)
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Your Personalized 90-Day Hair Restoration Blueprint
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Based on your responses, your dormant follicle roots are in an ideal responsive state for <strong className="text-emerald-800">Swiss Redensyl® 3% & Copper Peptides</strong>.
                </p>
              </div>

              {/* Expected Milestones Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs shadow-sm">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Your Projected Growth Trajectory:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-emerald-700 font-extrabold block">Days 14–21</span>
                    <span className="text-slate-600 text-[11px]">80% reduction in brush shedding</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-emerald-700 font-extrabold block">Days 45–60</span>
                    <span className="text-slate-600 text-[11px]">New baby hair sprout in part & temples</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-amber-700 font-extrabold block">Days 90</span>
                    <span className="text-slate-600 text-[11px]">+32% thicker root strand diameter</span>
                  </div>
                </div>
              </div>

              {/* Recommended Bundle Box */}
              <div className="p-5 rounded-2xl bg-white border-2 border-emerald-600 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <img 
                    src={recommendedBundle.image} 
                    alt={recommendedBundle.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Prescribed Clinical Match
                    </span>
                    <h5 className="text-base font-bold text-slate-900 font-serif mt-1">
                      {recommendedBundle.name}
                    </h5>
                    <div className="text-xs text-slate-500">
                      3x Bottles + FREE Scalp Stimulator + FREE Delivery
                    </div>
                    <div className="text-sm font-extrabold text-amber-600 mt-1">
                      {formatPrice(recommendedBundle.priceUSD)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(recommendedBundle);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Recommended Kit</span>
                </button>
              </div>

              {/* Quiz Exclusive Coupon */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Gift className="w-4 h-4 text-amber-600" />
                  <span>VIP Quiz Reward: <strong className="text-slate-900 font-extrabold">FREE Jade Massager & Priority Express Delivery</strong></span>
                </div>
                <button 
                  onClick={handleRestart}
                  className="text-slate-500 hover:text-slate-800 underline text-[11px] font-semibold"
                >
                  Retake Quiz
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
