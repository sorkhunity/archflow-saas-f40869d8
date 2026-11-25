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
      setNewDiscussionOpen(false);
      setTitle('');
      setContent('');
      setSuccessMessage('بحث جدید با موفقیت منتشر شد.');
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 400);
  };

  const filteredDiscussions = activeFilterTagKey === 'all'
    ? discussions
    : discussions.filter(d => d.tagKeys.includes(activeFilterTagKey));

  return (
    <div className="min-h-dvh bg-stone-50 pb-16 pt-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 shadow-sm animate-fade-in" role="status" aria-live="polite">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-medium text-sm">{successMessage}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-xs border border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              جامعه حرفه‌ای طراحان و مجریان
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">انجمن تبادل نظر و تجربیات</h1>
            <p className="text-sm text-stone-600 mt-1">سوالات فنی بپرسید، نمونه کارهای خود را به اشتراک بگذارید و از تجربیات همکاران صنف استفاده کنید.</p>
          </div>
          <button
            onClick={() => setNewDiscussionOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            ارسال بحث جدید
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setActiveFilterTagKey('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilterTagKey === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            همه موضوعات ({discussions.length})
          </button>
          {discussionTagKeys.map(tagKey => {
            const count = discussions.filter(d => d.tagKeys.includes(tagKey)).length;
            return (
              <button
                key={tagKey}
                onClick={() => setActiveFilterTagKey(tagKey)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilterTagKey === tagKey
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{discussionTagLabels[tagKey] || tagKey}</span>
                {count > 0 && <span className="opacity-80 text-[10px]">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-xs">
              <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800">موضوعی با این تگ یافت نشد</h3>
              <p className="text-xs text-stone-500 mt-1">اولین نف باشید که در این دسته بندی بحث ایجاد می‌کند.</p>
              <button
                onClick={() => { setSelectedTagKey(activeFilterTagKey === 'all' ? 'material' : activeFilterTagKey); setNewDiscussionOpen(true); }}
                className="mt-4 px-4 py-2 bg-amber-600 text-white text-xs font-medium rounded-xl hover:bg-amber-700 transition-colors inline-block"
              >
                ایجاد بحث جدید در این موضوع
              </button>
            </div>
          ) : (
            filteredDiscussions.map(disc => (
              <div key={disc.id} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-amber-300 transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm shadow-xs">
                      {disc.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{disc.author}</h4>
                      <p className="text-xs text-stone-500">{disc.role} • {disc.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {disc.tagKeys.map(tKey => (
                      <span key={tKey} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-[11px] font-medium">
                        {discussionTagLabels[tKey] || tKey}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-base font-bold text-stone-900 mb-2 hover:text-amber-600 transition-colors cursor-pointer">
                  {disc.title}
                </h3>
                <p className="text-sm text-stone-600 mb-4 leading-relaxed line-clamp-2">
                  {disc.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-500">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(disc.id)}
                      className="flex items-center gap-1.5 hover:text-amber-600 transition-colors cursor-pointer group p-1"
                    >
                      <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{disc.likes} پسند</span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-stone-400" />
                      <span>{disc.replies} پاسخ</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('community-detail');
                    }}
                    className="text-amber-600 hover:text-amber-700 font-semibold cursor-pointer"
                  >
                    مشاهده جزئیات و گفتگو ←
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for New Discussion */}
        {newDiscussionOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in" role="dialog" aria-modal="true" aria-label="ارسال بحث جدید">
            <div 
              ref={modalRef}
              className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border border-stone-200 animate-scale-up"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-stone-900">ایجاد موضوع جدید در انجمن</h3>
                </div>
                <button
                  onClick={() => setNewDiscussionOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
                  aria-label="بستن"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitDiscussion} className="p-6 space-y-4">
                <div>
                  <label htmlFor="discussion-title" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    عنوان سوال یا موضوع <span className="text-rose-500">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="discussion-title"
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="مثلا: بهترین متریال ضد آب برای کابینت روشویی کدام است؟"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="discussion-tag" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    موضوع اصلی
                  </label>
                  <select
                    id="discussion-tag"
                    value={selectedTagKey}
                    onChange={e => setSelectedTagKey(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 bg-white"
                  >
                    {discussionTagKeys.map(tk => (
                      <option key={tk} value={tk}>{discussionTagLabels[tk]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="discussion-content" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    متن مشروح <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="discussion-content"
                    required
                    rows={5}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="جزئیات پروژه، ابهامات یا تجربه خود را به طور کامل بنویسید..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setNewDiscussionOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-sm font-medium transition-colors cursor-pointer"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !content.trim()}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {isSubmitting ? 'در حال ارسال...' : 'انتشار موضوع'}
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
