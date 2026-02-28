import Link from "next/link";
import { Home } from "lucide-react";

export function Footer({ settings }: { settings?: Record<string, string> }) {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-[300px]">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <Home className="size-4" />
              </div>
              <span className="font-bold text-foreground uppercase">{settings?.SITE_NAME || "CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN"}</span>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {settings?.SITE_SLOGAN || "Xây dựng nền móng ước mơ của bạn với gạch và vật liệu xây dựng chất lượng cao."}
            </p>
          </div>
          
          <div className="flex gap-16 flex-wrap">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Cửa Hàng</h4>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tất Cả Sản Phẩm</Link>
              <Link href="/products?sort=popular" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bán Chạy Nhất</Link>
              <Link href="/products?sort=newest" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hàng Mới Về</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Công Ty</h4>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Về Chúng Tôi</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Liên Hệ</Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Chính Sách Bảo Mật</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Hỗ Trợ</h4>
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">Thông Tin Vận Chuyển</Link>
              <Link href="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">Đổi Trả</Link>
              <Link href="/calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hướng Dẫn Tính Toán</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Vị Trí</h4>
              <div className="w-full sm:w-[300px] lg:w-[350px] h-[200px] rounded-md overflow-hidden shadow-sm">
                {settings?.CONTACT_MAP_IFRAME ? (
                  <div dangerouslySetInnerHTML={{ __html: settings.CONTACT_MAP_IFRAME }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full border-0" />
                ) : (
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2450.6658440945885!2d105.82952298236648!3d19.996040028356024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31366086a8071455%3A0x31a81834eaeec103!2zTmjDoCBNw6F5IEfhuqFjaCBUdXluZWwgVHJ1bmcgU8ahbg!5e0!3m2!1svi!2s!4v1772295780661!5m2!1svi!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {settings?.SITE_NAME || "CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
