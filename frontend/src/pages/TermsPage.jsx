import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  AlertCircle, 
  Phone, 
  Mail,
  Sparkles
} from 'lucide-react';

export default function TermsPage({ onBack, onNavigateToShop, onNavigateToContact }) {
  return (
    <div className="animate-fadeIn min-h-screen bg-[#f8faf8] text-slate-900 pb-20 text-left">
      
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="bg-white border-b border-slate-200/80 relative z-20 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Previous Page</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="hidden sm:inline">FOLLILUXE™ Legal Documentation</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-emerald-800">Effective 2026</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="py-12 sm:py-16 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Legal Agreement & Terms of Service</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Terms & <span className="emerald-gradient-text">Conditions</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Please read these terms and conditions carefully before ordering or using our Swiss peptide botanical haircare products and services.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-2">
            <span>Last Updated: <strong>October 2026</strong></span>
            <span>•</span>
            <span>Governing Law: <strong>Islamic Republic of Pakistan</strong></span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
        
        {/* Notice Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                100% Authentic Formulation & Customer Protection
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                All FOLLILUXE™ orders are fulfilled with tamper-evident batch seals directly from our official Islamabad distribution laboratory.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToShop}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 shadow-sm transition-transform hover:scale-105"
          >
            Shop Products
          </button>
        </div>

        {/* Structured Sections */}
        <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
          
          {/* Section 1 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Section 01</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              1. Acceptance of Terms & User Agreement
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              By accessing, browsing, or placing an order on FOLLILUXE™ (Glorience), you confirm that you are at least 18 years of age or have parental consent, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or purchase our formulations.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Section 02</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              2. Product Authenticity & Swiss Formulation Guarantee
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              FOLLILUXE™ serums are manufactured under strict sanitary standards, utilizing certified Swiss Redensyl® (3%), AnaGain™ Pea Sprout Extract, and Procapil® peptide complexes. Each bottle is individually numbered with a holographic security seal. We disclaim any liability for counterfeit or altered products purchased from unauthorized third-party marketplaces.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Drug-Free & Hormone-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Minoxidil & Zero Dread Shedding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Non-Greasy Water-Based Carrier</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dermatologically Safety Tested</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Section 03</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              3. Ordering, Verification & Cash on Delivery (COD)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We offer Cash on Delivery (COD) nationwide across Pakistan as well as secure online digital payments. By placing a COD order, you confirm that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li>You have provided an active, working mobile telephone number for automated SMS and courier verification.</li>
              <li>You agree to keep the exact payable cash ready at the delivery address upon parcel arrival.</li>
              <li>Fake orders, refusal of verified parcels without legitimate defect, or invalid addresses may result in permanent blacklisting from our courier network.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Section 04</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              4. Shipping, Transit Timelines & Parcel Inspection
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Orders are dispatched within 24 business hours from our Islamabad hub. Transit times generally average 2 to 3 business days nationwide. Extreme weather, strike actions, or remote transit routes may occasionally cause minor delays, which will be tracked via courier tracking link.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Customers are encouraged to inspect the courier flyer outer packaging upon delivery. If the flyer shows severe physical crushing or liquid leakage, please photograph it and immediately contact our WhatsApp helpline at <strong className="text-slate-900">0301 0008483</strong> for a priority replacement.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Section 05</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              5. 60-Day Satisfaction Money-Back Guarantee
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We stand behind our clinical science with an unconditional 60-Day Money-Back Guarantee. To be eligible for a full refund under this policy:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li>The serum must have been applied daily as instructed for a minimum period of 30 to 60 consecutive days.</li>
              <li>Contact our team at <strong className="text-slate-900">Glorience2@gmail.com</strong> or WhatsApp <strong className="text-slate-900">0301 0008483</strong> with your Order ID.</li>
              <li>Refunds will be processed directly to your Bank Account, JazzCash, or EasyPaisa within 2 to 4 business days after claim confirmation.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Section 06</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              6. Cosmetic Disclaimer & Health Recommendations
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              FOLLILUXE™ Botanical Hair Serum is a high-performance cosmetic formulation engineered for scalp conditioning, follicle nourishment, and strand density. It is not a pharmaceutical drug and is not intended to cure medical skin diseases or replace physician advice. If you have an active open scalp injury or severe medical dermatitis, consult your dermatologist prior to use.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Section 07</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              7. Customer Support & Contact Inquiries
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For any legal questions, order modifications, or assistance, our customer support team is available 7 days a week:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-slate-500 block">Phone Hotline:</span>
                  <a href="tel:03010008483" className="font-bold text-slate-900 hover:text-emerald-700">0301 0008483</a>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-slate-500 block">Email Inquiries:</span>
                  <a href="mailto:Glorience2@gmail.com" className="font-bold text-slate-900 hover:text-emerald-700">Glorience2@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Have questions about how your data is protected? Read our <strong className="text-slate-900">Privacy Policy</strong>.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onNavigateToContact}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={onNavigateToShop}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors"
            >
              View Shop
            </button>
          </div>
        </div>

      </main>

    </div>
  );
}
