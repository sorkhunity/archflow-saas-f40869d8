export type Persona = 'sara' | 'arash' | 'mina';

export interface MaterialItem {
  id: string;
  name: string;
  category: 'flooring' | 'wall' | 'cabinet' | 'lighting' | 'tile' | 'wood' | 'sanitary' | 'paint' | 'stone';
  price: number; // in Tomans
  unit: string;
  rating: number;
  image: string;
  ecoScore: number; // 1-5 or percentage
  aiScore?: number; // matching score with style
  description: string;
  supplier: string;
  inStock: boolean;
}

export interface Project {
  id: string;
  title: string;
  persona: Persona;
  budget: number;
  budgetIRR?: number;
  spent: number;
  stage: 'profiling' | 'ai_design' | 'estimation' | 'execution';
  selectedMaterials: MaterialItem[];
  styleKey?: string;
  rooms: {
    id: string;
    name: string;
    area: number; // sqm
    style: string;
    image: string;
  }[];
}

export type ProductItem = MaterialItem;
export type PersonaProfile = {
  id: Persona;
  name: string;
  title: string;
  description: string;
  avatar: string;
};
