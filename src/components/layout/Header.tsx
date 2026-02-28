"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, Home, X, Search } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export function Header({ settings }: { settings?: Record<string, string> }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm support-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded bg-primary text-primary-foreground">
              <Home className="size-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              {settings?.SITE_NAME || "Công ty CP TM & SX VLXD Trung Sơn"}
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Trang Chủ</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">Giới Thiệu</Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Sản Phẩm</Link>
            <Link href="/projects" className="text-sm font-medium hover:text-primary transition-colors">Dự Án</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Liên Hệ</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:flex h-10 w-10 items-center justify-center rounded text-foreground hover:text-primary transition-colors"
            >
              <Search className="size-5" />
            </button>

            <Link
              href="/login"
              className="hidden md:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Đăng nhập
            </Link>
            <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded border border-border text-foreground hover:border-primary hover:text-primary transition-colors">
              <ShoppingCart className="size-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded text-foreground hover:text-primary transition-colors"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        {/* Search Bar - Desktop expandable */}
        <div
          className={`overflow-hidden transition-all duration-300 border-t border-border/40 ${
            isSearchOpen ? "max-h-16" : "max-h-0 border-t-0"
          }`}
        >
          <form onSubmit={handleSearch} className="mx-auto flex w-full items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus={isSearchOpen}
            />
            <button
              type="button"
              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="text-lg font-bold text-foreground">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col px-6 py-6 gap-1">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Trang Chủ
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Giới Thiệu
          </Link>
          <Link
            href="/products"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Sản Phẩm
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Dự Án
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Liên Hệ
          </Link>
        </nav>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border px-6 py-6">
          <Link
            href="/login"
            onClick={() => setIsMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Đăng nhập
          </Link>
          <Link
            href="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded border border-border py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ShoppingCart className="size-4" />
            Giỏ Hàng
          </Link>
        </div>
      </div>
    </>
  );
}
