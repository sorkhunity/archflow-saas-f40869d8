import React, { useState } from 'react';
import { MessageSquare, PlusCircle, CheckCircle, Sparkles } from 'lucide-react';
import { Persona } from '../types';
import { discussionTagLabels, discussionTagKeys } from '../data/mockData';
import { DiscussionList } from './community/DiscussionList';
import { DiscussionModal } from './community/DiscussionModal';

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

  const [discussions, setDiscussions] = useState([
    {
      id: '1',
      author: 'مهندس سهرابی',
      avatar: 'س',
      role: 'معمار ارشد',
      title: 'بهترین ترکیب متریال برای کفپوش واحدهای مسکونی با بودجه متوسط چیست؟',
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
      tagKeys: ['invoice', 'budget', 'sales'],
      replies: 19,
      likes: 45,
      time: 'دیروز'
    }
  ]);

  const handleLike = (id: string) => {
    setDiscussions(prev =>
      prev.map(d => (d.id === id ? { ...d, likes: d.likes + 1 } : d))
    );
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newDisc = {
        id: String(Date.now()),
        author: 'کاربر گرامی',
        avatar: 'ک',
        role: 'عضو انجمن',
        title: title.trim(),
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
      setSuccessMessage('بحث جدید با موفقیت در انجمن منتشر شد.');
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 600);
  };

  const filteredDiscussions = activeFilterTagKey === 'all'
    ? discussions
    : discussions.filter(d => d.tagKeys.includes(activeFilterTagKey));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" dir="rtl">
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#2C2A29] to-[#4A4543] text-[#FDFBF7] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#C86D51]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 max-w-2xl relative z-10 text-start">
          <div className="inline-flex items-center gap-2 bg-[#C86D51]/30 text-[#E3A38F] px-3.5 py-1.5 rounded-full text-xs font-bold">
            <MessageSquare className="w-4 h-4" />
            <span>جامعه و تبادل نظر معماران</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-heading">
            انجمن تخصصی طراحی و ساخت آرک‌فلو
          </h1>
          <p className="text-sm md:text-base text-[#FDFBF7]/80 leading-relaxed font-sans">
            تجربیات اجرایی خود را به اشتراک بگذارید، از همکاران مشاوره بگیرید و پاسخ چالش‌های معماری و متریال خود را بیابید.
          </p>
        </div>
        <button
          onClick={() => setNewDiscussionOpen(true)}
          className="relative z-10 bg-[#C86D51] hover:bg-[#b05b41] text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2.5 transition shadow-lg shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          <span>شروع بحث جدید</span>
        </button>
      </div>

      {/* Filter Tags Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveFilterTagKey('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeFilterTagKey === 'all'
              ? 'bg-[#2C2A29] text-white shadow-md'
              : 'bg-white text-[#6B5B52] border border-[#E3A38F]/30 hover:bg-[#F9F6F0]'
          }`}
        >
          همه موضوعات
        </button>
        {discussionTagKeys.map(tagKey => (
          <button
            key={tagKey}
            onClick={() => setActiveFilterTagKey(tagKey)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeFilterTagKey === tagKey
                ? 'bg-[#2C2A29] text-white shadow-md'
                : 'bg-white text-[#6B5B52] border border-[#E3A38F]/30 hover:bg-[#F9F6F0]'
            }`}
          >
            #{discussionTagLabels[tagKey] || tagKey}
          </button>
        ))}
      </div>

      {/* Discussions Feed */}
      <DiscussionList 
        discussions={filteredDiscussions} 
        onSelectPersona={onSelectPersona} 
        onLike={handleLike} 
      />

      {/* New Discussion Modal */}
      {newDiscussionOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="شروع بحث جدید"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-6 text-start relative animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#E3A38F]/20 pb-4">
              <h3 className="text-xl font-black text-[#2C2A29] font-heading">شروع بحث جدید در انجمن</h3>
              <button 
                onClick={() => setNewDiscussionOpen(false)}
                className="text-[#6B5B52] hover:text-[#2C2A29] p-1.5 rounded-xl hover:bg-[#F9F6F0]"
                aria-label="بستن"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDiscussion} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="discussion-title" className="block text-xs font-bold text-[#2C2A29]">
                  عنوان بحث / سوال <span className="text-[#C86D51]">*</span>
                </label>
                <input
                  id="discussion-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: چه نوع رنگی برای کابینت آشپزخانه شمالی بهتر است؟"
                  className="w-full px-4 py-3 rounded-xl border border-[#E3A38F]/40 bg-[#F9F6F0]/50 text-[#2C2A29] text-sm focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="discussion-tag" className="block text-xs font-bold text-[#2C2A29]">
                  موضوع اصلی (برچسب)
                </label>
                <select
                  id="discussion-tag"
                  value={selectedTagKey}
                  onChange={(e) => setSelectedTagKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E3A38F]/40 bg-[#F9F6F0]/50 text-[#2C2A29] text-sm focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
                >
                  {discussionTagKeys.map(tagKey => (
                    <option key={tagKey} value={tagKey}>
                      #{discussionTagLabels[tagKey] || tagKey}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="discussion-content" className="block text-xs font-bold text-[#2C2A29]">
                  توضیحات و جزئیات بیشتر
                </label>
                <textarea
                  id="discussion-content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="جزئیات پروژه، شرایط محیطی یا بودجه مورد نظر خود را بنویسید..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E3A38F]/40 bg-[#F9F6F0]/50 text-[#2C2A29] text-sm focus:outline-none focus:ring-2 focus:ring-[#C86D51] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E3A38F]/20">
                <button
                  type="button"
                  onClick={() => setNewDiscussionOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E3A38F]/40 text-[#2C2A29] text-sm font-bold hover:bg-[#F9F6F0] transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#b05b41] text-white text-sm font-bold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>در حال ارسال...</span>
                    </>
                  ) : (
                    <span>انتشار بحث</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
