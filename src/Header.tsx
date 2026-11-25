import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User, Sparkles, Compass, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { Persona } from './types';
import userImage1 from './assets/user-image-mww6zcgq-1';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  selectedPersona: Persona;
  onSelectPersona: (persona: Persona) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  selectedPersona,
  onSelectPersona
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const personas: { id: Persona; name: string; title: string }[] = [
    { id: 'sara', name: 'متین', title: 'خانواده در حال بازسازی' },
    { id: 'arash', name: 'آرش', title: 'معمار فریلنسر' },
    { id: 'mina', name: 'مینا', title: 'خریدار مسکن' }
  ];

  const currentPersonaObj = personas.find(p => p.id === selectedPersona) || personas[0];

  const navItems = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'profiling', label: 'پروفایلینگ خانواده' },
    { id: 'dashboard', label: 'داشبورد هوش مصنوعی' },
    { id: 'marketplace', label: 'بازارچه متریال' },
    { id: 'community', label: 'انجمن معماران' },
    { id: 'pricing', label: 'تعرفه‌ها' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Right Side: Logo & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-start group focus:outline-none shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-stone-900 overflow-hidden flex items-center justify-center shadow-md group-hover:scale-105 transition border border-white/30">
              <img src={userImage1} alt="لوگو" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-[#2D2826] tracking-tight block font-heading">آرک فلو</span>
              <span className="text-[11px] text-[#C86D51] font-semibold block tracking-wider">ArchFlow AI</span>
            </div>
          </button>

          {/* Desktop Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/60 shadow-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#C86D51] to-[#b05b41] text-white shadow-lg shadow-[#C86D51]/20'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Left Side: Persona Switcher & Cart */}
        <div className="flex items-center gap-3">
          
          {/* Persona Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
              className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xl border border-white/60 px-3.5 py-2 rounded-2xl shadow-sm hover:bg-white transition text-xs font-bold text-stone-800"
            >
              <div className="w-7 h-7 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center font-black">
                {currentPersonaObj.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-start">
                <span className="block text-stone-900 font-bold">{currentPersonaObj.name}</span>
                <span className="block text-[10px] text-stone-500">{currentPersonaObj.title}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>

            {personaDropdownOpen && (
              <div className="absolute start-0 mt-2 w-56 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 py-2 z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 border-b border-stone-100">
                  انتخاب پروفایل کاربری
                </div>
                {personas.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPersona(p.id);
                      setPersonaDropdownOpen(false);
                    }}
                    className={`w-full text-start px-4 py-2.5 text-xs transition flex flex-col hover:bg-stone-50 ${
                      selectedPersona === p.id ? 'bg-[#C86D51]/10 text-[#C86D51] font-bold' : 'text-stone-700'
                    }`}
                  >
                    <span>{p.name} ({p.title})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 text-stone-700 hover:text-stone-900 hover:bg-white transition shadow-sm"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="w-5 h-5 text-[#C86D51]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -end-1 bg-[#C86D51] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 text-stone-700 hover:bg-white transition"
            aria-label="منوی موبایل"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-3xl border-b border-white/40 px-6 py-6 space-y-3 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-start px-4 py-3 rounded-2xl text-sm font-bold transition ${
                activeTab === item.id
                  ? 'bg-[#C86D51] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
