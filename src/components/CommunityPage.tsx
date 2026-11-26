import React, { useState } from 'react';
import { Search, Plus, Filter, MessageCircle, ThumbsUp, Users, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { communityDiscussions, discussionTagLabels, discussionTagKeys, DiscussionTagKey, DiscussionItem as DiscussionItemType } from '../data/communityData';
import { DiscussionItem } from './DiscussionItem';
import { NewDiscussionModal } from './NewDiscussionModal';

interface CommunityPageProps {
  onNavigate: (tab: string) => void;
  onSelectPersona: (p: any) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
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
      setNewDiscussionModal(false);
    }, 500);
  };

  const filteredDiscussions = discussions.filter(item => {
    const matchesTag = selectedTag === 'all' || item.tagKeys.includes(selectedTag);
    const matchesQuery = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" dir="rtl">
      {successToast && (
        <div className="fixed bottom-6 start-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold text-sm">موضوع شما با موفقیت در انجمن منتشر شد!</span>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold inline-flex items-center gap-1.5 border border-amber-500/30">
            <Users className="w-3.5 h-3.5" />
            انجمن تخصصی معماری و بازسازی
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            پرسش، تبادل نظر و تجربیات واقعی ساخت‌وساز
          </h1>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            با صدها معمار، طراح داخلی و صاحب‌خانه تبادل نظر کنید، چالش‌های اجرایی پروژه‌ها را حل کنید و پالت‌های برنده را پیدا کنید.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setNewDiscussionModal(true)}
              disabled={isSubmittingGlobal}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              {isSubmittingGlobal ? 'در حال ثبت...' : 'ارسال موضوع جدید'}
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="relative w-full md:w-80">
          <label htmlFor="community-search" className="sr-only">جستجو در انجمن</label>
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="community-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در پرسش‌ها، موضوعات..."
            className="w-full ps-10 pe-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {discussionTagKeys.map(tagKey => {
            const isSelected = selectedTag === tagKey;
            return (
              <button
                key={tagKey}
                onClick={() => setSelectedTag(tagKey)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
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
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">موضوعی یافت نشد</h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto">
              موضوعی با این مشخصات یا دسته‌بندی پیدا نکردید. اولین نفری باشید که این بحث را شروع می‌کند!
            </p>
            <button
              onClick={() => setNewDiscussionModal(true)}
              className="px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all"
            >
              ایجاد موضوع جدید
            </button>
          </div>
        ) : (
          filteredDiscussions.map(item => (
            <DiscussionItem
              key={item.id}
              {...item}
              liked={!!likedMap[item.id]}
              onLike={handleLike}
            />
          ))
        )}
      </div>

      {newDiscussionModal && (
        <NewDiscussionModal
          onClose={() => setNewDiscussionModal(false)}
          onSubmit={handleCreateNew}
        />
      )}
    </div>
  );
};
