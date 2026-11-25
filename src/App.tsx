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

  // Search state with normalisation and debounce (Fix 2)
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
      if (['home', 'dashboard', 'profiling', 'marketplace', 'community', 'pricing', 'project'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = `#/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (item: MaterialItem) => {
    if (cartItems.some(i => i.id === item.id)) {
      showToast('این متریال قبلاً به سبد خرید اضافه شده است.');
      return;
    }
    setCartItems(prev => [...prev, item]);
    showToast(`متریال «${item.name}» به سبد خرید اضافه شد.`);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('متریال از سبد خرید حذف شد.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('سبد خرید خالی شد.');
  };

  const currentProject = mockProjects[selectedPersona] || mockProjects['sara'];

  return (
    <div className="min-h-dvh flex flex-col bg-[#FAF7F2] text-[#2D2826] font-sans antialiased selection:bg-[#C86D51] selection:text-white" dir="rtl">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={cartItems.length}
        onOpenCart={() => setCartOpen(true)}
        selectedPersona={selectedPersona}
        onSelectPersona={setSelectedPersona}
      />

      {/* Main Container letting height grow and scroll (Fix 3) */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleTabChange}
            onSelectPersona={setSelectedPersona}
            selectedPersona={selectedPersona}
          />
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
            onNavigate={handleTabChange}
            showToast={showToast}
            searchQuery={debouncedSearch}
            setSearchQuery={setSearchQuery}
          />
        )}
        {activeTab === 'community' && (
          <CommunityPage
            onNavigate={handleTabChange}
            onSelectPersona={setSelectedPersona}
          />
        )}
        {activeTab === 'pricing' && (
          <PricingPage
            onNavigate={handleTabChange}
            onSelectPersona={setSelectedPersona}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#2D2826] text-[#F9F6F0] py-12 border-t border-[#E3A38F]/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C86D51] text-white flex items-center justify-center font-bold text-lg">
                الف
              </div>
              <span className="text-xl font-black tracking-tight">آرک فلو AI</span>
            </div>
            <p className="text-sm text-[#F9F6F0]/70 leading-relaxed">
              پلتفرم هوش مصنوعی معماری و بازسازی مسکن، پیونددهنده رویاهای شما با استانداردهای مهندسی و بازار لحظه‌ای متریال.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-base mb-4 text-[#E3A38F]">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-[#F9F6F0]/70">
              <li><button onClick={() => handleTabChange('home')} className="hover:text-white transition">صفحه اصلی</button></li>
              <li><button onClick={() => handleTabChange('profiling')} className="hover:text-white transition">پروفایلینگ خانواده</button></li>
              <li><button onClick={() => handleTabChange('dashboard')} className="hover:text-white transition">داشبورد هوش مصنوعی</button></li>
              <li><button onClick={() => handleTabChange('marketplace')} className="hover:text-white transition">بازارچه متریال</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base mb-4 text-[#E3A38F]">جامعه و پشتیبانی</h4>
            <ul className="space-y-2 text-sm text-[#F9F6F0]/70">
              <li><button onClick={() => handleTabChange('community')} className="hover:text-white transition">انجمن معماران</button></li>
              <li><button onClick={() => handleTabChange('pricing')} className="hover:text-white transition">تعرفه‌ها و اشتراک</button></li>
              <li><a href="#/faq" onClick={(e) => { e.preventDefault(); showToast('بخش سوالات متداول به زودی فعال می‌شود.'); }} className="hover:text-white transition">سوالات متداول</a></li>
              <li><a href="#/terms" onClick={(e) => { e.preventDefault(); showToast('قوانین استفاده از خدمات آرک‌فلو'); }} className="hover:text-white transition">قوانین و مقررات</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-base mb-4 text-[#E3A38F]">خبرنامه مهندسی</h4>
            <p className="text-xs text-[#F9F6F0]/70">برای دریافت آخرین تحلیل‌های بازار مسکن و متریال ثبت‌نام کنید.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل شما..."
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#C86D51] flex-1"
              />
              <button
                onClick={() => showToast('با موفقیت در خبرنامه ثبت‌نام شدید!')}
                className="bg-[#C86D51] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#b05b41] transition shrink-0"
              >
                عضویت
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-xs text-[#F9F6F0]/50">
          تمامی حقوق محفوظ است © ۱۴۰۳ - آرک‌فلو AI (ArchFlow AI)
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceed={() => {
          setCartOpen(false);
          showToast('پیش‌فاکتور با موفقیت نهایی شد و به بخش لجستیک ارسال گردید.');
          setCartItems([]);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 start-6 z-50 bg-[#2D2826] text-[#FAF7F2] px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-[#E3A38F]/30 animate-fade-in" role="status" aria-live="polite">
          <CheckCircle2 className="w-5 h-5 text-[#C86D51] shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
