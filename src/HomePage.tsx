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
      <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#2D2826]/95 via-[#3A3330]/90 to-[#201E1D]/95 text-white p-8 sm:p-16 shadow-[0_25px_60px_rgba(212,175,55,0.25)] border border-[#D4AF37]/30 backdrop-blur-3xl">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
          <img
            src="/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg"
            alt="تصویر شاخص گلس‌مورفیسم"
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute -top-24 -start-24 w-96 h-96 bg-[#D4AF37]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -end-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-[0_8px_32px_0_rgba(212,175,55,0.15)] border border-[#D4AF37]/40">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
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
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#C5A059] hover:to-[#B38F46] text-white font-bold text-base transition-all shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center gap-3 border border-[#D4AF37]/30 hover:scale-105 cursor-pointer backdrop-blur-md"
            >
              شروع پروفایلینگ هوشمند
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-2xl text-white font-bold text-base transition-all border border-[#D4AF37]/30 shadow-[0_8px_32px_0_rgba(212,175,55,0.1)] hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-5 h-5 text-[#D4AF37]" />
              مشاهده بازارچه متریال
            </button>
          </div>
        </div>
      </div>

      {/* 2. Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-[#D4AF37]/40 shadow-[0_15px_40px_rgba(212,175,55,0.22)] hover:bg-white/90 transition duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-110 transition-transform">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#2C2A29] font-heading">طراحی هوشمند سه‌بعدی</h3>
          <p className="text-sm text-[#6B5B52] leading-relaxed">
            تولید رندرهای واقعی و تطبیق سبک‌های نوین معماری با سلیقه اعضای خانواده شما در ثانیه‌ها.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-[#D4AF37]/40 shadow-[0_15px_40px_rgba(212,175,55,0.22)] hover:bg-white/90 transition duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-110 transition-transform">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#2C2A29] font-heading">قیمت لحظه‌ای متریال</h3>
          <p className="text-sm text-[#6B5B52] leading-relaxed">
            دسترسی به لیست قیمت مصالح ساختمانی و دکوراسیون در بازار ایران با قابلیت افزودن مستقیم به سبد خرید.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-[#D4AF37]/40 shadow-[0_15px_40px_rgba(212,175,55,0.22)] hover:bg-white/90 transition duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#2C2A29] font-heading">مدیریت بودجه و پیش‌فاکتور</h3>
          <p className="text-sm text-[#6B5B52] leading-relaxed">
            کنترل هزینه‌ها، تفکیک بودجه بر اساس فضاها و دریافت پیش‌فاکتور رسمی استاندارد پروژه‌های ساختمانی.
          </p>
        </div>
      </div>

      {/* 3. Showcase Gallery */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full">
            گالری پروژه‌های گلس‌مورفیسم
          </span>
          <h2 className="text-3xl font-black text-[#2C2A29] font-heading">
            نمونه فضاهای طراحی شده با آرک‌فلو
          </h2>
          <p className="text-sm text-[#6B5B52]">
            ترکیب نورهای طبیعی، سطوح شیشه‌ای شفاف و مصالح گرم طبیعی در پروژه‌های اجرا شده.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-4 border border-[#D4AF37]/30 shadow-[0_15px_40px_rgba(212,175,55,0.15)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 start-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/20">
                  {item.style}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold text-[#2C2A29] font-heading leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-[#D4AF37]/20">
                  <span className="text-xs text-[#6B5B52]">برآورد هزینه اجرا</span>
                  <span className="text-sm font-black text-[#D4AF37]">{item.budget}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom CTA banner */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-r from-[#2D2826] via-[#3A3330] to-[#201E1D] text-white p-8 sm:p-12 shadow-[0_20px_50px_rgba(212,175,55,0.25)] border border-[#D4AF37]/30 backdrop-blur-2xl overflow-hidden text-center space-y-6">
        <div className="absolute -top-12 -start-12 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -end-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D4AF37] bg-white/10 px-4 py-1 rounded-full">
            همین امروز شروع کنید
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading leading-tight">
            آماده تحول در بازسازی و طراحی خانه خود هستید؟
          </h2>
          <p className="text-sm text-stone-300">
            با چند کلیک ساده سلیقه خود را وارد کنید و نخستین طرح هوش مصنوعی منزل خود را دریافت نمایید.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('profiling')}
              className="px-8 py-4 rounded-2xl bg-[#D4AF37] hover:bg-[#C5A059] text-white font-bold text-sm transition-all shadow-[0_10px_25px_rgba(212,175,55,0.4)] border border-[#D4AF37]/40 hover:scale-105 cursor-pointer inline-flex items-center gap-3"
            >
              ورود به سیستم پروفایلینگ خانواده
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
