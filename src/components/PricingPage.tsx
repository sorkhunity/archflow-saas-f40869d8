import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Compass, CheckCircle2, Box } from 'lucide-react';
import { Persona } from '../types';

interface PricingPageProps {
  onNavigate: (tab: string) => void;
  onSelectPersona: (p: Persona) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onSelectPersona }) => {
  const plans = [
    {
      name: 'پروژه شخصی / خانوار',
      price: 'رایگان',
      period: 'مناسب بازسازی تک‌فضا',
      description: 'برای کسانی که می‌خواهند خانه خود را بازسازی کنند و به برآورد اولیه نیاز دارند.',
      features: [
        '۵ رندر هوش مصنوعی ماهانه',
        'دسترسی به کاتالوگ متریال پایه',
        'محاسبه‌گر بودجه بازسازی',
        'پشتیبانی جامعه'
      ],
      popular: false,
      cta: 'شروع رایگان'
    },
    {
      name: 'معمار و طراح حرفه‌ای',
      price: '۹۸۰,۰۰۰ تومان',
      period: 'ماهانه',
      description: 'مخصوص معماران، طراحان داخلی و فریلنسرهایی که نیاز به خروجی‌های حرفه‌ای دارند.',
      features: [
        'رندرهای نامحدود هوش مصنوعی با کیفیت 4K',
        'دسترسی کامل به قیمت لحظه‌ای بازار متریال',
        'خروجی پیش‌فاکتور رسمی و لیست خرید',
        'اشتراک‌گذاری پروژه با کارفرما',
        'پشتیبانی اختصاصی'
      ],
      popular: true,
      cta: 'خرید اشتراک حرفه‌ای'
    },
    {
      name: 'سازندگان و انبوه‌سازان',
      price: '۲,۹۰۰,۰۰۰ تومان',
      period: 'ماهانه',
      description: 'برای استودیوهای معماری، پروژه‌های چندواحدی و مدیریت همزمان چند پروژه.',
      features: [
        'چندین کاربر همزمان (تا ۵ نفر)',
        'تحلیل پیشرفته اقتصادی و بازگشت سرمایه ملک',
        'مدیریت لجستیک و تامین‌کنندگان عمده',
        'API اختصاصی و خروجی CAD',
        'مدیر حساب اختصاصی'
      ],
      popular: false,
      cta: 'تماس با واحد فروش'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" dir="rtl">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#C86D51] bg-[#C86D51]/10 px-3 py-1.5 rounded-full">
          تعرفه‌ها و اشتراک‌ها
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#2C2A29] font-heading">
          پلن مناسب پروژه خود را انتخاب کنید
        </h1>
        <p className="text-base text-[#6B5B52]">
          از بازسازی یک آپارتمان کوچک تا مدیریت ده‌ها پروژه معماری، آرک‌فلو ابزار دقیق هوش مصنوعی را در اختیار شما می‌گذارد.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl p-8 shadow-sm border flex flex-col justify-between relative transition ${
              plan.popular
                ? 'border-[#C86D51] ring-2 ring-[#C86D51]/20 shadow-xl lg:-translate-y-2'
                : 'border-[#E3A38F]/30'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 start-1/2 -translate-x-1/2 bg-[#C86D51] text-white text-xs px-4 py-1 rounded-full font-bold shadow-md">
                محبوب‌ترین انتخاب طراحان
              </span>
            )}
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#2C2A29] font-heading">{plan.name}</h3>
                <p className="text-xs text-[#6B5B52]">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-2 pt-2 pb-4 border-b border-[#E3A38F]/20">
                <span className="text-3xl sm:text-4xl font-black text-[#2C2A29] font-heading">{plan.price}</span>
                <span className="text-xs text-[#6B5B52]">{plan.period}</span>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm text-[#2C2A29]">
                    <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => {
                  onSelectPersona('sara');
                  onNavigate('dashboard');
                }}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition shadow-sm ${
                  plan.popular
                    ? 'bg-[#C86D51] text-white hover:bg-[#b05b41]'
                    : 'bg-[#E3A38F]/20 text-[#2C2A29] hover:bg-[#E3A38F]/30'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
