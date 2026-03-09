"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
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
  Phone,
  Mail,
  MapPin,
  Edit3,
  Save,
  TrendingUp,
  Calendar,
  Loader2,
  AlertCircle,
  PackageCheck,
  ChevronRight,
} from "lucide-react";
import { updateProfile, changePassword } from "@/app/actions/user";
import { cancelOrder } from "@/app/actions/order";

// Types
interface OrderData {
  id: string;
  date: string;
  items: string;
  total: number;
  status: "pending" | "confirmed" | "delivering" | "completed" | "cancelled";
}

interface DashboardClientProps {
  userName: string;
  userEmail: string;
  userPhone: string;
  joinedDate: string;
  orders: OrderData[];
}

const STATUS_MAP = {
  pending: { label: "Chờ xử lý", color: "bg-amber-100 text-amber-800", icon: Clock },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800", icon: PackageCheck },
  delivering: { label: "Đang giao", color: "bg-blue-100 text-blue-800", icon: Truck },
  completed: { label: "Đã giao", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800", icon: XCircle },
};

type TabKey = "overview" | "orders" | "profile";

const TABS = [
  { key: "overview" as TabKey, label: "Tổng Quan", icon: LayoutDashboard },
  { key: "orders" as TabKey, label: "Đơn Hàng", icon: Package },
  { key: "profile" as TabKey, label: "Hồ Sơ", icon: User },
];

export function DashboardClient({ userName, userEmail, userPhone, joinedDate, orders }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-card border-b lg:border-b-0 lg:border-r border-border shrink-0">
        <Link href="/" className="p-6 border-b border-border hidden lg:block hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-sm">
              {userName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{userName || "Người dùng"}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
        </Link>

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
        {activeTab === "overview" && <OverviewTab userName={userName} orders={orders} />}
        {activeTab === "orders" && <OrdersTab orders={orders} />}
        {activeTab === "profile" && <ProfileTab userName={userName} userEmail={userEmail} userPhone={userPhone} joinedDate={joinedDate} />}
      </main>
    </div>
  );
}

/* ========== OVERVIEW TAB ========== */
function OverviewTab({ userName, orders }: { userName: string; orders: OrderData[] }) {
  const totalOrders = orders.length;
  const totalSpent = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const activeOrders = orders.filter((o) => o.status === "pending" || o.status === "confirmed" || o.status === "delivering").length;

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
            <p className="text-2xl font-black text-foreground mt-1">{totalSpent > 0 ? `${(totalSpent / 1000000).toFixed(1)}M` : "0"}</p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Đơn Hàng Gần Đây</h2>
        </div>
        <div className="divide-y divide-border">
          {orders.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Bạn chưa có đơn hàng nào.
            </div>
          ) : (
            orders.slice(0, 3).map((order) => {
              const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
              return (
                <div key={order.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{order.id.slice(0, 12)}...</span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${st.color}`}>
                        <st.icon className="size-3" />
                        {st.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{order.items}</p>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-2">
                    <div>
                      <p className="text-sm font-bold text-primary">{order.total.toLocaleString()}đ</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end">
                        <Calendar className="size-3" />
                        {order.date}
                      </p>
                    </div>
                    <Link href={`/dashboard/orders/${order.id}`} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                      Chi tiết <ChevronRight className="size-3" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/* ========== ORDERS TAB ========== */
function OrdersTab({ orders }: { orders: OrderData[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [isPending, startTransition] = useTransition();
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const filtered = filter === "all" 
    ? orders 
    : orders.filter((o) => o.status === filter);

  const handleCancel = (orderId: string) => {
    startTransition(async () => {
      const result = await cancelOrder(orderId);
      if (result.success) {
        setActionMsg({ type: "success", text: "Đã hủy đơn hàng thành công" });
      } else {
        setActionMsg({ type: "error", text: result.error || "Không thể hủy đơn hàng" });
      }
      setTimeout(() => setActionMsg(null), 3000);
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-foreground">Lịch Sử Đơn Hàng</h1>
        <p className="text-sm text-muted-foreground mt-1">Theo dõi tình trạng tất cả đơn hàng của bạn.</p>
      </div>

      {/* Action message */}
      {actionMsg && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${
          actionMsg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {actionMsg.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {actionMsg.text}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "Tất cả" },
          { key: "pending", label: "Chờ xử lý" },
          { key: "confirmed", label: "Đã xác nhận" },
          { key: "delivering", label: "Đang giao" },
          { key: "completed", label: "Đã giao" },
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
              const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
              return (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4 text-sm font-bold text-foreground whitespace-nowrap">{order.id.slice(0, 12)}...</td>
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
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        <Eye className="size-3" /> Xem
                      </Link>
                      {order.status === "pending" && (
                        <button
                          onClick={() => handleCancel(order.id)}
                          disabled={isPending}
                          className="text-xs font-bold text-destructive hover:text-destructive/80 disabled:opacity-50"
                        >
                          {isPending ? <Loader2 className="size-4 animate-spin" /> : "Hủy"}
                        </button>
                      )}
                    </div>
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
function ProfileTab({ userName, userEmail, userPhone, joinedDate }: { userName: string; userEmail: string; userPhone: string; joinedDate: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail || "",
    phone: userPhone || "",
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateProfile({
        name: formData.name,
        phone: formData.phone || undefined,
      });
      if (result.success) {
        setMessage({ type: "success", text: "Cập nhật thành công!" });
        setIsEditing(false);
      } else {
        setMessage({ type: "error", text: result.error || "Không thể cập nhật" });
      }
      setTimeout(() => setMessage(null), 3000);
    });
  };

  const handleChangePassword = () => {
    startTransition(async () => {
      const result = await changePassword(passwordData);
      if (result.success) {
        setMessage({ type: "success", text: "Đổi mật khẩu thành công!" });
        setPasswordData({ currentPassword: "", newPassword: "" });
        setShowPasswordForm(false);
      } else {
        setMessage({ type: "error", text: result.error || "Không thể đổi mật khẩu" });
      }
      setTimeout(() => setMessage(null), 3000);
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Hồ Sơ Cá Nhân</h1>
          <p className="text-sm text-muted-foreground mt-1">Cập nhật thông tin liên hệ và giao hàng.</p>
        </div>
        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          disabled={isPending}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all disabled:opacity-50 ${
            isEditing
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border text-foreground hover:border-primary hover:text-primary"
          }`}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : isEditing ? (
            <><Save className="size-4" /> Lưu Thay Đổi</>
          ) : (
            <><Edit3 className="size-4" /> Chỉnh Sửa</>
          )}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${
          message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {message.text}
        </div>
      )}

      {/* Avatar section */}
      <div className="rounded-xl border border-border bg-card p-6 flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-black shrink-0">
          {formData.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{formData.name}</p>
          <p className="text-sm text-muted-foreground">{formData.email}</p>
          {joinedDate && <p className="text-xs text-muted-foreground mt-1">Thành viên từ {joinedDate}</p>}
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
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Đổi Mật Khẩu</h3>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-xs font-bold text-primary hover:underline"
          >
            {showPasswordForm ? "Đóng" : "Đổi mật khẩu"}
          </button>
        </div>
        {showPasswordForm && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Mật khẩu hiện tại</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Mật khẩu mới</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <button
              onClick={handleChangePassword}
              disabled={isPending || !passwordData.currentPassword || !passwordData.newPassword}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 disabled:opacity-50"
            >
              {isPending ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
            </button>
          </div>
        )}
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
        <p className="text-sm font-medium text-foreground py-2.5">{value || "—"}</p>
      )}
    </div>
  );
}
