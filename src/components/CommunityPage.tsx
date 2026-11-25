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
    setDiscussions(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, likes: d.likes + 1 };
      }
      return d;
    }));
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newDisc = {
        id: String(Date.now()),
        author: 'متین (شما)',
        avatar: 'م',
        role: 'کاربر آرک‌فلو',
        title: title.trim(),
        tagKeys: [selectedTagKey],
        replies: 0,
        likes: 1,
        time: 'همین الان'
      };
      setDiscussions([newDisc, ...discussions]);
      setIsSubmitting(false);
      setTitle('');
      setContent('');
      setNewDiscussionOpen(false);
      setSuccessMessage('بحث جدید با موفقیت در انجمن منتشر شد.');
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 800);
  };

  const filteredDiscussions = activeFilterTagKey === 'all'
    ? discussions
    : discussions.filter(d => d.tagKeys.includes(activeFilterTagKey));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" dir="rtl">
      
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-sm animate-fade-in" role="status">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-medium">{successMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#2C2A29] to-[#433F3E] text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#C86D51]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C86D51]/30 text-[#E3A38F] text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>جامعه تخصصی معماران و مالکان</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">انجمن هم‌اندیشی و تبادل تجربه آرک‌فلو</h1>
          <p className="text-stone-300 text-sm leading-relaxed">
            پرسش‌های خود درباره بازسازی، انتخاب متریال، بودجه‌بندی و طراحی داخلی را با صدها معمار و مالک به اشتراک بگذارید.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            onClick={() => setNewDiscussionOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-[#C86D51] hover:bg-[#b05b41] text-white font-medium text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E3A38F]"
          >
            <PlusCircle className="w-5 h-5" />
            <span>ایجاد بحث جدید</span>
          </button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveFilterTagKey('all')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#C86D51] ${
            activeFilterTagKey === 'all'
              ? 'bg-[#C86D51] text-white shadow-sm'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          همه مباحث
        </button>
        {discussionTagKeys.map(tagKey => {
          const label = discussionTagLabels[tagKey] || tagKey;
          const isActive = activeFilterTagKey === tagKey;
          return (
            <button
              key={tagKey}
              onClick={() => setActiveFilterTagKey(tagKey)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#C86D51] ${
                isActive
                  ? 'bg-[#C86D51] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              #{label}
            </button>
          );
        })}
      </div>

      {/* Discussions List */}
      <DiscussionList
        discussions={filteredDiscussions}
        onLike={handleLike}
      />

      {/* New Discussion Modal */}
      {newDiscussionOpen && (
        <DiscussionModal
          onClose={() => setNewDiscussionOpen(false)}
          onSubmit={handleCreateDiscussion}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          selectedTagKey={selectedTagKey}
          setSelectedTagKey={setSelectedTagKey}
          isSubmitting={isSubmitting}
        />
      )}

    </div>
  );
};
