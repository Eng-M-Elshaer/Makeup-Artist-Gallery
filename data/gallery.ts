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

// قراءة الصور من manifest
import manifestData from './gallery-manifest.json';

const categoryMap: Record<string, Category> = {
  'zafaf': 'زفاف',
  'khotoba': 'خطوبة',
  'ketb-ketab': 'كتب كتاب',
  'sawariya': 'سوارية',
};

function generateImages(): ImageItem[] {
  const images: ImageItem[] = [];
  let idCounter = 0;

  for (const [folderName, files] of Object.entries(manifestData)) {
    const category = categoryMap[folderName];
    if (!category) continue;

    files.forEach((filePath, index) => {
      const fileName = filePath.split('/').pop() || '';
      const alt = `${category} - ${fileName.replace(/\.(jpg|jpeg|png|webp|svg)$/i, '')}`;
      
      images.push({
        id: `${folderName}-${idCounter++}`,
        src: `/${filePath}`,
        alt,
        category,
        featured: index === 0, // أول صورة في كل فئة featured
      });
    });
  }

  return images;
}

export const images: ImageItem[] = generateImages();