import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface DashboardAiTabProps {
  currentProject: Project;
  showToast: (msg: string) => void;
}

export const DashboardAiTab: React.FC<DashboardAiTabProps> = ({ currentProject, showToast }) => {
  return (
    <div className="space-y-8" dir="rtl">
      <div className="bg-gradient-to-br from-[#2C2A29] to-[#433F3E] text-white p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#C86D51] text-white flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-heading">دستیار هوشمند معماری آرک‌فلو (ArchFlow AI v4.2)</h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">توصیه‌های اختصاصی بر اساس سبک «{currentProject.styleKey}» و اقلیم منطقه.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 space-y-3">
            <h3 className="font-bold text-sm text-[#E3A38F] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>بهینه‌سازی نور طبیعی (Natural Lighting)</span>
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed">
              با توجه به جهت تابش آفتاب در واحد شما، پیشنهاد می‌شود پرده‌های دو لایه حریر و کتان ضخیم در نشیمن نصب شود تا در ساعات پیک تابستان از ورود گرمای بیش از حد جلوگیری گردد.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 space-y-3">
            <h3 className="font-bold text-sm text-[#E3A38F] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>ترکیب رنگ و متریال پایدار (Eco-Materials)</span>
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed">
              استفاده از چوب بلوط روسی با روغن طبیعی گیاهی به جای رنگ‌های صنعتی شیمیایی، ماندگاری فضا را بالا برده و بوی نامطبوع رزین را حذف می‌کند. امتیاز پایداری این ترکیب ۹۲ از ۱۰۰ است.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => showToast('گزارش جامع مشاوره هوش مصنوعی برای پروژه شما ارسال شد.')}
            className="bg-[#C86D51] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#b05b41] transition shadow-lg"
          >
            درخواست تحلیل تکمیلی پلان و دکوراسیون
          </button>
        </div>
      </div>
    </div>
  );
};
