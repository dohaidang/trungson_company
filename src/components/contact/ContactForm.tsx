"use client";

import { Send } from "lucide-react";

export function ContactForm() {
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
      <form action="#" className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Họ Và Tên
            </label>
            <input
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
          <select className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
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
            className="w-full bg-muted/50 px-4 py-3 text-sm border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="Mô tả yêu cầu dự án của bạn..."
            rows={4}
          ></textarea>
        </div>
        <button
          className="w-full bg-primary hover:bg-primary/90 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          type="submit"
        >
          <Send className="size-4" />
          Gửi Yêu Cầu
        </button>
      </form>
    </div>
  );
}
