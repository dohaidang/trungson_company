import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string; // URL from Google LH3
  badges?: { text: string; color: "red" | "gray" }[];
  rating?: number;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  badges = [],
}: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 rounded overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {badges.map((badge, index) => (
            <span
              key={index}
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${
                badge.color === "red"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {badge.text}
            </span>
          ))}
        </div>

        {/* Action Buttons (Hover) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-background text-foreground p-1.5 shadow-sm hover:text-primary transition-colors rounded-sm">
            <Heart className="size-5" />
          </button>
          <button className="bg-background text-foreground p-1.5 shadow-sm hover:text-primary transition-colors rounded-sm">
            <Eye className="size-5" />
          </button>
        </div>

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Tags/Categories placeholder if needed */}
        
        <Link href={`/products/${id}`}>
            <h3 className="text-foreground text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
            {name}
            </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Giá bán lẻ</span>
            <div className="flex items-baseline gap-2">
                {originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                    {originalPrice.toLocaleString()}₫
                    </span>
                )}
                <span className="text-primary text-lg font-black">
                {price.toLocaleString()}₫
                </span>
            </div>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 transition-colors flex items-center justify-center w-10 h-10 rounded-sm">
            <ShoppingCart className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
