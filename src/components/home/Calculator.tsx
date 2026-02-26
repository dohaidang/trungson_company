"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Calculator as CalculatorIcon, ChevronDown } from "lucide-react";

// Brick types with conversion rates and prices
const BRICK_TYPES = [
  { name: "Gạch Tuynel (Tiêu chuẩn)", perSqm: 55, price: 1200 },
  { name: "Gạch Block 4 Lỗ", perSqm: 13, price: 3500 },
  { name: "Gạch Đỏ Đặc", perSqm: 80, price: 900 },
  { name: "Gạch Vỉa Hè", perSqm: 44, price: 2100 },
];

// Format number with thousands separator
function formatNumber(num: number): string {
  return num.toLocaleString("vi-VN");
}

export function Calculator() {
  const [area, setArea] = useState<string>("");
  const [brickIndex, setBrickIndex] = useState(0);

  const result = useMemo(() => {
    const areaNum = parseFloat(area);
    if (!areaNum || areaNum <= 0) return { quantity: 0, cost: 0 };
    const brick = BRICK_TYPES[brickIndex];
    const quantity = Math.ceil(areaNum * brick.perSqm);
    const cost = quantity * brick.price;
    return { quantity, cost };
  }, [area, brickIndex]);

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
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Diện Tích (m²)
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
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
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Loại Gạch
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-sm border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                    value={brickIndex}
                    onChange={(e) => setBrickIndex(Number(e.target.value))}
                  >
                    {BRICK_TYPES.map((brick, i) => (
                      <option key={brick.name} value={i}>
                        {brick.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-3 text-muted-foreground">
                    <ChevronDown className="size-5" />
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border" />

            {/* Results */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase text-muted-foreground">
                    Số Lượng Ước Tính
                  </span>
                  <span className="text-3xl font-black text-foreground">
                    {formatNumber(result.quantity)}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      viên
                    </span>
                  </span>
                </div>
                {result.cost > 0 && (
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Chi Phí Ước Tính
                    </span>
                    <span className="text-3xl font-black text-primary">
                      {formatNumber(result.cost)}
                      <span className="text-base font-normal text-muted-foreground">
                        đ
                      </span>
                    </span>
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {BRICK_TYPES[brickIndex].perSqm} viên/m² ×{" "}
                {formatNumber(BRICK_TYPES[brickIndex].price)}đ/viên
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
