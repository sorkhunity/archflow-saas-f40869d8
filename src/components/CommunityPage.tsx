import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, PlusCircle, CheckCircle, Sparkles, X, ThumbsUp, MessageCircle } from 'lucide-react';
import { Persona } from '../types';
import { discussionTagLabels, discussionTagKeys } from '../data/mockData';

interface CommunityPageProps {
  onNavigate: (tab: string) => void;
  onSelectPersona: (p: Persona) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate, onSelectPersona }) => {
  const [newDiscussionOpen, setNewDiscussionOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTagKey, setSelectedTagKey] = useState<string>('material');
  const [activeFilterTagKey, setActiveFilterTagKey] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [discussions, setDiscussions] = useState([
    {
      id: '1',
      author: 'مهندس سهرابی',
      avatar: 'س',
      role: 'معمار ارشد',
      title: 'بهترین ترکیب متریال برای کفپوش واحدهای مسکونی با بودجه متوسط چیست؟',
      content: 'ما در حال طراحی یک پروژه مسکونی ۱۲ واحدی هستیم و کارفرما روی قیمت تمام شده حساس است...',
      tagKeys: ['material', 'flooring', 'budget'],
      replies: 24,
      likes: 56,
      time: '۲ ساعت پیش'
    },
    {
      id: '2',
      author: 'یلدا کریمی',
      avatar: 'ی',
      role: 'مالک و بازسازی‌کننده',
      title: 'تجربه من از استفاده از هوش مصنوعی آرک‌فلو برای انتخاب رنگ کابینت',
      content: 'سلام دوستان، من با ابزار هوش مصنوعی تونستم پالت رنگی آشپزخونه رو به راحتی نهایی کنم...',
      tagKeys: ['ux', 'color', 'kitchen'],
      replies: 12,
      likes: 38,
      time: '۵ ساعت پیش'
    },
    {
      id: '3',
      author: 'کوروش راد',
      avatar: 'ک',
      role: 'پیمانکار ساختمان',
      title: 'نکات کلیدی در تنظیم پیش‌فاکتور مصالح و کنترل هزینه‌های پنهان',
      content: 'در قراردادهای جدید بازسازی، نوسانات قیمت مصالح چالش‌برانگیز شده است...',
      tagKeys: ['invoice', 'budget', 'sales'],
      replies: 19,
      likes: 45,
      time: 'دیروز'
    }
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && newDiscussionOpen) {
        setNewDiscussionOpen(false);
      }
    };
    if (newDiscussionOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [newDiscussionOpen]);

  const handleLike = (id: string) => {
    setDiscussions(prev => prev.map(d => d.id === id ? { ...d, likes: d.likes + 1 } : d));
  };

  const handleSubmitDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newDisc = {
        id: Date.now().toString(),
        author: 'کاربر همکار',
        avatar: 'ک',
        role: 'طراح داخلی',
        title: title.trim(),
        content: content.trim(),
        tagKeys: [selectedTagKey],
        replies: 0,
        likes: 1,
        time: 'همین الان'
      };
      setDiscussions([newDisc, ...discussions]);
      setIsSubmitting(false);
      setTitle('');
      setContent('');
      setSelectedTagKey('material');
      setNewDiscussionOpen(false);
      setSuccessMessage('بحث جدید با موفقیت ثبت شد و در انجمن منتشر گردید.');
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 600);
  };

  const filteredDiscussions = activeFilterTagKey === 'all'
    ? discussions
    : discussions.filter(d => d.tagKeys.includes(activeFilterTagKey));

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Success toast */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-sm animate-fade-in" role="status">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Hero banner */}
        <div className="bg-gradient-to-br from-[#2D241E] to-[#45372F] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E3A38F_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 space-y-3 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C86D51]/30 text-[#E3A38F] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              انجمن تخصصی معماران و سازندگان
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">هم‌اندیشی و تبادل تجربه آرک‌فلو</h1>
            <p className="text-[#D3C7BC] text-sm sm:text-base max-w-xl">
              پرسش‌های فنی خود را مطرح کنید، با سایر معماران و پیمانکاران گفتگو کنید و از تجارب اجرای پروژه‌های واقعی بهره‌مند شوید.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <button
              onClick={() => setNewDiscussionOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-[#C86D51] text-white font-medium hover:bg-[#b05a41] transition shadow-lg flex items-center gap-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
            >
              <PlusCircle className="w-5 h-5" />
              <span>ایجاد بحث جدید</span>
            </button>
          </div>
        </div>

        {/* Filter tags bar using ASCII snake_case keys */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveFilterTagKey('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51] ${
              activeFilterTagKey === 'all'
                ? 'bg-[#2D241E] text-white shadow'
                : 'bg-white text-[#594B43] border border-[#E3A38F]/30 hover:bg-[#E3A38F]/10'
            }`}
          >
            همه موضوعات
          </button>
          {discussionTagKeys.map(key => {
            const label = discussionTagLabels[key] || key;
            const isActive = activeFilterTagKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveFilterTagKey(key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51] ${
                  isActive
                    ? 'bg-[#2D241E] text-white shadow'
                    : 'bg-white text-[#594B43] border border-[#E3A38F]/30 hover:bg-[#E3A38F]/10'
                }`}
              >
                #{label}
              </button>
            );
          })}
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E3A38F]/30 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#2D241E]">موضوعی با این برچسب یافت نشد</h3>
              <p className="text-sm text-[#736357] max-w-md mx-auto">
                می‌توانید اولین نفری باشید که در این زمینه بحث جدیدی ایجاد می‌کند.
              </p>
              <button
                onClick={() => setNewDiscussionOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#C86D51] text-white text-sm font-medium hover:bg-[#b05a41] transition cursor-pointer"
              >
                شروع بحث جدید
              </button>
            </div>
          ) : (
            filteredDiscussions.map(disc => (
              <div 
                key={disc.id}
                className="bg-white rounded-3xl p-6 border border-[#E3A38F]/30 shadow-sm hover:shadow-md transition space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#C86D51]/15 text-[#C86D51] font-bold flex items-center justify-center">
                      {disc.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2D241E] text-sm sm:text-base">{disc.author}</h4>
                      <p className="text-xs text-[#736357]">{disc.role} • {disc.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {disc.tagKeys.map(k => (
                      <span key={k} className="px-2.5 py-1 rounded-lg bg-[#F9F6F0] text-[#736357] text-xs font-medium border border-[#E3A38F]/20">
                        #{discussionTagLabels[k] || k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-start">
                  <h3 className="text-base sm:text-lg font-bold text-[#2D241E]">{disc.title}</h3>
                  <p className="text-sm text-[#594B43] line-clamp-2">{disc.content}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E3A38F]/25">
                  <div className="flex items-center gap-4 text-xs text-[#736357]">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-[#C86D51]" />
                      {disc.replies} پاسخ
                    </span>
                    <button
                      onClick={() => handleLike(disc.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleLike(disc.id);
                        }
                      }}
                      className="flex items-center gap-1 hover:text-[#C86D51] transition cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                      role="button"
                      tabIndex={0}
                      aria-label="پسندیدن بحث"
                    >
                      <ThumbsUp className="w-4 h-4 text-[#C86D51]" />
                      <span>{disc.likes} پسند</span>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('community-detail');
                    }}
                    className="text-xs font-semibold text-[#C86D51] hover:underline cursor-pointer"
                  >
                    مشاهده گفتگو و نظرات ←
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for New Discussion */}
        {newDiscussionOpen && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="ایجاد بحث جدید در انجمن"
            onClick={() => setNewDiscussionOpen(false)}
          >
            <div 
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3A38F]/30 space-y-6 animate-scale-in relative text-start"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2D241E]">ایجاد بحث جدید</h3>
                    <p className="text-xs text-[#736357]">پرسش یا تجربه خود را با جامعه معماران به اشتراک بگذارید</p>
                  </div>
                </div>
                <button
                  onClick={() => setNewDiscussionOpen(false)}
                  aria-label="بستن پنجره"
                  className="p-2 rounded-xl text-[#736357] hover:bg-[#F9F6F0] transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitDiscussion} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="discussion-title" className="block text-xs font-semibold text-[#594B43]">
                    عنوان پرسش یا موضوع <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="discussion-title"
                    type="text"
                    required
                    maxLength={120}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: بهترین روش عایق‌کاری رطوبتی سرویس بهداشتی در طبقات..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E3A38F]/50 bg-[#FDFBF7] text-sm text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
                  />
                  <div className="text-end text-[11px] text-[#736357]">{title.length}/120 کاراکتر</div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="discussion-tag" className="block text-xs font-semibold text-[#594B43]">
                    برچسب موضوع <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="discussion-tag"
                    value={selectedTagKey}
                    onChange={(e) => setSelectedTagKey(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E3A38F]/50 bg-[#FDFBF7] text-sm text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
                  >
                    {discussionTagKeys.map(k => (
                      <option key={k} value={k}>
                        {discussionTagLabels[k] || k}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="discussion-content" className="block text-xs font-semibold text-[#594B43]">
                    متن مشروح گفتگو <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="discussion-content"
                    required
                    rows={4}
                    maxLength={600}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="جزئیات پروژه، شرایط محیطی یا سوال دقیق خود را بنویسید..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E3A38F]/50 bg-[#FDFBF7] text-sm text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#C86D51] resize-none"
                  />
                  <div className="text-end text-[11px] text-[#736357]">{content.length}/600 کاراکتر</div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E3A38F]/20">
                  <button
                    type="button"
                    onClick={() => setNewDiscussionOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#E3A38F]/50 text-sm font-medium text-[#594B43] hover:bg-[#F9F6F0] transition cursor-pointer"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#C86D51] text-white text-sm font-medium hover:bg-[#b05a41] transition shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting ? 'در حال انتشار...' : 'انتشار بحث'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
