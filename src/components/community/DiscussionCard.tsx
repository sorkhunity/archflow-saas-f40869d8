import React from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { discussionTagLabels } from '../../data/mockData';

interface DiscussionItem {
  id: string;
  author: string;
  avatar: string;
  role: string;
  title: string;
  content: string;
  tagKeys: string[];
  replies: number;
  likes: number;
  time: string;
}

interface DiscussionCardProps {
  discussion: DiscussionItem;
  onLike: (id: string) => void;
}

export const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, onLike }) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E3A38F]/30 hover:border-[#C86D51]/50 transition-all space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C86D51] to-[#E3A38F] text-white font-bold text-lg flex items-center justify-center shadow-md shadow-[#C86D51]/20">
            {discussion.avatar}
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-base">{discussion.author}</h4>
            <p className="text-xs text-stone-500">{discussion.role} • {discussion.time}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {discussion.tagKeys.map((tk) => (
            <span
              key={tk}
              className="px-3 py-1 rounded-xl bg-[#C86D51]/10 text-[#C86D51] text-xs font-semibold"
            >
              #{discussionTagLabels[tk] || tk}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-stone-900 hover:text-[#C86D51] transition-colors cursor-pointer">
          {discussion.title}
        </h3>
        <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
          {discussion.content}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onLike(discussion.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-[#C86D51]/10 hover:text-[#C86D51] text-stone-600 text-xs font-semibold transition-all cursor-pointer"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{discussion.likes} پسند</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-50 text-stone-600 text-xs font-semibold">
            <MessageCircle className="w-4 h-4 text-[#C86D51]" />
            <span>{discussion.replies} پاسخ</span>
          </div>
        </div>

        <button
          onClick={() => {}}
          className="text-xs font-bold text-[#C86D51] hover:underline cursor-pointer"
        >
          مشاهده گفتگو و پاسخ‌ها ←
        </button>
      </div>
    </div>
  );
};
