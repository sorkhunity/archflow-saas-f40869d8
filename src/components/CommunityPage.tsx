import React, { useState } from 'react';
import { Search, Plus, Filter, MessageCircle, ThumbsUp, Users, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { communityDiscussions, discussionTagLabels, discussionTagKeys, DiscussionTagKey, DiscussionItem as DiscussionItemType } from '../data/communityData';
import { DiscussionItem } from './DiscussionItem';
import { NewDiscussionModal } from './NewDiscussionModal';

export const CommunityPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<DiscussionTagKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [newDiscussionModal, setNewDiscussionModal] = useState(false);
  const [discussions, setDiscussions] = useState<DiscussionItemType[]>(communityDiscussions);
  const [successToast, setSuccessToast] = useState(false);
  const [isSubmittingGlobal, setIsSubmittingGlobal] = useState(false);

  const handleLike = (id: string) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateNew = (data: { title: string; content: string; tagKeys: DiscussionTagKey[] }) => {
    setIsSubmittingGlobal(true);
    setTimeout(() => {
      const newItem: DiscussionItemType = {
        id: String(Date.now()),
        author: 'شما (معمار همراه)',
        avatar: 'ش',
        role: 'عضو انجمن',
        title: data.title,
        content: data.content,
        tagKeys: data.tagKeys,
        replies: 0,
        likes: 1,
        time: 'همین الان'
      };
      setDiscussions([newItem, ...discussions]);
      setIsSubmittingGlobal(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    }, 500);
  };

  const filteredDiscussions = discussions.filter(item => {
    const matchesTag = selectedTag === 'all' || item.tagKeys.includes(selectedTag);
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="min-h-dvh bg-stone-50/50 pb-20 pt-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Toast */}
        {successToast && (
          <div className="fixed bottom-6 start-6 z-50 bg-[#2C2A29] text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium">بحث جدید با موفقیت در انجمن منتشر شد!</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[#2C2A29] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="absolute -start-10 -bottom-10 w-64 h-64 bg-[#C86D51]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -end-10 -top-10 w-64 h-64 bg-[#E3A38F]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C86D51]/30 border border-[#C86D51]/50 text-xs text-[#E3A38F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>جامعه تخصصی معماران و کارفرمایان آرک‌فلو</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
              تبادل نظر، هم‌اندیشی و مشاوره پروژه
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed">
              با هزاران معمار، طراح داخلی و مالک پروژه در ایران تبادل تجربه کنید، پرسش‌های فنی بپرسید و پاسخ‌های کارشناسی دریافت کنید.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setNewDiscussionModal(true)}
                disabled={isSubmittingGlobal}
                className="bg-[#C86D51] hover:bg-[#b05c42] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#C86D51]/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>{isSubmittingGlobal ? 'در حال ثبت...' : 'ایجاد بحث جدید'}</span>
              </button>
              
              <div className="flex items-center gap-6 text-xs text-stone-300 pe-4 border-s border-stone-700">
                <div>
                  <span className="font-bold text-white block text-sm">۱,۲۸۰</span>
                  <span>عضو فعال</span>
                </div>
                <div>
                  <span className="font-bold text-white block text-sm">۳,۴۵۰</span>
                  <span>بحث و پرسش</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Tag Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {discussionTagKeys.map(tagKey => {
                const label = discussionTagLabels[tagKey];
                const isActive = selectedTag === tagKey;
                return (
                  <button
                    key={tagKey}
                    onClick={() => setSelectedTag(tagKey)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#2C2A29] text-white shadow-md' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <label htmlFor="community-search" className="sr-only">جستجو در بحث‌ها</label>
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="community-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در عنوان یا متن بحث‌ها..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl ps-10 pe-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#C86D51]"
              />
            </div>
          </div>
        </div>

        {/* Discussion List */}
        <div className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <Users className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold text-stone-800">موردی یافت نشد</h3>
              <p className="text-xs text-stone-500">پاسخی مطابق با جستجوی شما در این دسته پیدا نشد.</p>
            </div>
          ) : (
            filteredDiscussions.map(item => (
              <DiscussionItem
                key={item.id}
                item={item}
                liked={!!likedMap[item.id]}
                onLike={() => handleLike(item.id)}
              />
            ))
          )}
        </div>

        {/* New Discussion Modal */}
        {newDiscussionModal && (
          <NewDiscussionModal
            onClose={() => setNewDiscussionModal(false)}
            onSubmit={handleCreateNew}
          />
        )}

      </div>
    </div>
  );
};
