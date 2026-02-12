"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { RelatedProducts } from "@/components/cart/RelatedProducts";

export default function CartPage() {
  // Mock Data matching the user's snippet
  const cartItems = [
    {
        id: "1",
        name: "Gạch Đặc Tuynel A1",
        spec: "Tiêu chuẩn 2 lỗ",
        dimensions: "210 x 100 x 60 mm",
        weight: "1.2kg/viên",
        price: 1200,
        quantity: 1000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbiI0Vk0OhSQce25JTEf_EjY710XrkWZy6PMYIvWN62ZrShUkgZ96FQWEYWlb4ZMue9Fjmqxg2nn8kByBO5R3aan3e9QH5ZTuKWg3Tymq8cfas0Xm74sd7Talbc-ExBIKgP12rWbEqZqO542TOv05KjnC31V_v4DvAEOOuVvogV0gbBc8r-4UeH588SVb9gpXL9rlwqnNVFzqlfjUIiR4MyK76SWMbJNHqJDYkGinOLGLt_I8ZGoZMgCG3WVyLgMRv4lKlnRFtO-s"
    },
    {
        id: "2",
        name: "Gạch Block 4 Lỗ",
        spec: "Bê tông cốt liệu",
        dimensions: "390 x 190 x 190 mm",
        weight: "18kg/viên",
        price: 3500,
        quantity: 500,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjfM0F4abx79MX-E0PurYgsoe4p49tstEiq29Usa6tg7IGstCihzEnaq5nlgne08t3IhC75EyGPqKotafX7r0p85DlP7PxiqdoSbLLyNj1uyW12TTYmhQQ2SBDRNYiFaNJ_PLFFnqU9tOjBKujv1oZJ8sStH7DdZ811NH7YcVBx67jW8Gd_5Zt4PMQjf30C_Y2bV33Z3EUYvcT3xZ4AGn10o78XQNtKbTkSOh-BXfC-4hH5rx1fzYLLxlXPx32_FiGX9g4T3DbkYo"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">Giỏ Hàng Của Bạn</h2>
            <p className="text-sm text-muted-foreground mt-1">Xem lại các mặt hàng đã chọn cho dự án của bạn.</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left Column: Cart Items */}
            <div className="flex-1">
                <div className="overflow-x-auto bg-card border border-border rounded-sm shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-muted/40">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Sản Phẩm</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Thông Số</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Số Lượng</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Thành Tiền</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {cartItems.map((item) => (
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

        {/* Related Products */}
        <RelatedProducts />

      </main>
    </div>
  );
}
