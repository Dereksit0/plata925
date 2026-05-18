export interface Category {
  key: 'aretes' | 'pulseras' | 'dijes' | 'cadenas' | 'arracadas' | 'anillos' | 'esclavas';
  imageUrl: string;
  imageAlt: string;
  stock: number;
}

export interface Testimonial {
  id: number;
  nameKey: string;
  locationKey: string;
  ageKey: string;
  textKey: string;
}

export interface FaqItem {
  id: number;
  questionKey: string;
  answerKey: string;
}

export interface Product3D {
  key: 'ring' | 'hoop' | 'charm' | 'ingot';
  waKey: string;
}

export type Locale = 'es' | 'en';
