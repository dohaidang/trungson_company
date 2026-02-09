import Link from "next/link";
import { ArrowRight, Truck, Package, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32 lg:py-40 bg-muted/40 px-6">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Vật Liệu Xây Dựng Chất Lượng Cao
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Cung cấp gạch, ngói, và vật liệu xây dựng uy tín. Đối tác tin cậy cho mọi công trình của bạn.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Xem Sản Phẩm <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Liên Hệ Báo Giá
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-24 lg:py-32 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Tại Sao Chọn Trung Sơn?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Chúng tôi cam kết mang đến giá trị tốt nhất cho khách hàng thông qua chất lượng và dịch vụ.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="p-3 rounded-full bg-primary/10">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Sản Phẩm Đa Dạng</h3>
            <p className="text-muted-foreground">
              Đầy đủ các loại gạch, ngói, cát, đá từ các nhà máy uy tín hàng đầu.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="p-3 rounded-full bg-primary/10">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Giao Hàng Nhanh Chóng</h3>
            <p className="text-muted-foreground">
              Đội ngũ xe tải, xe cẩu chuyên nghiệp đảm bảo tiến độ công trình.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="p-3 rounded-full bg-primary/10">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Uy Tín & Chất Lượng</h3>
            <p className="text-muted-foreground">
              Cam kết chất lượng đúng chuẩn, bảo hành chính hãng và hỗ trợ tận tâm.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
