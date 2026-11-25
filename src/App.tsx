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
    showToast('متریال از سبد خرید حذف شد.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('سبد خرید خالی شد.');
  };

  const handleProceedCheckout = () => {
    setCartOpen(false);
    showToast('پیش‌فاکتور و لیست متریال با موفقیت ثبت شد. همکاران ما با شما تماس خواهند گرفت.');
    setCartItems([]);
  };

  const currentProject = mockProjects[0];

  return (
    <div className="min-h-dvh bg-[#FDFBF7] text-[#2C2A29] font-sans selection:bg-[#C86D51]/20 selection:text-[#C86D51] flex flex-col" dir="rtl">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 start-6 z-50 bg-[#2C2A29] text-[#FDFBF7] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-[#E3A38F]/30" role="status">
          <CheckCircle2 className="w-5 h-5 text-[#C86D51] shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={cartItems.length}
        onOpenCart={() => setCartOpen(true)}
        selectedPersona={selectedPersona}
        onSelectPersona={setSelectedPersona}
      />

      {/* Main Content Area */}
      <main className="flex-1">
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

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceed={handleProceedCheckout}
      />

      {/* Footer */}
      <footer className="bg-[#2C2A29] text-[#FDFBF7]/80 pt-16 pb-12 border-t border-[#E3A38F]/20 mt-20" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-1 text-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C86D51] text-white flex items-center justify-center font-black text-xl shadow-md">
                  آ
                </div>
                <span className="text-xl font-black text-[#FDFBF7] font-heading tracking-tight">آرک‌فلو</span>
              </div>
              <p className="text-xs text-[#FDFBF7]/70 leading-relaxed">
                سامانه هوشمند طراحی داخلی، تحلیل متریال بازار و مدیریت بودجه بازسازی خانه با هوش مصنوعی.
              </p>
            </div>

            <div className="space-y-3 text-start">
              <h4 className="text-sm font-bold text-[#FDFBF7] font-heading">دسترسی سریع</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleTabChange('home')} className="hover:text-[#C86D51] transition">صفحه اصلی</button></li>
                <li><button onClick={() => handleTabChange('dashboard')} className="hover:text-[#C86D51] transition">داشبورد هوش مصنوعی</button></li>
                <li><button onClick={() => handleTabChange('profiling')} className="hover:text-[#C86D51] transition">پروفایلینگ خانواده</button></li>
                <li><button onClick={() => handleTabChange('marketplace')} className="hover:text-[#C86D51] transition">بازارچه متریال</button></li>
              </ul>
            </div>

            <div className="space-y-3 text-start">
              <h4 className="text-sm font-bold text-[#FDFBF7] font-heading">جامعه و خدمات</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleTabChange('community')} className="hover:text-[#C86D51] transition">انجمن معماران</button></li>
                <li><button onClick={() => handleTabChange('pricing')} className="hover:text-[#C86D51] transition">تعرفه‌ها و اشتراک</button></li>
                <li><button onClick={() => handleTabChange('marketplace')} className="hover:text-[#C86D51] transition">قیمت لحظه‌ای مصالح</button></li>
              </ul>
            </div>

            <div className="space-y-3 text-start">
              <h4 className="text-sm font-bold text-[#FDFBF7] font-heading">تماس با ما</h4>
              <p className="text-xs text-[#FDFBF7]/70 leading-relaxed">
                تهران، خیابان ونک، برج نگار، پلاک ۴۲<br />
                تلفن پشتیبانی: ۰۲۱-۸۸۷۷۶۶۵۵<br />
                ایمیل: support@arcflow.ir
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#FDFBF7]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDFBF7]/60">
            <p>تمامی حقوق این سامانه متعلق به آرک‌فلو می‌باشد © ۱۴۰۳</p>
            <div className="flex items-center gap-6">
              <span>حریم خصوصی</span>
              <span>قوانین و مقررات</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
