"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Building2, Phone, Mail, Lock, ShieldCheck, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đã có lỗi xảy ra");
        setLoading(false);
        return;
      }

      // Success — redirect to login
      router.push("/login?registered=true");
    } catch {
      setError("Không thể kết nối server. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Side: Industrial Imagery */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-800">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL8e0lA2ujGkg9loc2XDXdJlB0ExNn7yj8-id13kygeg6H81V8wJVQEEsad60mSdeMPQ3Itz1DZ3qw-pPNXP-7BOMfu5xwnQd4U-wiQGrFbT6dVyTBnDJ2RlcNBwImseH7Heb3VUvOD4FYLaUGptNdJlMX9kbFwrXZB4fGxTn3HjIcTdkQ9R7Cja3f61G2RwvZAQEIoh2HIIG77UHb-cPYIZpxnZA4x4zN-wkfpvQWsukfJaNW5078YgpVmGnMTcZW-UjF45cNj5U"
          alt="Architectural brickwork textures"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 h-full flex flex-col justify-end p-12 bg-gradient-to-t from-background/90 to-transparent">
          <div className="mb-4">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">
              Kiến tạo tương lai
            </span>
            <h1 className="text-4xl font-bold text-white mt-2 leading-tight drop-shadow-lg">
              Giải pháp vật liệu <br />
              xây dựng bền vững
            </h1>
          </div>
          <p className="text-white/80 max-w-md font-medium drop-shadow-md">
            Cung cấp đa dạng các loại gạch ốp lát, gạch xây dựng chất lượng cao cho các công trình dân dụng và công nghiệp.
          </p>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-background">
        <div className="w-full max-w-xl">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Tạo tài khoản
              </h2>
              <p className="text-muted-foreground mt-2">
                Gia nhập cộng đồng Trung Sơn Company ngay hôm nay.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Họ và Tên
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <User className="size-5" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Tên Công ty{" "}
                  <span className="text-[10px] font-normal text-muted-foreground capitalize">
                    (Tùy chọn)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Building2 className="size-5" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Công ty xây dựng..."
                  />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  <Phone className="size-5" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="090 000 0000"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Địa chỉ Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  <Mail className="size-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Lock className="size-5" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <ShieldCheck className="size-5" />
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 pt-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary bg-background border-input rounded focus:ring-primary accent-primary"
                />
              </div>
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-tight"
              >
                Tôi đồng ý với các{" "}
                <Link
                  href="#"
                  className="text-primary font-bold hover:underline"
                >
                  Điều khoản & Điều kiện
                </Link>{" "}
                và chính sách bảo mật của Trung Sơn Company.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-sm shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Đăng ký ngay"
              )}
            </button>

            {/* Alternate Login */}
            <div className="pt-6 border-t border-border flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-sm">
                Bạn đã có tài khoản?
                <Link
                  href="/login"
                  className="text-primary font-bold ml-1 hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </form>

          {/* Professional Footer */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-xs px-4">
            <p>© 2024 Trung Sơn Company. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-widest font-medium">
              <Link href="#" className="hover:text-primary transition-colors">
                Hỗ trợ
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                Về chúng tôi
              </Link>
              <Link href="/projects" className="hover:text-primary transition-colors">
                Công trình
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
