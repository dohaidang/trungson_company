"use client";

import { useState } from "react";
import { Info, Minus, Plus, ShoppingCart, Download, Check } from "lucide-react";
import { useCart } from "@/lib/CartContext";

interface ProductInfoProps {
  sku: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  coverage?: string;
  image?: string;
}

export function ProductInfo({
  sku,
  name,
  description,
  price,
  unit,
  coverage,
  image,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1000);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: sku,
      name,
      spec: `${unit} • SKU: ${sku}`,
      price,
      image: image || "",
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Info */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              Cao Cấp
            </span>
            <span className="text-muted-foreground text-sm">SKU: {sku}</span>
          </div>
          <h1 className="text-foreground text-4xl font-black leading-tight tracking-tight">
            {name}
          </h1>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed">
          {description}
        </p>
        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-3xl font-bold text-primary">
            {price.toLocaleString()} ₫
          </span>
          <span className="text-muted-foreground font-medium">/ {unit}</span>
        </div>
        {coverage && (
          <div className="bg-muted/50 p-3 rounded-lg border border-border flex gap-2 items-start">
            <Info className="text-muted-foreground mt-0.5 size-5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              {coverage} <a href="/#calculator" className="underline hover:text-primary transition-colors">Tính toán số lượng</a>
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-6">
        {/* Quantity */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="flex items-center rounded-lg border border-border bg-card overflow-hidden w-full sm:w-auto">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 100))}
              className="px-3 py-3 hover:bg-muted transition-colors text-foreground"
            >
              <Minus className="size-4" />
            </button>
            <input
              className="w-24 text-center border-none focus:ring-0 p-0 text-foreground bg-transparent font-medium outline-none"
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val > 0) setQuantity(val);
              }}
            />
            <button
              onClick={() => setQuantity(quantity + 100)}
              className="px-3 py-3 hover:bg-muted transition-colors text-foreground"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center text-sm text-muted-foreground px-2">
            <span>Tổng Diện Tích: <strong className="text-foreground">~{(quantity / 55).toFixed(1)} m²</strong></span>
            <span>Thành Tiền: <strong className="text-primary">{(quantity * price).toLocaleString()}₫</strong></span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            className={`w-full font-bold py-4 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 text-lg ${
              added
                ? "bg-green-600 text-white shadow-green-600/20"
                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
            }`}
          >
            {added ? (
              <>
                <Check className="size-5" />
                Đã Thêm Vào Giỏ Hàng!
              </>
            ) : (
              <>
                <ShoppingCart className="size-5" />
                Thêm Vào Giỏ Hàng
              </>
            )}
          </button>
          <button className="w-full bg-transparent border border-border hover:border-primary hover:text-primary text-foreground font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
            <Download className="size-5" />
            Tải Thông Số Kỹ Thuật (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
