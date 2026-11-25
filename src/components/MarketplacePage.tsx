import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { MaterialItem } from '../types';
import { mockMaterials, materialCategoryLabels } from '../data/mockData';

interface MarketplacePageProps {
  onAddToCart: (item: MaterialItem) => void;
  cartItems?: MaterialItem[];
  onNavigate?: (tab: string) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onAddToCart,
  cartItems = [],
  onNavigate,
  searchQuery = '',
  setSearchQuery
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');

  const activeSearch = searchQuery !== undefined ? searchQuery : localSearch;
  const handleSearchChange = setSearchQuery || setLocalSearch;

  const categoryKeys = ['all', 'wood', 'tile', 'lighting', 'sanitary', 'paint', 'stone'];

  const categoryLabelsMap: Record<string, string> = {
    all: 'همه',
    ...materialCategoryLabels
  };

  const filteredMaterials = mockMaterials.filter(item => {
    const q = activeSearch.toLowerCase();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    const matchesCat = selectedCategoryKey === 'all' || item.category === selectedCategoryKey;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      <div className="space-y-3">
        <span className="text-xs font-bold text-amber-700 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
          بازارچه متریال آرک‌فلو
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-heading">
          متریال استاندارد با قیمت‌های به‌روز بازار ایران
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl">
          تمامی اقلام موجود در این بازارچه با استانداردهای طراحی پروژه‌های شما همگام شده و مستقیماً از تامین‌کنندگان معتبر قابل سفارش است.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl shadow-[0_10px_35px_rgba(234,179,8,0.22)] border border-amber-500/35">
        <div className="relative w-full md:w-96">
          <label htmlFor="material-search" className="sr-only">جستجوی متریال</label>
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            id="material-search"
            type="text"
            value={activeSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="جستجوی نام متریال، ویژگی یا کاربرد..."
            className="w-full ps-11 pe-4 py-3 rounded-2xl bg-[#FDFBF7] border border-amber-500/35 text-sm focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCategoryKey(key)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategoryKey === key
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                  : 'bg-white text-stone-700 border border-amber-500/30 hover:bg-amber-500/10'
              }`}
            >
              {categoryLabelsMap[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((item) => {
          const isAdded = cartItems.some(i => i.id === item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(234,179,8,0.22)] border border-amber-500/35 flex flex-col justify-between hover:shadow-[0_15px_45px_rgba(234,179,8,0.3)] transition-all group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-stone-800 shadow-sm border border-amber-500/30">
                    {materialCategoryLabels[item.category] || item.category}
                  </div>
                  <div className="absolute top-3 end-3 bg-amber-600 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    امتیاز پایداری: {item.ecoScore}%
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-semibold">{item.supplier}</span>
                    <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-stone-900 font-heading">{item.name}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-amber-500/20 mt-4">
                <div>
                  <span className="text-[10px] text-stone-500 block">قیمت هر {item.unit}</span>
                  <span className="text-base font-black text-amber-800 font-heading">
                    {(item.price ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(item)}
                  disabled={isAdded}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-500/20'
                  }`}
                >
                  {isAdded ? (
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
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-amber-500/35 shadow-[0_10px_35px_rgba(234,179,8,0.22)] space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-700 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">متریالی با این مشخصات یافت نشد</h3>
          <p className="text-xs text-stone-600">لطفاً کلیدواژه دیگری را جستجو کنید یا دسته‌بندی را تغییر دهید.</p>
        </div>
      )}
    </div>
  );
};
