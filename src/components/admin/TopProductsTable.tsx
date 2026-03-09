"use client";

import { Package } from "lucide-react";

interface TopProductsTableProps {
  products: { id: string; name: string; totalSold: number; revenue: number }[];
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <Package className="w-8 h-8 opacity-20 mb-3" />
        <p className="text-sm">Chưa có dữ liệu bán hàng 30 ngày qua.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-4 py-3 font-semibold rounded-tl-lg">Sản phẩm</th>
            <th className="px-4 py-3 font-semibold text-right">Đã bán</th>
            <th className="px-4 py-3 font-semibold text-right rounded-tr-lg">Doanh thu</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product, idx) => (
            <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <span className={`flex shrink-0 items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${
                    idx === 0 ? "bg-amber-100 text-amber-600" :
                    idx === 1 ? "bg-slate-200 text-slate-600" :
                    idx === 2 ? "bg-amber-50 text-amber-700" : "bg-slate-50 text-slate-400"
                  }`}>
                    #{idx + 1}
                  </span>
                  <p className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-1 max-w-[180px]" title={product.name}>
                    {product.name}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3.5 text-right font-medium text-slate-600">
                {product.totalSold.toLocaleString("vi-VN")}
              </td>
              <td className="px-4 py-3.5 text-right font-bold text-emerald-600">
                {product.revenue.toLocaleString("vi-VN")}đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
