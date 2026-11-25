import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Compass, CheckCircle2, Box } from 'lucide-react';
import { Persona } from './types';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectPersona: (p: Persona) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectPersona }) => {
  const galleryImages = [
    {
      title: "نشیمن مدرن با چوب بلوط و گلس‌مورفیسم",
      style: "مدرن مینیمال شیشه‌ای",
      budget: "۴۸۰ میلیون تومان",
      image: "/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg"
    },
    {
      title: "آشپزخانه جزیره شفاف و نورپردازی کهکشانی",
      style: "اسکاندیناوی کریستالی",
      budget: "۶۵۰ میلیون تومان",
      image: "/__l5e/assets-v1/223c68d9-64db-4c3c-a572-34b853d2ec54/prototype-commerce.jpg"
    },
    {
      title: "اتاق خواب مستر با پانل‌های شیشه‌ای مات و چوب",
      style: "ژاپنی-اسکاندیناوی (Japandi)",
      budget: "۳۲۰ میلیون تومان",
      image: "/__l5e/assets-v1/68ceadfc-b580-4f18-8679-0088dddd218c/prototype-travel.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20" dir="rtl">
      
      {/* 1. Hero Section with Exquisite Glassmorphism */}
      <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#2D2826]/95 via-[#3A3330]/90 to-[#201E1D]/95 text-white p-8 sm:p-16 shadow-[0_25px_60px_rgba(31,38,135,0.25)] border border-white/30 backdrop-blur-3xl">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
          <img
            src="/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg"
            alt="تصویر شاخص گلس‌مورفیسم"
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute -top-24 -start-24 w-96 h-96 bg-[#C86D51]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -end-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/40">
            <Sparkles className="w-4 h-4 text-[#E3A38F]" />
            معماری هوشمند با طراحی کاملاً شیشه‌ای و کریستالی
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight tracking-tight drop-shadow-lg text-white">
            خانه‌ رویایی‌تان را با استایل شیشه‌ای گلس‌مورفیسم بسازید
          </h1>
          <p className="text-base sm:text-lg text-stone-200 font-normal leading-relaxed drop-shadow">
            آرک‌فلو دستیار پیشرفته هوش مصنوعی با جلوه‌های بصری خیره‌کننده شیشه‌ای، بازسازی خانه و انتخاب متریال را به تجربه‌ای لذت‌بخش تبدیل می‌کند.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onNavigate('profiling')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C86D51] to-[#b05b41] hover:from-[#b05b41] hover:to-[#9a4d36] text-white font-bold text-base transition-all shadow-[0_10px_30px_rgba(200,109,81,0.4)] flex items-center gap-3 border border-white/30 hover:scale-105 cursor-pointer backdrop-blur-md"
            >
              شروع پروفایلینگ هوشمند
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-2xl text-white font-bold text-base transition-all border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:scale-105 cursor-pointer"
            >
              بازارچه متریال شیشه‌ای
            </button>
          </div>
        </div>
      </div>

      {/* 2. Glass Cards Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/90 transition duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition border border-[#C86D51]/20 shadow-inner">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#2D2826] font-heading">طراحی شیشه‌ای پیشرفته</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            محیط کاربری با لایه‌های کریستالی شفاف، عمق‌دهی نوری و کارت‌های گلس‌مورفیسم مدرن طراحی شده است.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/90 transition duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition border border-[#C86D51]/20 shadow-inner">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#2D2826] font-heading">هوش مصنوعی معماری</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            برطرف کردن تضاد سلیقه اعضای خانواده و ارائه پیشنهادات دقیق متناسب با بودجه و اقلیم.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/90 transition duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition border border-[#C86D51]/20 shadow-inner">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#2D2826] font-heading">قیمت لحظه‌ای بازار ایران</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            دسترسی به کاتالوگ دقیق مصالح ساختمانی با عیار استاندارد و محاسبه‌گر هوشمند پیش‌فاکتور.
          </p>
        </div>
      </div>

      {/* 3. Glassmorphic Gallery Section */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#C86D51] bg-[#C86D51]/10 px-3.5 py-1.5 rounded-full border border-[#C86D51]/20">
              گالری پروژه‌های گلس‌مورفیسم
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D2826] font-heading mt-3">
              نمونه فضاهای طراحی شده با آرک‌فلو
            </h2>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-bold text-[#C86D51] hover:text-[#b05b41] flex items-center gap-2 bg-white/70 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/50 shadow-sm self-start md:self-auto transition hover:bg-white"
          >
            مشاهده محیط سه‌بعدی داشبورد
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className="group bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-4 border border-white/60 shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] hover:shadow-[0_20px_50px_rgba(31,38,135,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 start-4 bg-black/40 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-white/20 font-bold">
                  {item.style}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-stone-900 text-base font-heading group-hover:text-[#C86D51] transition">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                  <span className="text-xs text-stone-500">برآورد هوشمند:</span>
                  <span className="text-xs font-black text-[#C86D51]">{item.budget}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Glass Banner Callout */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-r from-[#2D2826] via-[#3A3330] to-[#201E1D] text-white p-8 sm:p-12 shadow-[0_20px_50px_rgba(31,38,135,0.2)] border border-white/20 backdrop-blur-3xl overflow-hidden text-center sm:text-start flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-xl">
          <span className="text-xs font-bold text-[#E3A38F] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            شروع کنید
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading">
            آماده تحول در معماری و بازسازی خانه خود هستید؟
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            همین امروز پروفایل خانواده را تکمیل کنید و اولین رندر شیشه‌ای اختصاصی خود را رایگان دریافت کنید.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <button
            onClick={() => onNavigate('profiling')}
            className="px-8 py-4 rounded-2xl bg-[#C86D51] hover:bg-[#b05b41] text-white font-bold text-sm transition-all shadow-[0_10px_25px_rgba(200,109,81,0.5)] border border-white/20 hover:scale-105 cursor-pointer backdrop-blur-md"
          >
            شروع بریف معماری
          </button>
        </div>
      </div>

    </div>
  );
};
