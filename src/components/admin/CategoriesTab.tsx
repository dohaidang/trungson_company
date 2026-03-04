"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Grid,
  Plus,
  Search,
  Loader2,
  Trash2,
  Edit2
} from "lucide-react";
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/category";
import { CategoryFormModal, CategoryFormData } from "./CategoryFormModal";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productsCount: number;
}

export function CategoriesTab({ initialCategories }: { initialCategories: CategoryData[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<{ name: string; description: string } | null>(null);

  const filtered = categories.filter((c) =>
    search === "" || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingId(null);
    setInitialData(null);
    setShowModal(true);
  };

  const handleOpenEdit = (cat: CategoryData) => {
    setEditingId(cat.id);
    setInitialData({ name: cat.name, description: cat.description || "" });
    setShowModal(true);
  };

  const handleSubmit = async (data: CategoryFormData) => {
    let result;
    if (editingId) {
      result = await updateCategory(editingId, { name: data.name, description: data.description });
    } else {
      result = await createCategory({ name: data.name, description: data.description });
    }

    if (result.success && "category" in result && result.category) {
      toast.success(editingId ? "Đã cập nhật Loại sản phẩm" : "Đã thêm mới Loại sản phẩm");
      if (editingId) {
        setCategories(categories.map(c => c.id === editingId ? { ...c, name: data.name, description: data.description || "" } : c));
      } else if (result.category) {
        setCategories([{ id: result.category.id, name: result.category.name, slug: result.category.slug, description: result.category.description || null, productsCount: 0 }, ...categories]);
      }
      setShowModal(false);
      router.refresh();
    } else {
      toast.error(result.error || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá loại sản phẩm này?")) return;

    startTransition(async () => {
      const result = await deleteCategory(id);
      if (result.success) {
        setCategories(categories.filter(c => c.id !== id));
        toast.success("Đã xoá loại sản phẩm");
        router.refresh();
      } else {
        toast.error(result.error || "Không thể xoá");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <label htmlFor="search-category" className="sr-only">Tìm kiếm loại sản phẩm</label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input 
            id="search-category"
            type="text" 
            placeholder="Tìm kiếm loại sản phẩm..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
            aria-label="Tìm kiếm loại sản phẩm"
          />
        </div>
        <button 
          onClick={handleOpenCreate} 
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm shrink-0"
          aria-label="Thêm loại sản phẩm mới"
        >
          <Plus className="size-4" aria-hidden="true" /> Thêm Loại Mới
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th scope="col" className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Tên Loại</th>
                <th scope="col" className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Mô Tả</th>
                <th scope="col" className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Số Sản Phẩm</th>
                <th scope="col" className="px-5 py-3 text-right"><span className="sr-only">Hành động</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Grid className="size-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{cat.name}</p>
                        <p className="text-[10px] text-gray-400">/{cat.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 max-w-[300px] truncate">{cat.description || "—"}</td>
                  <td className="px-5 py-3.5 text-right text-sm font-bold text-gray-900">{cat.productsCount}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEdit(cat)} 
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        title="Chỉnh sửa"
                        aria-label={`Chỉnh sửa ${cat.name}`}
                      >
                        <Edit2 className="size-4" aria-hidden="true" />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)} 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500" 
                        title="Xoá" 
                        disabled={cat.productsCount > 0 || isPending}
                        aria-label={`Xoá ${cat.name}`}
                      >
                        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" aria-hidden="true" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">Không có dữ liệu.</div>
          )}
        </div>
      </div>

      <CategoryFormModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        isEditing={!!editingId}
      />
    </div>
  );
}
