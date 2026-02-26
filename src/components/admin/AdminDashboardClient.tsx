"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  ChevronUp,
  ChevronDown,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Edit,
  Trash2,
  BarChart3,
  ArrowUpRight,
  Bell,
  Settings,
  Home,
} from "lucide-react";

// ===== MOCK DATA =====
const MOCK_STATS = {
  revenue: 287500000,
  revenueChange: 12.5,
  orders: 156,
  ordersChange: 8.3,
  users: 1243,
  usersChange: 15.2,
  products: 48,
  productsChange: -2.1,
};

const MOCK_REVENUE_CHART = [
  { month: "T1", value: 18 },
  { month: "T2", value: 25 },
  { month: "T3", value: 22 },
  { month: "T4", value: 30 },
  { month: "T5", value: 28 },
  { month: "T6", value: 35 },
  { month: "T7", value: 32 },
  { month: "T8", value: 40 },
  { month: "T9", value: 38 },
  { month: "T10", value: 45 },
  { month: "T11", value: 42 },
  { month: "T12", value: 50 },
];

const MOCK_ORDERS = [
  { id: "DH-2024-156", customer: "Nguyễn Văn A", email: "nguyenvana@gmail.com", items: "Gạch Tuynel A1 ×2000", total: 2400000, status: "delivered" as const, date: "26/02/2024" },
  { id: "DH-2024-155", customer: "Trần Thị B", email: "tranthib@gmail.com", items: "Gạch Block 4 Lỗ ×500", total: 1750000, status: "shipping" as const, date: "25/02/2024" },
  { id: "DH-2024-154", customer: "Lê Văn C", email: "levanc@gmail.com", items: "Gạch Vỉa Hè ×1000", total: 2100000, status: "processing" as const, date: "25/02/2024" },
  { id: "DH-2024-153", customer: "Phạm Thị D", email: "phamthid@gmail.com", items: "Gạch Đỏ Đặc ×3000", total: 2700000, status: "delivered" as const, date: "24/02/2024" },
  { id: "DH-2024-152", customer: "Hoàng Văn E", email: "hoangvane@gmail.com", items: "Gạch Ốp Tường ×200", total: 480000, status: "cancelled" as const, date: "24/02/2024" },
  { id: "DH-2024-151", customer: "Vũ Thị F", email: "vuthif@gmail.com", items: "Gạch Cổ Điển ×800", total: 1480000, status: "delivered" as const, date: "23/02/2024" },
  { id: "DH-2024-150", customer: "Đặng Văn G", email: "dangvang@gmail.com", items: "Gạch Tuynel A1 ×5000", total: 6000000, status: "shipping" as const, date: "22/02/2024" },
  { id: "DH-2024-149", customer: "Bùi Thị H", email: "buithih@gmail.com", items: "Gạch Block ×1500", total: 5250000, status: "processing" as const, date: "21/02/2024" },
];

const MOCK_PRODUCTS = [
  { id: "SP-001", name: "Gạch Đặc Tuynel A1", category: "Gạch xây", price: 1200, stock: 50000, sold: 12500, status: "active" as const },
  { id: "SP-002", name: "Gạch 2 Lỗ Tiêu Chuẩn", category: "Gạch xây", price: 1050, stock: 35000, sold: 8900, status: "active" as const },
  { id: "SP-003", name: "Gạch Block 4 Lỗ", category: "Gạch block", price: 3500, stock: 20000, sold: 6200, status: "active" as const },
  { id: "SP-004", name: "Gạch Ốp Tường Xám Đá", category: "Gạch ốp", price: 2400, stock: 15000, sold: 4100, status: "active" as const },
  { id: "SP-005", name: "Gạch Ốp Cổ Điển", category: "Gạch ốp", price: 1850, stock: 0, sold: 3200, status: "outofstock" as const },
  { id: "SP-006", name: "Gạch Vỉa Hè", category: "Gạch lát", price: 2100, stock: 25000, sold: 7600, status: "active" as const },
];

const MOCK_USERS = [
  { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", phone: "0909 111 222", orders: 12, spent: 28500000, role: "customer" as const, joined: "15/01/2024" },
  { id: 2, name: "Trần Thị B", email: "tranthib@gmail.com", phone: "0912 333 444", orders: 8, spent: 15200000, role: "customer" as const, joined: "20/01/2024" },
  { id: 3, name: "Admin Trung Sơn", email: "admin@trungson.vn", phone: "0901 000 001", orders: 0, spent: 0, role: "admin" as const, joined: "01/01/2024" },
  { id: 4, name: "Lê Văn C", email: "levanc@gmail.com", phone: "0918 555 666", orders: 5, spent: 9800000, role: "customer" as const, joined: "05/02/2024" },
  { id: 5, name: "Phạm Thị D", email: "phamthid@gmail.com", phone: "0935 777 888", orders: 15, spent: 42000000, role: "vip" as const, joined: "10/12/2023" },
  { id: 6, name: "Hoàng Văn E", email: "hoangvane@gmail.com", phone: "0977 999 000", orders: 3, spent: 4200000, role: "customer" as const, joined: "12/02/2024" },
];

const STATUS_MAP = {
  processing: { label: "Đang xử lý", color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
  shipping: { label: "Đang giao", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Truck },
  delivered: { label: "Đã giao", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 },
  cancelled: { label: "Đã hủy", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
};

const ROLE_MAP = {
  admin: { label: "Admin", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  vip: { label: "VIP", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  customer: { label: "Khách hàng", color: "bg-slate-500/10 text-slate-600 border-slate-500/20" },
};

type TabKey = "overview" | "orders" | "products" | "users";

const SIDEBAR_ITEMS = [
  { key: "overview" as TabKey, label: "Tổng Quan", icon: LayoutDashboard },
  { key: "orders" as TabKey, label: "Đơn Hàng", icon: ShoppingCart },
  { key: "products" as TabKey, label: "Sản Phẩm", icon: Package },
  { key: "users" as TabKey, label: "Người Dùng", icon: Users },
];

export function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#f4f6f9]">
      {/* Dark Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#1e1e2d] text-gray-300 shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-black">
              TS
            </div>
            <div>
              <p className="text-sm font-bold text-white">Admin Panel</p>
              <p className="text-[10px] text-gray-500">Trung Sơn Company</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col p-3 gap-0.5">
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Quản lý</p>
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                activeTab === item.key
                  ? "bg-primary/20 text-primary"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </button>
          ))}

          <div className="h-px bg-white/5 my-3" />
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Hệ thống</p>

          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings className="size-[18px]" />
            Cài Đặt
          </button>
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Home className="size-[18px]" />
            Về Trang Chủ
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">A</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Admin</p>
              <p className="text-[10px] text-gray-500 truncate">admin@trungson.vn</p>
            </div>
            <button className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1e1e2d] border-t border-white/10 flex">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-bold transition-colors ${
              activeTab === item.key ? "text-primary" : "text-gray-500"
            }`}
          >
            <item.icon className="size-5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-gray-900">
              {SIDEBAR_ITEMS.find((i) => i.key === activeTab)?.label || "Dashboard"}
            </h1>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              A
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "users" && <UsersTab />}
        </div>
      </main>
    </div>
  );
}

/* ============================= */
/* ========= OVERVIEW ========= */
/* ============================= */
function OverviewTab() {
  const stats = [
    { label: "Doanh Thu", value: `${(MOCK_STATS.revenue / 1000000).toFixed(0)}M`, change: MOCK_STATS.revenueChange, icon: DollarSign, color: "bg-emerald-500" },
    { label: "Đơn Hàng", value: MOCK_STATS.orders.toString(), change: MOCK_STATS.ordersChange, icon: ShoppingCart, color: "bg-blue-500" },
    { label: "Người Dùng", value: MOCK_STATS.users.toLocaleString(), change: MOCK_STATS.usersChange, icon: Users, color: "bg-purple-500" },
    { label: "Sản Phẩm", value: MOCK_STATS.products.toString(), change: MOCK_STATS.productsChange, icon: Package, color: "bg-amber-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} text-white`}>
                <stat.icon className="size-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {stat.change >= 0 ? (
                <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600">
                  <ChevronUp className="size-3" />+{stat.change}%
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-xs font-bold text-red-500">
                  <ChevronDown className="size-3" />{stat.change}%
                </span>
              )}
              <span className="text-[10px] text-gray-400">so với tháng trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="xl:col-span-3 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-gray-900">Biểu Đồ Doanh Thu</h2>
              <p className="text-xs text-gray-400 mt-0.5">12 tháng gần nhất (triệu VNĐ)</p>
            </div>
            <BarChart3 className="size-5 text-gray-300" />
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-2 h-48">
            {MOCK_REVENUE_CHART.map((item) => {
              const height = (item.value / 50) * 100;
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[9px] font-bold text-gray-400">{item.value}M</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/60 transition-all hover:from-primary hover:to-primary/80 cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${item.month}: ${item.value}M VNĐ`}
                  />
                  <span className="text-[10px] font-medium text-gray-400">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="xl:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Top Sản Phẩm</h2>
            <ArrowUpRight className="size-4 text-gray-300" />
          </div>
          <div className="flex flex-col gap-4">
            {MOCK_PRODUCTS.sort((a, b) => b.sold - a.sold).slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs font-black text-gray-500">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-400">{p.sold.toLocaleString()} đã bán</p>
                </div>
                <p className="text-sm font-bold text-primary">{p.price.toLocaleString()}đ</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Đơn Hàng Mới Nhất</h2>
          <span className="text-xs font-bold text-primary cursor-pointer hover:underline">Xem tất cả →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Mã ĐH</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Khách Hàng</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">Sản Phẩm</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Trạng Thái</th>
                <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Tổng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_ORDERS.slice(0, 5).map((order) => {
                const st = STATUS_MAP[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-bold text-gray-900">{order.id}</td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-[10px] text-gray-400">{order.email}</p>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-500 max-w-[200px] truncate hidden md:table-cell">{order.items}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${st.color}`}>
                        <st.icon className="size-3" />{st.label}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right text-sm font-bold text-gray-900">{order.total.toLocaleString()}đ</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================== */
/* ========= ORDERS ========= */
/* =========================== */
function OrdersTab() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_ORDERS
    .filter((o) => filter === "all" || o.status === filter)
    .filter((o) => search === "" || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-5">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo mã ĐH hoặc tên khách..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
        <div className="flex gap-1.5">
          {[
            { key: "all", label: "Tất cả" },
            { key: "processing", label: "Chờ xử lý" },
            { key: "shipping", label: "Đang giao" },
            { key: "delivered", label: "Hoàn thành" },
            { key: "cancelled", label: "Đã hủy" },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                filter === f.key ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
              }`}
            >{f.label}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Mã ĐH</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Khách Hàng</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Ngày</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">Sản Phẩm</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Trạng Thái</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Tổng Tiền</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => {
                const st = STATUS_MAP[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{order.id}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-[10px] text-gray-400">{order.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{order.date}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 max-w-[200px] truncate hidden md:table-cell">{order.items}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${st.color}`}>
                        <st.icon className="size-3" />{st.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm font-bold text-primary">{order.total.toLocaleString()}đ</td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">Không tìm thấy đơn hàng phù hợp.</div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">Hiển thị {filtered.length} / {MOCK_ORDERS.length} đơn hàng</p>
        </div>
      </div>
    </div>
  );
}

/* ============================== */
/* ========= PRODUCTS ========== */
/* ============================== */
function ProductsTab() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_PRODUCTS.filter((p) => search === "" || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input type="text" placeholder="Tìm sản phẩm..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="size-4" /> Thêm Sản Phẩm
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Mã SP</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Tên</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">Danh Mục</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Giá</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">Tồn Kho</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">Đã Bán</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Trạng Thái</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-400">{p.id}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{p.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 hidden lg:table-cell">{p.category}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-right text-primary">{p.price.toLocaleString()}đ</td>
                  <td className="px-5 py-3.5 text-sm text-right text-gray-500 hidden md:table-cell">
                    <span className={p.stock === 0 ? "text-red-500 font-bold" : ""}>{p.stock.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-right text-gray-500 hidden md:table-cell">{p.sold.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    {p.status === "active" ? (
                      <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">Đang bán</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-600">Hết hàng</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"><Edit className="size-3.5" /></button>
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="size-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">Tổng {filtered.length} sản phẩm</p>
        </div>
      </div>
    </div>
  );
}

/* ========================== */
/* ========= USERS ========= */
/* ========================== */
function UsersTab() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_USERS.filter((u) => search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input type="text" placeholder="Tìm người dùng..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Người Dùng</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">SĐT</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Vai Trò</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Đơn Hàng</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">Chi Tiêu</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">Ngày TG</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user) => {
                const role = ROLE_MAP[user.role];
                return (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{user.name}</p>
                          <p className="text-[10px] text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 hidden md:table-cell">{user.phone}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${role.color}`}>
                        {role.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-900 text-right">{user.orders}</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-primary text-right hidden lg:table-cell">{user.spent > 0 ? `${(user.spent / 1000000).toFixed(1)}M` : "—"}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 hidden lg:table-cell">{user.joined}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">Tổng {filtered.length} người dùng</p>
        </div>
      </div>
    </div>
  );
}
