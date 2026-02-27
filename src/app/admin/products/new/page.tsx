import { ProductForm } from "@/components/admin/ProductForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thêm Sản Phẩm Mới | Admin",
};

export default function NewProductPage() {
  return <ProductForm mode="create" />;
}
