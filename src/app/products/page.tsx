import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductCard } from "@/components/products/ProductCard";
import { Pagination } from "@/components/ui/pagination";
import { getProducts } from "@/app/actions/product";

function getProductBadges(categoryName: string): { text: string; color: "red" | "gray" }[] {
  if (!categoryName) return [];
  switch (categoryName.toLowerCase()) {
    case "gạch đặc": return [{ text: "Đặc", color: "red" }];
    case "gạch 4 lỗ": return [{ text: "4 Lỗ", color: "gray" }];
    case "gạch 2 lỗ": return [{ text: "2 Lỗ", color: "gray" }];
    case "gạch block": return [{ text: "Block", color: "gray" }];
    case "gạch trang trí": return [{ text: "Trang Trí", color: "red" }];
    default: return [{ text: categoryName, color: "gray" }];
  }
}

// Parse images JSON string to array
function parseImages(images: string | null): string[] {
  if (!images) return [];
  try {
    return JSON.parse(images);
  } catch {
    return [];
  }
}

export default async function ProductsPage(props: {
  searchParams: Promise<{ 
    type?: string; 
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    applications?: string;
    inStock?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { products } = await getProducts({
    filters: {
        types: searchParams.type ? searchParams.type.split(',') : undefined,
        applications: searchParams.applications ? searchParams.applications.split(',') : undefined,
        inStock: searchParams.inStock === 'true' ? true : undefined,
        search: searchParams.search,
        minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto w-full px-4 md:px-8 lg:px-12 py-6">
        
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 py-4 items-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Trang Chủ
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <span className="text-foreground font-semibold">Sản Phẩm</span>
        </div>

        {/* Page Heading & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-border pb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-foreground text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Bộ Sưu Tập Gạch
            </h1>
            <p className="text-muted-foreground text-base font-normal max-w-2xl">
              Vật liệu xây dựng cao cấp được thiết kế cho độ bền và thẩm mỹ vượt trội. Hoàn hảo cho cả kết cấu chịu lực và trang trí mặt tiền.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">Sắp xếp theo:</span>
            <div className="relative min-w-[180px]">
              <select className="appearance-none w-full bg-card border border-input text-foreground py-2.5 px-4 pr-10 rounded-sm leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer text-sm font-medium">
                <option>Nổi Bật</option>
                <option>Giá: Thấp đến Cao</option>
                <option>Giá: Cao đến Thấp</option>
                <option>Mới Nhất</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                <ChevronDown className="size-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <ProductFilter 
            availableTypes={Array.from(new Set(products.map(p => p.category?.name).filter(Boolean) as string[]))} 
            availableApplications={Array.from(new Set(products.flatMap(p => p.applications.map(a => a.name)).filter(Boolean)))}
          />

          {/* Product Grid */}
          <main className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Không tìm thấy sản phẩm nào.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {products.map((product) => {
                    const images = parseImages(product.images);
                    const firstImage = images[0] || "https://placehold.co/400x300?text=No+Image";
                    const basePrice = product.priceTiers[0]?.unitPrice || 0;

                    return (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description || ""}
                        price={basePrice}
                        image={firstImage}
                        badges={getProductBadges(product.category?.name || '')}
                      />
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <Pagination />
                </div>

                {/* Count */}
                <div className="text-center mt-4 text-xs text-muted-foreground/80">
                    Hiển thị {products.length} sản phẩm
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
