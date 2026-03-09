"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

type SearchFilterProps = {
  categories: { id: string; name: string }[];
  applications: { id: string; name: string }[];
  initialFilters: {
    query: string;
    categories: string[];
    applications: string[];
    minPrice?: number;
    maxPrice?: number;
  };
};

export function SearchFilter({ 
  categories, 
  applications,
  initialFilters
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local state for instant feedback on range inputs
  const [localMaxPrice, setLocalMaxPrice] = useState(initialFilters.maxPrice || 100000);

  // Tạo URL Mới
  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      
      // Reset page về 1 khi đổi bộ lọc
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const toggleArrayParam = (paramName: "categories" | "applications", value: string) => {
    let currentArray = initialFilters[paramName];
    let newArray = [...currentArray];
    
    if (newArray.includes(value)) {
      newArray = newArray.filter(i => i !== value);
    } else {
      newArray.push(value);
    }
    
    router.replace(`?${createQueryString({ [paramName]: newArray.length > 0 ? newArray.join(",") : null })}`, { scroll: false });
  };

  const clearAllFilters = () => {
    // Chỉ giữ lại query "q"
    const q = searchParams.get("q");
    router.replace(q ? `?q=${q}` : "?", { scroll: false });
  };

  const hasActiveFilters = initialFilters.categories.length > 0 || initialFilters.applications.length > 0 || initialFilters.maxPrice !== undefined;

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            Bộ Lọc
          </h3>
          {hasActiveFilters && (
            <button 
                onClick={clearAllFilters} 
                className="text-xs font-medium text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1 bg-slate-50 hover:bg-red-50 px-2 py-1 rounded"
            >
              <X className="w-3 h-3" /> Xóa tất cả
            </button>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <FilterSection title="Theo Danh Mục">
            {categories.map(cat => (
              <CheckboxItem 
                key={cat.id}
                label={cat.name} 
                checked={initialFilters.categories.includes(cat.name)}
                onChange={() => toggleArrayParam("categories", cat.name)}
              />
            ))}
          </FilterSection>
        )}

        <Separator />

        {/* Applications */}
        {applications.length > 0 && (
          <FilterSection title="Theo Ứng Dụng">
            {applications.map(app => (
              <CheckboxItem 
                key={app.id}
                label={app.name} 
                checked={initialFilters.applications.includes(app.name)}
                onChange={() => toggleArrayParam("applications", app.name)}
              />
            ))}
          </FilterSection>
        )}

        <Separator />

        {/* Price Range */}
        <div className="mb-2">
            <h4 className="text-sm font-bold text-slate-800 mb-4">Mức Giá Tối Đa</h4>
            <div className="px-2">
                <input 
                    type="range" 
                    min="1000" 
                    max="100000" 
                    step="1000"
                    value={localMaxPrice}
                    onChange={(e) => setLocalMaxPrice(parseInt(e.target.value))}
                    onMouseUp={(e) => {
                        const val = (e.target as HTMLInputElement).value;
                        router.replace(`?${createQueryString({ maxPrice: val })}`, { scroll: false });
                    }}
                    onTouchEnd={(e) => {
                        const val = (e.target as HTMLInputElement).value;
                        router.replace(`?${createQueryString({ maxPrice: val })}`, { scroll: false });
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                />
                <div className="flex justify-between mt-3 text-xs font-semibold text-slate-600">
                    <span>1.000đ</span>
                    <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded">
                        {localMaxPrice >= 100000 ? "100.000đ+" : `${localMaxPrice.toLocaleString("vi-VN")}đ`}
                    </span>
                </div>
            </div>
        </div>
    </aside>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-bold text-slate-800 mb-4">{title}</h4>
      <div className="space-y-3 pl-1">{children}</div>
    </div>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-5 w-5 appearance-none border border-slate-300 rounded focus:ring-2 focus:ring-blue-500/20 bg-white checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
        />
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors select-none">
        {label}
      </span>
    </label>
  );
}

function Separator() {
    return <hr className="border-slate-100 mb-6" />;
}
