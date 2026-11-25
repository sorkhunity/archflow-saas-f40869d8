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
      <div className="bg-gradient-to-br from-[#2C2A29]/90 to-[#43403D]/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10">
        <div className="absolute end-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#E3A38F_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 bg-[#C86D51]/30 backdrop-blur-md text-[#E3A38F] px-4 py-1.5 rounded-full text-xs font-bold border border-[#C86D51]/40">
            <MessageSquare className="w-4 h-4" />
            انجمن تخصصی معماری و طراحی داخلی آرک‌فلو
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-heading leading-tight">
            پرسش، تبادل نظر و اشتراک تجربه با همکاران و مالکان
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            در این انجمن می‌توانید پیرامون متریال بازار، برآورد بودجه، چالش‌های بازسازی و رندرهای هوش مصنوعی گفتگو کنید.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setNewDiscussionOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-[#C86D51] hover:bg-[#b05b41] text-white font-bold text-sm transition shadow-lg flex items-center gap-2.5 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              طرح پرسش یا ایجاد بحث جدید
            </button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{successMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilterTagKey('all')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer backdrop-blur-md ${
            activeFilterTagKey === 'all'
              ? 'bg-[#C86D51] text-white shadow-md'
              : 'bg-white/70 text-[#6B5B52] border border-[#E3A38F]/30 hover:bg-white/90'
          }`}
        >
          همه موضوعات
        </button>
        {discussionTagKeys.map((tagKey) => (
          <button
            key={tagKey}
            onClick={() => setActiveFilterTagKey(tagKey)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer backdrop-blur-md ${
              activeFilterTagKey === tagKey
                ? 'bg-[#C86D51] text-white shadow-md'
                : 'bg-white/70 text-[#6B5B52] border border-[#E3A38F]/30 hover:bg-white/90'
            }`}
          >
            #{discussionTagLabels[tagKey] || tagKey}
          </button>
        ))}
      </div>

      {/* Discussions List */}
      <DiscussionList
        discussions={filteredDiscussions}
        onSelectPersona={onSelectPersona}
        onLike={handleLike}
      />

      {/* Modal */}
      <DiscussionModal
        isOpen={newDiscussionOpen}
        onClose={() => setNewDiscussionOpen(false)}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        selectedTag={selectedTagKey}
        setSelectedTag={setSelectedTagKey}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
