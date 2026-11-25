import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> تعرفه‌های شفاف و هوشمند
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          انتخابی متناسب با مقیاس پروژه شما
        </h1>
        <p className="text-stone-600 text-base sm:text-lg">
          چه یک فضای کوچک را بازسازی کنید و چه سازنده ده‌ها واحد مسکونی باشید، آرک‌فلو پلن مناسب شما را دارد.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? 'bg-stone-900 text-white shadow-2xl ring-2 ring-amber-500 scale-105'
                : 'bg-white text-stone-900 border border-stone-200 shadow-sm hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 start-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 px-4 py-1 rounded-full text-xs font-bold shadow">
                پرفروش‌ترین پلن
              </div>
            )}
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-stone-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-2 ${plan.popular ? 'text-stone-300' : 'text-stone-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">{plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>{plan.period}</span>
              </div>

              <hr className={`border-t ${plan.popular ? 'border-stone-800' : 'border-stone-100'}`} />

              <ul className="space-y-3">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span className={plan.popular ? 'text-stone-200' : 'text-stone-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  plan.popular
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-start">
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700" /> ضمانت بازگشت وجه ۷ روزه
          </h3>
          <p className="text-sm text-stone-600">
            اگر از خروجی‌های هوش مصنوعی و امکانات پلتفرم رضایت نداشتید، تمام مبلغ پرداختی عودت داده می‌شود.
          </p>
        </div>
        <button
          onClick={() => onNavigate('profiling')}
          className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-3 rounded-xl text-sm shrink-0 transition"
        >
          شروع آزمون شخصیت معماری
        </button>
      </div>
    </div>
  );
};
