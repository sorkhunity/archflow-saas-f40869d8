import React, { useEffect, useRef } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MaterialItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MaterialItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceed: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onProceed
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label="سبد خرید متریال"
    >
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
        aria-hidden="true"
      />
      <div 
        ref={drawerRef}
        tabIndex={-1}
        className="absolute inset-y-0 start-0 max-w-full flex pe-10 outline-none"
      >
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E3A38F]/30 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900">سبد خرید متریال</h2>
                <span className="text-xs text-stone-500">{items.length} آیتم انتخاب شده</span>
              </div>
            </div>
            <button
              onClick={onClose}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClose();
                }
              }}
              role="button"
              tabIndex={0}
              className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
              aria-label="بستن سبد خرید"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-800">سبد خرید شما خالی است</h3>
                <p className="text-sm text-stone-500 max-w-xs mx-auto">
                  از بازارچه متریال یا پیشنهادهای هوش مصنوعی، مصالح مورد نظر پروژه خود را به سبد اضافه کنید.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">{item.name}</h4>
                      <span className="text-xs text-stone-500">{item.brand}</span>
                      <div className="text-xs font-extrabold text-[#C86D51] mt-1">
                        {(item.price ?? 0).toLocaleString('fa-IR')} تومان {item.unit}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onRemoveItem(item.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500"
                    aria-label={`حذف ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E3A38F]/30 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600 font-medium">مجموع برآورد خرید:</span>
                <span className="text-xl font-black text-[#C86D51]">{(totalPrice ?? 0).toLocaleString('fa-IR')} تومان</span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={onClearCart}
                  className="px-4 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold transition-all cursor-pointer"
                >
                  خالی کردن
                </button>
                <button
                  onClick={onProceed}
                  className="flex-1 py-3 bg-[#C86D51] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#B35B40] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ثبت سفارش و پیش‌فاکتور</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
