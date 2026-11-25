import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MessageCircle, ThumbsUp, Users, Award, Sparkles, CheckCircle2, X, Loader2 } from 'lucide-react';
import { communityDiscussions, discussionTagLabels, discussionTagKeys, DiscussionTagKey } from '../data/communityData';
import { DiscussionItem } from './DiscussionItem';

export const CommunityPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<DiscussionTagKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [newDiscussionModal, setNewDiscussionModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState<DiscussionTagKey>('material');
  const [discussions, setDiscussions] = useState(communityDiscussions);
  const [successToast, setSuccessToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Escape key handler and body scroll lock for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && newDiscussionModal) {
        setNewDiscussionModal(false);
      }
    };
    if (newDiscussionModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [newDiscussionModal]);

  const handleLike = (id: string) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newItem = {
        id: String(Date.now()),
        author: 'شما (مهندس معمار)',
        avatar: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg',
        role: 'کاربر ارشد',
        title: newTitle.trim(),
        content: newContent.trim(),
        tagKeys: [newTag],
        replies: 0,
        likes: 0,
        time: 'لحظاتی پیش'
      };
      setDiscussions([newItem, ...discussions]);
      setIsSubmitting(false);
      setNewDiscussionModal(false);
      setNewTitle('');
      setNewContent('');
      setNewTag('material');
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
    }, 600);
  };

  const filtered = discussions.filter(item => {
    const matchesTag = selectedTag === 'all' || item.tagKeys.includes(selectedTag);
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 start-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in" role="status">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-bold">بحث جدید با موفقیت ثبت شد و به جامعه اضافه گردید.</span>
        </div>
      )}

      {/* Hero section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-stone-900 via-stone-800 to-amber-950 p-8 sm:p-12 text-white border border-stone-800 shadow-xl">
        <div className="absolute end-0 top-0 bottom-0 w-1/3 opacity-20 hidden md:block">
          <img 
            src="/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg" 
            alt="جامعه معماران" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            جامعه تخصصی معماران و سازندگان ایران
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            پرسش، تبادل نظر و هم‌فکری در پروژه‌های معماری
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            با هزاران مهندس، معمار، طراح داخلی و پیمانکار در ارتباط باشید، تجربیات اجرایی را به اشتراک بگذارید و پاسخ مسائل فنی خود را بیابید.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setNewDiscussionModal(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>ایجاد بحث جدید</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {discussionTagKeys.map(tagKey => (
            <button
              key={tagKey}
              onClick={() => setSelectedTag(tagKey)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedTag === tagKey
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50'
              }`}
            >
              {discussionTagLabels[tagKey]}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <label htmlFor="search-discussions" className="sr-only">جستجو در بحث‌ها</label>
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="search-discussions"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="جستجو در عنوان یا متن بحث‌ها..."
            className="w-full ps-10 pe-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
            <MessageCircle className="w-12 h-12 text-stone-400 mx-auto" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">هیچ بحثی یافت نشد</h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto">
              با عبارت جستجوی دیگری تلاش کنید یا موضوع جدیدی را آغاز نمایید.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
              className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl text-sm font-semibold hover:bg-stone-200 transition-colors"
            >
              پاک کردن فیلترها
            </button>
          </div>
        ) : (
          filtered.map(item => (
            <DiscussionItem
              key={item.id}
              {...item}
              liked={!!likedMap[item.id]}
              onLike={handleLike}
            />
          ))
        )}
      </div>

      {/* New Discussion Modal */}
      {newDiscussionModal && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setNewDiscussionModal(false)}
        >
          <div 
            className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl relative space-y-6 my-8"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
              <h2 id="modal-title" className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-amber-500" />
                شروع بحث جدید در جامعه
              </h2>
              <button
                onClick={() => setNewDiscussionModal(false)}
                aria-label="بستن پنجره"
                className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="discussion-title" className="block text-sm font-bold text-stone-900 dark:text-white">
                  عنوان بحث <span className="text-red-500">*</span>
                </label>
                <input
                  id="discussion-title"
                  type="text"
                  required
                  maxLength={120}
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="مثلاً: بهترین روش عایق‌کاری صوتی دیواهای مشترک..."
                  className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="discussion-tag" className="block text-sm font-bold text-stone-900 dark:text-white">
                  موضوع / تگ اصلی <span className="text-red-500">*</span>
                </label>
                <select
                  id="discussion-tag"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value as DiscussionTagKey)}
                  className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {discussionTagKeys.filter(k => k !== 'all').map(key => (
                    <option key={key} value={key}>
                      {discussionTagLabels[key]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="discussion-content" className="block text-sm font-bold text-stone-900 dark:text-white">
                    متن پرسش یا توضیحات <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-xs ${newContent.length > 950 ? 'text-amber-600 font-bold' : 'text-stone-400'}`}>
                    {newContent.length}/1000 کاراکتر
                  </span>
                </div>
                <textarea
                  id="discussion-content"
                  required
                  rows={5}
                  maxLength={1000}
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="جزئیات پروژه، سوال تخصصی یا تجربیات خود را اینجا بنویسید..."
                  className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setNewDiscussionModal(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-2xl transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/60 text-stone-950 font-bold text-sm rounded-2xl shadow-md transition-all active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>در حال ثبت...</span>
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
