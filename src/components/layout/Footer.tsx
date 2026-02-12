import Link from "next/link";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-[300px]">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <Home className="size-4" />
              </div>
              <span className="font-bold text-foreground">Trung Sơn Company</span>
            </div>
            <p className="text-sm text-muted-foreground">
                Xây dựng nền móng ước mơ của bạn với gạch và vật liệu xây dựng chất lượng cao.
            </p>
          </div>
          
          <div className="flex gap-16 flex-wrap">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Cửa Hàng</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tất Cả Sản Phẩm</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bán Chạy Nhất</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hàng Mới Về</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Công Ty</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Về Chúng Tôi</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Liên Hệ</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Chính Sách Bảo Mật</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Hỗ Trợ</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Thông Tin Vận Chuyển</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Đổi Trả</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hướng Dẫn Tính Toán</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2026 Trung Sơn Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
