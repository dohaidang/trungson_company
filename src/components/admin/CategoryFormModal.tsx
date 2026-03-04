"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const categorySchema = z.object({
  name: z.string().min(1, { message: "Tên loại sản phẩm không được để trống" }),
  description: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  initialData?: { name: string; description: string } | null;
  isEditing?: boolean;
}

export function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}: CategoryFormModalProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: CategoryFormData) => {
    startTransition(async () => {
      await onSubmit(data);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 id="modal-title" className="font-bold text-gray-900">
            {isEditing ? "Sửa Loại Sản Phẩm" : "Thêm Loại Sản Phẩm"}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
            aria-label="Đóng modal"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 flex flex-col gap-4">
          <div>
            <label htmlFor="category-name" className="block text-xs font-bold text-gray-500 mb-1.5">
              Tên Loại *
            </label>
            <input 
              id="category-name"
              {...register("name")}
              type="text" 
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 focus:ring-1 outline-none ${
                errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-primary focus:ring-primary"
              }`}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category-desc" className="block text-xs font-bold text-gray-500 mb-1.5">
              Mô tả (tuỳ chọn)
            </label>
            <textarea 
              id="category-desc"
              {...register("description")}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none" 
            />
          </div>
          
          <div className="mt-4 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Huỷ
            </button>
            <button 
              type="submit" 
              disabled={isPending || !isValid} 
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
