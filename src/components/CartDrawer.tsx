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
        className="absolute inset-y-0 end-0 max-w-full flex ps-10 outline-none"
      >
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E3A38F]/30 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-lg text-[#2C2A29] font-heading">سبد خرید متریال</h2>
                <p className="text-xs text-[#6B5B52]">{items.length} آیتم انتخاب شده</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#6B5B52] hover:bg-[#E3A38F]/10 transition cursor-pointer"
              aria-label="بستن سبد خرید"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E3A38F]/20 text-[#C86D51] mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-[#2C2A29] text-base">سبد خرید شما خالی است</h3>
                <p className="text-sm text-[#6B5B52] max-w-xs mx-auto">
                  از بخش بازارچه یا گالری پروژه‌ها، متریال‌های مورد نظر خود را به سبد اضافه کنید.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-[#E3A38F]/20 flex items-center gap-4 shadow-xs"
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#2C2A29] truncate">{item.name}</h4>
                    <p className="text-xs text-[#6B5B52]">{item.supplier}</p>
                    <p className="text-xs font-bold text-[#C86D51] mt-1">
                      {(item.price ?? 0).toLocaleString('fa-IR')} تومان
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                    aria-label={`حذف ${item.name} از سبد خرید`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E3A38F]/30 bg-white space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B5B52]">جمع کل سفارش:</span>
                <span className="font-black text-lg text-[#2C2A29]">
                  {(totalPrice ?? 0).toLocaleString('fa-IR')} تومان
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClearCart}
                  className="px-4 py-3 rounded-xl border border-rose-200 text-rose-600 font-bold text-sm hover:bg-rose-50 transition cursor-pointer"
                >
                  خالی کردن سبد
                </button>
                <button
                  onClick={onProceed}
                  className="px-4 py-3 rounded-xl bg-[#C86D51] text-white font-bold text-sm shadow-md shadow-[#C86D51]/20 hover:bg-[#B45B3F] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>تکمیل سفارش</span>
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
