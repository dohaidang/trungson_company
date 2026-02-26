"use client";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useCart, type CartItem as CartItemType } from "@/lib/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <tr className="group border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
      <td className="px-6 py-6 align-top">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-border bg-muted">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{item.spec}</p>
            <p className="text-xs text-primary font-bold mt-1">
              {item.price.toLocaleString()}đ/viên
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-6 align-top">
        <div className="flex w-28 items-center justify-between border border-border rounded-sm p-1 bg-card">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="flex h-7 w-7 items-center justify-center hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground"
          >
            <Minus className="size-3" />
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val > 0) updateQuantity(item.id, val);
            }}
            className="w-12 text-center text-sm font-bold text-foreground bg-transparent outline-none"
          />
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="flex h-7 w-7 items-center justify-center hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground"
          >
            <Plus className="size-3" />
          </button>
        </div>
      </td>
      <td className="px-6 py-6 align-top text-right font-bold text-primary whitespace-nowrap">
        {(item.price * item.quantity).toLocaleString()}đ
      </td>
      <td className="px-6 py-6 align-top text-right">
        <button
          onClick={() => removeItem(item.id)}
          className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-destructive/10 rounded-full"
        >
          <Trash className="size-4" />
        </button>
      </td>
    </tr>
  );
}
