"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  User,
  LogOut,
  ShoppingBag,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Edit3,
  Save,
  TrendingUp,
  Calendar,
} from "lucide-react";

interface DashboardClientProps {
  userName: string;
  userEmail: string;
}

// Mock order data
const MOCK_ORDERS = [
  {
    id: "DH-2024-001",
    date: "15/02/2024",
    items: "Gạch Tuynel A1 (×2000), Gạch Block 4 Lỗ (×500)",
    total: 4150000,
    status: "delivered" as const,
  },
  {
    id: "DH-2024-002",
    date: "20/02/2024",
    items: "Gạch Vỉa Hè (×1000), Gạch Đỏ Đặc (×800)",
    total: 2820000,
    status: "shipping" as const,
  },
  {
    id: "DH-2024-003",
    date: "25/02/2024",
    items: "Gạch Ốp Tường Xám Đá (×300)",
    total: 720000,
    status: "processing" as const,
  },
  {
    id: "DH-2024-004",
    date: "01/01/2024",
    items: "Gạch Tuynel A1 (×5000)",
    total: 6000000,
    status: "delivered" as const,
  },
  {
    id: "DH-2024-005",
    date: "10/12/2023",
    items: "Gạch Block 4 Lỗ (×1200)",
    total: 4200000,
    status: "cancelled" as const,
  },
];

const STATUS_MAP = {
  processing: { label: "Đang xử lý", color: "bg-amber-100 text-amber-800", icon: Clock },
  shipping: { label: "Đang giao", color: "bg-blue-100 text-blue-800", icon: Truck },
  delivered: { label: "Đã giao", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800", icon: XCircle },
};

type TabKey = "overview" | "orders" | "profile";

const TABS = [
  { key: "overview" as TabKey, label: "Tổng Quan", icon: LayoutDashboard },
  { key: "orders" as TabKey, label: "Đơn Hàng", icon: Package },
  { key: "profile" as TabKey, label: "Hồ Sơ", icon: User },
];

export function DashboardClient({ userName, userEmail }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-card border-b lg:border-b-0 lg:border-r border-border shrink-0">
        <div className="p-6 border-b border-border hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              {userName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{userName || "Người dùng"}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
        </div>

        {/* Tab buttons */}
        <nav className="flex lg:flex-col p-2 lg:p-3 gap-1 overflow-x-auto lg:overflow-visible">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="size-4 shrink-0" />
              {tab.label}
            </button>
          ))}
          <div className="hidden lg:block h-px bg-border my-2" />
          <form action="/api/auth/signout" method="POST" className="hidden lg:block">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <LogOut className="size-4" />
              Đăng Xuất
            </button>
          </form>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === "overview" && <OverviewTab userName={userName} />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "profile" && <ProfileTab userName={userName} userEmail={userEmail} />}
      </main>
    </div>
  );
}

/* ========== OVERVIEW TAB ========== */
function OverviewTab({ userName }: { userName: string }) {
  const totalOrders = MOCK_ORDERS.length;
  const totalSpent = MOCK_ORDERS.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const activeOrders = MOCK_ORDERS.filter((o) => o.status === "processing" || o.status === "shipping").length;

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Welcome */}
      <div className="rounded-xl bg-gradient-to-r from-[#2a1d1b] to-[#4a3533] p-6 sm:p-8 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/80 mb-1">Dashboard</p>
        <h1 className="text-2xl sm:text-3xl font-black">
          Xin chào, {userName || "Quý khách"}! 👋
        </h1>
        <p className="mt-2 text-sm text-gray-300 max-w-lg">
          Quản lý đơn hàng, theo dõi vận chuyển và cập nhật thông tin cá nhân tại đây.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
            <ShoppingBag className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tổng Đơn Hàng</p>
            <p className="text-2xl font-black text-foreground mt-1">{totalOrders}</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 shrink-0">
            <Truck className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Đang Xử Lý</p>
            <p className="text-2xl font-black text-foreground mt-1">{activeOrders}</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500/10 text-green-600 shrink-0">
            <TrendingUp className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tổng Chi Tiêu</p>
            <p className="text-2xl font-black text-foreground mt-1">{(totalSpent / 1000000).toFixed(1)}M</p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Đơn Hàng Gần Đây</h2>
          <button
            onClick={() => {}}
            className="text-xs font-bold text-primary hover:underline"
          >
            Xem tất cả
          </button>
        </div>
        <div className="divide-y divide-border">
          {MOCK_ORDERS.slice(0, 3).map((order) => {
            const st = STATUS_MAP[order.status];
            return (
              <div key={order.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{order.id}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${st.color}`}>
                      <st.icon className="size-3" />
                      {st.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{order.items}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary">{order.total.toLocaleString()}đ</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end">
                    <Calendar className="size-3" />
                    {order.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ========== ORDERS TAB ========== */
function OrdersTab() {
  const [filter, setFilter] = useState<string>("all");
  
  const filtered = filter === "all" 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter((o) => o.status === filter);

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-foreground">Lịch Sử Đơn Hàng</h1>
        <p className="text-sm text-muted-foreground mt-1">Theo dõi tình trạng tất cả đơn hàng của bạn.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "Tất cả" },
          { key: "processing", label: "Đang xử lý" },
          { key: "shipping", label: "Đang giao" },
          { key: "delivered", label: "Đã giao" },
          { key: "cancelled", label: "Đã hủy" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              filter === f.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Mã ĐH</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Ngày Đặt</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Sản Phẩm</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Trạng Thái</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Tổng Tiền</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((order) => {
              const st = STATUS_MAP[order.status];
              return (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4 text-sm font-bold text-foreground whitespace-nowrap">{order.id}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{order.date}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground max-w-[300px] truncate hidden md:table-cell">{order.items}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap ${st.color}`}>
                      <st.icon className="size-3" />
                      {st.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-primary text-right whitespace-nowrap">
                    {order.total.toLocaleString()}đ
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Không có đơn hàng nào.
          </div>
        )}
      </div>
    </div>
  );
}

/* ========== PROFILE TAB ========== */
function ProfileTab({ userName, userEmail }: { userName: string; userEmail: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail || "",
    phone: "0909 123 456",
    company: "Công ty TNHH Xây Dựng ABC",
    address: "123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Hồ Sơ Cá Nhân</h1>
          <p className="text-sm text-muted-foreground mt-1">Cập nhật thông tin liên hệ và giao hàng.</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
            isEditing
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border text-foreground hover:border-primary hover:text-primary"
          }`}
        >
          {isEditing ? <><Save className="size-4" /> Lưu Thay Đổi</> : <><Edit3 className="size-4" /> Chỉnh Sửa</>}
        </button>
      </div>

      {/* Avatar section */}
      <div className="rounded-xl border border-border bg-card p-6 flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-black shrink-0">
          {formData.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{formData.name}</p>
          <p className="text-sm text-muted-foreground">{formData.email}</p>
          <p className="text-xs text-muted-foreground mt-1">Thành viên từ tháng 02/2024</p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">Thông Tin Liên Hệ</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FieldRow
            icon={User}
            label="Họ và tên"
            value={formData.name}
            editing={isEditing}
            onChange={(v) => handleChange("name", v)}
          />
          <FieldRow
            icon={Mail}
            label="Email"
            value={formData.email}
            editing={false}
            onChange={() => {}}
          />
          <FieldRow
            icon={Phone}
            label="Số điện thoại"
            value={formData.phone}
            editing={isEditing}
            onChange={(v) => handleChange("phone", v)}
          />
          <FieldRow
            icon={Package}
            label="Công ty"
            value={formData.company}
            editing={isEditing}
            onChange={(v) => handleChange("company", v)}
          />
        </div>

        <div className="mt-5">
          <FieldRow
            icon={MapPin}
            label="Địa chỉ giao hàng"
            value={formData.address}
            editing={isEditing}
            onChange={(v) => handleChange("address", v)}
            fullWidth
          />
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-destructive mb-2">Vùng Nguy Hiểm</h3>
        <p className="text-xs text-muted-foreground mb-4">Hành động này không thể hoàn tác.</p>
        <button className="text-xs font-bold text-destructive border border-destructive/30 rounded px-4 py-2 hover:bg-destructive/10 transition-colors">
          Xóa Tài Khoản
        </button>
      </div>
    </div>
  );
}

/* ========== FIELD ROW COMPONENT ========== */
function FieldRow({
  icon: Icon,
  label,
  value,
  editing,
  onChange,
  fullWidth,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-full" : ""}>
      <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
        <Icon className="size-3.5" />
        {label}
      </label>
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
      ) : (
        <p className="text-sm font-medium text-foreground py-2.5">{value}</p>
      )}
    </div>
  );
}
