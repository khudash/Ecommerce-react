import React from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Lock } from 'lucide-react';

export default function PolicyModal({ isOpen, onClose, policyType }) {
  if (!isOpen) return null;

  const policies = {
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      tag: 'Legal Agreement',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
          <p>
            Welcome to FOLLILUXE™ (Glorience). By placing an order on this website, you agree to the following purchase terms:
          </p>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">1. Authentic Formulation Guarantee</h5>
            <p>
              All serums dispatched from our Islamabad distribution center are 100% genuine, tamper-evident sealed, and formulated according to Swiss clinical peptide specifications.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">2. Ordering & Payment</h5>
            <p>
              We accept Cash on Delivery (COD) across Pakistan as well as secure online credit/debit card and digital payments. Please provide an active mobile number for SMS dispatch verification.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">3. Delivery Timelines</h5>
            <p>
              Standard courier transit time is 2 to 3 business days nationwide. Extreme weather or remote regional delays will be communicated via WhatsApp or SMS.
            </p>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Lock,
      tag: '256-Bit SSL Encrypted',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
          <p>
            Your privacy and personal information are treated with the highest security standards.
          </p>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">1. Information We Collect</h5>
            <p>
              We only collect necessary delivery details (Full Name, Phone Number, Delivery Address, Email) to fulfill your courier parcel and send order status notifications.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">2. No Third-Party Data Sharing</h5>
            <p>
              We never sell, rent, or trade your contact information with third-party advertisers or telemarketers. Your details remain strictly confidential.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">3. Payment Security</h5>
            <p>
              Online transactions are encrypted with bank-grade 256-bit SSL encryption. We do not store credit or debit card CVV codes on our servers.
            </p>
          </div>
        </div>
      )
    },
    refund: {
      title: 'Refund & Exchange Policy',
      icon: RefreshCw,
      tag: '60-Day Satisfaction Guarantee',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>100% Risk-Free 60-Day Money-Back Guarantee</span>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">1. 60-Day Regrowth Guarantee</h5>
            <p>
              Use FOLLILUXE daily as directed for 60 days. If you do not experience reduced shedding and visible follicle improvement, contact our team at Glorience2@gmail.com or WhatsApp 03010008483 for a hassle-free full refund.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">2. Damaged or Leaking Parcels</h5>
            <p>
              If your parcel arrives broken or damaged by the courier service, simply send a photo to our WhatsApp hotline within 48 hours for an instant, free replacement bottle.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">3. Refund Processing</h5>
            <p>
              Approved refunds are credited directly to your bank account, JazzCash, or EasyPaisa within 2 to 4 business days.
            </p>
          </div>
        </div>
      )
    }
  };

  const activePolicy = policies[policyType] || policies.refund;
  const IconComp = activePolicy.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <IconComp className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {activePolicy.title}
              </h3>
              <span className="text-[11px] text-emerald-800 font-bold">
                {activePolicy.tag}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-emerald-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activePolicy.content}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
          >
            I Understand / Close
          </button>
        </div>

      </div>
    </div>
  );
}
