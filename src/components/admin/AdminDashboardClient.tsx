"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  DollarSign,
  Eye,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  BarChart3,
  ArrowUpRight,
  Bell,
  Settings,
  Home,
  Loader2,
  AlertCircle,
  PackageCheck,
  EyeOff,
  Plus,
  Trash2,
  Edit2,
  Mail,
} from "lucide-react";
import { updateOrderStatus, toggleProductPublish, deleteProduct, deleteUser, toggleContactReadStatus, deleteContact } from "@/app/actions/admin";

// ===== TYPES =====
interface StatsData {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  unreadContacts: number;
  revenue: number;
  ordersByStatus: { status: string; count: number }[];
  recentOrders: {
    id: string;
    customer: string;
    email: string;
    items: string;
    total: number;
    status: string;
    date: string;
  }[];
}

interface OrderData {
  id: string;
  customer: string;
  email: string;
  items: string;
  total: number;
  status: string;
  date: string;
}

interface ProductData {
  id: string;
  name: string;
  slug: string;
  type: string;
  price: number;
  isPublished: boolean;
  totalSold: number;
  stock: number;
  application: string[];
  dimensions: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joined: string;
  orders: number;
  spent: number;
}

export interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface AdminDashboardClientProps {
  stats: StatsData | null;
  orders: OrderData[];
  products: ProductData[];
  users: UserData[];
  contacts: ContactData[];
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Chờ xử lý", color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: PackageCheck },
  delivering: { label: "Đang giao", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Truck },
  completed: { label: "Đã giao", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 },
  cancelled: { label: "Đã hủy", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
};

const ROLE_MAP: Record<string, { label: string; color: string }> = {
  admin: { label: "Admin", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  contractor: { label: "Nhà thầu", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  customer: { label: "Khách hàng", color: "bg-slate-500/10 text-slate-600 border-slate-500/20" },
};

type TabKey = "overview" | "orders" | "products" | "users" | "contacts";

const SIDEBAR_ITEMS = [
  { key: "overview" as TabKey, label: "Tổng Quan", icon: LayoutDashboard },
  { key: "orders" as TabKey, label: "Đơn Hàng", icon: ShoppingCart },
  { key: "products" as TabKey, label: "Sản Phẩm", icon: Package },
  { key: "users" as TabKey, label: "Người Dùng", icon: Users },
  { key: "contacts" as TabKey, label: "Liên Hệ", icon: Mail },
];

export function AdminDashboardClient({ stats, orders, products, users, contacts }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingOrdersCount = stats?.ordersByStatus.find(s => s.status === 'PENDING')?.count || 0;
  const totalNotifications = (stats?.unreadContacts || 0) + pendingOrdersCount;

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#f4f6f9]">
      {/* Dark Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#1e1e2d] text-gray-300 shrink-0">
        <div className="px-5 py-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-black">TS</div>
            <div>
              <p className="text-sm font-bold text-white">Admin Panel</p>
              <p className="text-[10px] text-gray-500">Trung Sơn Company</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 flex flex-col p-3 gap-0.5">
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Quản lý</p>
          {SIDEBAR_ITEMS.map((item) => (
            <button key={item.key} onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                activeTab === item.key ? "bg-primary/20 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}>
              <item.icon className="size-[18px]" />
              {item.label}
            </button>
          ))}
          <div className="h-px bg-white/5 my-3" />
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Hệ thống</p>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings className="size-[18px]" /> Cài Đặt
          </button>
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Home className="size-[18px]" /> Về Trang Chủ
          </Link>
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">A</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Admin</p>
              <p className="text-[10px] text-gray-500 truncate">admin@trungson.vn</p>
            </div>
            <button className="text-gray-500 hover:text-red-400 transition-colors"><LogOut className="size-4" /></button>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1e1e2d] border-t border-white/10 flex">
        {SIDEBAR_ITEMS.map((item) => (
          <button key={item.key} onClick={() => setActiveTab(item.key)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-bold transition-colors ${
              activeTab === item.key ? "text-primary" : "text-gray-500"
            }`}>
            <item.icon className="size-5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-gray-900">
              {SIDEBAR_ITEMS.find((i) => i.key === activeTab)?.label || "Dashboard"}
            </h1>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3 relative">
            {stats && totalNotifications > 0 && (
              <>
                {showNotifications && (
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                )}
                <div className="relative z-50">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative p-2 rounded-lg transition-colors ${showNotifications ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 text-gray-500'}`}
                    title="Thông báo"
                  >
                    <Bell className="size-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  </button>

                  {/* Dropdown Menu */}
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden origin-top-right">
                      <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Thông báo mới</span>
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{totalNotifications}</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-1">
                        {stats.unreadContacts > 0 && (
                          <div 
                            onClick={() => { setActiveTab("contacts"); setShowNotifications(false); }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors group"
                          >
                            <div className="mt-0.5 bg-amber-100 p-1.5 rounded-lg text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                              <Bell className="size-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 group-hover:text-amber-700">{stats.unreadContacts} liên hệ chưa đọc</p>
                              <p className="text-xs text-gray-500 mt-0.5">Khách hàng gửi qua form website</p>
                            </div>
                          </div>
                        )}
                        {pendingOrdersCount > 0 && (
                          <div 
                            onClick={() => { setActiveTab("orders"); setShowNotifications(false); }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
                          >
                            <div className="mt-0.5 bg-blue-100 p-1.5 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                              <Clock className="size-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700">{pendingOrdersCount} đơn hàng chờ xử lý</p>
                              <p className="text-xs text-gray-500 mt-0.5">Cần được phê duyệt giao hàng</p>
                            </div>
                          </div>
                        )}
                        {totalNotifications === 0 && (
                          <p className="text-sm text-gray-500 text-center py-4">Không có thông báo mới.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">A</div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === "overview" && <OverviewTab stats={stats} orders={orders} users={users} />}
          {activeTab === "orders" && <OrdersTab orders={orders} />}
          {activeTab === "products" && <ProductsTab products={products} />}
          {activeTab === "users" && <UsersTab users={users} />}
          {activeTab === "contacts" && <ContactsTab contacts={contacts} />}
        </div>
      </main>
    </div>
  );
}

/* ============================= */
/* ========= OVERVIEW ========= */
/* ============================= */
function OverviewTab({ stats, orders, users }: { stats: StatsData | null; orders: OrderData[]; users: UserData[] }) {
  if (!stats) {
    return <div className="text-center py-12 text-gray-400">Không thể tải dữ liệu thống kê.</div>;
  }

  const statCards = [
    { label: "Doanh Thu", value: `${(stats.revenue / 1000000).toFixed(0)}M`, icon: DollarSign, color: "bg-emerald-500" },
    { label: "Đơn Hàng", value: stats.totalOrders.toString(), icon: ShoppingCart, color: "bg-blue-500" },
    { label: "Người Dùng", value: stats.totalUsers.toLocaleString(), icon: Users, color: "bg-purple-500" },
    { label: "Sản Phẩm", value: stats.totalProducts.toString(), icon: Package, color: "bg-amber-500" },
  ];

  // Calculate role counts for user summary
  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat) => (
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
          </div>
        ))}
      </div>

      {/* Order Status breakdown + Notifications */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-gray-900">Phân Bố Đơn Hàng</h2>
              <p className="text-xs text-gray-400 mt-0.5">Theo trạng thái</p>
            </div>
            <BarChart3 className="size-5 text-gray-300" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.ordersByStatus.map((item) => {
              const st = STATUS_MAP[item.status.toLowerCase()] || { label: item.status, color: "bg-gray-100 text-gray-600", icon: Package };
              return (
                <div key={item.status} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <st.icon className="size-5 text-gray-400" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">{st.label}</p>
                    <p className="text-xl font-black text-gray-900">{item.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm scroll-mt-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Chi Tiết Cần Xử Lý</h2>
            <ArrowUpRight className="size-4 text-gray-300" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50">
              <Bell className="size-5 text-amber-500" />
              <div>
                <p className="text-sm font-bold text-gray-900">{stats.unreadContacts} liên hệ chưa đọc</p>
                <p className="text-xs text-gray-400">Từ form liên hệ website</p>
              </div>
            </div>
            {stats.ordersByStatus.filter(s => s.status === 'PENDING').map(s => (
              <div key={s.status} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                <Clock className="size-5 text-blue-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{s.count} đơn chờ xử lý</p>
                  <p className="text-xs text-gray-400">Cần xác nhận sớm</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Đơn Hàng Mới Nhất</h2>
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
              {(stats.recentOrders || orders.slice(0, 5)).map((order) => {
                const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-bold text-gray-900">{order.id.slice(0, 12)}...</td>
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

      {/* Top Customers + User Role Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Top Customers */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Top Khách Hàng</h2>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Theo chi tiêu</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">#</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Khách Hàng</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">SĐT</th>
                  <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Đơn Hàng</th>
                  <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Chi Tiêu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...users]
                  .sort((a, b) => b.spent - a.spent)
                  .slice(0, 5)
                  .map((user, i) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black ${
                          i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-gray-200 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"
                        }`}>{i + 1}</span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 hidden md:table-cell">{user.phone || "—"}</td>
                      <td className="px-6 py-3 text-sm font-bold text-gray-900 text-right">{user.orders}</td>
                      <td className="px-6 py-3 text-sm font-bold text-primary text-right">
                        {user.spent > 0 ? `${(user.spent / 1000000).toFixed(1)}M` : "0đ"}
                      </td>
                    </tr>
                  ))}
                {users.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-sm text-gray-400">Chưa có dữ liệu khách hàng</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Role Summary */}
        <div className="xl:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Phân Loại Users</h2>
            <Users className="size-4 text-gray-300" />
          </div>
          <div className="flex flex-col gap-3">
            {Object.entries(roleCounts).length > 0 ? Object.entries(roleCounts).map(([role, count]) => {
              const roleInfo = ROLE_MAP[role] || { label: role, color: "bg-gray-100 text-gray-600 border-gray-200" };
              const pct = users.length > 0 ? Math.round((count / users.length) * 100) : 0;
              return (
                <div key={role} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${roleInfo.color}`}>
                      {roleInfo.label}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{count} người</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-500">{pct}%</span>
                  </div>
                </div>
              );
            }) : (
              <p className="text-sm text-gray-400 text-center py-4">Chưa có dữ liệu</p>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Tổng người dùng</span>
              <span className="text-lg font-black text-gray-900">{users.length}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-400">Tổng chi tiêu</span>
              <span className="text-sm font-bold text-primary">
                {(users.reduce((sum, u) => sum + u.spent, 0) / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================== */
/* ========= ORDERS ========= */
/* =========================== */
function OrdersTab({ orders }: { orders: OrderData[] }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filtered = orders
    .filter((o) => filter === "all" || o.status === filter)
    .filter((o) => search === "" || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  const handleStatusChange = (orderId: string, newStatus: string) => {
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus.toUpperCase());
      if (result.success) {
        setActionMsg({ type: "success", text: "Cập nhật trạng thái thành công" });
      } else {
        setActionMsg({ type: "error", text: result.error || "Lỗi cập nhật" });
      }
      setTimeout(() => setActionMsg(null), 3000);
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {actionMsg && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${
          actionMsg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {actionMsg.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {actionMsg.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input type="text" placeholder="Tìm theo mã ĐH hoặc tên khách..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[
            { key: "all", label: "Tất cả" },
            { key: "pending", label: "Chờ xử lý" },
            { key: "confirmed", label: "Đã xác nhận" },
            { key: "delivering", label: "Đang giao" },
            { key: "completed", label: "Hoàn thành" },
            { key: "cancelled", label: "Đã hủy" },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                filter === f.key ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
              }`}>{f.label}</button>
          ))}
        </div>
      </div>

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
                const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{order.id.slice(0, 12)}...</td>
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
                      {order.status === "pending" && (
                        <button onClick={() => handleStatusChange(order.id, "CONFIRMED")} disabled={isPending}
                          className="text-xs font-bold text-blue-600 hover:underline disabled:opacity-50">
                          {isPending ? <Loader2 className="size-3 animate-spin" /> : "Xác nhận"}
                        </button>
                      )}
                      {order.status === "confirmed" && (
                        <button onClick={() => handleStatusChange(order.id, "DELIVERING")} disabled={isPending}
                          className="text-xs font-bold text-blue-600 hover:underline disabled:opacity-50">
                          {isPending ? <Loader2 className="size-3 animate-spin" /> : "Giao hàng"}
                        </button>
                      )}
                      {order.status === "delivering" && (
                        <button onClick={() => handleStatusChange(order.id, "COMPLETED")} disabled={isPending}
                          className="text-xs font-bold text-green-600 hover:underline disabled:opacity-50">
                          {isPending ? <Loader2 className="size-3 animate-spin" /> : "Hoàn thành"}
                        </button>
                      )}
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
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">Hiển thị {filtered.length} / {orders.length} đơn hàng</p>
        </div>
      </div>
    </div>
  );
}

/* ============================== */
/* ========= PRODUCTS ========== */
/* ============================== */
function ProductsTab({ products }: { products: ProductData[] }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterDimension, setFilterDimension] = useState("");
  const [filterApp, setFilterApp] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Extract unique applications for dropdown
  const allApplications = Array.from(new Set(products.flatMap(p => p.application || [])));

  const filtered = products
    .filter((p) => search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => filterType === "all" || p.type === filterType)
    .filter((p) => {
      if (filterStatus === "published") return p.isPublished;
      if (filterStatus === "hidden") return !p.isPublished;
      if (filterStatus === "out_of_stock") return p.stock <= 0;
      return true;
    })
    .filter((p) => {
      if (filterPrice === "all") return true;
      if (filterPrice === "0-1000") return p.price < 1000;
      if (filterPrice === "1000-2000") return p.price >= 1000 && p.price < 2000;
      if (filterPrice === "2000-5000") return p.price >= 2000 && p.price < 5000;
      if (filterPrice === "5000-") return p.price >= 5000;
      return true;
    })
    .filter((p) => filterDimension === "" || (p.dimensions && p.dimensions.toLowerCase().includes(filterDimension.toLowerCase())))
    .filter((p) => filterApp === "all" || (p.application && p.application.includes(filterApp)));

  const handleTogglePublish = (productId: string) => {
    startTransition(async () => {
      const result = await toggleProductPublish(productId);
      if (result.success) {
        setActionMsg({ type: "success", text: "Cập nhật trạng thái sản phẩm thành công" });
      } else {
        setActionMsg({ type: "error", text: result.error || "Lỗi cập nhật" });
      }
      setTimeout(() => setActionMsg(null), 3000);
    });
  };

  const typeLabels: Record<string, string> = {
    SOLID: "Gạch đặc",
    FOUR_HOLE: "Gạch 4 lỗ",
    TWO_HOLE: "Gạch 2 lỗ",
    BLOCK: "Gạch block",
    DECORATIVE: "Trang trí",
  };

  return (
    <div className="flex flex-col gap-5">
      {actionMsg && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${
          actionMsg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {actionMsg.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {actionMsg.text}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-start sm:items-center justify-between">
          <div className="flex flex-1 flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 min-w-[200px] max-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input type="text" placeholder="Tìm tên sản phẩm..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            
            <div className="relative min-w-[150px] max-w-[220px]">
              <input type="text" placeholder="Kích thước (vd: 190x90)..." value={filterDimension} onChange={(e) => setFilterDimension(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>

            {/* Lọc Thể Loại */}
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="all">Loại (Tất cả)</option>
              {Object.entries(typeLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            {/* Lọc Ứng Dụng */}
            <select 
              value={filterApp} 
              onChange={(e) => setFilterApp(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="all">Ứng dụng (Tất cả)</option>
              {allApplications.map((app) => (
                <option key={app} value={app}>{app}</option>
              ))}
            </select>

            {/* Lọc Giá */}
            <select 
              value={filterPrice} 
              onChange={(e) => setFilterPrice(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="all">Mức giá (Tất cả)</option>
              <option value="0-1000">Dưới 1.000đ</option>
              <option value="1000-2000">1.000đ - 2.000đ</option>
              <option value="2000-5000">2.000đ - 5.000đ</option>
              <option value="5000-">Trên 5.000đ</option>
            </select>

            {/* Lọc Trạng Thái */}
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="all">Trạng thái (Tất cả)</option>
              <option value="published">Đang bán</option>
              <option value="hidden">Đang ẩn</option>
              <option value="out_of_stock">Hết hàng</option>
            </select>
          </div>

          <Link href="/admin/products/new"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm shrink-0 whitespace-nowrap">
            <Plus className="size-4" /> Thêm SP
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Tên</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">Loại</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Giá</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">Đã Bán</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Trạng Thái</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{p.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 hidden lg:table-cell">{typeLabels[p.type] || p.type}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-right text-primary">{p.price.toLocaleString()}đ</td>
                  <td className="px-5 py-3.5 text-sm text-right text-gray-500 hidden md:table-cell">{p.totalSold}</td>
                  <td className="px-5 py-3.5">
                    {p.isPublished ? (
                      <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">Đang bán</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-600">Ẩn</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleTogglePublish(p.id)} disabled={isPending}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                        title={p.isPublished ? "Ẩn sản phẩm" : "Hiện sản phẩm"}>
                        {p.isPublished ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                      <Link href={`/admin/products/${p.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Chỉnh sửa sản phẩm">
                        <Edit2 className="size-4" />
                      </Link>
                      <button onClick={() => {
                        if (confirm(`Bạn có chắc muốn xóa sản phẩm "${p.name}"? Hành động này không thể hoàn tác.`)) {
                          startTransition(async () => {
                            const res = await deleteProduct(p.id);
                            if (res.success) {
                              setActionMsg({ type: "success", text: "Xóa sản phẩm thành công" });
                            } else {
                              setActionMsg({ type: "error", text: res.error || "Lỗi xóa sản phẩm" });
                            }
                            setTimeout(() => setActionMsg(null), 3500);
                          });
                        }
                      }} disabled={isPending || p.totalSold > 0}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Xóa sản phẩm">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">Tổng {filtered.length} sản phẩm</p>
        </div>
      </div>
    </div>
  );
}

/* ========================== */
/* ========= USERS ========= */
/* ========================== */
function UsersTab({ users }: { users: UserData[] }) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filtered = users.filter((u) => search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-5">
      {actionMsg && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${
          actionMsg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {actionMsg.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {actionMsg.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input type="text" placeholder="Tìm người dùng..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <Link href="/admin/users/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm shrink-0 whitespace-nowrap">
          <Plus className="size-4" /> Thêm Người Dùng
        </Link>
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
                const role = ROLE_MAP[user.role] || ROLE_MAP.customer;
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
                    <td className="px-5 py-3.5 text-sm text-gray-500 hidden md:table-cell">{user.phone || "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${role.color}`}>
                        {role.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-900 text-right">{user.orders}</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-primary text-right hidden lg:table-cell">{user.spent > 0 ? `${(user.spent / 1000000).toFixed(1)}M` : "—"}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 hidden lg:table-cell">{user.joined}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/users/${user.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Chỉnh sửa người dùng">
                          <Edit2 className="size-4" />
                        </Link>
                        <button onClick={() => {
                          if (confirm(`Bạn có chắc muốn xóa người dùng "${user.name}"?\nHành động này không thể hoàn tác.`)) {
                            startTransition(async () => {
                              const res = await deleteUser(user.id);
                              if (res.success) {
                                setActionMsg({ type: "success", text: "Xóa người dùng thành công" });
                              } else {
                                setActionMsg({ type: "error", text: res.error || "Lỗi xóa người dùng" });
                              }
                              setTimeout(() => setActionMsg(null), 3500);
                            });
                          }
                        }} disabled={isPending || user.orders > 0}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Xóa người dùng">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">Tổng {filtered.length} người dùng</p>
        </div>
      </div>
    </div>
  );
}

/* ========================== */
/* ======== CONTACTS ======== */
/* ========================== */
function ContactsTab({ contacts }: { contacts: ContactData[] }) {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredContacts = contacts.filter((c) => filter === "unread" ? !c.isRead : true);

  const handleToggleRead = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleContactReadStatus(id, !currentStatus);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Chắc chắn muốn xóa thư liên hệ này?")) {
      startTransition(async () => {
        await deleteContact(id);
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex bg-gray-100 p-1 rounded-lg w-max">
          <button onClick={() => setFilter("all")}
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
            Tất Cả
          </button>
          <button onClick={() => setFilter("unread")}
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${filter === "unread" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
            Chưa Đọc
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col gap-0 divide-y divide-gray-50">
        {filteredContacts.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">Không có thư liên hệ nào.</div>
        ) : (
          filteredContacts.map(contact => (
            <div key={contact.id} className={`flex flex-col transition-colors ${!contact.isRead ? "bg-blue-50/30" : "hover:bg-gray-50/50"}`}>
              <div 
                onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                className="flex items-center gap-4 p-4 cursor-pointer"
              >
                <div onClick={(e) => { e.stopPropagation(); handleToggleRead(contact.id, contact.isRead); }}
                  className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${!contact.isRead ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`} title={contact.isRead ? "Đánh dấu Chưa đọc" : "Đánh dấu Đã đọc"}>
                  {contact.isRead ? <Mail className="size-4" /> : <Bell className="size-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className={`text-sm truncate pr-4 ${!contact.isRead ? "font-black text-gray-900" : "font-bold text-gray-700"}`}>
                      {contact.name} {contact.subject && <span className="opacity-60 text-xs font-medium ml-2">- {contact.subject}</span>}
                    </p>
                    <span className="text-[10px] text-gray-400 shrink-0">{new Date(contact.createdAt).toLocaleString("vi-VN")}</span>
                  </div>
                  <p className={`text-xs truncate ${!contact.isRead ? "text-primary font-bold" : "text-gray-500"}`}>
                    {contact.message.split('\n')[0]}...
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xóa thư">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Detail */}
              {expandedId === contact.id && (
                <div className="p-4 pt-1 ml-14 mr-4 mb-4 bg-gray-50 rounded-xl border border-gray-100 text-sm">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div><span className="text-gray-400 font-bold block mb-1">Email</span> <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a></div>
                    <div><span className="text-gray-400 font-bold block mb-1">Điện Thoại</span> {contact.phone || "—"}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm whitespace-pre-wrap text-gray-700 leading-relaxed font-medium">
                    {contact.message}
                  </div>
                  {!contact.isRead && (
                    <div className="mt-4 flex justify-end">
                      <button onClick={() => handleToggleRead(contact.id, contact.isRead)} disabled={isPending}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                        <CheckCircle2 className="size-3" /> Đánh dấu đã đọc
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
