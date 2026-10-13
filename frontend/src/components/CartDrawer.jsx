import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Gift, 
  ArrowRight 
} from 'lucide-react';
import { CURRENCIES } from '../data/storeData';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  currency, 
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency] || CURRENCIES['PKR'];
    const val = parseFloat(usd) || 0;
    const amount = (val * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  const getItemPrice = (item) => parseFloat(item.priceUSD || item.price_usd || 0);

  const subtotalUSD = cart.reduce((sum, item) => sum + (getItemPrice(item) * item.quantity), 0);
  const finalTotalUSD = subtotalUSD;

  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, Math.round((subtotalUSD / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotalUSD);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white text-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Cart Header */}
          <div className="p-4 sm:p-5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-emerald-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3.5 sm:p-4 bg-emerald-50/50 border-b border-emerald-100 text-xs text-left shrink-0">
            <div className="flex items-center justify-between mb-1.5 font-bold">
              <span className="text-emerald-800 flex items-center gap-1.5 text-[11px] sm:text-xs">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                {progressPercent >= 100 ? (
                  <span className="text-emerald-800 font-extrabold">🎉 Free Express Delivery Unlocked!</span>
                ) : (
                  <span>Add {formatPrice(amountNeededForFreeShipping)} more for FREE Delivery</span>
                )}
              </span>
              <span className="text-slate-500 text-[11px]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-left">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-800">Your bag is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Choose your hair regrowth bundle to begin your 90-day clinical transformation.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Explore Bundles
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      {item.name}
                    </h5>
                    <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                      {formatPrice(getItemPrice(item))} each
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center gap-2.5 mt-1.5">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {formatPrice(getItemPrice(item) * item.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}

            {/* Unlocked Free Gifts */}
            {cart.length > 0 && subtotalUSD >= 70 && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs">
                <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="text-amber-900 font-medium text-[11px] sm:text-xs">
                  <span className="font-bold">FREE Jade Scalp Massager Tool ($18 Value)</span> unlocked!
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3.5 text-left shrink-0">
              
              {/* Subtotal Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotalUSD)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tracked Express Delivery</span>
                  <span className="text-emerald-700 font-bold">
                    {subtotalUSD >= freeShippingThreshold ? 'FREE' : formatPrice(5)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-base text-amber-600 font-extrabold">{formatPrice(finalTotalUSD)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>60-Day Guarantee • Cash On Delivery Available</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
