import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, X } from 'lucide-react';

const RECENT_ORDERS = [
  { name: 'Sana K.', location: 'Lahore, PK', bundle: '3-Month Clinical Kit', time: '4 minutes ago' },
  { name: 'Dr. Bilal R.', location: 'Islamabad, PK', bundle: '2-Month Transformation Pack', time: '8 minutes ago' },
  { name: 'Zeeshan M.', location: 'Karachi, PK', bundle: '3-Month Clinical Kit', time: '12 minutes ago' },
  { name: 'Ayesha T.', location: 'Rawalpindi, PK', bundle: '1-Month Starter Pack', time: '18 minutes ago' },
  { name: 'Farhan A.', location: 'Dubai, UAE', bundle: '3-Month Clinical Kit', time: '22 minutes ago' },
];

export default function LiveToast({ cartNotification }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      setVisible(true);
      setCurrentIdx((prev) => (prev + 1) % RECENT_ORDERS.length);

      setTimeout(() => {
        setVisible(false);
      }, 5500);
    }, 18000);

    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5500);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [dismissed]);

  if (cartNotification) {
    return (
      <div className="fixed bottom-5 left-5 z-50 bg-white border border-emerald-500 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-left">
        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-900 block">{cartNotification.title}</span>
          <span className="text-[11px] text-emerald-700 font-semibold">{cartNotification.subtitle}</span>
        </div>
      </div>
    );
  }

  if (!visible || dismissed) return null;

  const currentOrder = RECENT_ORDERS[currentIdx];

  return (
    <div className="fixed bottom-5 left-5 z-40 bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-xs animate-fadeIn text-left">
      <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
        <ShoppingBag className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-slate-900 truncate">
          {currentOrder.name} from {currentOrder.location}
        </div>
        <div className="text-[11px] text-emerald-700 font-semibold truncate">
          Purchased <strong className="text-amber-600">{currentOrder.bundle}</strong>
        </div>
        <span className="text-[9px] text-slate-400 block">{currentOrder.time} • Verified Buyer</span>
      </div>

      <button 
        onClick={() => setDismissed(true)}
        className="text-slate-400 hover:text-slate-700 p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
