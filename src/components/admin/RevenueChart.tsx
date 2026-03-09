"use client";

import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface RevenueChartProps {
  data: { date: string; revenue: number; orders: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [activeTab, setActiveTab] = useState<"revenue" | "orders">("revenue");

  // Format Y-Axis for currency (e.g., 1000000 -> 1M, or just divide by 1_000_000)
  const formatYAxis = (tickItem: number) => {
    if (activeTab === "orders") return tickItem.toString();
    if (tickItem === 0) return "0";
    return `${(tickItem / 1000000).toLocaleString("vi-VN")}M`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-100 p-3 shadow-lg rounded-xl">
          <p className="font-bold text-slate-800 text-sm mb-1">{label}</p>
          {activeTab === "revenue" ? (
            <p className="text-blue-600 font-medium text-sm">
                Doanh thu: {payload[0].value.toLocaleString("vi-VN")} đ
            </p>
          ) : (
            <p className="text-emerald-600 font-medium text-sm">
                Đơn hàng: {payload[0].value} đơn
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-slate-500">Chưa có dữ liệu giao dịch</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 bg-slate-50 w-fit p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("revenue")}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === "revenue" 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Doanh Thu
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === "orders" 
              ? "bg-white text-emerald-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Số Đơn Hàng
        </button>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            {activeTab === "revenue" ? (
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563eb" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
                animationDuration={1500}
              />
            ) : (
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#059669" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, fill: "#059669", stroke: "#fff", strokeWidth: 2 }}
                animationDuration={1500}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
