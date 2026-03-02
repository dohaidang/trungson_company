import { Truck, MapPin, Package, Clock, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông Tin Vận Chuyển | Trung Sơn Company",
  description: "Chính sách và thông tin vận chuyển của Trung Sơn Company",
};

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Banner */}
      <div className="bg-muted py-16 md:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Truck className="mx-auto mb-6 size-16 text-primary" />
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            Thông Tin <span className="text-primary">Vận Chuyển</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Chúng tôi tự hào cung cấp dịch vụ vận chuyển nhanh chóng, an toàn và chuyên nghiệp đến mọi miền đất nước. Dưới đây là chi tiết về chính sách giao hàng của Trung Sơn.
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          {/* Section 1: Thời gian */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">1. Thời gian giao hàng</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Thời gian giao hàng phụ thuộc vào vị trí của khách hàng và loại hàng hóa. Chúng tôi cam kết nỗ lực hết mình để đơn hàng đến tay bạn trong thời gian sớm nhất.
              </p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Khu vực nội thành TP.HCM và Hà Nội:</strong> 1 - 2 ngày làm việc.</li>
                <li><strong className="text-foreground">Các tỉnh thành khác:</strong> 3 - 5 ngày làm việc.</li>
                <li><strong className="text-foreground">Đơn hàng dự án khối lượng lớn:</strong> Thời gian sẽ được thỏa thuận cụ thể trong hợp đồng hoặc báo giá.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Chi phí */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">2. Chi phí vận chuyển</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Chi phí giao hàng được tính toán dựa trên khối lượng/thể tích của hàng hóa và khoảng cách vận chuyển:
              </p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Miễn phí giao hàng:</strong> Cho các đơn hàng có giá trị trên mức quy định tại TP.HCM và Hà Nội (vui lòng liên hệ để biết định mức áp dụng hiện tại).</li>
                <li><strong className="text-foreground">Hỗ trợ phí vận chuyển:</strong> Đối với các đơn hàng dự án lớn đi các tỉnh, chúng tôi có chính sách chia sẻ và hỗ trợ một phần chi phí vận chuyển.</li>
                <li>Phí vận chuyển chính xác sẽ được nhân viên kinh doanh thông báo khi xác nhận đơn hàng với quý khách.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Đóng gói & Bảo đảm */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Package className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">3. Quy cách đóng gói và Bảo đảm an toàn</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Toàn bộ sản phẩm gạch men, thiết bị vệ sinh, và các vật liệu nội thất khác đều được <strong>đóng gói cẩn thận theo tiêu chuẩn của nhà sản xuất</strong> và được gia cố thêm (nếu cần thiết) trước khi bốc xếp lên xe tải.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi sở hữu đội xe tải chuyên dụng và đội ngũ tài xế, nhân viên bốc xếp giàu kinh nghiệm, đảm bảo hàng hóa không bị nứt vỡ, trầy xước trong suốt quá trình trung chuyển.
              </p>
            </div>
          </section>

          {/* Section 4: Nhận hàng */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">4. Trách nhiệm khi nhận hàng</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Quý khách vui lòng <strong>kiểm tra kỹ tình trạng hàng hóa</strong> (số lượng, mẫu mã, độ nguyên vẹn) ngay khi nhận hàng.</li>
                <li>Nếu phát hiện hàng hóa bị vỡ, hỏng hóc hoặc giao sai mã sản phẩm, vui lòng từ chối nhận số lượng hàng lỗi đó và thông báo ngay lập tức cho nhân viên giao hàng hoặc bộ phận chăm sóc khách hàng của chúng tôi để được xử lý đổi trả kịp thời.</li>
                <li>Sau khi quý khách đã ký nhận hàng hóa thành công mà không có ghi chú gì về tình trạng hàng, chúng tôi sẽ không chịu trách nhiệm đối với các khiếu nại về nứt vỡ trầy xước phát sinh sau đó.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: CTA */}
          <section className="space-y-4">
            <div className="rounded-2xl bg-primary text-primary-foreground p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Cần hỗ trợ về giao nhận?</h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Để theo dõi đơn hàng của bạn hoạt cập nhật lịch trình giao nhận, vui lòng liên hệ trực tiếp với chúng tôi.
                </p>
              </div>
              <div className="mt-6 sm:mt-0">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Liên hệ ngay
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
