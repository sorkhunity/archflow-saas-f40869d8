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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const normaliseText = (text: string) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/ي/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/ة/g, 'ه')
      .replace(/آ/g, 'ا')
      .trim();
  };

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

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = `#/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profiling state
  const [profileForm, setProfileForm] = useState({
    familyMembers: 4,
    budgetIRR: 750000000,
    style: styleKeys[0],
    colorPref: 'طبیعی و چوبی'
  });

  const handleAddToCart = (item: MaterialItem) => {
    if (!cartItems.some(i => i.id === item.id)) {
      setCartItems([...cartItems, item]);
      showToast(`متریال «${item.name}» به سبد خرید اضافه شد.`);
    } else {
      showToast(`این متریال از قبل در سبد خرید شما موجود است.`);
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(i => i.id !== id));
    showToast('آیتم از سبد خرید حذف شد.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('سبد خرید خالی شد.');
  };

  const currentProject: Project = {
    id: 'proj-1',
    title: 'بازسازی آپارتمان مسکونی زعفرانیه',
    persona: selectedPersona,
    budget: profileForm.budgetIRR,
    spent: Math.round(profileForm.budgetIRR * 0.68),
    stage: 'ai_design',
    selectedMaterials: cartItems,
    rooms: [
      { id: 'r1', name: 'نشیمن اصلی', area: 35, style: profileForm.style, image: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg' },
      { id: 'r2', name: 'آشپزخانه جزیره', area: 18, style: profileForm.style, image: '/__l5e/assets-v1/223c68d9-64db-4c3c-a572-34b853d2ec54/prototype-commerce.jpg' },
      { id: 'r3', name: 'اتاق خواب مستر', area: 22, style: profileForm.style, image: '/__l5e/assets-v1/68ceadfc-b580-4f18-8679-0088dddd218c/prototype-travel.jpg' }
    ]
  };

  return (
    <div className="min-h-dvh bg-[#F9F6F0] text-[#2C2A29] flex flex-col font-sans selection:bg-[#C86D51] selection:text-white" dir="rtl">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 bg-[#2C2A29] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#E3A38F]/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#E3A38F]" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        onOpenCart={() => setCartOpen(true)}
        selectedPersona={selectedPersona}
        onSelectPersona={setSelectedPersona}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage onNavigate={handleNavigate} onSelectPersona={setSelectedPersona} />
        )}
        {activeTab === 'dashboard' && (
          <DashboardPage
            currentProject={currentProject}
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}
        {activeTab === 'profiling' && (
          <ProfilerPage
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}
        {activeTab === 'marketplace' && (
          <MarketplacePage onAddToCart={handleAddToCart} cartItems={cartItems} />
        )}
        {activeTab === 'community' && (
          <CommunityPage onNavigate={handleNavigate} onSelectPersona={setSelectedPersona} />
        )}
        {activeTab === 'pricing' && (
          <PricingPage onNavigate={handleNavigate} onSelectPersona={setSelectedPersona} />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceed={() => {
          setCartOpen(false);
          handleNavigate('dashboard');
          showToast('انتقال به داشبورد و پیش‌فاکتور نهایی پروژه.');
        }}
      />

      {/* Footer */}
      <footer className="bg-[#2C2A29] text-[#F9F6F0] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#E3A38F]/20 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C86D51] text-white flex items-center justify-center font-bold text-lg">
                الف
              </div>
              <span className="text-xl font-black font-heading">آرک‌فلو (ArchFlow)</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              هوش مصنوعی پیشرفته طراحی داخلی، بازسازی منازل و مدیریت بازار متریال در ایران.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#E3A38F]">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><button onClick={() => handleNavigate('profiling')} className="hover:text-white transition cursor-pointer">پروفایلینگ هوشمند</button></li>
              <li><button onClick={() => handleNavigate('dashboard')} className="hover:text-white transition cursor-pointer">داشبورد هوش مصنوعی</button></li>
              <li><button onClick={() => handleNavigate('marketplace')} className="hover:text-white transition cursor-pointer">بازارچه متریال</button></li>
              <li><button onClick={() => handleNavigate('community')} className="hover:text-white transition cursor-pointer">انجمن معماران</button></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#E3A38F]">پشتیبانی و مشاوره</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              تهران، ونک، خیابان ملاصدرا، پلاک ۱۴۲، واحد هوش مصنوعی آرک‌فلو
            </p>
            <p className="text-xs text-[#E3A38F] font-bold">تلفن: ۰۲۱-۸۸۷۷۶۶۵۵</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#E3A38F]">خبرنامه معماری</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل شما..."
                className="bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C86D51] flex-1"
              />
              <button
                onClick={() => showToast('ایمیل شما با موفقیت در خبرنامه ثبت شد.')}
                className="bg-[#C86D51] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#b05b41] transition cursor-pointer"
              >
                عضویت
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-stone-800 text-center text-xs text-stone-400">
          تمامی حقوق برای سامانه هوشمند آرک‌فلو محفوظ است. © ۱۴۰۳
        </div>
      </footer>
    </div>
  );
}
