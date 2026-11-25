import React, { useState } from 'react';
import { Sparkles, Sliders, Users, Home, CheckCircle2, ArrowRight, ShieldCheck, Box } from 'lucide-react';
import { Persona } from './types';

interface ProfilerPageProps {
  selectedPersona: Persona;
  onSelectPersona: (p: Persona) => void;
  onNavigate: (tab: string) => void;
  showToast: (msg: string) => void;
}

export const ProfilerPage: React.FC<ProfilerPageProps> = ({
  selectedPersona,
  onSelectPersona,
  onNavigate,
  showToast
}) => {
  const [familyMembers, setFamilyMembers] = useState(4);
  const [budgetIRR, setBudgetIRR] = useState(750000000);
  const [style, setStyle] = useState('مدرن و مینیمال گرم');
  const [colorPreference, setColorPreference] = useState('چوب طبیعی و تنالیته بژ');
  const [selectedRooms, setSelectedRooms] = useState<string[]>(['نشیمن', 'آشپزخانه', 'اتاق خواب اصلی']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const roomsList = ['نشیمن', 'آشپزخانه', 'اتاق خواب اصلی', 'اتاق کودک', 'تراس و بالکن', 'حمام مستر'];

  const toggleRoom = (room: string) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(selectedRooms.filter(r => r !== room));
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const handleRunAi = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResult({
        summary: `پروفایل هوشمند تنظیم شد: خانواده ${familyMembers} نفره با بودجه ${(budgetIRR ?? 0).toLocaleString('fa-IR')} ریال و سبک ${style}. ترکیب ایده‌آل متریال گرم و نور طبیعی برای فضاهای انتخابی.`,
        score: 96,
        recommendedMaterials: ['پارکت بلوط طبیعی', 'رنگ اکریلیک بژ عاجی', 'لوستر خطی برنجی']
      });
      showToast('تحلیل هوش مصنوعی بریف معماری با موفقیت تکمیل شد.');
    }, 1500);
  };

  return (
    <div className="min-h-dvh bg-[#F9F6F0] py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#C86D51]/10 text-[#C86D51] px-4 py-1.5 rounded-full text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            سیستم پروفایلینگ هوشمند آرک‌فلو
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2C2A29] font-heading">
            تنظیم بریف معماری و سلیقه اعضای خانواده
          </h1>
          <p className="text-sm text-[#6B5B52] max-w-2xl mx-auto">
            با تکمیل اطلاعات زیر، موتور هوش مصنوعی آرک‌فلو تضاد سلیقه‌ها را برطرف کرده و بهترین پلان و لیست متریال بازار ایران را پیشنهاد می‌دهد.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E3A38F]/30">
          <form onSubmit={handleRunAi} className="space-y-8">
            
            {/* Persona Switcher */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#2C2A29] block">انتخاب پروفایل پیش‌فرض:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'sara', title: 'سارا (خانواده بازسازی)' },
                  { id: 'arash', title: 'آرش (معمار فریلنسر)' },
                  { id: 'mina', title: 'مینا (خریدار مسکن)' }
                ].map(p => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => onSelectPersona(p.id as Persona)}
                    className={`p-4 rounded-2xl border text-start transition font-bold text-sm flex items-center justify-between ${
                      selectedPersona === p.id
                        ? 'border-[#C86D51] bg-[#C86D51]/10 text-[#2C2A29]'
                        : 'border-[#E3A38F]/30 bg-[#F9F6F0]/60 text-[#6B5B52] hover:border-[#C86D51]'
                    }`}
                  >
                    <span>{p.title}</span>
                    {selectedPersona === p.id && <CheckCircle2 className="w-5 h-5 text-[#C86D51]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Family Members & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2C2A29] block">تعداد اعضای خانواده / کاربران فضا:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E3A38F]/40 bg-[#F9F6F0]/50 text-[#2C2A29] focus:outline-none focus:border-[#C86D51]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2C2A29] block">بودجه تقریبی (ریال):</label>
                <input
                  type="number"
                  step="50000000"
                  value={budgetIRR}
                  onChange={(e) => setBudgetIRR(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E3A38F]/40 bg-[#F9F6F0]/50 text-[#2C2A29] focus:outline-none focus:border-[#C86D51]"
                />
                <span className="text-xs text-[#C86D51] block">{(budgetIRR / 10000000).toLocaleString('fa-IR')} میلیون تومان</span>
              </div>
            </div>

            {/* Style & Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2C2A29] block">سبک معماری داخلی ترجیحی:</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E3A38F]/40 bg-[#F9F6F0]/50 text-[#2C2A29] focus:outline-none focus:border-[#C86D51]"
                >
                  <option value="مدرن و مینیمال گرم">مدرن و مینیمال گرم</option>
                  <option value="اسکاندیناوی و چوبی">اسکاندیناوی و چوبی</option>
                  <option value="کلاسیک ایرانی و لوکس">کلاسیک ایرانی و لوکس</option>
                  <option value="صنعتی و بتن اکسپوز">صنعتی و بتن اکسپوز</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2C2A29] block">ترجیح رنگ و متریال:</label>
                <input
                  type="text"
                  value={colorPreference}
                  onChange={(e) => setColorPreference(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E3A38F]/40 bg-[#F9F6F0]/50 text-[#2C2A29] focus:outline-none focus:border-[#C86D51]"
                />
              </div>
            </div>

            {/* Rooms Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#2C2A29] block">فضاها و بخش‌های مورد نظر برای بازسازی:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {roomsList.map((room) => {
                  const isSelected = selectedRooms.includes(room);
                  return (
                    <button
                      type="button"
                      key={room}
                      onClick={() => toggleRoom(room)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between ${
                        isSelected
                          ? 'border-[#C86D51] bg-[#C86D51]/10 text-[#2C2A29]'
                          : 'border-[#E3A38F]/30 bg-[#F9F6F0]/50 text-[#6B5B52]'
                      }`}
                    >
                      <span>{room}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#C86D51] border-[#C86D51] text-white' : 'border-[#6B5B52]'}`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3.5 rounded-2xl bg-[#E3A38F]/20 text-[#2C2A29] hover:bg-[#E3A38F]/30 font-bold text-sm transition"
              >
                رفتن به داشبورد پروژه
              </button>
              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-8 py-3.5 rounded-2xl bg-[#C86D51] text-white hover:bg-[#b05b41] font-bold text-sm transition shadow-lg flex items-center gap-2 disabled:opacity-60"
              >
                <Sparkles className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                {isAnalyzing ? 'در حال تحلیل هوش مصنوعی...' : 'اجرای تحلیل هوشمند بریف'}
              </button>
            </div>

          </form>

          {/* AI Result Card if generated */}
          {aiResult && (
            <div className="mt-8 p-6 rounded-2xl bg-[#F9F6F0] border border-[#C86D51]/40 space-y-4">
              <div className="flex items-center gap-2 text-[#C86D51]">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-[#2C2A29]">نتیجه بریفing هوش مصنوعی</h3>
              </div>
              <p className="text-sm text-[#6B5B52] leading-relaxed">{aiResult.summary}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#6B5B52]">امتیاز همگنی سلیقه: <strong>{aiResult.score}%</strong></span>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 rounded-xl bg-[#C86D51] text-white font-bold text-xs hover:bg-[#b05b41] transition"
                >
                  مشاهده رندرهای سه‌بعدی
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
