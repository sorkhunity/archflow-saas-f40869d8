import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { Persona } from './types';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectPersona: (p: Persona) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectPersona }) => {
  const galleryImages = [
    {
      title: "نشیمن مدرن با چوب بلوط و خاکستری گرم",
      style: "مدرن مینیمال",
      budget: "۴۸۰ میلیون تومان",
      image: "/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg"
    },
    {
      title: "آشپزخانه جزیره سنگ مرمر و سفالی",
      style: "اسکاندیناوی گرم",
      budget: "۶۵۰ میلیون تومان",
      image: "/__l5e/assets-v1/223c68d9-64db-4c3c-a572-34b853d2ec54/prototype-commerce.jpg"
    },
    {
      title: "اتاق خواب مستر با چوب طبیعی و نورپردازی خطی",
      style: "ژاپنی-اسکاندیناوی (Japandi)",
      budget: "۳۲۰ میلیون تومان",
      image: "/__l5e/assets-v1/68ceadfc-b580-4f18-8679-0088dddd218c/prototype-travel.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16" dir="rtl">
      
      {/* 1. Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2D2826] to-[#453C38] text-white p-8 sm:p-14 shadow-xl">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img
            src="/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#C86D51] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4" />
            هوش مصنوعی پیشرفته طراحی داخلی و معماری
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight tracking-tight">
            خانه‌ رویایی‌تان را با هوش مصنوعی و متریال بازار ایران بسازید
          </h1>
          <p className="text-base sm:text-lg text-[#F9F6F0]/90 font-normal leading-relaxed">
            آرک‌فلو دستیار هوشمند معماری و بازسازی است که سلیقه خانواده شما را هماهنگ می‌کند، سه‌بعدی می‌سازد و خرید متریال دقیق از بازار ایران را مدیریت می‌کند.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('profiling')}
              className="px-8 py-4 rounded-2xl bg-[#C86D51] hover:bg-[#b05b41] text-white font-bold text-base transition shadow-lg flex items-center gap-3"
            >
              شروع پروفایلینگ هوشمند
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-base transition border border-white/20 flex items-center gap-2"
            >
              مشاهده متریال بازار
            </button>
          </div>
        </div>
      </div>

      {/* 2. Persona Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#2D2826] font-heading">
            انتخاب بر اساس نیاز و سبک زندگی شما
          </h2>
          <p className="text-sm text-[#6B5B52]">
            یکی از این سه پروفایل را انتخاب کنید تا پیش‌فرض‌ها متناسب با تجربه شما تنظیم شود:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'sara' as Persona,
              title: 'سارا: خانواده در حال بازسازی',
              desc: 'دارای دو فرزند، به دنبال تطبیق سلیقه همسر و مدیریت بودجه دقیق برای بازسازی نشیمن و آشپزخانه.',
              icon: ShieldCheck,
              badge: 'خانوادگی و اقتصادی'
            },
            {
              id: 'arash' as Persona,
              title: 'آرش: معمار فریلنسر',
              desc: 'طراح پروژه‌های مسکونی، نیازمند رندرهای سریع هوش مصنوعی و لیست تامین‌کنندگان معتبر ایرانی.',
              icon: Compass,
              badge: 'حرفه‌ای و فنی'
            },
            {
              id: 'mina' as Persona,
              title: 'مینا: خریدار مسکن',
              desc: 'به تازگی آپارتمانی خریده و می‌خواهد پیش از خرید نهایی، سبک‌های مختلف چیدمان را امتحان کند.',
              icon: Sparkles,
              badge: 'ایده‌پرداز مدرن'
            }
          ].map(p => {
            const IconComp = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => {
                  onSelectPersona(p.id);
                  onNavigate('profiling');
                }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#E3A38F]/30 hover:border-[#C86D51] transition cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="inline-block bg-[#C86D51]/10 text-[#C86D51] text-xs font-bold px-3 py-1 rounded-full">
                    {p.badge}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center group-hover:bg-[#C86D51] group-hover:text-white transition">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D2826] group-hover:text-[#C86D51] transition">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6B5B52] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="text-xs font-bold text-[#C86D51] flex items-center gap-1 group-hover:translate-x-1 transition">
                  انتخاب این پروفایل و شروع بریف
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Gallery Showcase Section */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C86D51] bg-[#C86D51]/10 px-3 py-1 rounded-full">
              گالری رندرهای هوش مصنوعی
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2C2A29] font-heading">
              فضاهای طراحی شده با موتور آرک‌فلو
            </h2>
            <p className="text-sm text-[#6B5B52]">
              نمونه خروجی‌های واقعی تولید شده توسط هوش مصنوعی متناسب با متریال بازار ایران.
            </p>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="self-start md:self-auto px-5 py-3 rounded-2xl bg-[#E3A38F]/20 text-[#2C2A29] hover:bg-[#E3A38F]/30 font-bold text-sm transition flex items-center gap-2"
          >
            مشاهده بازارچه متریال
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryImages.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E3A38F]/30 group flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#2C2A29] text-xs font-bold px-3 py-1 rounded-xl shadow-sm">
                  {item.style}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[#2C2A29] group-hover:text-[#C86D51] transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B5B52]">برآورد تقریبی: {item.budget}</p>
                </div>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full py-3 rounded-xl bg-[#FDFBF7] text-[#C86D51] border border-[#E3A38F]/30 hover:bg-[#C86D51] hover:text-white font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  مشاهده جزئیات در داشبورد
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
