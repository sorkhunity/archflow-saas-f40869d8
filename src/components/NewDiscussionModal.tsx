import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { discussionTagLabels, discussionTagKeys, DiscussionTagKey } from '../data/communityData';

interface NewDiscussionModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; content: string; tagKeys: DiscussionTagKey[] }) => void;
}

export const NewDiscussionModal: React.FC<NewDiscussionModalProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<DiscussionTagKey[]>(['material']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleTag = (tagKey: DiscussionTagKey) => {
    if (tagKey === 'all') return;
    if (selectedTags.includes(tagKey)) {
      if (selectedTags.length > 1) {
        setSelectedTags(selectedTags.filter(t => t !== tagKey));
      }
    } else {
      setSelectedTags([...selectedTags, tagKey]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({ title, content, tagKeys: selectedTags });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in" dir="rtl">
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="ایجاد موضوع جدید"
        className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">ارسال موضوع جدید به انجمن</h2>
              <p className="text-xs text-stone-500">سوال یا تجربه خود را با سایر معماران به اشتراک بگذارید</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            aria-label="بستن پنجره"
            className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:text-stone-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="modal-discussion-title" className="block text-xs font-bold text-stone-700 dark:text-stone-300">
              عنوان موضوع <span className="text-red-500">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="modal-discussion-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلا: بهترین متریال برای کفپوش پذیرایی..."
              maxLength={120}
              required
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="modal-discussion-content" className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                متن پرسش یا توضیحات <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-stone-400">
                {content.length}/1000 کاراکتر
              </span>
            </div>
            <textarea
              id="modal-discussion-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="جزئیات پروژه، سوال یا نکته اجرایی را با دقت بنویسید..."
              rows={4}
              maxLength={1000}
              required
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
              انتخاب دسته‌بندی‌ها (حداقل یک مورد)
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {discussionTagKeys.filter(k => k !== 'all').map(tagKey => {
                const isSelected = selectedTags.includes(tagKey);
                return (
                  <button
                    key={tagKey}
                    type="button"
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleTag(tagKey)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleTag(tagKey);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {discussionTagLabels[tagKey]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-sm hover:bg-stone-200 transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>در حال انتشار...</span>
                </>
              ) : (
                'انتشار موضوع'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
