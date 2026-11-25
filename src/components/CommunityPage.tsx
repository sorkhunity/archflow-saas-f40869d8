import React, { useState, useEffect } from 'react';
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

  const handleLike = (id: string) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateNew = (data: { title: string; content: string; tagKeys: DiscussionTagKey[] }) => {
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
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
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

        {successToast && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            بحث شما با موفقیت در انجمن منتشر شد.
          </div>
        )}

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,119,6,0.3),transparent_50%)]" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              انجمن تخصصی معماری و بازسازی
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight">تبادل نظر، تجربیات و پرسش و پاسخ معماران</h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              با صدها معمار، طراح داخلی و پیمانکار مجرب گفتگو کنید، چالش‌های اجرایی پروژه‌های خود را حل کنید و به پالت‌های تاییدشده دسترسی پیدا کنید.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setNewDiscussionModal(true)}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                شروع بحث یا طرح سوال جدید
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <label htmlFor="community-search" className="sr-only">جستجو در بحث‌ها</label>
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="community-search"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="جستجو در عنوان، متریال، چالش‌ها..."
                className="w-full pl-4 pr-11 py-3 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
              />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-xs text-stone-500 font-medium w-full md:w-auto justify-end">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                <span>۱,۴۲۰ معمار فعال</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-amber-600" +
              <span>{discussions.length} بحث جاری</span>
            </div>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-stone-400 flex-shrink-0 ms-1 me-2" />
          {discussionTagKeys.map(tagKey => {
            const isSelected = selectedTag === tagKey;
            return (
              <button
                key={tagKey}
                onClick={() => setSelectedTag(tagKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {discussionTagLabels[tagKey]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-800">هیچ بحثی با این مشخصات یافت نشد</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">می‌توانید کلمات کلیدی دیگری را جستجو کنید یا اولین نفر باشید که این موضوع را مطرح می‌کند.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
              className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs hover:bg-stone-200 transition-all cursor-pointer"
            >
              پاک کردن فیلترها
            </button>
          </div>
        ) : (
          filteredDiscussions.map(item => (
            <DiscussionItem
              key={item.id}
              item={item}
              isLiked={!!likedMap[item.id]}
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
