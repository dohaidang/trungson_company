"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Calculator as CalculatorIcon, ChevronDown } from "lucide-react";

// Cấu trúc Data mới theo yêu cầu
type BrickCategory = {
  name: string;
  items: {
    name: string;
    dimensions: string;
    perSqm: number;
    price: number; 
  }[];
}

const BRICK_CATEGORIES: BrickCategory[] = [
  {
    name: "A. Gạch xây Tuynel / gạch đỏ",
    items: [
      { name: "Gạch đặc (gạch thẻ)", dimensions: "190×90×55 mm", perSqm: 75, price: 1200 }, // Tính cho tường 110 (1 lớp)
      { name: "Gạch 2 lỗ", dimensions: "190×90×55 mm", perSqm: 75, price: 1100 },
      { name: "Gạch 4 lỗ", dimensions: "190×80×80 mm", perSqm: 55, price: 1400 },
      { name: "Gạch 4 lỗ (Biến thể)", dimensions: "190×90×80 mm", perSqm: 55, price: 1500 },
      { name: "Gạch 6 lỗ", dimensions: "220×105×60 mm", perSqm: 45, price: 2200 },
    ]
  },
  {
    name: "B. Gạch block bê tông",
    items: [
      { name: "Block đặc", dimensions: "390×190×190 mm", perSqm: 13, price: 12000 },
      { name: "Block rỗng (Dày 150)", dimensions: "390×190×150 mm", perSqm: 13, price: 10000 },
      { name: "Block rỗng (Dày 100)", dimensions: "390×190×100 mm", perSqm: 13, price: 8500 },
    ]
  },
  {
    name: "C. Gạch lát nền (Ceramic/Granite)",
    items: [
      { name: "Gạch lát 300×300", dimensions: "300×300 mm", perSqm: 11.1, price: 8000 }, // Tính theo viên
      { name: "Gạch lát 400×400", dimensions: "400×400 mm", perSqm: 6.25, price: 15000 },
      { name: "Gạch lát 500×500", dimensions: "500×500 mm", perSqm: 4, price: 25000 },
      { name: "Gạch lát 600×600", dimensions: "600×600 mm", perSqm: 2.78, price: 40000 },
      { name: "Gạch lát 800×800", dimensions: "800×800 mm", perSqm: 1.56, price: 90000 },
      { name: "Gạch lát 600×1200", dimensions: "600×1200 mm", perSqm: 1.39, price: 150000 },
    ]
  },
  {
    name: "D. Gạch thẻ ốp tường",
    items: [
      { name: "Thẻ ốp 75×150", dimensions: "75×150 mm", perSqm: 88.8, price: 2000 },
      { name: "Thẻ ốp 100×200", dimensions: "100×200 mm", perSqm: 50, price: 3000 },
      { name: "Thẻ ốp 60×240", dimensions: "60×240 mm", perSqm: 69.4, price: 2500 },
      { name: "Thẻ ốp 100×300", dimensions: "100×300 mm", perSqm: 33.3, price: 5000 },
    ]
  },
  {
    name: "E. Gạch giả cổ / trang trí",
    items: [
      { name: "Giả cổ 200×100", dimensions: "200×100×50 mm", perSqm: 50, price: 4000 },
      { name: "Giả cổ 230×110", dimensions: "230×110×60 mm", perSqm: 40, price: 5000 },
    ]
  }
];

// Format number with thousands separator
function formatNumber(num: number): string {
  return num.toLocaleString("vi-VN");
}

export function Calculator() {
  const [area, setArea] = useState<string>("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);

  // Reset item index when category changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryIndex(Number(e.target.value));
    setItemIndex(0);
  };

  const result = useMemo(() => {
    const areaNum = parseFloat(area);
    if (!areaNum || areaNum <= 0) return { quantity: 0, cost: 0, item: null };
    
    const category = BRICK_CATEGORIES[categoryIndex];
    if (!category || !category.items[itemIndex]) return { quantity: 0, cost: 0, item: null };

    const item = category.items[itemIndex];
    // Tính toán số lượng (làm tròn lên)
    const quantity = Math.ceil(areaNum * item.perSqm);
    const cost = quantity * item.price;
    
    return { quantity, cost, item };
  }, [area, categoryIndex, itemIndex]);

  return (
    <section className="w-full bg-muted/30 py-20" id="calculator">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 rounded-none border border-border bg-card shadow-xl md:flex-row md:items-stretch md:p-0 overflow-hidden">
          {/* Left: Info & Image */}
          <div className="relative flex flex-col justify-center p-8 text-white md:w-1/3">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbAP2lKJ7BC25G14XiZSsAp5ooblqYdTqq-zLA4_PHWPutdZ18C923BLZA25Hl3fmkYnjVCa4B18xlEQsTjLzacK_wcBjmetjGT-LK-pP2YO6gApfJtPzYBjtRRklBOnnobtkfHhZi91GnIH6G97SMnCkZYD4JST3cFi3iGzIStC8aJo0HDJux-oojR_8g50spmxKhXX4NYl6Tm7sysT3e6GpkiJL_uANFqFAJiltVNSRqxWj_zSTjJIYuZNM898Mi4JFd2eZRD8Y"
              alt="Calculator Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#2a1d1b]/90" />

            <div className="relative z-10">
              <div className="mb-4 text-primary">
                <CalculatorIcon className="size-12" />
              </div>
              <h2 className="mb-2 text-2xl font-black uppercase tracking-tight">
                Tính Dự Toán
              </h2>
              <p className="text-sm font-light text-gray-300">
                Lên kế hoạch ngân sách chính xác. Nhập kích thước để ước tính số
                lượng gạch cần thiết ngay lập tức.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-1 flex-col gap-6 p-8 md:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Diện Tích (m²)
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="VD: 50"
                    type="number"
                    min="0"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <span className="absolute right-4 top-3 text-sm text-muted-foreground">
                    m²
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Danh mục Gạch
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-sm border border-input bg-background pl-4 pr-10 py-3 text-sm font-bold text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer transition-all truncate"
                    value={categoryIndex}
                    onChange={handleCategoryChange}
                  >
                    {BRICK_CATEGORIES.map((cat, i) => (
                      <option key={i} value={i}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-3 text-muted-foreground">
                    <ChevronDown className="size-5" />
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 sm:col-span-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Loại Gạch & Kích Thước
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-sm border border-input bg-background pl-4 pr-10 py-3 text-sm font-medium text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer transition-all"
                    value={itemIndex}
                    onChange={(e) => setItemIndex(Number(e.target.value))}
                  >
                    {BRICK_CATEGORIES[categoryIndex]?.items.map((item, i) => (
                      <option key={i} value={i}>
                        {item.name} ({item.dimensions})
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-3 text-muted-foreground">
                    <ChevronDown className="size-5" />
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border mt-2" />

            {/* Results */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between bg-primary/5 p-6 rounded-lg border border-primary/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase text-primary mb-1">
                    Số Lượng Ước Tính
                  </span>
                  <span className="text-4xl font-black text-foreground">
                    {formatNumber(result.quantity)}{" "}
                    <span className="text-base font-bold text-muted-foreground">
                      viên
                    </span>
                  </span>
                </div>
                {result.cost > 0 && (
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-primary mb-1">
                      Chi Phí Vật Tư (Tham khảo)
                    </span>
                    <span className="text-4xl font-black text-primary">
                      {formatNumber(result.cost)}
                      <span className="text-base font-bold text-muted-foreground">
                        đ
                      </span>
                    </span>
                  </div>
                )}
              </div>
              {result.item && (
                <div className="text-xs font-medium text-muted-foreground bg-white/60 px-3 py-2 rounded border border-border mt-4 sm:mt-0">
                  <span className="block mb-1 text-primary font-bold">Thông số:</span>
                  Định mức: {result.item.perSqm} viên/m²<br/>
                  Đơn giá: {formatNumber(result.item.price)}đ/viên
                </div>
              )}
            </div>
            
            <div className="mt-4 flex flex-col gap-2 rounded-md bg-amber-500/10 p-4 border border-amber-500/20 text-xs text-amber-600/90 dark:text-amber-500/90">
              <p className="font-bold uppercase tracking-wide">
                * Lưu ý quan trọng:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Kết quả tính toán trên <strong>chỉ mang tính chất tham khảo</strong> để ước tính sơ bộ ngân sách.</li>
                <li>Số lượng đã được tính bao gồm hao hụt và mạch vữa tiêu chuẩn (10-15mm).</li>
                <li>Dữ liệu tính toán gạch xây tường đang được áp dụng cho quy chuẩn tường đơn (dày 110mm).</li>
                <li>Tùy vào điều kiện thi công thực tế, tay nghề thợ, và thiết kế bản vẽ mà khối lượng và chi phí thực tế có thể thay đổi. Vui lòng liên hệ trực tiếp với chúng tôi để được tư vấn chính xác nhất.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
