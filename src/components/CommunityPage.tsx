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
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      {successToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-medium">بحث جدید با موفقیت در انجمن منتشر شد.</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-medium border border-amber-500/30">
              <Users className="w-3.5 h-3.5" />
              <span>جامعه حرفه‌ای معماران و سازندگان ایران</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">انجمن تبادل نظر و تجربیات بازسازی</h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              با همکاران، طراحان و تامین‌کنندگان ارتباط برقرار کنید، پرسش‌های خود را بپرسید و تجربیات اجرایی را به اشتراک بگذارید.
            </p>
          </div>
          <button
            onClick={() => setNewDiscussionModal(true)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2.5 shrink-0 text-sm"
          >
            <Plus className="w-5 h-5" />
            <span>ایجاد بحث جدید</span>
          </button>
        </div>
      </div>

      {/* Search & Tags Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <label htmlFor="community-search" className="sr-only">جستجو در انجمن</label>
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="community-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در موضوعات، متریال، پرسش‌ها..."
            className="w-full bg-white border border-stone-200 rounded-2xl pr-10 pl-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
          />
        </div>

        {/* Tags Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {discussionTagKeys.map(tagKey => (
            <button
              key={tagKey}
              onClick={() => setSelectedTag(tagKey)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedTag === tagKey
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              <span>{discussionTagLabels[tagKey]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Discussions Feed */}
      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">موضوعی یافت نشد</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              با جستجوی عبارت دیگری امتحان کنید یا موضوع جدیدی را آغاز نمایید.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
              className="text-amber-700 font-semibold text-sm hover:underline"
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
          isSubmitting={isSubmittingGlobal}
        />
      )}
    </div>
  );
};
