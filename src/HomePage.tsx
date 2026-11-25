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
      
      {/* 1. Hero Section with Golden Glow & Glassmorphism */}
      <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#2D2826]/95 via-[#3A3330]/90 to-[#201E1D]/95 text-white p-8 sm:p-16 shadow-[0_8px_25px_rgba(234,179,8,0.15)] border border-amber-500/40 backdrop-blur-3xl">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
          <img
            src="/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg"
            alt="تصویر شاخص گلس‌مورفیسم"
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute -top-24 -start-24 w-96 h-96 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -end-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-xl text-amber-200 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-[0_8px_32px_0_rgba(234,179,8,0.2)] border border-amber-500/40">
            <Sparkles className="w-4 h-4 text-amber-400" />
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
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-base transition-all shadow-[0_10px_35px_rgba(234,179,8,0.35)] flex items-center gap-3 border border-amber-300/60 hover:scale-105 cursor-pointer backdrop-blur-md"
            >
              شروع پروفایلینگ هوشمند
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all backdrop-blur-xl border border-amber-500/30 shadow-[0_10px_35px_rgba(234,179,8,0.15)] flex items-center gap-3 hover:scale-105 cursor-pointer"
            >
              مشاهده داو فیلم ۳ بعدی
              <Box className="w-5 h-5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Features Grid with Golden Card Shadows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_35px_rgba(234,179,8,0.22)] border border-amber-500/35 space-y-4 hover:shadow-[0_15px_45px_rgba(234,179,8,0.32)] transition group">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition border border-amber-500/30 shadow-[0_4px_15px_rgba(234,179,8,0.2)]">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-stone-900 font-heading">پروفایلینگ و بریف هوشمند</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            سیستم هوش مصنوعی سلیقه اعضای خانواده را تلفیق کرده و بهترین سبک دکوراسیون و ترکیب رنگی را پیشنهاد می‌دهد.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_35px_rgba(234,179,8,0.22)] border border-amber-500/35 space-y-4 hover:shadow-[0_15px_45px_rgba(234,179,8,0.32)] transition group">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition border border-amber-500/30 shadow-[0_4px_15px_rgba(234,179,8,0.2)]">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-stone-900 font-heading">رندرهای شیشه‌ای و ۳ بعدی</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            مشاهده فضای داخلی با نورپردازی‌های مختلف روز، غروب و شب همراه با امکان جابجایی هوشمند المان‌ها.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_35px_rgba(234,179,8,0.22)] border border-amber-500/35 space-y-4 hover:shadow-[0_15px_45px_rgba(234,179,8,0.32)] transition group">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition border border-amber-500/30 shadow-[0_4px_15px_rgba(234,179,8,0.2)]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-stone-900 font-heading">بازارچه متریال و پیش‌فاکتور</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            استفاده از قیمت‌های روز بازار ایران برای مصالح، چوب، سنگ و تجهیزات با قابلیت خرید مستقیم و استعلام قیمت.
          </p>
        </div>
      </div>

      {/* 3. Gallery Showcase with Golden Shadows */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              گالری پروژه‌ها
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-heading mt-2">
              نمونه طرح‌های اجرا شده با آرک‌فلو
            </h2>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-amber-600 hover:text-amber-700 font-bold text-sm flex items-center gap-2 transition cursor-pointer"
          >
            مشاهده همه پروژه‌ها
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(234,179,8,0.22)] border border-amber-500/35 hover:shadow-[0_18px_50px_rgba(234,179,8,0.32)] transition group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 shadow-[0_5px_20px_rgba(234,179,8,0.2)]"
                />
                <div className="absolute top-4 start-4 bg-stone-900/80 backdrop-blur-md text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-500/30 shadow-md">
                  {item.style}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-stone-900 font-heading line-clamp-1">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-amber-500/15">
                    <span>برآورد بودجه:</span>
                    <span className="font-bold text-amber-600">{item.budget}</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full py-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 font-bold text-xs transition border border-amber-500/30 shadow-[0_4px_15px_rgba(234,179,8,0.15)] cursor-pointer flex items-center justify-center gap-2"
                >
                  مشاهده و ویرایش در ۳D
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
