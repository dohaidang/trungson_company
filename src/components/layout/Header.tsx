import Link from "next/link";
import { ShoppingCart, Menu, Home } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm support-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
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
