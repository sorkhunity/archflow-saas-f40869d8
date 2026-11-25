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
    setDiscussions(prev => prev.map(d => d.id === id ? { ...d, likes: d.likes + 1 } : d));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const newD = {
        id: Date.now().toString(),
        author: 'شما (کاربر فعال)',
        avatar: 'ش',
        role: 'طراح داخلی',
        title: title.trim(),
        tagKeys: [selectedTagKey],
        replies: 0,
        likes: 1,
        time: 'همین الان'
      };
      setDiscussions([newD, ...discussions]);
      setIsSubmitting(false);
      setNewDiscussionOpen(false);
      setTitle('');
      setContent('');
      setSuccessMessage('بحث جدید با موفقیت منتشر شد.');
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 600);
  };

  const filteredDiscussions = activeFilterTagKey === 'all'
    ? discussions
    : discussions.filter(d => d.tagKeys.includes(activeFilterTagKey));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#2C2A29] to-[#43403D] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute end-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#E3A38F_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C86D51]/20 text-[#E3A38F] text-xs font-bold border border-[#C86D51]/30">
            <MessageSquare className="w-3.5 h-3.5" />
            جامعه تخصصی معماری و بازسازی
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight">
            تبادل تجربه، پرسش و پاسخ با صدها معمار و سازنده
          </h1>
          <p className="text-[#E8E6DF] text-sm sm:text-base leading-relaxed">
            پرسش‌های فنی خود را مطرح کنید، تجربیات اجرایی دیگران را بخوانید و در پروژه‌های خود از خرد جمعی متخصصان بهره‌مند شوید.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => setNewDiscussionOpen(true)}
              className="bg-[#C86D51] hover:bg-[#b05a41] text-white px-6 py-3 rounded-2xl font-bold transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>ارسال پرسش یا موضوع جدید</span>
            </button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="bg-[#EAF3DE] border border-[#276F86]/30 text-[#1B4332] p-4 rounded-2xl flex items-center gap-3 animate-fade-in shadow-sm">
          <CheckCircle className="w-5 h-5 text-[#276F86]" />
          <span className="text-sm font-bold">{successMessage}</span>
        </div>
      )}

      {/* Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveFilterTagKey('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeFilterTagKey === 'all'
              ? 'bg-[#2C2A29] text-white shadow-sm'
              : 'bg-white text-[#6B5B52] border border-[#E3A38F]/30 hover:border-[#C86D51]'
          }`}
        >
          همه موضوعات
        </button>
        {discussionTagKeys.map(tagKey => (
          <button
            key={tagKey}
            onClick={() => setActiveFilterTagKey(tagKey)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeFilterTagKey === tagKey
                ? 'bg-[#2C2A29] text-white shadow-sm'
                : 'bg-white text-[#6B5B52] border border-[#E3A38F]/30 hover:border-[#C86D51]'
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E3A38F]/30 space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#E3A38F]/30 pb-4">
              <h3 className="text-lg font-black text-[#2C2A29] flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#C86D51]" />
                <span>ایجاد موضوع یا پرسش جدید</span>
              </h3>
              <button
                onClick={() => !isSubmitting && setNewDiscussionOpen(false)}
                className="text-[#6B5B52] hover:text-[#2C2A29] text-sm font-bold cursor-pointer"
              >
                ✕ بستن
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="discussion-title" className="block text-xs font-bold text-[#2C2A29]">
                  عنوان پرسش یا موضوع <span className="text-[#C86D51]">*</span>
                </label>
                <input
                  id="discussion-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: بهترین برند شیرآلات توکار با ضمانت واقعی کدام است؟"
                  className="w-full px-4 py-3 bg-white rounded-2xl border border-[#E3A38F]/40 text-[#2C2A29] text-sm focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="discussion-tag" className="block text-xs font-bold text-[#2C2A29]">
                  دسته‌بندی اصلی
                </label>
                <select
                  id="discussion-tag"
                  value={selectedTagKey}
                  onChange={(e) => setSelectedTagKey(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-2xl border border-[#E3A38F]/40 text-[#2C2A29] text-sm focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
                >
                  {discussionTagKeys.map(tagKey => (
                    <option key={tagKey} value={tagKey}>
                      {discussionTagLabels[tagKey]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="discussion-content" className="block text-xs font-bold text-[#2C2A29]">
                  شرح کامل موضوع یا جزئیات پروژه
                </label>
                <textarea
                  id="discussion-content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="جزئیات متراژ، بودجه یا چالش اجرایی خود را بنویسید..."
                  className="w-full px-4 py-3 bg-white rounded-2xl border border-[#E3A38F]/40 text-[#2C2A29] text-sm focus:outline-none focus:ring-2 focus:ring-[#C86D51] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E3A38F]/20">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setNewDiscussionOpen(false)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-[#6B5B52] hover:bg-[#E3A38F]/10 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#C86D51] hover:bg-[#b05a41] disabled:opacity-50 text-white px-6 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال ارسال...</span>
                    </>
                  ) : (
                    <span>انتشار موضوع</span>
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
