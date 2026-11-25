import React, { useEffect, useRef } from 'react';
import { X, PlusCircle, Sparkles } from 'lucide-react';
import { discussionTagLabels, discussionTagKeys } from '../../data/mockData';

interface DiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  selectedTag: string;
  setSelectedTag: (v: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const DiscussionModal: React.FC<DiscussionModalProps> = ({
  isOpen,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  selectedTag,
  setSelectedTag,
  isSubmitting,
  onSubmit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const maxContentLength = 1000;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" 
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label="افزودن بحث جدید"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-[#FDFBF7] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E3A38F]/40 outline-none space-y-6 relative"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E3A38F]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-[#2C2A29] font-heading">ایجاد بحث و پرسش جدید</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-full bg-[#E3A38F]/10 hover:bg-[#E3A38F]/20 text-[#6B5B52] flex items-center justify-center transition cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="disc-title" className="block text-xs font-bold text-[#2C2A29]">
              عنوان بحث یا پرسش <span className="text-red-500">*</span>
            </label>
            <input
              id="disc-title"
              type="text"
              required
              placeholder="مثلا: بهترین روش عایق‌کاری صوتی دیوا‌رهای مشترک چیست؟"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#E3A38F]/40 rounded-xl px-4 py-2.5 text-xs text-[#2C2A29] focus:outline-none focus:border-[#C86D51]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="disc-tag" className="block text-xs font-bold text-[#2C2A29]">
              برچسب موضوعی
            </label>
            <select
              id="disc-tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full bg-white border border-[#E3A38F]/40 rounded-xl px-4 py-2.5 text-xs text-[#2C2A29] focus:outline-none focus:border-[#C86D51] cursor-pointer"
            >
              {discussionTagKeys.map(key => (
                <option key={key} value={key}>
                  {discussionTagLabels[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="disc-content" className="block text-xs font-bold text-[#2C2A29]">
                متن کامل بحث <span className="text-red-500">*</span>
              </label>
              <span className={`text-[10px] ${content.length > maxContentLength ? 'text-red-600 font-bold' : 'text-[#6B5B52]'}`}>
                {content.length} / {maxContentLength} کاراکتر
              </span>
            </div>
            <textarea
              id="disc-content"
              required
              rows={5}
              maxLength={maxContentLength}
              placeholder="جزئیات پروژه، شرایط محیطی یا سوال خود را دقیق بنویسید..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border border-[#E3A38F]/40 rounded-xl p-4 text-xs text-[#2C2A29] focus:outline-none focus:border-[#C86D51] resize-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-[#E3A38F]/40 text-xs font-bold text-[#6B5B52] hover:bg-[#F9F6F0] transition cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="bg-[#C86D51] hover:bg-[#B55D42] disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-[#C86D51]/20 transition cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>در حال ثبت...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>انتشار بحث</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
