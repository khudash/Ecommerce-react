import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  ArrowRight,
  PackageCheck,
  MapPin
} from 'lucide-react';
import { CURRENCIES } from '../data/storeData';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  currency, 
  promoDiscount, 
  onClearCart 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  if (!isOpen) return null;

  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency] || CURRENCIES['PKR'];
    const val = parseFloat(usd) || 0;
    const amount = (val * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  const getItemPrice = (item) => parseFloat(item.priceUSD || item.price_usd || 0);

  const subtotalUSD = cart.reduce((sum, item) => sum + (getItemPrice(item) * item.quantity), 0);
  const discountUSD = subtotalUSD * (promoDiscount / 100);
  const finalTotalUSD = Math.max(0, subtotalUSD - discountUSD);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrder = {
        orderId: `FL-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        customer: { ...formData },
        items: [...cart],
        totalUSD: finalTotalUSD,
        discountUSD: discountUSD,
        paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Card / Digital Payment'
      };

      setOrderSummary(generatedOrder);
      setIsProcessing(false);
      setIsOrderPlaced(true);
      onClearCart();

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isOrderPlaced ? 'Order Confirmation' : 'Secure Express Checkout'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-emerald-800 font-semibold">
                {isOrderPlaced ? 'Thank you for your order!' : '256-Bit Encrypted • 60-Day Guarantee'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-emerald-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* If Order is Placed Screen */}
          {isOrderPlaced && orderSummary ? (
            <div className="space-y-5 sm:space-y-6 text-center animate-fadeIn py-2 sm:py-4">
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-700 animate-bounce">
                <PackageCheck className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Order Successfully Placed! 🎉
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Your tracking number is <strong className="text-emerald-800 font-mono text-sm sm:text-base">{orderSummary.orderId}</strong>
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3.5">
                <div className="flex flex-col sm:flex-row justify-between border-b border-slate-200 pb-3 text-xs gap-2">
                  <div>
                    <span className="text-slate-500 block font-medium">Deliver To:</span>
                    <strong className="text-slate-900 text-sm">{orderSummary.customer.fullName}</strong>
                    <span className="text-slate-600 block">{orderSummary.customer.address}, {orderSummary.customer.city}</span>
                    <span className="text-slate-500 block">Phone: {orderSummary.customer.phone}</span>
                  </div>
                  <div className="text-left sm:text-right pt-1 sm:pt-0">
                    <span className="text-slate-500 block font-medium">Payment Method:</span>
                    <span className="text-emerald-800 font-bold">{orderSummary.paymentMethod}</span>
                    <span className="text-slate-500 text-[11px] block mt-0.5">Est. Delivery: 2-3 Days</span>
                  </div>
                </div>

                {/* Purchased items list */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Items in Parcel:</span>
                  {orderSummary.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-xs text-slate-700">
                      <span>{it.name} (x{it.quantity})</span>
                      <span className="font-bold text-slate-900">{formatPrice(getItemPrice(it) * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Final Total */}
                <div className="pt-2.5 border-t border-slate-200 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-900">Amount Due:</span>
                  <span className="text-lg sm:text-xl text-amber-600 font-extrabold">{formatPrice(orderSummary.totalUSD)}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
              >
                Done / Continue Browsing
              </button>

            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              
              {/* Order Mini Summary Pill */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-emerald-900 font-medium">Total payable ({cart.length} package items):</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-700">{formatPrice(finalTotalUSD)}</span>
              </div>

              {/* Shipping Address Fields */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>1. Shipping & Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali Khan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-emerald-500 outline-none shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone (For SMS Delivery Updates) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-emerald-500 outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Complete Delivery Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Street / Sector / Area..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-emerald-500 outline-none shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lahore / Karachi / Islamabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-emerald-500 outline-none shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="ali@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-emerald-500 outline-none shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5" />
                  <span>2. Select Payment Method</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* COD */}
                  <label className={`p-3.5 sm:p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-emerald-600"
                    />
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Cash On Delivery (COD)</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">Pay cash upon parcel arrival</span>
                    </div>
                  </label>

                  {/* Card / Online */}
                  <label className={`p-3.5 sm:p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-emerald-600"
                    />
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Card / EasyPaisa / JazzCash</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">Instant secure online transfer</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>Confirming Order...</span>
                  </div>
                ) : (
                  <>
                    <span>Complete Order • {formatPrice(finalTotalUSD)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-slate-500">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Dispatched within 24 hours with SMS Tracking number</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
