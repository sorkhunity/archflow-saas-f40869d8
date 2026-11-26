import React from 'react';
import React from 'react';
import { MessageCircle, ThumbsUp, Award } from 'lucide-react';
import { discussionTagLabels } from '../data/mockData';

interface DiscussionItemProps {
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
  onLike: (id: string) => void;
  liked: boolean;
}

export const DiscussionItem: React.FC<DiscussionItemProps> = ({
  id,
  author,
  avatar,
  role,
  title,
  content,
  tagKeys,
  replies,
  likes,
  time,
  onLike,
  liked
}) => {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={avatar} alt={author} className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/20" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 dark:text-white text-base">{author}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" />
                {role}
              </span>
            </div>
            <span className="text-xs text-stone-400">{time}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tagKeys.map(tagKey => (
            <span key={tagKey} className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-medium">
              {discussionTagLabels[tagKey] || tagKey}
            </span>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2 hover:text-amber-600 transition-colors cursor-pointer">
        {title}
      </h2>
      <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base mb-6 leading-relaxed">
        {content}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-6">
          <button
            onClick={() => onLike(id)}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              liked ? 'text-amber-600' : 'text-stone-500 hover:text-amber-600'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-amber-600' : ''}`} />
            <span>{likes + (liked ? 1 : 0)} پسند</span>
          </button>

          <div className="flex items-center gap-2 text-stone-500 text-sm font-semibold">
            <MessageCircle className="w-4 h-4" />
            <span>{replies} پاسخ تخصصی</span>
          </div>
        </div>

        <button className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
          مشاهده گفتگو و پاسخ‌ها &larr;
        </button>
      </div>
    </div>
  );
};
