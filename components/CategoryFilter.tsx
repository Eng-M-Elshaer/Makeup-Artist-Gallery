import type { Category } from "@/data/gallery";

interface Props {
  selected: Category | 'الكل';
  onChange: (c: Category | 'الكل') => void;
}

const categories: (Category | 'الكل')[] = ['الكل', 'زفاف', 'خطوبة', 'كتب كتاب', 'سوارية'];

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-3 py-1 rounded-full border text-sm ${
            selected === c ? 'bg-gray-900 text-white border-gray-900' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}