import React from 'react';
import { Sliders, CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';
import { Project } from '../../types';

interface DashboardBudgetTabProps {
  currentProject: Project;
  showToast: (msg: string) => void;
}

export const DashboardBudgetTab: React.FC<DashboardBudgetTabProps> = ({ currentProject, showToast }) => {
  const rawBudget = currentProject?.budgetIRR ?? currentProject?.budget ?? 850000000;
  const budgetTotal = typeof rawBudget === 'number' && !isNaN(rawBudget) ? rawBudget : 850000000;
  const spentTotal = Math.round(budgetTotal * 0.68);
  const remaining = budgetTotal - spentTotal;

  const categories = [
    { name: 'چوب، کفپوش و دیوارپوش', allocated: Math.round(budgetTotal * 0.35), spent: Math.round(spentTotal * 0.4), color: 'bg-[#D4AF37]' },
    { name: 'سرامیک، کاشی و سنگ', allocated: Math.round(budgetTotal * 0.25), spent: Math.round(spentTotal * 0.25), color: 'bg-[#F3E5AB]' },
    { name: 'شیرآلات، تاسیسات و سرویس', allocated: Math.round(budgetTotal * 0.20), spent: Math.round(spentTotal * 0.20), color: 'bg-[#2C2A29]' },
    { name: 'نورپردازی و دکوراسیون', allocated: Math.round(budgetTotal * 0.20), spent: Math.round(spentTotal * 0.15), color: 'bg-amber-400' },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(212,175,55,0.2)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/25">
          <div>
            <h2 className="text-xl font-black text-[#2C2A29] font-heading">تحلیل بودجه و پیش‌فاکتور هوشمند</h2>
            <p className="text-xs text-stone-600 mt-1">مدیریت مالی پروژه «{currentProject?.title || 'پروژه'}» با نظارت هوش مصنوعی آرک‌فلو.</p>
          </div>
          <button
            onClick={() => showToast('پیش‌فاکتور رسمی با فرمت PDF آماده دانلود شد.')}
            className="bg-[#D4AF37] text-stone-900 px-5 py-3 rounded-2xl text-xs font-bold hover:bg-[#c29d2f] transition shadow-[0_6px_20px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            دانلود پیش‌فاکتور رسمی PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-[0_6px_20px_rgba(212,175,55,0.12)] space-y-2">
            <span className="text-xs text-stone-600 font-medium">کل بودجه تخصیص‌یافته</span>
            <div className="text-2xl font-black text-[#2C2A29] font-heading">
              {(budgetTotal ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal text-stone-500">تومان</span>
            </div>
            <span className="text-[10px] text-[#D4AF37] font-bold">بر اساس برآورد قیمت روز بازار</span>
          </div>

          <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-[0_6px_20px_rgba(212,175,55,0.12)] space-y-2">
            <span className="text-xs text-stone-600 font-medium">هزینه انجام شده (تعهدات)</span>
            <div className="text-2xl font-black text-[#D4AF37] font-heading">
              {(spentTotal ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal text-stone-500">تومان</span>
            </div>
            <span className="text-[10px] text-stone-500 font-medium">۶۸ درصد کل بودجه</span>
          </div>

          <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-[0_6px_20px_rgba(212,175,55,0.12)] space-y-2">
            <span className="text-xs text-stone-600 font-medium">باقیمانده پیش‌بینی‌شده</span>
            <div className="text-2xl font-black text-emerald-700 font-heading">
              {(remaining ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal text-stone-500">تومان</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">انعطاف مناسب برای جزئیات نهایی</span>
          </div>
        </div>

        {/* Categories Progress */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-[#2C2A29] font-heading">توزیع بودجه در دسته‌های مصالح و خدمات</h3>
          <div className="space-y-3">
            {categories.map((cat, idx) => {
              const percent = Math.round((cat.allocated / budgetTotal) * 100);
              return (
                <div key={idx} className="bg-[#FDFBF7] p-4 rounded-xl border border-[#D4AF37]/25 space-y-2 shadow-[0_4px_15px_rgba(212,175,55,0.1)]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2C2A29]">
                    <span>{cat.name}</span>
                    <span className="text-[#D4AF37]">{(cat.allocated).toLocaleString('fa-IR')} تومان ({percent}٪)</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-l from-[#D4AF37] to-[#F3E5AB] h-full rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
