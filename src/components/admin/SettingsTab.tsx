"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, AlertCircle, Loader2, Save, Globe, Phone, Share2, Search as SearchIcon, UploadCloud, X, AlertTriangle } from "lucide-react";
import { updateSettings } from "@/app/actions/setting";

interface SettingsTabProps {
  initialSettings: Record<string, string>;
}

export function SettingsTab({ initialSettings }: SettingsTabProps) {
  const [formData, setFormData] = useState(initialSettings || {});
  const [isPending, startTransition] = useTransition();
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: Record<string, string>) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Define categories for each key if they are new
      const categories: Record<string, string> = {
        SITE_NAME: 'GENERAL', SITE_SLOGAN: 'GENERAL', SITE_LOGO_URL: 'GENERAL',
        CONTACT_HOTLINE: 'CONTACT', CONTACT_EMAIL: 'CONTACT', CONTACT_ADDRESS: 'CONTACT', CONTACT_MAP_IFRAME: 'CONTACT',
        SOCIAL_FACEBOOK: 'SOCIAL', SOCIAL_ZALO: 'SOCIAL', SOCIAL_YOUTUBE: 'SOCIAL',
        SEO_META_TITLE: 'SEO', SEO_META_DESCRIPTION: 'SEO', TRACKING_GOOGLE_ANALYTICS: 'SEO'
      };
      
      const result = await updateSettings(formData, categories);
      if (result.success) {
        setActionMsg({ type: "success", text: "Đã lưu cài đặt thành công" });
      } else {
        setActionMsg({ type: "error", text: result.error || "Có lỗi xảy ra" });
      }
      setTimeout(() => setActionMsg(null), 3000);
    });
  };

  const getVal = (key: string) => formData[key] || "";

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setActionMsg(null);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("files", files[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!res.ok) {
        throw new Error("Lỗi tải ảnh lên. Vui lòng thử lại.");
      }

      const data = await res.json();
      if (data.urls && Array.isArray(data.urls) && data.urls.length > 0) {
        handleChange("SITE_LOGO_URL", data.urls[0]);
        setActionMsg({ type: "success", text: "Tải ảnh lên thành công" });
        setTimeout(() => setActionMsg(null), 3000);
      }
    } catch (error: any) {
      setActionMsg({ type: "error", text: error.message || "Không thể tải ảnh" });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cài đặt Website</h2>
          <p className="text-sm text-gray-500 mt-1">Quản lý nội dung động hiển thị trên website (tên công ty, sđt, mạng xã hội...)</p>
        </div>
        <button 
          type="submit" 
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all shadow-sm"
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Lưu Cài Đặt
        </button>
      </div>

      {actionMsg && (
        <div className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${actionMsg.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
          {actionMsg.type === "success" ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
          {actionMsg.text}
        </div>
      )}

      {/* Warning Box */}
      <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 flex gap-3 text-sm">
        <AlertTriangle className="size-5 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-900">Khu vực cần chú ý</h4>
          <p className="mt-1 text-amber-700 leading-relaxed">
            Các thay đổi tại đây là thiết lập lõi của hệ thống và <strong>sẽ được áp dụng trực tiếp lên giao diện website ngay lập tức</strong> sau khi lưu. Vui lòng kiểm tra kỹ thông tin đặc biệt là số điện thoại Hotline và các đường dẫn liên kết trước khi ấn Xác nhận.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thông tin chung */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Globe className="size-4" /></div>
            <h3 className="font-bold text-gray-900">Thông Tin Chung</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Tên Công Ty / Thương Hiệu</label>
              <input type="text" value={getVal("SITE_NAME")} onChange={e => handleChange("SITE_NAME", e.target.value)}
                placeholder="CÔNG TY CỔ PHẦN..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Slogan</label>
              <input type="text" value={getVal("SITE_SLOGAN")} onChange={e => handleChange("SITE_SLOGAN", e.target.value)}
                placeholder="Kiến tạo tương lai..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Logo URL (Header)</label>
              
              <div className="flex flex-col gap-3">
                {getVal("SITE_LOGO_URL") ? (
                  <div className="relative w-40 h-20 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center p-2 group overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getVal("SITE_LOGO_URL")} alt="Logo" className="max-w-full max-h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <button
                        type="button"
                        onClick={() => handleChange("SITE_LOGO_URL", "")}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className={`flex flex-col items-center justify-center gap-3 w-full h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-primary/50 text-gray-400 hover:text-primary transition-all cursor-pointer ${isUploading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      {isUploading ? <Loader2 className="size-5 animate-spin" /> : <UploadCloud className="size-5" />}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{isUploading ? "Đang xử lý..." : "Click để tải ảnh lên"}</p>
                      <p className="text-xs text-gray-400 mt-1">Nên dùng file PNG, SVG nền trong suốt (Tỉ lệ ngang, ~200x50px)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/png, image/jpeg, image/svg+xml, image/webp" 
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                )}
                
                <input type="text" value={getVal("SITE_LOGO_URL")} onChange={e => handleChange("SITE_LOGO_URL", e.target.value)}
                  placeholder="Hoặc dán URL ảnh trực tiếp vào đây..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 text-xs text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Liên hệ & Trụ sở */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Phone className="size-4" /></div>
            <h3 className="font-bold text-gray-900">Liên Hệ & Địa Chỉ</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Hotline</label>
                <input type="text" value={getVal("CONTACT_HOTLINE")} onChange={e => handleChange("CONTACT_HOTLINE", e.target.value)}
                  placeholder="1900 xxxx"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Email</label>
                <input type="email" value={getVal("CONTACT_EMAIL")} onChange={e => handleChange("CONTACT_EMAIL", e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Địa chỉ trụ sở</label>
              <textarea value={getVal("CONTACT_ADDRESS")} onChange={e => handleChange("CONTACT_ADDRESS", e.target.value)} rows={2}
                placeholder="Số nhà, đường, quận/huyện..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Mã nhúng Google Maps (Iframe)</label>
              <textarea value={getVal("CONTACT_MAP_IFRAME")} onChange={e => handleChange("CONTACT_MAP_IFRAME", e.target.value)} rows={3}
                placeholder="<iframe src='...' ></iframe>"
                className="w-full font-mono text-xs rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none transition-all bg-gray-50" />
            </div>
          </div>
        </div>

        {/* Mạng xã hội */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-lg"><Share2 className="size-4" /></div>
            <h3 className="font-bold text-gray-900">Mạng Xã Hội</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Facebook Fanpage URL</label>
              <input type="url" value={getVal("SOCIAL_FACEBOOK")} onChange={e => handleChange("SOCIAL_FACEBOOK", e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Zalo (SĐT hoặc Zalo.me URL)</label>
              <input type="text" value={getVal("SOCIAL_ZALO")} onChange={e => handleChange("SOCIAL_ZALO", e.target.value)}
                placeholder="https://zalo.me/..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">YouTube Channel URL</label>
              <input type="url" value={getVal("SOCIAL_YOUTUBE")} onChange={e => handleChange("SOCIAL_YOUTUBE", e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* SEO & Analytics */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><SearchIcon className="size-4" /></div>
            <h3 className="font-bold text-gray-900">SEO & Tracking</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">SEO Meta Title (Mặc định)</label>
              <input type="text" value={getVal("SEO_META_TITLE")} onChange={e => handleChange("SEO_META_TITLE", e.target.value)}
                placeholder="Trang Chủ | Công Ty..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">SEO Meta Description</label>
              <textarea value={getVal("SEO_META_DESCRIPTION")} onChange={e => handleChange("SEO_META_DESCRIPTION", e.target.value)} rows={2}
                placeholder="Mô tả tóm tắt website dành cho máy tìm kiếm Google..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Mã Google Analytics (Tracking ID)</label>
              <input type="text" value={getVal("TRACKING_GOOGLE_ANALYTICS")} onChange={e => handleChange("TRACKING_GOOGLE_ANALYTICS", e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full font-mono text-sm rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50" />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
