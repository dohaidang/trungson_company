"use client";

import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/app/actions/contact";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      subject: (formData.get("subject") as string) || undefined,
      message: formData.get("message") as string,
    };

    const result = await submitContact(data);
    setLoading(false);

    if (result.success) {
      setStatus("success");
      setMessage(result.message || "Đã gửi thành công!");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setMessage(result.error || "Đã xảy ra lỗi");
    }
  };

  return (
    <div className="bg-card p-8 shadow-2xl border border-border">
      <div className="mb-8">
        <h3 className="text-xl font-bold uppercase text-foreground">
          Biểu Mẫu Liên Hệ
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Thời gian phản hồi dự kiến: Trong vòng 2 giờ làm việc.
        </p>
      </div>

      {/* Status Message */}
      {status !== "idle" && (
        <div className={`flex items-center gap-3 p-4 mb-6 rounded-sm border ${
          status === "success" 
            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-800 dark:text-green-300" 
            : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300"
        }`}>
          {status === "success" ? (
            <CheckCircle2 className="size-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="size-5 flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Họ Và Tên
            </label>
            <input
              name="name"
              required
              className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Nguyễn Văn A"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Tên Công Ty
            </label>
            <input
              name="subject"
              className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Công ty TNHH Xây Dựng..."
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <input
              name="email"
              required
              className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="email@example.com"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Số Điện Thoại
            </label>
            <input
              name="phone"
              className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="+84 ..."
              type="tel"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Loại Dự Án
          </label>
          <select
            name="projectType"
            className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
          >
            <option>Phát Triển Khu Dân Cư</option>
            <option>Khu Phức Hợp Thương Mại</option>
            <option>Cơ Sở Công Nghiệp</option>
            <option>Hạ Tầng Công Cộng</option>
            <option>Nhà Ở Tư Nhân</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Khối Lượng Ước Tính (m² hoặc số lượng)
          </label>
          <input
            className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="Ví dụ: 5,000 m²"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Nội Dung Chi Tiết
          </label>
          <textarea
            name="message"
            required
            className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="Mô tả yêu cầu dự án của bạn..."
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Đang Gửi...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Gửi Yêu Cầu
            </>
          )}
        </button>
      </form>
    </div>
  );
}
