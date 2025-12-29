export type Category = 'زفاف' | 'خطوبة' | 'كتب كتاب' | 'سوارية';

export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  category: Category;
  featured?: boolean;
}

export const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'>
      <rect width='100%' height='100%' fill='#e5e7eb'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='#6b7280'>Placeholder</text>
    </svg>`
  );

// أمثلة صور للتجربة - استبدل لاحقًا بصورك الحقيقية تحت public/gallery
export const images: ImageItem[] = [
  { id: 'z1', src: 'gallery/zafaf/z1.webp', alt: 'لوك زفاف 1', category: 'زفاف', featured: true },
  { id: 'z2', src: 'gallery/zafaf/z2.webp', alt: 'لوك زفاف 2', category: 'زفاف' },
  { id: 'k1', src: 'gallery/khotoba/k1.webp', alt: 'لوك خطوبة 1', category: 'خطوبة', featured: true },
  { id: 'kk1', src: 'gallery/ketb-ketab/kk1.webp', alt: 'لوك كتب كتاب 1', category: 'كتب كتاب' },
  { id: 's1', src: 'gallery/sawariya/s1.webp', alt: 'لوك سوارية 1', category: 'سوارية' },
];