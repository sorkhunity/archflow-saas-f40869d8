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
    { name: 'چوب، کفپوش و دیوارپوش', allocated: Math.round(budgetTotal * 0.35), spent: Math.round(spentTotal * 0.4), color: 'bg-[#C86D51]' },
    { name: 'سرامیک، کاشی و سنگ', allocated: Math.round(budgetTotal * 0.25), spent: Math.round(spentTotal * 0.25), color: 'bg-[#E3A38F]' },
    { name: 'شیرآلات، تاسیسات و سرویس', allocated: Math.round(budgetTotal * 0.20), spent: Math.round(spentTotal * 0.20), color: 'bg-[#2C2A29]' },
    { name: 'نورپردازی و دکوراسیون', allocated: Math.round(budgetTotal * 0.20), spent: Math.round(spentTotal * 0.15), color: 'bg-stone-400' },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3A38F]/30 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3A38F]/20">
          <div>
            <h2 className="text-xl font-black text-[#2C2A29] font-heading">تحلیل بودجه و پیش‌فاکتور هوشمند</h2>
            <p className="text-xs text-[#6B5B52] mt-1">مدیریت مالی پروژه «{currentProject?.title || 'پروژه'}» با نظارت هوش مصنوعی آرک‌فلو.</p>
          </div>
          <button
            onClick={() => showToast('پیش‌فاکتور رسمی با فرمت PDF آماده دانلود شد.')}
            className="bg-[#2C2A29] text-white px-5 py-3 rounded-2xl text-xs font-bold hover:bg-stone-800 transition shadow-sm cursor-pointer"
          >
            دانلود پیش‌فاکتور رسمی PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F9F6F0] p-6 rounded-2xl border border-[#E3A38F]/20 space-y-2">
            <span className="text-xs text-[#6B5B52]">کل بودجه تخصیص‌یافته</span>
            <div className="text-2xl font-black text-[#2C2A29] font-heading">
              {(budgetTotal ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">بر اساس برآورد قیمت روز بازار</span>
          </div>

          <div className="bg-[#F9F6F0] p-6 rounded-2xl border border-[#E3A38F]/20 space-y-2">
            <span className="text-xs text-[#6B5B52]">هزینه انجام شده (تعهدات)</span>
            <div className="text-2xl font-black text-[#C86D51] font-heading">
              {(spentTotal ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
            </div>
            <span className="text-[10px] text-amber-600 font-bold">۶۸٪ کل بودجه پروژه</span>
          </div>

          <div className="bg-[#F9F6F0] p-6 rounded-2xl border border-[#E3A38F]/20 space-y-2">
            <span className="text-xs text-[#6B5B52]">باقی‌مانده بودجه</span>
            <div className="text-2xl font-black text-emerald-700 font-heading">
              {(remaining ?? 0).toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">مدیریت بهینه ریسک مالی</span>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-[#2C2A29]">توزیع بودجه بر اساس دسته‌بندی مصالح</h3>
          <div className="space-y-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-[#F9F6F0] p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#2C2A29]">
                  <span>{cat.name}</span>
                  <span>{(cat.allocated ?? 0).toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color}`} style={{ width: `${Math.round((cat.spent / cat.allocated) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
