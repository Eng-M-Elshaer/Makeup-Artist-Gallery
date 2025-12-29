import { useState } from 'react';
import type { ImageItem } from '@/data/gallery';

interface Props {
  items: ImageItem[];
  index: number;
  onClose: () => void;
}

export default function FullScreenViewer({ items, index, onClose }: Props) {
  const [curr, setCurr] = useState(index);
  const [zoom, setZoom] = useState(1);

  const goPrev = () => setCurr((i) => (i > 0 ? i - 1 : items.length - 1));
  const goNext = () => setCurr((i) => (i < items.length - 1 ? i + 1 : 0));

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="flex justify-between items-center p-3 text-white">
        <button onClick={onClose} className="px-3 py-1 border rounded">إغلاق</button>
        <div className="flex gap-2">
          <button onClick={goPrev} className="px-3 py-1 border rounded">سابق</button>
          <button onClick={goNext} className="px-3 py-1 border rounded">التالي</button>
          <button onClick={() => setZoom((z) => (z === 1 ? 2 : 1))} className="px-3 py-1 border rounded">
            {zoom === 1 ? 'تكبير' : 'تصغير'}
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img
          src={items[curr].src}
          alt={items[curr].alt}
          className="max-h-[85vh] object-contain transition-transform"
          style={{ transform: `scale(${zoom})` }}
          onError={(e) => ((e.currentTarget.src = '/placeholder.svg'), (e.currentTarget.alt = 'Placeholder'))}
        />
      </div>
    </div>
  );
}