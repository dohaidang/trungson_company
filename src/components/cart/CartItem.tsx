"use client";

import { Minus, Plus, Trash, X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    spec: string; // e.g., "Standard 2 holes"
    dimensions: string; // e.g., "210 x 100 x 60 mm"
    weight: string; // e.g., "1.2kg/unit"
    image: string;
    price: number;
    quantity: number;
  };
}

export function CartItem({ item }: CartItemProps) {
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
          </div>
        </div>
      </td>
      <td className="px-6 py-6 align-top text-sm text-muted-foreground hidden sm:table-cell">
        <div className="flex flex-col gap-1">
            <span>{item.dimensions}</span>
            <span className="text-xs opacity-80">Trọng lượng: {item.weight}</span>
        </div>
      </td>
      <td className="px-6 py-6 align-top">
        <div className="flex w-24 items-center justify-between border border-border rounded-sm p-1 bg-card">
          <button className="flex h-7 w-7 items-center justify-center hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground">
            <Minus className="size-3" />
          </button>
          <span className="text-sm font-bold text-foreground">{item.quantity}</span>
          <button className="flex h-7 w-7 items-center justify-center hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground">
            <Plus className="size-3" />
          </button>
        </div>
      </td>
      <td className="px-6 py-6 align-top text-right font-bold text-primary">
        {(item.price * item.quantity).toLocaleString()}đ
      </td>
      <td className="px-6 py-6 align-top text-right">
        <button className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-destructive/10 rounded-full">
          <Trash className="size-4" />
        </button>
      </td>
    </tr>
  );
}
