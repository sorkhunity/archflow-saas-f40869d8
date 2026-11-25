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
        <span className="text-xs font-bold text-amber-700 bg-amber-500/15 px-3 py-1.5 rounded-full border border-amber-500/30">
          تعرفه‌ها و اشتراک‌ها
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-heading">
          پلن مناسب پروژه خود را انتخاب کنید
        </h1>
        <p className="text-base text-white">
          از بازسازی یک آپارتمان کوچک تا مدیریت ده‌ها پروژه معماری، آرک‌فلو ابزار دقیق هوش مصنوعی را در اختیار شما می‌گذارد.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl p-8 shadow-[0_10px_35px_rgba(234,179,8,0.22)] border flex flex-col justify-between relative transition ${
              plan.popular
                ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-[0_15px_45px_rgba(234,179,8,0.3)] lg:-translate-y-2'
                : 'border-amber-500/35'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 start-1/2 -translate-x-1/2 bg-amber-600 text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md">
                پیشنهاد ویژه معماران
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-stone-900 font-heading">{plan.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{plan.period}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-amber-700 font-heading">{plan.price}</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{plan.description}</p>

              <div className="space-y-3 pt-4 border-t border-amber-500/20">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  plan.popular
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/30'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
