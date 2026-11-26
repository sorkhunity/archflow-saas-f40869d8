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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in" dir="rtl" onClick={onClose}>
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="ایجاد بحث جدید"
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">طرح سوال یا بحث جدید</h3>
              <p className="text-xs text-stone-500">موضوع خود را با جامعه معماران به اشتراک بگذارید</p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            aria-label="بستن پنجره"
            className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-all cursor-pointer relative z-20"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="modal-discussion-title" className="block text-xs font-bold text-stone-700">عنوان بحث یا سوال <span className="text-rose-500">*</span></label>
            <input
              ref={titleInputRef}
              id="modal-discussion-title"
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="مثلا: بهترین متریال ضد آب برای بالکن‌های رو به آفتاب چیست؟"
              className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="modal-discussion-content" className="block text-xs font-bold text-stone-700">توضیحات کامل <span className="text-rose-500">*</span></label>
            <textarea
              id="modal-discussion-content"
              required
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="جزئیات پروژه، ابعاد، شرایط آب و هوایی یا بودجه مورد نظر را بنویسید..."
              className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">انتخاب دسته‌بندی‌ها (حداقل یک مورد)</label>
            <div className="flex flex-wrap gap-2 pt-1">
              {discussionTagKeys.filter(k => k !== 'all').map(tagKey => {
                const isSelected = selectedTags.includes(tagKey);
                return (
                  <button
                    key={tagKey}
                    type="button"
                    onClick={() => toggleTag(tagKey)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs hover:bg-stone-200 transition-all cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-stone-950 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              انتشار بحث در انجمن
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
