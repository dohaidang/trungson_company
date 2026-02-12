import Link from "next/link";
import { ShoppingCart, Menu, Home } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm support-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <Home className="size-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Trung Sơn Company
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Trang Chủ</Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Sản Phẩm</Link>
          <Link href="/#calculator" className="text-sm font-medium hover:text-primary transition-colors">Tính Dự Toán</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Liên Hệ</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden md:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Đăng nhập
          </Link>
          <button className="flex h-10 w-10 items-center justify-center rounded border border-border text-foreground hover:border-primary hover:text-primary transition-colors">
            <ShoppingCart className="size-5" />
          </button>
          <button className="md:hidden flex h-10 w-10 items-center justify-center rounded text-foreground">
            <Menu className="size-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
