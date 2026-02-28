"use client";

import { useState, useTransition } from "react";
import {
  Layers,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Edit2
} from "lucide-react";
import { createApplication, updateApplication, deleteApplication } from "@/app/actions/application";

interface ApplicationData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productsCount: number;
}

export function ApplicationsTab({ initialApplications }: { initialApplications: ApplicationData[] }) {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const filtered = applications.filter((a) =>
    search === "" || a.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (app: ApplicationData) => {
    setEditingId(app.id);
    setFormData({ name: app.name, description: app.description || "" });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    startTransition(async () => {
      let result;
      if (editingId) {
        result = await updateApplication(editingId, { name: formData.name, description: formData.description });
      } else {
        result = await createApplication({ name: formData.name, description: formData.description });
      }

      if (result.success && "application" in result && result.application) {
        setActionMsg({ type: "success", text: editingId ? "Đã cập nhật Ứng dụng" : "Đã thêm mới Ứng dụng" });
        if (editingId) {
          setApplications(applications.map(c => c.id === editingId ? { ...c, name: formData.name, description: formData.description } : c));
        } else if (result.application) {
          setApplications([{ id: result.application.id, name: result.application.name, slug: result.application.slug, description: result.application.description, productsCount: 0 }, ...applications]);
        }
        setShowModal(false);
      } else {
        setActionMsg({ type: "error", text: result.error || "Có lỗi xảy ra" });
      }
      setTimeout(() => setActionMsg(null), 3000);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá ứng dụng này?")) return;

    startTransition(async () => {
      const result = await deleteApplication(id);
      if (result.success) {
        setApplications(applications.filter(c => c.id !== id));
        setActionMsg({ type: "success", text: "Đã xoá ứng dụng" });
      } else {
        setActionMsg({ type: "error", text: result.error || "Không thể xoá" });
      }
      setTimeout(() => setActionMsg(null), 3000);
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {actionMsg && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${actionMsg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {actionMsg.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {actionMsg.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm ứng dụng..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm shrink-0">
          <Plus className="size-4" /> Thêm Ứng dụng
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Tên Ứng dụng</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Mô Tả</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Số Sản Phẩm</th>
                <th className="px-5 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                        <Layers className="size-4" />
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
                      <button onClick={() => handleOpenEdit(cat)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa">
                        <Edit2 className="size-4" />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xoá" disabled={cat.productsCount > 0}>
                        <Trash2 className="size-4" />
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingId ? "Sửa Ứng Dụng" : "Thêm Ứng Dụng"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Tên Ứng Dụng *</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Mô tả (tuỳ chọn)</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none" />
              </div>
              <div className="mt-4 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Huỷ</button>
                <button type="submit" disabled={isPending || !formData.name.trim()} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
