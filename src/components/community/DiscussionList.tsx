import React from 'react';
import { MessageSquare, ThumbsUp, Sparkles } from 'lucide-react';
import { discussionTagLabels } from '../../data/mockData';

interface DiscussionItem {
  id: string;
  author: string;
  avatar: string;
  role: string;
  title: string;
  tagKeys: string[];
  replies: number;
  likes: number;
  time: string;
}

interface DiscussionListProps {
  discussions: DiscussionItem[];
  onSelectPersona: (p: any) => void;
  onLike: (id: string) => void;
}

export const DiscussionList: React.FC<DiscussionListProps> = ({ discussions, onSelectPersona, onLike }) => {
  return (
    <div className="space-y-4">
      {discussions.map((item) => (
        <div 
          key={item.id}
          className="bg-white p-6 rounded-3xl border border-[#E3A38F]/30 hover:border-[#C86D51]/50 transition shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C86D51]/10 text-[#C86D51] font-black flex items-center justify-center text-sm">
                {item.avatar}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2C2A29]">{item.author}</h4>
                <span className="text-[11px] text-[#6B5B52] bg-[#F9F6F0] px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {item.role}
                </span>
              </div>
            </div>
            <span className="text-xs text-[#6B5B52]">{item.time}</span>
          </div>

          <h3 className="text-base font-black text-[#2C2A29] font-heading leading-relaxed">
            {item.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            {item.tagKeys.map((tagKey) => (
              <span
                key={tagKey}
                className="text-[11px] bg-[#F9F6F0] text-[#6B5B52] border border-[#E3A38F]/30 px-3 py-1 rounded-xl font-medium"
              >
                #{discussionTagLabels[tagKey] || tagKey}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E3A38F]/20 text-xs text-[#6B5B52]">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onLike(item.id)}
                className="flex items-center gap-1.5 hover:text-[#C86D51] transition cursor-pointer"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{item.likes} پسند</span>
              </button>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>{item.replies} پاسخ</span>
              </div>
            </div>
            <button
              onClick={() => onSelectPersona('sara')}
              className="text-[#C86D51] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>مشاوره هوش مصنوعی با این ایده</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
