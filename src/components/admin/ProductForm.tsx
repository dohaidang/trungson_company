"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { createProduct, updateProduct } from "@/app/actions/admin";

// ===== TYPES =====
interface PriceTierInput {
  minQuantity: number;
  maxQuantity: number | null;
  unitPrice: number;
}

interface ProductFormData {
  name: string;
  type: string;
  description: string;
  dimensions: string;
  weight: number | null;
  compressiveStrength: number | null;
  isPublished: boolean;
  priceTiers: PriceTierInput[];
}

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  initialData?: ProductFormData;
}

const PRODUCT_TYPES = [
  { value: "SOLID", label: "Gạch Đặc" },
  { value: "FOUR_HOLE", label: "Gạch 4 Lỗ" },
  { value: "TWO_HOLE", label: "Gạch 2 Lỗ" },
  { value: "BLOCK", label: "Gạch Block" },
  { value: "DECORATIVE", label: "Gạch Trang Trí" },
];

const DEFAULT_FORM: ProductFormData = {
  name: "",
  type: "SOLID",
  description: "",
  dimensions: "",
  weight: null,
  compressiveStrength: null,
  isPublished: true,
  priceTiers: [{ minQuantity: 0, maxQuantity: 999, unitPrice: 0 }],
};

export function ProductForm({ mode, productId, initialData }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<ProductFormData>(initialData || DEFAULT_FORM);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const updateField = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Price tier management
  const addTier = () => {
    const lastTier = form.priceTiers[form.priceTiers.length - 1];
    const newMin = lastTier ? (lastTier.maxQuantity ?? 0) + 1 : 0;
    setForm((prev) => ({
      ...prev,
      priceTiers: [...prev.priceTiers, { minQuantity: newMin, maxQuantity: null, unitPrice: 0 }],
    }));
  };

  const removeTier = (index: number) => {
    if (form.priceTiers.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      priceTiers: prev.priceTiers.filter((_, i) => i !== index),
    }));
  };

  const updateTier = (index: number, field: keyof PriceTierInput, value: number | null) => {
    setForm((prev) => ({
      ...prev,
      priceTiers: prev.priceTiers.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    // Basic client-side validation
    if (!form.name.trim()) {
      setMsg({ type: "error", text: "Vui lòng nhập tên sản phẩm" });
      return;
    }
    if (form.priceTiers.some((t) => t.unitPrice <= 0)) {
      setMsg({ type: "error", text: "Giá phải lớn hơn 0 cho tất cả mức giá" });
      return;
    }

    startTransition(async () => {
      const payload = {
        name: form.name.trim(),
        type: form.type,
        description: form.description.trim() || undefined,
        dimensions: form.dimensions.trim() || undefined,
        weight: form.weight,
        compressiveStrength: form.compressiveStrength,
        isPublished: form.isPublished,
        priceTiers: form.priceTiers,
      };

      let result;
      if (mode === "edit" && productId) {
        result = await updateProduct(productId, payload);
      } else {
        result = await createProduct(payload);
      }

      if (result.success) {
        setMsg({ type: "success", text: mode === "edit" ? "Cập nhật thành công!" : "Tạo sản phẩm thành công!" });
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        setMsg({ type: "error", text: result.error || "Có lỗi xảy ra" });
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f4f6f9]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="size-4" />
              Quay lại
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <h1 className="text-lg font-black text-gray-900">
              {mode === "edit" ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
            </h1>
          </div>
          <button type="submit" form="product-form" disabled={isPending}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all shadow-sm">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {mode === "edit" ? "Lưu Thay Đổi" : "Tạo Sản Phẩm"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Status message */}
        {msg && (
          <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium mb-6 ${
            msg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {msg.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
            {msg.text}
          </div>
        )}

        <form id="product-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5">Thông Tin Cơ Bản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Tên sản phẩm *</label>
                <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)}
                  placeholder="VD: Gạch Đặc Tiêu Chuẩn"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Loại sản phẩm *</label>
                <select value={form.type} onChange={(e) => updateField("type", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white">
                  {PRODUCT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Kích thước</label>
                <input type="text" value={form.dimensions} onChange={(e) => updateField("dimensions", e.target.value)}
                  placeholder="VD: 22x10.5x6cm"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Trọng lượng (kg/viên)</label>
                <input type="number" step="0.1" value={form.weight ?? ""} onChange={(e) => updateField("weight", e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="VD: 1.8"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>

              {/* Compressive Strength */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Cường độ nén (MPa)</label>
                <input type="number" step="0.5" value={form.compressiveStrength ?? ""} onChange={(e) => updateField("compressiveStrength", e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="VD: 7.5"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Mô tả</label>
                <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)}
                  rows={3} placeholder="Mô tả chi tiết về sản phẩm..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none" />
              </div>

              {/* Published toggle */}
              <div className="md:col-span-2 flex items-center gap-3">
                <button type="button" onClick={() => updateField("isPublished", !form.isPublished)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isPublished ? "bg-primary" : "bg-gray-300"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${form.isPublished ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className="text-sm font-medium text-gray-700">{form.isPublished ? "Đang bán" : "Ẩn sản phẩm"}</span>
              </div>
            </div>
          </div>

          {/* Price Tiers */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Bảng Giá *</h2>
              <button type="button" onClick={addTier}
                className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors">
                <Plus className="size-3" /> Thêm mức giá
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Header */}
              <div className="grid grid-cols-[1fr_1fr_1fr_40px] gap-3 px-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">SL Tối Thiểu</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">SL Tối Đa</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Đơn Giá (VNĐ)</span>
                <span />
              </div>

              {form.priceTiers.map((tier, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_1fr_40px] gap-3 items-center">
                  <input type="number" min={0} value={tier.minQuantity} onChange={(e) => updateTier(i, "minQuantity", parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  <input type="number" min={0} value={tier.maxQuantity ?? ""} onChange={(e) => updateTier(i, "maxQuantity", e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="∞"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  <input type="number" min={0} value={tier.unitPrice || ""} onChange={(e) => updateTier(i, "unitPrice", parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  <button type="button" onClick={() => removeTier(i)} disabled={form.priceTiers.length <= 1}
                    className="flex items-center justify-center h-9 w-9 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-3">* Để trống "SL Tối Đa" cho mức giá không giới hạn số lượng</p>
          </div>
        </form>
      </div>
    </div>
  );
}
