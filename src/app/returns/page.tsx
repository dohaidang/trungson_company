import { RefreshCcw, AlertCircle, XCircle, Info, CreditCard } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả | Trung Sơn Company",
  description: "Chính sách đổi trả hàng hóa và hoàn tiền của Trung Sơn Company",
};

export default function ReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Banner */}
      <div className="bg-muted py-16 md:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <RefreshCcw className="mx-auto mb-6 size-16 text-primary" />
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            Chính Sách <span className="text-primary">Đổi Trả</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Trung Sơn Company cam kết mang lại quyền lợi cao nhất cho khách hàng. Vui lòng tham khảo chi tiết các quy định về việc đổi trả sản phẩm và hoàn tiền dưới đây.
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          {/* Section 1: Điều kiện */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <AlertCircle className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">1. Điều kiện tiếp nhận đổi trả</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Quý khách hàng sẽ được hỗ trợ đổi trả sản phẩm khi đáp ứng đầy đủ các điều kiện sau:
              </p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Sản phẩm được mua trực tiếp tại hệ thống của Trung Sơn Company (Showroom hoặc Website).</li>
                <li>Sản phẩm còn nguyên đai, nguyên kiện, chưa qua sử dụng, ngâm nước hoặc thi công.</li>
                <li>Sản phẩm không có dấu hiệu trầy xước, sứt mẻ, ố bẩn do lỗi bảo quản từ phía khách hàng.</li>
                <li>Quý khách có đầy đủ các chứng từ kèm theo: Hóa đơn mua hàng, Phiếu giao hàng, Biên nhận thanh toán.</li>
                <li>Yêu cầu đổi trả được thực hiện trong vòng <strong>07 ngày</strong> kể từ ngày nhận hàng.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Trường hợp từ chối */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <XCircle className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">2. Các trường hợp từ chối đổi trả</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Quá thời hạn 07 ngày kể từ ngày khách hàng nhận được sản phẩm.</li>
                <li>Sản phẩm đã qua sử dụng, thi công ráp đặt, biến dạng, móp méo, trầy xước do tác động bên ngoài sau khi nhận hàng.</li>
                <li>Sản phẩm là hàng thanh lý, hàng cắt lô xả kho, hoặc các sản phẩm có ghi chú "Không áp dụng đổi trả" khi mua.</li>
                <li>Không có chứng từ chứng minh việc mua hàng tại Trung Sơn Company.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Quy trình */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Info className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">3. Quy trình thực hiện đổi trả</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm space-y-4 text-muted-foreground">
              <p>
                <strong>Bước 1:</strong> Khách hàng liên hệ với bộ phận CSKH qua Hotline hoặc Email để thông báo về yêu cầu đổi/trả hàng, cung cấp lý do và hình ảnh thực tế của sản phẩm.
              </p>
              <p>
                <strong>Bước 2:</strong>Nhân viên CSKH sẽ tiếp nhận, kiểm tra thông tin đơn hàng và phản hồi về việc sản phẩm có đủ điều kiện đổi trả hay không trong vòng 24 giờ làm việc.
              </p>
              <p>
                <strong>Bước 3:</strong> Nếu sản phẩm đủ điều kiện, quý khách vui lòng vận chuyển sản phẩm kèm theo hóa đơn chứng từ về kho của Trung Sơn Company theo địa chỉ được hướng dẫn.
              </p>
              <p>
                <strong>Bước 4:</strong> Sau khi nhận và kiểm tra hàng hóa tại kho, chúng tôi sẽ tiến hành thủ tục hoàn tiền hoặc đổi sản phẩm thay thế (tuỳ theo thoả thuận) trong vòng 3-5 ngày làm việc.
              </p>
            </div>
          </section>

          {/* Section 4: Chi phí */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">4. Chi phí đổi/trả hàng</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Đổi trả do lỗi của nhà sản xuất hoặc giao sai mẫu:</strong> Trung Sơn Company sẽ chịu 100% chi phí vận chuyển để thu hồi sản phẩm lỗi và giao lại sản phẩm mới.</li>
                <li><strong className="text-foreground">Đổi trả theo nhu cầu (khách đổi ý, đặt thừa hàng...):</strong> Khách hàng sẽ phải chịu chi phí vận chuyển trả hàng về kho và chi phí vận chuyển chiều đi nếu có phát sinh cước phí cho đơn hàng thay thế. Ngoài ra, có thể áp dụng mức phí nhập lại kho từ 5% - 15% tuỳ thuộc vào loại sản phẩm.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: CTA */}
          <section className="space-y-4">
            <div className="rounded-2xl bg-primary text-primary-foreground p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Bạn cần hỗ trợ về sản phẩm?</h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Hãy liên hệ với chúng tôi nếu bạn phát hiện bất kì khiếm khuyết nào trên sản phẩm vừa nhận được.
                </p>
              </div>
              <div className="mt-6 sm:mt-0">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Xác nhận khiếu nại
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
