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
    }, 400);
  };

  const filteredDiscussions = activeFilterTagKey === 'all'
    ? discussions
    : discussions.filter(d => d.tagKeys.includes(activeFilterTagKey));

  return (
    <div className="min-h-dvh bg-[#F9F6F0] py-10 px-4 sm:px-6 lg:px-8 space-y-10" dir="rtl">
      {/* Top Banner / Header */}
      <div className="max-w-7xl mx-auto bg-gradient-to-l from-[#C86D51] to-[#D9836B] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-medium text-white backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> جامعه حرفه‌ای معماری و بازسازی
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">انجمن هم‌اندیشی و تبادل تجربه</h1>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            با هزاران معمار، طراح داخلی و مالکان خانه‌های در حال بازسازی تبادل نظر کنید، تجربیات خرید متریال را بخوانید و پرسش‌های تخصصی بپرسید.
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setNewDiscussionOpen(true)}
            className="px-6 py-3.5 bg-white text-[#C86D51] font-bold rounded-xl shadow-lg hover:bg-[#FDFBF7] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" /> ایجاد موضوع جدید
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="max-w-7xl mx-auto bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 animate-fade-in" role="status">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-medium">{successMessage}</span>
        </div>
      )}

      {/* Filter Tags */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveFilterTagKey('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeFilterTagKey === 'all'
              ? 'bg-[#C86D51] text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          همه موضوعات ({discussions.length})
        </button>
        {discussionTagKeys.map(tagKey => {
          const label = discussionTagLabels[tagKey] || tagKey;
          const count = discussions.filter(d => d.tagKeys.includes(tagKey)).length;
          return (
            <button
              key={tagKey}
              onClick={() => setActiveFilterTagKey(tagKey)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeFilterTagKey === tagKey
                  ? 'bg-[#C86D51] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {label} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Discussions Feed */}
      <div className="max-w-7xl mx-auto space-y-6">
        {filteredDiscussions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-[#C86D51]/10 text-[#C86D51] rounded-2xl flex items-center justify-center mx-auto">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">موضوعی با این برچسب یافت نشد</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              می‌توانید اولین نفری باشید که در این دسته موضوع جدیدی مطرح می‌کنید و از همکاران نظر می‌خواهید.
            </p>
            <button
              onClick={() => setNewDiscussionOpen(true)}
              className="px-6 py-2.5 bg-[#C86D51] text-white font-medium rounded-xl hover:bg-[#B35B40] transition-all cursor-pointer"
            >
              ایجاد پرسش یا بحث جدید
            </button>
          </div>
        ) : (
          filteredDiscussions.map(disc => (
            <div key={disc.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 hover:shadow-md transition-all space-y-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#C86D51]/15 text-[#C86D51] font-bold text-lg flex items-center justify-center shadow-inner">
                    {disc.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-base">{disc.author}</h4>
                    <span className="text-xs text-[#C86D51] font-medium">{disc.role}</span>
                  </div>
                </div>
                <span className="text-xs text-stone-400 font-medium">{disc.time}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 hover:text-[#C86D51] transition-colors cursor-pointer">
                  {disc.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {disc.content}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2 flex-wrap">
                  {disc.tagKeys.map(tk => (
                    <span key={tk} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium">
                      #{discussionTagLabels[tk] || tk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(disc.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-medium transition-all cursor-pointer border border-stone-200"
                  >
                    <ThumbsUp className="w-4 h-4 text-[#C86D51]" />
                    <span>{disc.likes} پسند</span>
                  </button>
                  <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-50 text-stone-700 text-xs font-medium border border-stone-200">
                    <MessageCircle className="w-4 h-4 text-stone-500" />
                    <span>{disc.replies} پاسخ</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Discussion Modal */}
      {newDiscussionOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label="ایجاد موضوع جدید در انجمن">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setNewDiscussionOpen(false)} />
          <div className="min-h-dvh px-4 text-center flex items-center justify-center relative">
            <div ref={modalRef} className="inline-block w-full max-w-2xl bg-white rounded-3xl p-8 text-right shadow-2xl transform transition-all my-8 relative space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">ایجاد موضوع جدید در انجمن</h3>
                </div>
                <button
                  onClick={() => setNewDiscussionOpen(false)}
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="بستن"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitDiscussion} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="discTitle" className="block text-sm font-bold text-stone-800">عنوان موضوع</label>
                  <input
                    ref={firstInputRef}
                    id="discTitle"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثلا: بهترین روش عایق‌کاری صوتی دیوارهای مشترک آپارتمان..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-stone-900 bg-stone-50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="discTag" className="block text-sm font-bold text-stone-800">دسته‌بندی موضوع</label>
                  <select
                    id="discTag"
                    value={selectedTagKey}
                    onChange={(e) => setSelectedTagKey(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-stone-900 bg-stone-50 cursor-pointer"
                  >
                    {discussionTagKeys.map(tk => (
                      <option key={tk} value={tk}>{discussionTagLabels[tk] || tk}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="discContent" className="block text-sm font-bold text-stone-800">متن پرسش یا تجربه</label>
                  <textarea
                    id="discContent"
                    rows={5}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="جزئیات پروژه، سوالات دقیق و انتظارات خود را بنویسید..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-stone-900 bg-stone-50 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setNewDiscussionOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-sm font-medium transition-all cursor-pointer"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#C86D51] text-white rounded-xl text-sm font-bold hover:bg-[#B35B40] transition-all shadow-md cursor-pointer disabled:opacity-60 flex items-center gap-2"
                  >
                    {isSubmitting ? 'در حال انتشار...' : 'انتشار موضوع'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
