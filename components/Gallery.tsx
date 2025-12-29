"use client";
import { useMemo, useState } from 'react';
import { ImageItem, images, PLACEHOLDER, Category } from '@/data/gallery';
import CategoryFilter from '@/components/CategoryFilter';
import FullScreenViewer from '@/components/FullScreenViewer';

export default function Gallery() {
  const [selected, setSelected] = useState<Category | 'الكل'>('الكل');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return selected === 'الكل' ? images : images.filter((i) => i.category === selected);
  }, [selected]);

  return (
    <div>
      <CategoryFilter selected={selected} onChange={setSelected} />



      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {filtered.map((item, idx) => (
          <button key={item.id} onClick={() => setViewerIndex(idx)}>
            <div className="relative">
              {!loaded[item.id] && <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />}
              <img
                loading="lazy"
                src={item.src}
                alt={item.alt}
                className={`h-48 w-full object-cover rounded ${loaded[item.id] ? '' : 'hidden'}`}
                onLoad={() => setLoaded((s) => ({ ...s, [item.id]: true }))}
                onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
              />
            </div>
          </button>
        ))}
      </div>

      {viewerIndex !== null && (
        <FullScreenViewer items={filtered} index={viewerIndex} onClose={() => setViewerIndex(null)} />
      )}
    </div>
  );
}