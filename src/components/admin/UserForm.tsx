"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { createUser, updateUser } from "@/app/actions/admin";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  password?: string;
}

interface UserFormProps {
  mode: "create" | "edit";
  userId?: string;
  initialData?: UserFormData;
}

const ROLE_OPTIONS = [
  { value: "CUSTOMER", label: "Khách Hàng" },
  { value: "CONTRACTOR", label: "Nhà Thầu" },
  { value: "ADMIN", label: "Quản Trị Viên (Admin)" },
];

const DEFAULT_FORM: UserFormData = {
  name: "",
  email: "",
  phone: "",
  role: "CUSTOMER",
  password: "",
};

export function UserForm({ mode, userId, initialData }: UserFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<UserFormData>(initialData || DEFAULT_FORM);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (key: keyof UserFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    // Validation
    if (!form.email.trim()) {
      setMsg({ type: "error", text: "Vui lòng nhập Email hợp lệ" });
      return;
    }
    if (mode === "create" && (!form.password || form.password.length < 6)) {
      setMsg({ type: "error", text: "Mật khẩu tạo mới phải từ 6 ký tự trở lên" });
      return;
    }
    if (mode === "edit" && form.password && form.password.length > 0 && form.password.length < 6) {
      setMsg({ type: "error", text: "Mật khẩu mới phải từ 6 ký tự trở lên" });
      return;
    }

    startTransition(async () => {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        password: form.password,
      };

      let result;
      if (mode === "edit" && userId) {
        result = await updateUser(userId, payload);
      } else {
        result = await createUser(payload);
      }

      if (result.success) {
        setMsg({ type: "success", text: mode === "edit" ? "Cập nhật thành công!" : "Tạo người dùng thành công!" });
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        setMsg({ type: "error", text: result.error || "Có lỗi xảy ra" });
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f4f6f9]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-4 sm:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="size-4" />
              Quay lại
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <h1 className="text-lg font-black text-gray-900">
              {mode === "edit" ? "Chỉnh Sửa Người Dùng" : "Thêm Người Dùng Mới"}
            </h1>
          </div>
          <button type="submit" form="user-form" disabled={isPending}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all shadow-sm">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {mode === "edit" ? "Lưu Thay Đổi" : "Tạo Tài Khoản"}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Status message */}
        {msg && (
          <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium mb-6 ${
            msg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {msg.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
            {msg.text}
          </div>
        )}

        <form id="user-form" onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Thông Tin Tài Khoản</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Họ và Tên</label>
              <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)}
                placeholder="VD: Nguyễn Văn A"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Email *</label>
              <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required
                placeholder="VD: email@example.com"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Số điện thoại</label>
              <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                placeholder="VD: 0901234567"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Vai trò (Role) *</label>
              <select value={form.role} onChange={(e) => updateField("role", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white">
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                {mode === "create" ? "Mật khẩu *" : "Mật khẩu mới (Để trống nếu không đổi)"}
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={form.password || ""} 
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder={mode === "create" ? "Nhập mật khẩu" : "Nhập mật khẩu mới..."}
                  className="w-full rounded-lg border border-gray-200 pl-4 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
