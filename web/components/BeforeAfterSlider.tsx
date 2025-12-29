'use client';
import { useState } from 'react';

interface Props {
  beforeSrc: string;
  afterSrc: string;
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img src={beforeSrc} alt="قبل" className="absolute inset-0 w-full h-full object-cover" />
        <img
          src={afterSrc}
          alt="بعد"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${pos}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(parseInt(e.target.value, 10))}
        className="w-full mt-2"
      />
    </div>
  );
}