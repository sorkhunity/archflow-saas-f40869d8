import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { MaterialItem } from '../types';
import { mockMaterials, materialCategoryLabels } from '../data/mockData';

interface MarketplacePageProps {
  onAddToCart: (item: MaterialItem) => void;
  cartItems: MaterialItem[];
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onAddToCart, cartItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');

  const categoryKeys = ['all', 'wood', 'tile', 'lighting', 'sanitary', 'paint', 'stone'];

  const categoryLabelsMap: Record<string, string> = {
    all: 'همه',
    ...materialCategoryLabels
  };

  const filteredMaterials = mockMaterials.filter(item => {
    const matchesSearch = item.name.includes(searchQuery) || item.description.includes(searchQuery);
    const matchesCat = selectedCategoryKey === 'all' || item.category === selectedCategoryKey;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      <div className="space-y-3">
        <span className="text-xs font-bold text-[#C86D51] bg-[#C86D51]/10 px-3 py-1 rounded-full">
          بازارچه متریال آرک‌فلو
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#2C2A29] font-heading">
          متریال استاندارد با قیمت‌های به‌روز بازار ایران
        </h1>
        <p className="text-sm text-[#6B5B52] max-w-2xl">
          تمامی اقلام موجود در این بازارچه با استانداردهای طراحی پروژه‌های شما همگام شده و مستقیماً از تامین‌کنندگان معتبر قابل سفارش است.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-[#E3A38F]/30">
        <div className="relative w-full md:w-96">
          <label htmlFor="material-search" className="sr-only">جستجوی متریال</label>
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5B52]" />
          <input
            id="material-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی نام متریال، ویژگی یا کاربرد..."
            className="w-full ps-11 pe-4 py-3 rounded-2xl bg-[#FDFBF7] border border-[#E3A38F]/30 text-sm focus:outline-none focus:border-[#C86D51]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categoryKeys.map((catKey) => (
            <button
              key={catKey}
              onClick={() => setSelectedCategoryKey(catKey)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategoryKey === catKey
                  ? 'bg-[#C86D51] text-white shadow-md'
                  : 'bg-[#FDFBF7] text-[#6B5B52] hover:bg-[#E3A38F]/10 border border-[#E3A38F]/20'
              }`}
            >
              {categoryLabelsMap[catKey] || catKey}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((item) => {
          const inCart = cartItems.some(ci => ci.id === item.id);
          return (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E3A38F]/30 flex flex-col hover:shadow-md transition">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#C86D51]">
                  {categoryLabelsMap[item.category] || item.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#6B5B52]">
                    <span>تامین‌کننده: {item.supplier}</span>
                    <div className="flex items-center gap-1 font-bold text-[#2C2A29]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-[#2C2A29] font-heading">{item.name}</h3>
                  <p className="text-xs text-[#6B5B52] leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-[#E3A38F]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#6B5B52] block">قیمت واحد</span>
                    <span className="font-black text-base text-[#C86D51]">
                      {((item as any).priceIRR ?? item.price ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal">ریال</span>
                    </span>
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    disabled={inCart}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                      inCart
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-[#C86D51] text-white hover:bg-[#B45B3F]'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>در سبد خرید</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>افزودن به سبد</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
