import React, { useRef, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { discussionTagKeys, discussionTagLabels } from '../../data/mockData';

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  selectedTagKey: string;
  setSelectedTagKey: (k: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const NewDiscussionModal: React.FC<NewDiscussionModalProps> = ({
  isOpen,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  selectedTagKey,
  setSelectedTagKey,
  onSubmit,
  isSubmitting,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="افزودن بحث جدید"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#E3A38F]/30 space-y-6 relative animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900">ایجاد بحث و پرسش جدید</h3>
              <p className="text-xs text-stone-500">سوال یا تجربه خود را با جامعه معماران به اشتراک بگذارید</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن پنجره"
            className="w-10 h-10 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="discussion-title-input" className="block text-xs font-bold text-stone-700">
              عنوان پرسش یا موضوع <span className="text-[#C86D51]">*</span>
            </label>
            <input
              id="discussion-title-input"
              ref={firstInputRef}
              type="text"
              required
              maxLength={120}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: بهترین متریال ضد آب برای بالکن کدام است؟"
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 outline-none text-stone-800 text-sm transition-all"
            />
            <div className="text-start text-[10px] text-stone-400 ms-1">{title.length}/120 کاراکتر</div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="discussion-tag-select" className="block text-xs font-bold text-stone-700">
              دسته‌بندی موضوع <span className="text-[#C86D51]">*</span>
            </label>
            <select
              id="discussion-tag-select"
              value={selectedTagKey}
              onChange={(e) => setSelectedTagKey(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 outline-none text-stone-800 text-sm transition-all cursor-pointer"
            >
              {discussionTagKeys.map((key) => (
                <option key={key} value={key}>
                  {discussionTagLabels[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="discussion-content-textarea" className="block text-xs font-bold text-stone-700">
              شرح کامل موضوع <span className="text-[#C86D51]">*</span>
            </label>
            <textarea
              id="discussion-content-textarea"
              required
              rows={4}
              maxLength={1000}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="جزئیات پروژه، سوالات دقیق و انتظارات خود را بنویسید..."
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 outline-none text-stone-800 text-sm transition-all resize-none"
            />
            <div className="text-start text-[10px] text-stone-400 ms-1">{content.length}/1000 کاراکتر</div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm transition-all cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-2xl bg-[#C86D51] hover:bg-[#B55D42] text-white font-bold text-sm transition-all shadow-lg shadow-[#C86D51]/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>در حال انتشار...</span>
                </>
              ) : (
                <span>انتشار بحث</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
