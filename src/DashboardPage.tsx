import React, { useState } from 'react';
import { Sparkles, Layers, Sliders, Box, ShieldCheck, ArrowRight, CheckCircle2, RefreshCw, Eye, Download, Share2, Star, Sun, Compass, SlidersHorizontal, Flame, Home } from 'lucide-react';
import { Project, MaterialItem, Persona } from './types';
import { materialCategoryLabels, styleLabels } from './data/mockData';
import { DashboardThreeDViewer } from './components/dashboard/DashboardThreeDViewer';
import { DashboardMaterialsTab } from './components/dashboard/DashboardMaterialsTab';
import { DashboardBudgetTab } from './components/dashboard/DashboardBudgetTab';
import { DashboardAiTab } from './components/dashboard/DashboardAiTab';

interface DashboardPageProps {
  currentProject: Project;
  selectedPersona: Persona;
  onSelectPersona: (p: Persona) => void;
  onAddToCart: (item: MaterialItem) => void;
  onNavigate: (tab: string) => void;
  showToast: (msg: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentProject,
  selectedPersona,
  onSelectPersona,
  onAddToCart,
  onNavigate,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'materials' | 'budget' | 'ai'>('3d');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lightingMode, setLightingMode] = useState<'day' | 'warm' | 'sunset'>('day');
  const [selectedZone, setSelectedZone] = useState<string>('نشیمن اصلی');
  const [layoutItems, setLayoutItems] = useState([
    { id: '1', name: 'مبل ال مدرن بلوطی', x: 25, y: 35, category: 'wood', status: 'approved' },
    { id: '2', name: 'میز جلو مبلی سنگ مرمر', x: 50, y: 55, category: 'stone', status: 'pending' },
    { id: '3', name: 'فرش دستباف طرح مینیمال', x: 45, y: 40, category: 'wood', status: 'approved' },
    { id: '4', name: 'پنل چوبی آکوستیک دیوار پشت تی‌وی', x: 80, y: 20, category: 'wood', status: 'in_progress' },
  ]);

  const handleRegenerateAi = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('طرح و تحلیل هوش مصنوعی با موفقیت بروزرسانی شد.');
    }, 1500);
  };

  const budgetVal = (currentProject && typeof currentProject.budgetIRR === 'number') 
    ? currentProject.budgetIRR 
    : (currentProject && typeof currentProject.budget === 'number') 
      ? currentProject.budget 
      : 750000000;
  
  const budgetFormatted = typeof budgetVal === 'number' && !isNaN(budgetVal) 
    ? (budgetVal ?? 0).toLocaleString('fa-IR') 
    : '۷۵۰,۰۰۰,۰۰۰';

  const styleKey = currentProject?.styleKey;
  const styleLabel = (styleKey && styleLabels && styleLabels[styleKey]) 
    ? styleLabels[styleKey] 
    : 'مدرن و مینیمال گرم';

  const defaultRoomImage = '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg';
  const zoneImages: Record<string, string> = {
    'نشیمن اصلی': currentProject?.image || defaultRoomImage,
    'آشپزخانه جزیره': '/__l5e/assets-v1/223c68d9-64db-4c3c-a572-34b853d2ec54/prototype-commerce.jpg',
    'اتاق خواب مستر': '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg',
    'سرویس بهداشتی و حمام': '/__l5e/assets-v1/73aaeffc-03f6-4dd8-b652-a097efe0b551/prototype-healthcare.jpg'
  };

  const currentZoneImage = zoneImages[selectedZone] || currentProject?.image || defaultRoomImage;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" dir="rtl">
      
      {/* Top Banner & Persona Quick info */}
      <div className="bg-gradient-to-r from-[#2C2A29] to-[#433F3E] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#C86D51]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C86D51]/30 text-[#E3A38F] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>داشبورد هوش مصنوعی آرک‌فلو</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {currentProject?.title || 'پروژه بازسازی واحد مسکونی فرمانیه'}
          </h1>
          <p className="text-stone-300 text-sm max-w-2xl">
            سبک انتخابی: <strong className="text-white">{styleLabel}</strong> • بودجه مصوب: <strong className="text-white">{budgetFormatted} تومان</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 w-full md:w-auto justify-end">
          <button
            onClick={handleRegenerateAi}
            disabled={isGenerating}
            className="px-5 py-3 rounded-2xl bg-[#C86D51] hover:bg-[#b05b41] text-white font-medium text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#E3A38F]"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'در حال بازسازی رندر...' : 'رندر مجدد هوش مصنوعی'}</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
        {[
          { id: '3d', label: 'شبیه‌ساز سه‌بعدی و چیدمان', icon: Box },
          { id: 'materials', label: 'کاتالوگ متریال و برآورد', icon: Layers },
          { id: 'budget', label: 'تحلیل بودجه و پیش‌فاکتور', icon: Sliders },
          { id: 'ai', label: 'پیشنهادات هوشمند طراح', icon: Sparkles },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-5 py-3.5 border-b-2 font-medium text-sm transition-all whitespace-nowrap cursor-pointer focus:outline-none ${
                isActive 
                  ? 'border-[#C86D51] text-[#C86D51] bg-[#C86D51]/5 rounded-t-xl' 
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === '3d' && (
          <DashboardThreeDViewer
            currentZoneImage={currentZoneImage}
            selectedZone={selectedZone}
            setSelectedZone={setSelectedZone}
            zoneImages={zoneImages}
            lightingMode={lightingMode}
            setLightingMode={setLightingMode}
            layoutItems={layoutItems}
            setLayoutItems={setLayoutItems}
            isGenerating={isGenerating}
            showToast={showToast}
          />
        )}

        {activeTab === 'materials' && (
          <DashboardMaterialsTab
            onAddToCart={onAddToCart}
            showToast={showToast}
          />
        )}

        {activeTab === 'budget' && (
          <DashboardBudgetTab
            currentProject={currentProject}
            showToast={showToast}
          />
        )}

        {activeTab === 'ai' && (
          <DashboardAiTab
            currentProject={currentProject}
            showToast={showToast}
            onNavigate={onNavigate}
          />
        )}
      </div>

    </div>
  );
};
