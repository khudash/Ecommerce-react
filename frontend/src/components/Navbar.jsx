import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Truck, 
  Award, 
  ChevronDown,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { CURRENCIES } from '../data/storeData';

export default function Navbar({ 
  cart, 
  setIsCartOpen, 
  currency, 
  setCurrency, 
  currentPage,
  setCurrentPage,
  openSearch
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNav = (pageName) => {
    setMobileMenuOpen(false);
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { key: 'home', label: 'HOME', onClick: () => handleNav('home') },
    { key: 'shop', label: 'SHOP', onClick: () => handleNav('shop') },
    { key: 'about', label: 'ABOUT US', onClick: () => handleNav('about') },
    { key: 'contact', label: 'CONTACT', onClick: () => handleNav('contact') },
  ];

  const mobileExtraNavItems = [
    { key: 'dashboard', label: '👑 CUSTOM DASHBOARD (ADMIN)', onClick: () => handleNav('dashboard') },
    { key: 'blogs', label: 'CLINICAL JOURNAL & BLOGS', onClick: () => handleNav('blogs') },
    { key: 'faq', label: 'FAQS & HELP CENTER', onClick: () => handleNav('faq') },
    { key: 'terms', label: 'TERMS & CONDITIONS', onClick: () => handleNav('terms') },
    { key: 'privacy', label: 'PRIVACY POLICY', onClick: () => handleNav('privacy') },
    { key: 'refund', label: '60-DAY REFUND GUARANTEE', onClick: () => handleNav('refund') },
  ];

  return (
    <>
      {/* Pinned Navbar Container - Follows user smoothly on scroll */}
      <div className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-[#053b2c] text-emerald-100 text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 flex items-center justify-between overflow-hidden shadow-sm relative z-30">
          <div className="hidden lg:flex items-center gap-4 text-emerald-200 mx-auto text-[11.5px] uppercase tracking-wider font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-300" /> Free Express Delivery & Cash on Delivery Available
            </span>
            <span className="text-emerald-500">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> 60-Day Money-Back Guarantee
            </span>
            <span className="text-emerald-500">•</span>
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Award className="w-3.5 h-3.5 text-amber-300" /> 94% Regrowth Rate in Clinical Study
            </span>
          </div>
          
          <div className="lg:hidden text-left sm:text-center flex-1 pr-2 truncate text-[10px] sm:text-[11px] font-medium tracking-wide">
            ✨ <span className="text-amber-300 font-bold">50% OFF BUNDLES:</span> Free Jade Massager + Free COD
          </div>

          {/* Currency Switcher */}
          <div className="relative shrink-0">
            <button 
              onClick={() => setCurrencyDropdown(!currencyDropdown)}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 text-[10px] sm:text-xs font-semibold transition-colors border border-emerald-700/50 shadow-inner cursor-pointer"
            >
              <span>{CURRENCIES[currency].label.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>

            {currencyDropdown && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-200 rounded-xl shadow-2xl py-1 z-50 animate-fadeIn text-slate-800">
                {Object.keys(CURRENCIES).map((currKey) => (
                  <button
                    key={currKey}
                    onClick={() => {
                      setCurrency(currKey);
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
                      currency === currKey ? 'text-emerald-700 font-bold bg-emerald-50/80' : 'text-slate-700'
                    }`}
                  >
                    <span>{CURRENCIES[currKey].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <header className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md py-2 sm:py-2.5 shadow-md border-b border-emerald-100' 
            : 'bg-white py-3 sm:py-4 border-b border-slate-100'
        }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* Luxury Brand Logo */}
          <div 
            onClick={() => handleNav('home')} 
            className="cursor-pointer flex items-center gap-2 group select-none"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-400 flex items-center justify-center p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 group-hover:text-amber-600 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg sm:text-2xl font-luxury font-extrabold tracking-[0.16em] sm:tracking-[0.2em] text-slate-900 flex items-center leading-tight">
                FOLLI<span className="text-emerald-600">LUXE</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-emerald-700 font-semibold">
                Clinical Scalp Science
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9 text-[13px] font-extrabold tracking-[0.14em]">
            {navItems.map((item) => {
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={item.onClick}
                  className={`cursor-pointer py-1.5 transition-all duration-200 uppercase relative ${
                    isActive 
                      ? 'text-amber-600 font-black' 
                      : 'text-slate-700 hover:text-emerald-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-amber-500 rounded-full shadow-sm animate-fadeIn" />
                  ) : (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-emerald-600 opacity-0 hover:opacity-100 transition-opacity rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons (Search, Dashboard & Cart) */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Custom Admin Dashboard Shortcut */}
            <button
              onClick={() => handleNav('dashboard')}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/90 text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="Open Custom Dynamic Dashboard (/dashboard)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Dashboard</span>
            </button>

            {/* Quick Search */}
            <button
              onClick={openSearch}
              className="p-1.5 sm:p-2 rounded-full text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
              title="Search Products & Info"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md shadow-emerald-700/20 hover:shadow-emerald-700/40 transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline font-bold">Cart</span>
              {totalCartItems > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-[11px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-emerald-100 px-4 sm:px-6 pt-3 pb-6 space-y-2 mt-2 shadow-xl animate-fadeIn text-left max-h-[80vh] overflow-y-auto">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Main Menu</div>
            {navItems.map((item) => {
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={item.onClick}
                  className={`block w-full text-left py-2.5 text-sm uppercase tracking-wider font-extrabold border-b border-slate-100 flex items-center justify-between cursor-pointer ${
                    isActive ? 'text-amber-600 font-black' : 'text-slate-800 hover:text-emerald-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </button>
              );
            })}

            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pt-3 mb-1">More Resources</div>
            {mobileExtraNavItems.map((item) => {
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={item.onClick}
                  className={`block w-full text-left py-2 text-xs uppercase tracking-wider font-semibold border-b border-slate-100 flex items-center justify-between cursor-pointer ${
                    isActive ? 'text-amber-600 font-bold' : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                </button>
              );
            })}
          </div>
        )}
      </header>
      </div>

      {/* Spacer so page content begins neatly below the fixed navbar */}
      <div className="h-[84px] sm:h-[92px] lg:h-[98px] w-full shrink-0" aria-hidden="true" />
    </>
  );
}
