import React from 'react';
import { Layers, ShoppingBag, Star, ShieldCheck, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { MaterialItem } from '../../types';
import { mockMaterials, materialCategoryLabels } from '../../data/mockData';

interface DashboardMaterialsTabProps {
  onAddToCart: (item: MaterialItem) => void;
  showToast: (msg: string) => void;
}

export const DashboardMaterialsTab: React.FC<DashboardMaterialsTabProps> = ({ onAddToCart, showToast }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const filteredMaterials = mockMaterials.filter(mat => {
    const matchesCat = selectedCategory === 'all' || mat.category === selectedCategory;
    const matchesSearch = (mat.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (mat.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E3A38F]/30 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-[#2C2A29] font-heading">پالت متریال و برآورد هزینه پروژه</h2>
          <p className="text-xs text-[#6B5B52] mt-1">مشاهده، مقایسه و افزودن مصالح استاندارد بازار ایران با تأییدیه هوش مصنوعی.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor="material-search-input" className="sr-only">جستجوی مصالح</label>
          <input
            id="material-search-input"
            type="text"
            placeholder="جستجوی مصالح..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#F9F6F0] border border-[#E3A38F]/40 rounded-xl px-4 py-2 text-xs w-full md:w-64 focus:outline-none focus:border-[#C86D51]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            selectedCategory === 'all'
              ? 'bg-[#C86D51] text-white shadow-md'
              : 'bg-white text-[#6B5B52] border border-[#E3A38F]/30 hover:bg-[#F9F6F0]'
          }`}
        >
          همه دسته‌ها
        </button>
        {Object.entries(materialCategoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === key
                ? 'bg-[#C86D51] text-white shadow-md'
                : 'bg-white text-[#6B5B52] border border-[#E3A38F]/30 hover:bg-[#F9F6F0]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map(mat => (
          <div key={mat.id} className="bg-white rounded-3xl p-6 border border-[#E3A38F]/30 shadow-sm hover:border-[#C86D51]/50 transition flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#C86D51]/10 text-[#C86D51] px-3 py-1 rounded-full text-[10px] font-bold">
                  {materialCategoryLabels[mat.category] || mat.category}
                </span>
                <span className="text-xs font-bold text-[#2E6F40] bg-[#2E6F40]/10 px-2.5 py-1 rounded-lg">
                  {mat.aiScore}% مطابقت با سبک
                </span>
              </div>
              <h3 className="text-base font-bold text-[#2C2A29]">{mat.name}</h3>
              <p className="text-xs text-[#6B5B52] line-clamp-2">{mat.description}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E3A38F]/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B5B52]">قیمت واحد:</span>
                <span className="text-xs font-black text-[#2C2A29]">{(mat.price ?? 0).toLocaleString('fa-IR')} تومان / {mat.unit}</span>
              </div>
              <button
                onClick={() => {
                  onAddToCart(mat);
                  showToast(`${mat.name} به سبد خرید افزوده شد.`);
                }}
                className="w-full bg-[#C86D51] hover:bg-[#b05b41] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>افزودن به سبد پروژه</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
