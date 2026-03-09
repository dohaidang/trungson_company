import { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts } from '@/app/actions/product';
import prisma from '@/lib/db';
import { SearchFilter } from '@/components/search/SearchFilter';
import { ProductCard } from '@/components/products/ProductCard';
import { PackageSearch, Frown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kết quả tìm kiếm | Trung Sơn Company',
  description: 'Tìm kiếm vật liệu xây dựng tại Trung Sơn Company',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const categories = resolvedParams.categories ? resolvedParams.categories.split(',') : undefined;
  const applications = resolvedParams.applications ? resolvedParams.applications.split(',') : undefined;
  const minPrice = resolvedParams.minPrice ? parseInt(resolvedParams.minPrice) : undefined;
  const maxPrice = resolvedParams.maxPrice ? parseInt(resolvedParams.maxPrice) : undefined;
  const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1;

  // Lấy dữ liệu filter gốc từ DB
  const [allCategories, allApplications] = await Promise.all([
    prisma.category.findMany(),
    prisma.application.findMany(),
  ]);

  // Lấy dữ liệu sản phẩm
  const { products } = await getProducts({
    query,
    filters: {
        types: categories,
        applications: applications,
        minPrice,
        maxPrice
    },
    page,
    limit: 24, // số lượng/trang
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Kết Quả */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                <PackageSearch className="h-8 w-8 text-blue-600" />
                Kết quả tìm kiếm
            </h1>
            {query && (
                <p className="mt-2 text-slate-600 font-medium">
                    Tìm thấy <span className="text-blue-600 font-bold">{products?.length || 0}</span> sản phẩm cho từ khoá <span className="text-slate-900 border-b-2 border-slate-300">"{query}"</span>
                </p>
            )}
            {!query && (
                <p className="mt-2 text-slate-600 text-lg">
                    Tất cả sản phẩm (Sử dụng bộ lọc để tìm kiếm)
                </p>
            )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Cột trái: Bộ lọc (Desktop) */}
            <div className="w-full lg:w-1/4 lg:sticky lg:top-24 shrink-0">
                <Suspense fallback={<div className="h-96 w-full rounded-2xl bg-white shadow-sm border border-slate-100 animate-pulse"></div>}>
                    <SearchFilter 
                        categories={allCategories} 
                        applications={allApplications} 
                        initialFilters={{
                            query,
                            categories: categories || [],
                            applications: applications || [],
                            minPrice,
                            maxPrice
                        }}
                    />
                </Suspense>
            </div>

            {/* Cột phải: Danh sách sản phẩm */}
            <div className="w-full lg:w-3/4">
                {(!products || products.length === 0) ? (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center shadow-sm">
                        <Frown className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Không tìm thấy sản phẩm nào</h3>
                        <p className="text-slate-500 mt-2 max-w-md mx-auto">
                            Rất tiếc chúng tôi không có sản phẩm nào khớp với tìm kiếm của bạn. Hãy thử thay đổi từ khoá hoặc nới lỏng bộ lọc.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard 
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                description={product.description || ""}
                                price={product.priceTiers?.[0]?.unitPrice || 0}
                                image={product.images ? JSON.parse(product.images)?.[0] || "/assets/images/placeholder.svg" : "/assets/images/placeholder.svg"}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}
