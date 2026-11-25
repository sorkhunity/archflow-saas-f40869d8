import React from 'react';
import { Sparkles } from 'lucide-react';
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
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> تعرفه‌های شفاف و انعطاف‌پذیر
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          پلن مناسب با نیازهای طراحی و ساخت خود را انتخاب کنید
        </h1>
        <p className="text-stone-600 text-base sm:text-lg">
          چه یک خانه را بازسازی کنید و چه مدیریت ده‌ها پروژه ساختمانی را بر عهده داشته باشید، ما ابزار مناسب را در اختیارتان می‌گذاریم.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl p-8 flex flex-col justify-between border transition-all duration-200 ${
              plan.popular
                ? 'border-amber-500 shadow-xl ring-2 ring-amber-500/20 scale-105 z-10'
                : 'border-stone-200 shadow-sm hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                محبوب‌ترین انتخاب طراحان
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-stone-900">{plan.name}</h3>
                <p className="text-sm text-stone-500 mt-1">{plan.period}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-stone-900">{plan.price}</span>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed">{plan.description}</p>

              <hr className="border-stone-100" />

              <ul className="space-y-3">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="text-sm text-stone-700 flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-stone-100">
              <button
                onClick={() => {
                  onSelectPersona('sara');
                  onNavigate('dashboard');
                }}
                className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
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
