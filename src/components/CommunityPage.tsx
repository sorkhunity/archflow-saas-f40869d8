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
              تبادل تجربه، پرسش و پاسخ تخصصی معماری
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              با همکاران صنعت ساختمان، طراحان و مالکان تبادل نظر کنید، تجربیات بازسازی را به اشتراک بگذارید و پاسخ چالش‌های اجرایی خود را دریافت کنید.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setNewDiscussionModal(true)}
                className="bg-[#C86D51] hover:bg-[#b05b41] text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>شروع بحث جدید در انجمن</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {discussionTagKeys.map(tagKey => (
              <button
                key={tagKey}
                onClick={() => setSelectedTag(tagKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                  selectedTag === tagKey
                    ? 'bg-[#C86D51] text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {discussionTagLabels[tagKey] || tagKey}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="جستجو در گفتگوها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-stone-100 border border-stone-200 rounded-xl px-4 py-2.5 text-xs w-full focus:outline-none focus:border-[#C86D51]"
            />
          </div>
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {filteredDiscussions.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-800">گفتگویی یافت نشد</h3>
              <p className="text-xs text-stone-500">با کلمات کلیدی دیگر جستجو کنید یا موضوع جدیدی ایجاد نمایید.</p>
            </div>
          ) : (
            filteredDiscussions.map(item => (
              <DiscussionItem
                key={item.id}
                id={item.id}
                author={item.author}
                avatar={item.avatar}
                role={item.role}
                title={item.title}
                content={item.content}
                tagKeys={item.tagKeys}
                replies={item.replies}
                likes={item.likes}
                time={item.time}
                onLike={handleLike}
                liked={!!likedMap[item.id]}
              />
            ))
          )}
        </div>

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
