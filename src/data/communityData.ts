export type DiscussionTagKey = 'all' | 'material' | 'budget' | 'flooring' | 'ux' | 'color' | 'kitchen';

export const discussionTagLabels: Record<DiscussionTagKey, string> = {
  all: 'همه موضوعات',
  material: 'متریال و مصالح',
  budget: 'هزینه و بودجه',
  flooring: 'کفپوش و دیوارپوش',
  ux: 'طراحی و هوش مصنوعی',
  color: 'رنگ و پالت',
  kitchen: 'آشپزخانه'
};

export const discussionTagKeys: DiscussionTagKey[] = [
  'all',
  'material',
  'budget',
  'flooring',
  'ux',
  'color',
  'kitchen'
];

export interface DiscussionItem {
  id: string;
  author: string;
  avatar: string;
  role: string;
  title: string;
  content: string;
  tagKeys: DiscussionTagKey[];
  replies: number;
  likes: number;
  time: string;
}

export const initialDiscussions: DiscussionItem[] = [
  {
    id: '1',
    author: 'مهندس سهرابی',
    avatar: 'س',
    role: 'معمار ارشد',
    title: 'بهترین ترکیب متریال برای کفپوش واحدهای مسکونی با بودجه متوسط چیست؟',
    content: 'ما در حال طراحی یک پروژه مسکونی ۱۲ واحدی هستیم و کارفرما روی قیمت تمام شده حساس است...',
    tagKeys: ['material', 'flooring', 'budget'],
    replies: 24,
    likes: 56,
    time: '۲ ساعت پیش'
  },
  {
    id: '2',
    author: 'یلدا کریمی',
    avatar: 'ی',
    role: 'مالک و بازسازی‌کننده',
    title: 'تجربه من از استفاده از هوش مصنوعی آرک‌فلو برای انتخاب رنگ کابینت',
    content: 'سلام دوستان، من با ابزار هوش مصنوعی تونستم پالت رنگی آشپزخونه رو به راحتی نهایی کنم...',
    tagKeys: ['ux', 'color', 'kitchen'],
    replies: 12,
    likes: 38,
    time: '۵ ساعت پیش'
  },
  {
    id: '3',
    author: 'کوروش راد',
    avatar: 'ک',
    role: 'پیمانکار ساختمان',
    title: 'نکات کلیدی در قراردادهای پیمانکاری بازسازی در سال ۱۴۰۳',
    content: 'چطور می‌توان از نوسانات قیمت مصالح در قراردادهای بلندمدت جلوگیری کرد؟ تجربیات خود را به اشتراک بگذارید.',
    tagKeys: ['budget', 'material'],
    replies: 45,
    likes: 89,
    time: 'دیروز'
  }
];

export const communityDiscussions = initialDiscussions;
