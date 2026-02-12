"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export function ProductFilter() {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-card border border-border p-6 sticky top-24 rounded-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">
            Bộ Lọc
          </h3>
          <button className="text-xs text-muted-foreground hover:text-primary underline">
            Xóa tất cả
          </button>
        </div>

        {/* Color Filter */}
        <FilterSection title="Màu Sắc">
          <CheckboxItem label="Đỏ Đất Nung" count={124} defaultChecked />
          <CheckboxItem label="Kem / Be" count={45} />
          <CheckboxItem label="Xám Đá" count={32} />
          <CheckboxItem label="Hỗn Hợp" count={18} />
        </FilterSection>

        <Separator />

        {/* Type Filter */}
        <FilterSection title="Loại Gạch">
          <CheckboxItem label="Gạch Đặc" />
          <CheckboxItem label="Gạch 2 Lỗ" defaultChecked />
          <CheckboxItem label="Gạch 4 Lỗ" />
          <CheckboxItem label="Gạch Lát Sân" />
        </FilterSection>

        <Separator />

        {/* Surface Filter */}
        <FilterSection title="Bề Mặt">
            <CheckboxItem label="Nhám" />
            <CheckboxItem label="Bóng" />
            <CheckboxItem label="Sần Sùi" />
        </FilterSection>

        <Separator />

        {/* Price Filter */}
        <div className="mb-8">
            <h4 className="text-sm font-bold text-foreground mb-4">Khoảng Giá</h4>
            <div className="px-2">
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="40"
                    className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between mt-3 text-xs text-muted-foreground font-medium">
                    <span>1.000₫</span>
                    <span>50.000₫+</span>
                </div>
            </div>
        </div>
      </div>
    </aside>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        {title}
      </h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function CheckboxItem({
  label,
  count,
  defaultChecked,
}: {
  label: string;
  count?: number;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer h-5 w-5 appearance-none border border-input rounded-sm bg-background checked:bg-primary checked:border-primary transition-all"
        />
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors select-none">
        {label}
      </span>
      {count !== undefined && (
        <span className="ml-auto text-xs text-muted-foreground/60">
          ({count})
        </span>
      )}
    </label>
  );
}

function Separator() {
    return <hr className="border-border mb-6" />;
}
