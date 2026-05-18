import type { Category, Product3D } from '@/types';

export const WA_NUMBER = '12409388600';

export const CATEGORIES: Category[] = [
  {
    key: 'aretes',
    stock: 15,
    imageUrl: '/images/aretes/aretes1.png',
    imageAlt: 'Aretes de plata .925',
  },
  {
    key: 'anillos',
    stock: 17,
    imageUrl: '/images/anillos/anillos1.png',
    imageAlt: 'Anillo de plata .925 con zirconias de corazón',
  },
  {
    key: 'dijes',
    stock: 8,
    imageUrl: '/images/dijes/dije3.png',
    imageAlt: 'Dije de plata .925 con amatista lila',
  },
  {
    key: 'pulseras',
    stock: 2,
    imageUrl: '/images/pulseras/pulsera1.png',
    imageAlt: 'Pulsera de plata .925',
  },
  {
    key: 'arracadas',
    stock: 1,
    imageUrl: '/images/arracadas/arracadas1.png',
    imageAlt: 'Arracadas de plata .925 con diseño',
  },
  {
    key: 'cadenas',
    stock: 1,
    imageUrl: '/images/cadena/cadena1.png',
    imageAlt: 'Cadena tricolor de plata .925',
  },
  {
    key: 'esclavas',
    stock: 2,
    imageUrl: '/images/esclava/esclava1.png',
    imageAlt: 'Esclava de plata .925',
  },
];

export const PRODUCTS_3D: Product3D[] = [
  { key: 'ingot', waKey: 'ingot3d' },
];

export const buildWaUrl = (message: string): string =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
