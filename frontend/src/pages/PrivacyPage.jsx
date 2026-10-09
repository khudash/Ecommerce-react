import React from 'react';
import { 
  Lock, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Key, 
  Database, 
  EyeOff, 
  UserCheck, 
  Phone, 
  Mail 
} from 'lucide-react';

export default function PrivacyPage({ onBack, onNavigateToShop, onNavigateToContact }) {
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
            <span className="hidden sm:inline">Data Protection & Privacy Policy</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-emerald-800">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="py-12 sm:py-16 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Customer Privacy & Data Protection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Privacy <span className="emerald-gradient-text">Policy</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Your trust is our highest priority. We safeguard your personal information with banking-grade security and will never sell or trade your details.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-2">
            <span>Security Standard: <strong>Bank-Grade 256-Bit SSL</strong></span>
            <span>•</span>
            <span>Strict <strong>Zero Third-Party Data Selling</strong> Policy</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
        
        {/* Core Guarantees 3-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <EyeOff className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No Third-Party Sharing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never sell, rent, or monetize your contact numbers or email with marketing brokers or advertisers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Encrypted Transactions</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              All checkout data is protected via 256-Bit TLS encryption. We do not store card security codes (CVVs).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Right to Delete</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              You maintain 100% control over your data. Request permanent deletion of your profile anytime.
            </p>
          </div>
        </div>

        {/* Structured Policy Documentation Card */}
        <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
          
          {/* Section 1 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Clause 01</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              1. Information We Collect & Why
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When you purchase our haircare formulations or complete an inquiry, we collect only necessary fulfillment information:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li><strong>Contact Details:</strong> Your full name, mobile telephone number, and email address for courier SMS booking and order confirmations.</li>
              <li><strong>Delivery Information:</strong> Physical delivery address and city for parcel courier dispatch.</li>
              <li><strong>Hair Assessment Quiz Data:</strong> Non-personally identifiable responses to the scalp quiz (e.g., hair thinning pattern, scalp type) used purely to suggest appropriate bottle quantities.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Clause 02</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              2. How We Utilize Your Information
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your personal information is strictly utilized for the following legitimate purposes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Processing & packing your courier parcel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>SMS tracking notification & dispatch updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Customer service & 60-day guarantee claims</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fraud prevention & verification</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Clause 03</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              3. Courier Logistics & Third-Party Disclosure
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We share your contact and delivery address solely with licensed national courier services (e.g. TCS, Leopards, Trax, PostEx) to deliver your parcel to your door. Our logistics partners are legally restricted from using your data for any independent promotional purpose.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Clause 04</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              4. Cookies & Web Analytics
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our website uses minimal, essential browser cookies to remember items stored inside your shopping bag, save your preferred currency selection (PKR, USD, AED, GBP, EUR), and ensure smooth page transitions. We do not use intrusive spyware or third-party trackers.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span>Clause 05</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              5. Data Protection Officer & Privacy Inquiries
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To request an export of your order records, update your address, or delete your data, please contact our Privacy Officer:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-slate-500 block">Direct Privacy Email:</span>
                  <a href="mailto:Glorience2@gmail.com" className="font-bold text-slate-900 hover:text-emerald-700">Glorience2@gmail.com</a>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-slate-500 block">Privacy Helpline:</span>
                  <a href="tel:03010008483" className="font-bold text-slate-900 hover:text-emerald-700">0301 0008483</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Want to learn more about our 60-Day Regrowth Guarantee? Read our <strong className="text-slate-900">Refund Policy</strong>.
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
