import { ProductItem, PersonaProfile, Persona, Project } from '../types';
import { communityDiscussions } from './communityData';
export { communityDiscussions };

export const materialCategoryLabels: Record<string, string> = {
  wood: 'چوب و کفپوش',
  tile: 'سرامیک و کاشی',
  lighting: 'نورپردازی و لوستر',
  sanitary: 'شیرآلات و سرویس',
  paint: 'رنگ و پوشش',
  stone: 'سنگ و کانتر'
};

export const materialCategoryKeys = ['wood', 'tile', 'lighting', 'sanitary', 'paint', 'stone'] as const;

export const styleLabels: Record<string, string> = {
  modern_minimal: 'مدرن و مینیمال گرم',
  japandi: 'ژاپنی-اسکاندیناوی (Japandi)',
  classic_warm: 'کلاسیک گرم',
  modern_industrial: 'صنعتی مدرن'
};

export const styleKeys = ['modern_minimal', 'japandi', 'classic_warm', 'modern_industrial'] as const;

export const discussionTagKeys = ['material', 'flooring', 'budget', 'ux', 'color', 'kitchen', 'sales', 'invoice', 'tools'] as const;

export const discussionTagLabels: Record<string, string> = {
  material: 'متریال',
  flooring: 'کفپوش',
  budget: 'بودجه',
  ux: 'تجربه کاربری',
  color: 'رنگ',
  kitchen: 'آشپزخانه',
  sales: 'فروش',
  invoice: 'پیش‌فاکتور',
  tools: 'ابزار'
};

export const mockMaterials: ProductItem[] = [
  {
    id: 'mat-1',
    name: 'پارکت لمینیت بلوط روئین',
    category: 'wood',
    price: 2400000,
    unit: 'متر مربع',
    image: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg',
    supplier: 'چوب‌گستر تهران',
    rating: 4.8,
    ecoScore: 92,
    inStock: true,
    description: 'مقاوم در برابر خط و خش با طرح رگه‌های طبیعی بلوط روسی.'
  },
  {
    id: 'mat-2',
    name: 'سرامیک اسلب پرسلان کلکته',
    category: 'tile',
    price: 1850000,
    unit: 'متر مربع',
    image: '/__l5e/assets-v1/223c68d9-64db-4c3c-a572-34b853d2ec54/prototype-commerce.jpg',
    supplier: 'سرامیک البرز',
    rating: 4.9,
    ecoScore: 88,
    inStock: true,
    description: 'اسلب پرسلان با رگه‌های طلایی و سطح براق نانو پولیش مناسب کف سالن و دیوار.'
  },
  {
    id: 'mat-3',
    name: 'لوستر مدرن خطی برنجی',
    category: 'lighting',
    price: 6800000,
    unit: 'عدد',
    image: '/__l5e/assets-v1/39a51904-644f-4f9c-ac36-a30b8805e1e0/prototype-fitness.jpg',
    supplier: 'نورآفرین',
    rating: 4.7,
    ecoScore: 95,
    inStock: true,
    description: 'طراحی مینیمال با نور آفتابی ملایم قابل تنظیم.'
  },
  {
    id: 'mat-4',
    name: 'شیر روشویی توکار کروم مات',
    category: 'sanitary',
    price: 4500000,
    unit: 'ست',
    image: '/__l5e/assets-v1/73aaeffc-03f6-4dd8-b652-a097efe0b551/prototype-healthcare.jpg',
    supplier: 'آیسان‌سانی',
    rating: 4.6,
    ecoScore: 90,
    inStock: true,
    description: 'دارای پرلاتور کاهنده مصرف آب با کیفیت آبکاری عالی.'
  },
  {
    id: 'mat-5',
    name: 'رنگ اکریلیک ضد باکتری',
    category: 'paint',
    price: 950000,
    unit: 'دبه ۴ لیتری',
    image: '/__l5e/assets-v1/68ceadfc-b580-4f18-8679-0088dddd218c/prototype-travel.jpg',
    supplier: 'رنگ الوان',
    rating: 4.5,
    ecoScore: 96,
    inStock: true,
    description: 'بدون بو، قابل شستشو و مقاوم در برابر رطوبت.'
  },
  {
    id: 'mat-6',
    name: 'صفحه کابینت کورین گرانیتی',
    category: 'stone',
    price: 5200000,
    unit: 'متر طول',
    image: '/__l5e/assets-v1/ee055612-0d60-456e-b148-d6c54a724bcf/prototype-food.jpg',
    supplier: 'سنگ‌طبیعی دکور',
    rating: 4.9,
    ecoScore: 85,
    inStock: true,
    description: 'یکپارچه بدون درز، ضد خش و ضد لک مناسب آشپزخانه مدرن.'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'بازسازی آپارتمان ۱۱۰ متری دروس',
    persona: 'sara',
    budget: 450000000,
    spent: 280000000,
    stage: 'estimation',
    selectedMaterials: [mockMaterials[0], mockMaterials[1]],
    rooms: [
      { id: 'r1', name: 'نشیمن و پذیرایی', area: 45, style: 'modern_minimal', image: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg' },
      { id: 'r2', name: 'آشپزخانه اصلی', area: 18, style: 'japandi', image: '/__l5e/assets-v1/ee055612-0d60-456e-b148-d6c54a724bcf/prototype-food.jpg' }
    ]
  },
  {
    id: 'proj-2',
    title: 'طراحی داخلی ویلای لواسان',
    persona: 'arash',
    budget: 1200000000,
    spent: 850000000,
    stage: 'ai_design',
    selectedMaterials: [mockMaterials[2], mockMaterials[5]],
    rooms: [
      { id: 'r3', name: 'سالن اجتماعات و استخر', area: 120, style: 'modern_industrial', image: '/__l5e/assets-v1/d020c4ee-6d67-45a9-9b78-5888ba632b03/prototype-gaming.jpg' }
    ]
  }
];

export const mockProfiles: PersonaProfile[] = [
  {
    id: 'sara',
    name: 'سارا احمدی',
    title: 'مالک و بازسازی‌کننده خانگی',
    description: 'به دنبال بازسازی خانه شخصی با بودجه مشخص، سبک مدرن و مینیمال و مصالح باکیفیت و ارگونومیک.',
    avatar: 'س'
  },
  {
    id: 'arash',
    name: 'آرش کیانی',
    title: 'معمار و طراح داخلی',
    description: 'طراح پروژه‌های لوکس مسکونی و اداری نیازمند کاتالوگ دقیق متریال و برآورد هوشمند.',
    avatar: 'آ'
  },
  {
    id: 'mina',
    name: 'مینا صادقی',
    title: 'پیمانکار و تأمین‌کننده مصالح',
    description: 'مدیریت زنجیره تأمین، استعلام قیمت لحظه‌ای و ارتباط مستقیم با مالکان و مهندسان.',
    avatar: 'م'
  }
];
