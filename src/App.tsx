import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { DashboardPage } from './DashboardPage';
import { ProfilerPage } from './ProfilerPage';
import { MarketplacePage } from './components/MarketplacePage';
import { CommunityPage } from './components/CommunityPage';
import { PricingPage } from './components/PricingPage';
import { CartDrawer } from './components/CartDrawer';
import { mockMaterials, mockProjects, mockProfiles, styleKeys, styleLabels } from './data/mockData';
import { Persona, MaterialItem, Project } from './types';
import { Sparkles, Compass, ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight, Layers, Sliders, Cpu, Eye, UserCheck, RefreshCw, Star, Info, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPersona, setSelectedPersona] = useState<Persona>('sara');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<MaterialItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search state with normalisation and debounce
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const normalizeQuery = (str: string) => {
    return str
      .replace(/ي/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/ة/g, 'ه')
      .replace(/[\u064B-\u065F]/g, '') // strip diacritics
      .trim()
      .toLowerCase();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(normalizeQuery(searchQuery));
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Sync hash with activeTab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'dashboard', 'profiling', 'marketplace', 'community', 'pricing'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = `#/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = (item: MaterialItem) => {
    if (cartItems.some(i => i.id === item.id)) {
      showToast('این متریال از قبل در سبد خرید شما موجود است.');
      return;
    }
    setCartItems([...cartItems, item]);
    showToast(`متریال «${item.name}» به سبد خرید اضافه شد.`);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    showToast('آیتم از سبد خرید حذف شد.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('سبد خرید خالی شد.');
  };

  const handleProceedCheckout = () => {
    setCartOpen(false);
    showToast('ثبت سفارش نهایی با موفقیت انجام شد! کارشناس لجستیک با شما تماس می‌گیرد.');
  };

  // Mock active project for dashboard
  const currentProject: Project = {
    id: 'proj-1',
    title: 'بازسازی و طراحی داخلی آپارتمان مسکونی زعفرانیه',
    persona: selectedPersona,
    budget: 850000000,
    budgetIRR: 850000000,
    spent: 578000000,
    stage: 'ai_design',
    selectedMaterials: mockMaterials.slice(0, 3),
    styleKey: 'modern_minimal',
    rooms: [
      { id: 'r1', name: 'نشیمن اصلی', area: 42, style: 'مدرن و مینیمال گرم', image: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg' },
      { id: 'r2', name: 'آشپزخانه جزیره', area: 22, style: 'ژاپنی-اسکاندیناوی', image: '/__l5e/assets-v1/223c68d9-64db-4c3c-a572-34b853d2ec54/prototype-commerce.jpg' },
      { id: 'r3', name: 'اتاق خواب مستر', area: 28, style: 'کلاسیک گرم', image: '/__l5e/assets-v1/68ceadfc-b580-4f18-8679-0088dddd218c/prototype-travel.jpg' }
    ]
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-[#1a1817] via-[#242120] to-[#2e2a28] text-stone-100 flex flex-col font-sans selection:bg-[#C86D51] selection:text-white relative overflow-x-hidden">
      
      {/* Background ambient glowing glass orbs */}
      <div className="absolute top-20 start-10 w-96 h-96 bg-[#C86D51]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 end-10 w-[30rem] h-[30rem] bg-[#E3A38F]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 start-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={cartItems.length}
        onOpenCart={() => setCartOpen(true)}
        selectedPersona={selectedPersona}
        onSelectPersona={setSelectedPersona}
      />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {activeTab === 'home' && (
          <HomePage onNavigate={handleTabChange} onSelectPersona={setSelectedPersona} />
        )}
        {activeTab === 'dashboard' && (
          <DashboardPage
            currentProject={currentProject}
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
            onAddToCart={handleAddToCart}
            onNavigate={handleTabChange}
            showToast={showToast}
          />
        )}
        {activeTab === 'profiling' && (
          <ProfilerPage
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
            onNavigate={handleTabChange}
            showToast={showToast}
          />
        )}
        {activeTab === 'marketplace' && (
          <MarketplacePage
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onNavigate={handleTabChange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {activeTab === 'community' && (
          <CommunityPage onNavigate={handleTabChange} onSelectPersona={setSelectedPersona} />
        )}
        {activeTab === 'pricing' && (
          <PricingPage onNavigate={handleTabChange} onSelectPersona={setSelectedPersona} />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceed={handleProceedCheckout}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 start-6 z-50 bg-stone-900/90 backdrop-blur-xl border border-white/20 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-full bg-[#C86D51]/30 text-[#C86D51] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Glassmorphic Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-2xl text-stone-400 py-12 px-4 sm:px-6 lg:px-8 mt-20" dir="rtl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C86D51] flex items-center justify-center text-white font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-heading">آرک‌فلو گلس</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              پلتفرم جامع هوش مصنوعی و طراحی داخلی با جلوه‌های بصری شیشه‌ای پیشرفته و قیمت‌های لحظه‌ای متریال در بازار ایران.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleTabChange('home')} className="hover:text-white transition">صفحه اصلی</button></li>
              <li><button onClick={() => handleTabChange('profiling')} className="hover:text-white transition">پروفایلینگ خانواده</button></li>
              <li><button onClick={() => handleTabChange('dashboard')} className="hover:text-white transition">داشبورد هوش مصنوعی</button></li>
              <li><button onClick={() => handleTabChange('marketplace')} className="hover:text-white transition">بازارچه متریال</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">جامعه و پشتیبانی</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleTabChange('community')} className="hover:text-white transition">انجمن معماران</button></li>
              <li><button onClick={() => handleTabChange('pricing')} className="hover:text-white transition">تعرفه‌ها و اشتراک‌ها</button></li>
              <li><span className="text-stone-500">راهنمای استفاده</span></li>
              <li><span className="text-stone-500">تماس با پشتیبانی</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">خبرنامه هوشمند</h4>
            <p className="text-xs text-stone-400">آخرین ترندهای معماری شیشه‌ای و نوسانات متریال را دریافت کنید.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل شما..."
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#C86D51] w-full"
              />
              <button
                onClick={() => showToast('با موفقیت در خبرنامه عضو شدید.')}
                className="bg-[#C86D51] hover:bg-[#b05b41] text-white px-4 py-2 rounded-xl text-xs font-bold transition shrink-0"
              >
                عضویت
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <p>© ۱۴۰۳ آرک‌فلو. تمامی حقوق محفوظ است. طراحی شیشه‌ای و هوشمند.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span className="hover:text-stone-300 transition cursor-pointer">حریم خصوصی</span>
            <span className="hover:text-stone-300 transition cursor-pointer">قوانین و مقررات</span>
            <span className="hover:text-stone-300 transition cursor-pointer">ارتباط با ما</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
