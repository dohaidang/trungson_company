"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { RelatedProducts } from "@/components/cart/RelatedProducts";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const { items, clearCart } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">Giỏ Hàng Của Bạn</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {items.length > 0
                ? `${items.length} sản phẩm trong giỏ hàng.`
                : "Giỏ hàng đang trống."}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-medium text-muted-foreground hover:text-destructive transition-colors underline"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 text-muted-foreground mb-6">
              <ShoppingBag className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Giỏ hàng trống</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Bạn chưa thêm sản phẩm nào. Khám phá danh mục gạch và vật liệu xây dựng của chúng tôi.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Xem Sản Phẩm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left Column: Cart Items */}
            <div className="flex-1">
              <div className="overflow-x-auto bg-card border border-border rounded-sm shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Sản Phẩm</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Số Lượng</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Thành Tiền</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline transition-all">
                  <ArrowLeft className="size-4" />
                  Tiếp Tục Mua Sắm
                </Link>
              </div>
            </div>

            {/* Right Column: Summary */}
            <CartSummary />
          </div>
        )}

        {/* Related Products */}
        <RelatedProducts />
      </main>
    </div>
  );
}
