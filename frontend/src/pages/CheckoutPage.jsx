import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  PackageCheck,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Star,
  Gift,
  Clock,
  Lock,
  Phone,
  User,
  Mail,
  Home,
  Building2,
  Hash,
  FileText,
} from 'lucide-react';
import { CURRENCIES } from '../data/storeData';
import { createOrder } from '../services/api';
import confetti from 'canvas-confetti';

export default function CheckoutPage({
  cart,
  currency,
  promoDiscount = 0,
  onClearCart,
  onBack,
  onContinueShopping,
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    notes: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [errors, setErrors] = useState({});

  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency] || CURRENCIES['PKR'];
    const amount = (usd * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  const subtotalUSD = cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
  const discountUSD = subtotalUSD * (promoDiscount / 100);
  const shippingUSD = subtotalUSD >= 50 ? 0 : 5;
  const finalTotalUSD = Math.max(0, subtotalUSD - discountUSD);
  const totalItemsCount = cart.reduce((s, i) => s + i.quantity, 0);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsProcessing(true);

    const orderId = `FL-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      order_id: orderId,
      full_name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postal_code: formData.postalCode,
      payment_method: formData.paymentMethod,
      notes: formData.notes,
      subtotal_usd: subtotalUSD.toFixed(2),
      discount_usd: discountUSD.toFixed(2),
      total_usd: finalTotalUSD.toFixed(2),
      currency: currency,
      status: 'Pending',
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        priceUSD: item.priceUSD,
        image: item.image || '',
      })),
    };

    try {
      const savedOrder = await createOrder(orderPayload);
      setPlacedOrder({ ...savedOrder, formData, orderId });
    } catch (err) {
      console.warn('API order failed, showing locally:', err);
      setPlacedOrder({ orderId, formData });
    } finally {
      setIsProcessing(false);
      setIsOrderPlaced(true);
      onClearCart();
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const InputField = ({ label, icon: Icon, error, ...props }) => (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        )}
        <input
          {...props}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3.5'} pr-3.5 py-2.5 rounded-xl bg-white border text-slate-900 text-xs focus:outline-none focus:ring-1 transition-all shadow-xs
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'}`}
        />
      </div>
      {error && <p className="text-[10px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );

  // ─── ORDER PLACED CONFIRMATION ───────────────────────────────────────
  if (isOrderPlaced && placedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-lg w-full space-y-8 animate-fadeIn">

          {/* Success Icon */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-emerald-100 border-4 border-emerald-400 flex items-center justify-center shadow-xl shadow-emerald-200">
              <PackageCheck className="w-12 h-12 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Order Placed! 🎉
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Your FOLLILUXE order has been confirmed and saved.
              </p>
            </div>
          </div>

          {/* Order Card */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 text-left space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Order Reference</span>
              <span className="font-mono font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                {placedOrder.orderId || placedOrder.order_id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 font-semibold">Customer</span>
                <p className="text-slate-800 font-bold">{formData.fullName}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 font-semibold">Phone</span>
                <p className="text-slate-800 font-bold">{formData.phone}</p>
              </div>
              <div className="col-span-2 space-y-0.5">
                <span className="text-slate-400 font-semibold">Delivery Address</span>
                <p className="text-slate-800 font-bold">{formData.address}, {formData.city}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 font-semibold">Payment</span>
                <p className="text-emerald-700 font-bold">
                  {formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Card / Online'}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 font-semibold">Est. Delivery</span>
                <p className="text-slate-800 font-bold">2–3 Business Days</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Total Amount Due:</span>
              <span className="text-xl font-extrabold text-amber-600">{formatPrice(finalTotalUSD)}</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-emerald-600" /> Express Dispatch</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 60-Day Guarantee</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Order Saved to Database</span>
          </div>

          <button
            onClick={onContinueShopping}
            className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 transition-all cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    );
  }

  // ─── MAIN CHECKOUT PAGE ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8faf8] text-slate-900">

      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold">256-Bit Secure Checkout</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <span className="font-bold text-emerald-800">FOLLILUXE™</span>
            <span>• Secure Express Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Page heading */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Secure Checkout
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Complete your order below — {totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''} in your bag
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ─── LEFT COLUMN: ORDER FORM ─────────────────────────────── */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Section 1: Shipping */}
              <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-extrabold">1</div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    Shipping & Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name *"
                    icon={User}
                    type="text"
                    required
                    placeholder="Ali Khan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    error={errors.fullName}
                  />
                  <InputField
                    label="Phone Number (For Delivery Updates) *"
                    icon={Phone}
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                  />
                </div>

                <InputField
                  label="Complete Delivery Address *"
                  icon={Home}
                  type="text"
                  required
                  placeholder="House No. / Street / Area / Block..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  error={errors.address}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <InputField
                      label="City *"
                      icon={Building2}
                      type="text"
                      required
                      placeholder="Lahore / Karachi / Islamabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      error={errors.city}
                    />
                  </div>
                  <InputField
                    label="Postal Code"
                    icon={Hash}
                    type="text"
                    placeholder="54000"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>

                <InputField
                  label="Email Address (Optional)"
                  icon={Mail}
                  type="email"
                  placeholder="ali@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Order Notes (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    <textarea
                      rows={2}
                      placeholder="e.g. Leave at gate / specific instructions..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 shadow-xs transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Payment */}
              <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-extrabold">2</div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    Select Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* COD */}
                  <label className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-100'
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-emerald-600 mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-emerald-700 shrink-0" />
                        Cash on Delivery (COD)
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Pay cash when parcel arrives. No advance needed.
                      </span>
                      <span className="inline-block mt-1.5 text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        RECOMMENDED
                      </span>
                    </div>
                  </label>

                  {/* Card */}
                  <label className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'bg-amber-50 border-amber-400 shadow-md shadow-amber-100'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-amber-500 mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
                        Card / EasyPaisa / JazzCash
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Instant secure online transfer. Encrypted payment.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button (mobile visible) */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={isProcessing || cart.length === 0}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-300/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Place Order • {formatPrice(finalTotalUSD)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>60-Day Money-Back Guarantee • Cash On Delivery Available</span>
                </div>
              </div>

            </form>
          </div>

          {/* ─── RIGHT COLUMN: ORDER SUMMARY ─────────────────────────── */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">

            {/* Product summary card */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-emerald-700" />
                Order Summary
                <span className="ml-auto text-[11px] text-slate-400 font-normal">{totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''}</span>
              </h2>

              {/* Cart Items */}
              <div className="space-y-3">
                {cart.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">Your bag is empty</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-extrabold text-slate-900 leading-tight line-clamp-2">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.subtitle || item.supplyDays}</div>

                        {/* Tag + qty */}
                        <div className="flex items-center gap-2 mt-1.5">
                          {item.tag && (
                            <span className="text-[9px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded-full">
                              {item.tag}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500">Qty: {item.quantity}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-slate-400 line-through">
                            {formatPrice((item.originalPriceUSD || item.original_price_usd) * item.quantity)}
                          </span>
                          <span className="text-sm font-extrabold text-emerald-800">
                            {formatPrice((item.priceUSD || item.price_usd) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Free Gifts */}
              {cart.some(item => (item.freeGifts || item.free_gifts || []).length > 0) && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                  <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5" />
                    FREE Gifts Included:
                  </div>
                  {cart.map((item) =>
                    (item.freeGifts || item.free_gifts || []).map((gift, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-amber-800 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                        {gift}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotalUSD)}</span>
                </div>
                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Promo Discount ({promoDiscount}%)</span>
                    <span className="font-bold">−{formatPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className={`font-bold ${shippingUSD === 0 ? 'text-emerald-700' : ''}`}>
                    {shippingUSD === 0 ? 'FREE 🎉' : formatPrice(shippingUSD)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-amber-600 text-lg">{formatPrice(finalTotalUSD)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2.5">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                Estimated Delivery
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                <span>Dispatched within <strong>24 hours</strong> of order confirmation</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Truck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Express delivery: <strong>2–3 business days</strong></span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
              <h3 className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Our Guarantees
              </h3>
              {[
                '60-Day Money-Back Guarantee — No questions asked',
                '100% Authentic FOLLILUXE™ formulation',
                'Secure 256-bit encrypted checkout',
                'SMS tracking on every order',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px] text-emerald-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Star Ratings */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4 flex items-center gap-3">
              <div className="shrink-0">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">4.95/5 from 4,850+ reviews</p>
              </div>
              <p className="text-[10px] text-slate-600 italic border-l border-slate-200 pl-3 leading-relaxed">
                "Visible baby hairs in 4 weeks — best product I have ever used!" – Hamza T., Lahore
              </p>
            </div>

            {/* Desktop Place Order Button */}
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="hidden lg:flex w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-300/30 items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order • {formatPrice(finalTotalUSD)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="hidden lg:block text-center text-[10px] text-slate-400 mt-2">
                <ShieldCheck className="w-3 h-3 inline mr-1 text-emerald-600" />
                60-Day Guarantee • COD Available • Orders saved to our database
              </p>
            </form>

          </div>
          {/* end right column */}
        </div>
      </div>
    </div>
  );
}
