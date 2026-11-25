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

          <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 group shadow-inner">
            <img
              src={currentZoneImage}
              alt={selectedZone}
              className={`w-full h-full object-cover transition-all duration-700 ${isGenerating ? 'scale-105 blur-sm opacity-60' : 'scale-100 blur-0 opacity-100'} ${
                lightingMode === 'warm' ? 'sepia-[0.25] brightness-95' : lightingMode === 'sunset' ? 'hue-rotate-15 contrast-105' : ''
              }`}
            />
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3 text-white bg-[#C86D51] px-6 py-3 rounded-2xl shadow-xl">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-bold">هوش مصنوعی در حال رندرینگ واقع‌گرایانه فضا...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E3A38F]/30 space-y-6">
          <h3 className="text-base font-black text-[#2C2A29] font-heading">تنظیمات نور و فضای رندر</h3>
          
          <div className="space-y-3">
            <span className="text-xs text-[#6B5B52] font-bold">حالت نورپردازی</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'day', label: 'روشن روز', icon: Sun },
                { id: 'warm', label: 'آفتابی گرم', icon: Sparkles },
                { id: 'sunset', label: 'غروب', icon: Eye }
              ].map(mode => {
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setLightingMode(mode.id as any)}
                    className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-2 transition ${
                      lightingMode === mode.id
                        ? 'bg-[#C86D51] text-white shadow-md'
                        : 'bg-[#F9F6F0] text-[#6B5B52] hover:bg-[#E3A38F]/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
