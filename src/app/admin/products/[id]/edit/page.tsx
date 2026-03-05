import { ProductForm } from "@/components/admin/ProductForm";
import { getProductForEdit } from "@/app/actions/admin";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh Sửa Sản Phẩm | Admin",
};

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { product, error } = await getProductForEdit(resolvedParams.id);

  if (error || !product) {
    notFound();
  }

  // Type transformation for form component
  const initialData = {
    name: product.name,
    description: product.description,
    dimensions: product.dimensions,
    weight: product.weight,
    compressiveStrength: product.compressiveStrength,
    isPublished: product.isPublished,
    priceTiers: product.priceTiers,
    images: product.images,
    categoryId: product.categoryId,
    applicationIds: product.applicationIds,
    stock: product.stock ?? 0,
  };

  return <ProductForm mode="edit" productId={product.id} initialData={initialData} />;
}
