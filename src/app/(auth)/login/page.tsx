"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { User, Lock, Eye, EyeOff, Home, Loader2 } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("identity") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email hoặc mật khẩu không chính xác");
        setLoading(false);
        return;
      }

      // Force full-page reload to trigger server-side role check
      // Server component in /dashboard will redirect admin to /admin
      window.location.href = "/dashboard";
    } catch {
      setError("Không thể kết nối server. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Side: Industrial Imagery */}
      <div className="hidden lg:block lg:w-1/2 relative bg-muted">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10" />
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz55QDKEz5xo9k0j_n_ZWD2eGC6DRGmMXX2IpwpNyn6NhGCA1YwRE1GUcCErs4dJh2H9b8xo_dA2GYzkGrA8X2qx8KkvepebFueUwfaoD5i8VUMyMGoeN-bNdKzFRd1qD5bDG0FP3mXB9wZdyfhX5DbQMLRCzzetDplI66nl61kC70-yU4Mi2vGwD7iwmQoxWQmRjBTecLWO46ES7ZBwqjdGDDu90thzBTt6c7O_690RyrjbJjcaVIUFq3dcQfamfe8MvgWO8d7tY"
          alt="Modern Brick Architecture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-12 left-12 z-20 max-w-md">
          <div className="w-16 h-1 bg-primary mb-6" />
          <h2 className="text-white text-4xl font-bold leading-tight mb-4 drop-shadow-lg">
            Kiến tạo không gian <br />
            vững bền cùng Gạch Xinh
          </h2>
          <p className="text-white/90 text-lg drop-shadow-md font-medium">
            Giải pháp vật liệu xây dựng cao cấp cho các công trình hiện đại.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Heading */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-flex items-center justify-center lg:justify-start gap-2 mb-8 group">
              <div className="bg-primary p-2 rounded-sm text-primary-foreground group-hover:bg-primary/90 transition-colors">
                <Home className="size-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-foreground uppercase">
                CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
              Đăng nhập
            </h1>
            <p className="text-muted-foreground">
              Chào mừng bạn quay trở lại với hệ thống của chúng tôi.
            </p>
          </div>

          {registered && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 font-medium">
              Đăng ký thành công! Vui lòng đăng nhập.
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive font-medium">
              {error}
            </div>
          )}

          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="identity"
                className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider"
              >
                Email hoặc Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <User className="size-5" />
                </div>
                <input
                  id="identity"
                  name="identity"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-input rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock className="size-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-input rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-input rounded flex items-center justify-center accent-primary"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-muted-foreground"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-sm text-sm font-bold uppercase tracking-widest text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng Nhập"
                )}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Bạn chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="font-bold text-primary hover:underline transition-all"
              >
                Đăng ký tài khoản mới
              </Link>
            </p>
          </div>

          {/* Subtle Decorative Element */}
          <div className="flex justify-center items-center gap-4 opacity-20 pt-4">
            <div className="h-px w-8 bg-primary" />
            <div className="size-2 rounded-full bg-primary" />
            <div className="h-px w-8 bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
