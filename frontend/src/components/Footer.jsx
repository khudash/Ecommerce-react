import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Send, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#05110b] text-slate-300 text-xs pt-16 pb-12 relative overflow-hidden border-t border-emerald-950">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Newsletter Signup Row */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#072419] via-[#051a12] to-[#072419] border border-emerald-700/30 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-left shadow-2xl">
          <div className="space-y-1.5 max-w-lg w-full">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">VIP Trichology Newsletter</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Join Our <span className="text-amber-300 font-extrabold">VIP Trichology</span> Circle
            </h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm">
              Receive clinical hair growth advice, early batch access, and priority member updates.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="p-3.5 px-5 rounded-2xl bg-emerald-800/80 border border-emerald-400/50 text-emerald-100 text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Thank you! You are now subscribed to our VIP Trichology priority circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-[#030c07] border border-emerald-700/50 text-white text-xs placeholder-emerald-300/40 focus:border-emerald-400 outline-none w-full"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-transform hover:scale-105 shrink-0 shadow-md cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Full Footer Grid: Brand Story + Quick Navigation + Policies + CONNECT DIRECTLY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 text-left pt-2">
          
          {/* 1. Brand Info & Story */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group inline-flex"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-amber-400 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#05110b] rounded-full flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-luxury font-extrabold tracking-[0.2em] text-white">
                FOLLI<span className="text-emerald-400">LUXE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              FOLLILUXE™ is a medical-botanical haircare laboratory pioneering Swiss bio-peptide formulations to reactivate dormant hair follicles without drugs or hormone disruption.
            </p>
            <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>60-Day Satisfaction Money-Back Guarantee</span>
            </div>
          </div>

          {/* 2. Middle-Left Column: QUICK NAVIGATION */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-400 font-sans">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shop')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>Our Shop</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blogs')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>Clinical Journal & Blogs</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('faq')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>FAQs & Help Center</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')} 
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-amber-500">★</span>
                  <span>Custom Executive Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Middle-Right Column: CUSTOMER POLICIES */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-400 font-sans">
              CUSTOMER POLICIES
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <button 
                  onClick={() => onNavigate('terms')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>Terms & Conditions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('refund')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>Refund & Exchange</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('faq')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="text-slate-500">—</span>
                  <span>Shipping & Delivery</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 4. Right Column: CONNECT DIRECTLY */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-400 font-sans">
              CONNECT DIRECTLY
            </h4>
            <div className="space-y-3 text-xs">
              
              {/* Phone Hotline */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Customer Service Hotline</span>
                  <a 
                    href="tel:03010008483" 
                    className="text-white hover:text-amber-300 font-bold text-sm tracking-wide transition-colors inline-block"
                  >
                    0301 0008483
                  </a>
                </div>
              </div>

              {/* Formulation & Business Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Formulation & Business Email</span>
                  <a 
                    href="mailto:Glorience2@gmail.com" 
                    className="text-white hover:text-amber-300 font-semibold text-xs transition-colors inline-block"
                  >
                    Glorience2@gmail.com
                  </a>
                </div>
              </div>

              {/* Lab Headquarters */}
              <div 
                onClick={() => onNavigate('contact')}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:text-amber-300" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Lab Headquarters</span>
                  <span className="text-white group-hover:text-amber-300 font-semibold text-xs transition-colors">
                    Islamabad, Pakistan
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-emerald-950 space-y-4 text-left text-[11px] text-slate-500">
          <p>
            *Disclaimer: Statements on this website have been clinically studied on individual active ingredients (Redensyl®, AnaGain™, Procapil®). Individual results may vary based on scalp health, genetics, and consistency of application. This cosmetic formulation is not intended to diagnose, treat, cure, or prevent any medical condition.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-slate-400">
            <div>
              © 2026 FOLLILUXE™ (Glorience). All Rights Reserved.
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => onNavigate('terms')}
                className="px-2.5 py-1 rounded bg-[#030c07] border border-emerald-900/60 text-[10px] font-bold text-amber-400 hover:border-amber-400 transition-colors cursor-pointer"
              >
                Cash On Delivery
              </button>
              <button 
                onClick={() => onNavigate('terms')}
                className="px-2.5 py-1 rounded bg-[#030c07] border border-emerald-900/60 text-[10px] font-bold text-white hover:border-white transition-colors cursor-pointer"
              >
                Visa / Mastercard
              </button>
              <button 
                onClick={() => onNavigate('refund')}
                className="px-2.5 py-1 rounded bg-[#030c07] border border-emerald-900/60 text-[10px] font-bold text-emerald-300 hover:border-emerald-300 transition-colors cursor-pointer"
              >
                JazzCash / EasyPaisa
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
