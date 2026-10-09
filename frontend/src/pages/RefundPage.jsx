import React, { useState } from 'react';
import { 
  RefreshCw, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  Clock, 
  CreditCard, 
  Phone, 
  Mail,
  Truck,
  Sparkles
} from 'lucide-react';

export default function RefundPage({ onBack, onNavigateToShop, onNavigateToContact }) {
  const [claimForm, setClaimForm] = useState({
    orderId: '',
    fullName: '',
    phone: '',
    reason: '60-Day Growth Guarantee',
    details: ''
  });
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (claimForm.orderId && claimForm.phone) {
      setClaimSubmitted(true);
      setClaimForm({
        orderId: '',
        fullName: '',
        phone: '',
        reason: '60-Day Growth Guarantee',
        details: ''
      });
    }
  };

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
            <span className="hidden sm:inline">100% Risk-Free Guarantee</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-emerald-800">60-Day Money-Back Policy</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="py-12 sm:py-16 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
            <span>Guaranteed Satisfaction or 100% Full Refund</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Refund & <span className="emerald-gradient-text">Exchange Policy</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            We are so confident in our Swiss peptide formulation that we back every order with an unconditional 60-Day Money-Back Guarantee.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 60-Day Risk-Free Trial
            </span>
            <span>•</span>
            <span>Instant Reimbursement via <strong>JazzCash, EasyPaisa, or Bank</strong></span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
        
        {/* 3 Step Return Process Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Hassle-Free Experience
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              How Our 60-Day Money-Back Process Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#fbfdfc] border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900">Use Daily for 30-60 Days</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take photos on Day 1. Apply 1-2 pipettes daily to give follicles a full clinical opportunity to reactivate.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbfdfc] border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-sm">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900">Submit Simple WhatsApp Claim</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Not satisfied with shedding reduction? Message 0301 0008483 with your order number. No complex questions asked.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbfdfc] border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900">100% Payout in 48-72h</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive your 100% full refund directly to your JazzCash, EasyPaisa, or Pakistani Bank Account within 2-4 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Detailed Terms */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
              
              <div className="space-y-2 border-b border-slate-100 pb-5">
                <h4 className="text-lg font-bold text-slate-900 font-serif">
                  1. The 60-Day Regrowth Guarantee
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Hair cycles require time. If you diligently apply FOLLILUXE for 60 days and do not experience a reduction in hair loss and visible improvement in strand texture, you are entitled to a complete product refund.
                </p>
              </div>

              <div className="space-y-2 border-b border-slate-100 pb-5">
                <h4 className="text-lg font-bold text-slate-900 font-serif">
                  2. Damaged or Leaking Parcels Upon Delivery
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  All bottles are secured in impact-cushioned packaging. If courier transit causes bottle cracking, cap breakage, or leakage:
                </p>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                  Take a quick phone photo of the damaged bottle and send it to WhatsApp <strong className="text-amber-950">0301 0008483</strong> within 48 hours. We dispatch a brand new bottle free of charge.
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900 font-serif">
                  3. Payout Channels & Timelines
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Approved refunds are sent back to the customer's choice of:
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800">
                    JazzCash
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800">
                    EasyPaisa
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800">
                    Bank Transfer
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Direct Refund Claim Form */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
              
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-base font-bold text-slate-900 font-serif">
                  Initiate Refund / Exchange
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our claims officer will review and reply within 12 business hours.
                </p>
              </div>

              {claimSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-900">
                    Claim Ticket Created!
                  </h5>
                  <p className="text-xs text-slate-600">
                    Our verification agent will contact you on WhatsApp or phone to confirm your payout details.
                  </p>
                  <button
                    onClick={() => setClaimSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleClaimSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Order ID / Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FL-123456 or 0300-1234567"
                      value={claimForm.orderId}
                      onChange={(e) => setClaimForm({ ...claimForm, orderId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={claimForm.fullName}
                      onChange={(e) => setClaimForm({ ...claimForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Reason for Request
                    </label>
                    <select
                      value={claimForm.reason}
                      onChange={(e) => setClaimForm({ ...claimForm, reason: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                    >
                      <option value="60-Day Growth Guarantee">60-Day Regrowth Guarantee</option>
                      <option value="Damaged Bottle">Damaged / Leaking Bottle Upon Arrival</option>
                      <option value="Wrong Item">Incorrect Item Sent</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brief Explanation
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Provide brief details about your application routine or issue..."
                      value={claimForm.details}
                      onChange={(e) => setClaimForm({ ...claimForm, details: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                  >
                    <span>Submit Refund Claim</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Secure & Confidential</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Bottom Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Have questions before placing an order? Contact our <strong className="text-slate-900">Trichology Help Desk</strong>.
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
