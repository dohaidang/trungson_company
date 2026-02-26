"use client";

import { ShieldCheck, Truck, Lock, FileText } from "lucide-react";
import { useState } from "react";
import { OrderFormModal } from "./OrderFormModal";
import { useCart } from "@/lib/CartContext";

export function CartSummary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { totalPrice, totalItems } = useCart();

  const shipping = totalPrice > 0 ? 450000 : 0;
  const vat = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + shipping + vat;

  return (
    <div className="w-full lg:w-[400px]">
      <div className="sticky top-24 rounded-sm border border-border bg-card p-6 lg:p-8 shadow-sm">
        <h3 className="mb-6 text-lg font-black uppercase tracking-tight text-foreground">
          Tóm Tắt Đơn Hàng
        </h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tạm tính ({totalItems} sản phẩm)</span>
            <span className="font-bold text-foreground">{totalPrice.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vận chuyển (Ước tính)</span>
            <span className="font-bold text-foreground">{shipping > 0 ? `${shipping.toLocaleString()}đ` : "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">VAT (10%)</span>
            <span className="font-bold text-foreground">{vat > 0 ? `${vat.toLocaleString()}đ` : "—"}</span>
          </div>
          
          <div className="my-4 h-px w-full bg-border"></div>
          
          <div className="flex justify-between text-xl items-end">
            <span className="font-black uppercase text-foreground text-base">Tổng Cộng</span>
            <span className="font-black text-primary text-2xl">{grandTotal.toLocaleString()}đ</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
            <button 
                onClick={() => setIsModalOpen(true)}
                disabled={totalItems === 0}
                className="group flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Lock className="size-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                Gửi Đơn Hàng
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                disabled={totalItems === 0}
                className="group flex w-full items-center justify-center gap-2 rounded-sm border border-primary bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FileText className="size-4" />
                Yêu Cầu Báo Giá
            </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-sm bg-muted/50 p-4 border border-border/50">
            <div className="flex gap-3">
                <Truck className="size-5 text-primary" />
                <div>
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide">Giao Hàng Nhanh 24h</p>
                    <p className="text-[10px] text-muted-foreground">Cho các đơn hàng trong nội thành</p>
                </div>
            </div>
            <div className="flex gap-3">
                <ShieldCheck className="size-5 text-primary" />
                <div>
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide">Chất Lượng ISO</p>
                    <p className="text-[10px] text-muted-foreground">Cam kết hoàn tiền nếu lỗi sản phẩm</p>
                </div>
            </div>
        </div>
      </div>

      <OrderFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
