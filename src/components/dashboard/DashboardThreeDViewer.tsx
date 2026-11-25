import React from 'react';
import { Sun, Sparkles, Eye, Download, Share2 } from 'lucide-react';

interface DashboardThreeDViewerProps {
  currentZoneImage: string;
  selectedZone: string;
  setSelectedZone: (z: string) => void;
  zoneImages: Record<string, string>;
  lightingMode: 'day' | 'warm' | 'sunset';
  setLightingMode: (m: 'day' | 'warm' | 'sunset') => void;
  layoutItems: Array<{ id: string; name: string; x: number; y: number; category: string; status: string }>;
  setLayoutItems: React.Dispatch<React.SetStateAction<Array<{ id: string; name: string; x: number; y: number; category: string; status: string }>>>;
  isGenerating: boolean;
  showToast: (msg: string) => void;
}

export const DashboardThreeDViewer: React.FC<DashboardThreeDViewerProps> = ({
  currentZoneImage,
  selectedZone,
  setSelectedZone,
  zoneImages,
  lightingMode,
  setLightingMode,
  layoutItems,
  setLayoutItems,
  isGenerating,
  showToast
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" dir="rtl">
      
      {/* Main 3D Canvas / Render Preview */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#E3A38F]/30 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-2 flex-wrap">
              {['نشیمن اصلی', 'آشپزخانه جزیره', 'اتاق خواب مستر', 'سرویس بهداشتی و حمام'].map(zone => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedZone(zone);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51] ${
                    selectedZone === zone
                      ? 'bg-[#C86D51] text-white shadow-md'
                      : 'bg-[#F9F6F0] text-[#594B43] hover:bg-[#E3A38F]/10'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('نمای ۳۶۰ درجه فعال شد.')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showToast('نمای ۳۶۰ درجه فعال شد.');
                  }
                }}
                aria-label="نمای ۳۶۰ درجه"
                className="p-2.5 rounded-xl bg-[#F9F6F0] text-[#594B43] hover:bg-[#E3A38F]/10 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('تصویر رندر با کیفیت 4K دانلود شد.')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showToast('تصویر رندر با کیفیت 4K دانلود شد.');
                  }
                }}
                aria-label="دانلود رندر"
                className="p-2.5 rounded-xl bg-[#F9F6F0] text-[#594B43] hover:bg-[#E3A38F]/10 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas viewport */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 shadow-inner group">
            <img
              src={currentZoneImage}
              alt={selectedZone}
              className={`w-full h-full object-cover transition-all duration-700 ${
                lightingMode === 'warm' ? 'sepia-[0.25] brightness-95' : lightingMode === 'sunset' ? 'hue-rotate-15 brightness-90 saturate-125' : ''
              }`}
            />

            {/* Overlay interactive items */}
            {layoutItems.map(item => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={item.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showToast(`آیتم ${item.name} انتخاب شد.`);
                  }
                }}
                onClick={() => showToast(`آیتم ${item.name} انتخاب شد.`)}
                style={{ top: `${item.y}%`, insetInlineStart: `${item.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/40 flex items-center gap-1.5 cursor-pointer hover:bg-white hover:scale-105 transition"
              >
                <div className="w-2 h-2 rounded-full bg-[#C86D51] animate-pulse" />
                <span className="text-[11px] font-bold text-[#2C2A29]">{item.name}</span>
              </div>
            ))}

            {isGenerating && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-3 z-30">
                <Sparkles className="w-8 h-8 text-[#E3A38F] animate-spin" />
                <span className="text-xs font-bold tracking-wide">هوش مصنوعی آرک‌فلو در حال بازطراحی این زاویه است...</span>
              </div>
            )}

            {/* Lighting controls badge */}
            <div className="absolute bottom-4 start-4 bg-black/60 backdrop-blur-md text-white px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>نورپردازی: {lightingMode === 'day' ? 'روز طبیعی' : lightingMode === 'warm' ? 'گرم آفتابی' : 'غروب طلایی'}</span>
            </div>
          </div>

          {/* Lighting Mode Picker */}
          <div className="flex items-center justify-between pt-2 px-2">
            <span className="text-xs font-bold text-[#6B5B52]">حالت نورپردازی محیط:</span>
            <div className="flex items-center gap-2">
              {(['day', 'warm', 'sunset'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setLightingMode(mode)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightingMode(mode);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51] ${
                    lightingMode === mode
                      ? 'bg-[#2C2A29] text-white'
                      : 'bg-[#F9F6F0] text-[#6B5B52] hover:bg-[#E3A38F]/10'
                  }`}
                >
                  {mode === 'day' ? 'روز' : mode === 'warm' ? 'گرم' : 'غروب'}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Right Sidebar: Objects in zone */}
      <div className="space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E3A38F]/30 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E3A38F]/20">
            <h3 className="text-sm font-black text-[#2C2A29] font-heading">چیدمان و المان‌های {selectedZone}</h3>
            <span className="text-[11px] bg-[#C86D51]/10 text-[#C86D51] px-2.5 py-1 rounded-full font-bold">
              {layoutItems.length} آیتم
            </span>
          </div>

          <div className="space-y-3">
            {layoutItems.map(item => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showToast(`ویرایش المان ${item.name}`);
                  }
                }}
                onClick={() => showToast(`ویرایش المان ${item.name}`)}
                className="p-3.5 rounded-2xl bg-[#F9F6F0] hover:bg-[#E3A38F]/10 border border-[#E3A38F]/25 transition flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
              >
                <div className="space-y-1 text-start">
                  <h4 className="text-xs font-bold text-[#2C2A29]">{item.name}</h4>
                  <span className="text-[10px] text-[#6B5B52]">موقعیت: X:{item.x}% Y:{item.y}%</span>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-lg font-bold ${
                  item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status === 'approved' ? 'تایید شده' : 'در دست بررسی'}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => showToast('المان جدید با موفقیت به صحنه اضافه شد.')}
            className="w-full bg-[#2C2A29] hover:bg-black text-white py-3 rounded-2xl text-xs font-bold shadow-md transition cursor-pointer"
          >
            + افزودن المان جدید به صحنه
          </button>
        </div>
      </div>

    </div>
  );
};
