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
    categoryId: product.categoryId,
    description: product.description,
    dimensions: product.dimensions,
    weight: product.weight,
    compressiveStrength: product.compressiveStrength,
    isPublished: product.isPublished,
    applicationIds: product.applicationIds,
    stock: product.stock,
    priceTiers: product.priceTiers,
    images: product.images,
  };

  return <ProductForm mode="edit" productId={product.id} initialData={initialData} />;
}
