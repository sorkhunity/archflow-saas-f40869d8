import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User, Sparkles, Compass, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { Persona } from './types';

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
    <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#E3A38F]/30 shadow-sm transition-all" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Right Side: Logo & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-start group focus:outline-none shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#C86D51] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:bg-[#b05b41] transition">
              الف
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-[#2D2826] tracking-tight block font-heading">آرک فلو</span>
              <span className="text-[11px] text-[#C86D51] font-semibold block tracking-wider">ArchFlow AI</span>
            </div>
          </button>

          {/* Desktop Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#E3A38F]/10 p-1.5 rounded-2xl border border-[#E3A38F]/30">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeTab === item.id
                    ? 'bg-[#C86D51] text-white shadow-sm'
                    : 'text-[#2D2826] hover:text-[#C86D51] hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Left Side: Persona Switcher, Cart & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          
          {/* Persona Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
              className="flex items-center gap-2 bg-white border border-[#E3A38F]/40 hover:border-[#C86D51] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold text-[#2D2826] shadow-sm transition"
              aria-label="انتخاب نقش کاربر"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#C86D51] animate-pulse"></div>
              <span className="hidden sm:inline">کاربر:</span>
              <span className="text-[#C86D51]">{currentPersonaObj.name}</span>
              <ChevronDown className={`w-4 h-4 text-[#6B5B52] transition-transform ${personaDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {personaDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setPersonaDropdownOpen(false)}
                />
                <div className="absolute start-0 sm:end-0 sm:start-auto mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E3A38F]/30 py-2 z-40 animate-fade-in">
                  <div className="px-4 py-2 border-b border-[#E3A38F]/20 text-[11px] font-bold text-[#6B5B52]">
                    انتخاب حالت نمایشی آرک‌فلو:
                  </div>
                  {personas.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPersona(p.id);
                        setPersonaDropdownOpen(false);
                      }}
                      className={`w-full text-start px-4 py-3 text-xs hover:bg-[#F9F6F0] flex flex-col gap-0.5 transition ${
                        selectedPersona === p.id ? 'bg-[#C86D51]/10 text-[#C86D51] font-bold' : 'text-[#2D2826]'
                      }`}
                    >
                      <span className="font-bold flex items-center justify-between">
                        {p.name}
                        {selectedPersona === p.id && <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>}
                      </span>
                      <span className="text-[11px] text-[#6B5B52]">{p.title}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-white border border-[#E3A38F]/40 hover:border-[#C86D51] text-[#2D2826] rounded-2xl shadow-sm transition flex items-center justify-center"
            aria-label="سبد خرید متریال"
          >
            <ShoppingBag className="w-5 h-5 text-[#2D2826]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -end-1.5 w-5 h-5 bg-[#C86D51] text-white rounded-full text-[11px] font-black flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 bg-white border border-[#E3A38F]/40 hover:border-[#C86D51] text-[#2D2826] rounded-2xl shadow-sm transition"
            aria-label="منوی موبایل"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E3A38F]/30 px-4 py-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-start px-4 py-3 rounded-xl text-sm font-bold transition flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-[#C86D51] text-white shadow-sm'
                    : 'text-[#2D2826] hover:bg-[#F9F6F0]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-60 rotate-180" />
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
