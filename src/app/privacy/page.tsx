import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật | Trung Sơn Company",
  description: "Chính sách bảo mật thông tin khách hàng của Trung Sơn Company",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Banner */}
      <div className="bg-muted py-16 md:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ShieldCheck className="mx-auto mb-6 size-16 text-primary" />
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            Chính Sách <span className="text-primary">Bảo Mật</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Bảo vệ thông tin cá nhân của bạn là ưu tiên hàng đầu của chúng tôi. Vui lòng đọc kỹ các chính sách dưới đây để hiểu rõ hơn về cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Eye className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">1. Thu thập thông tin cá nhân</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Chúng tôi thu thập thông tin cá nhân của bạn khi bạn sử dụng trang web, liên hệ với chúng tôi, hoặc mua hàng. Các thông tin thu thập có thể bao gồm:
              </p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Họ và tên, địa chỉ email, số điện thoại, và địa chỉ giao hàng.</li>
                <li>Thông tin về doanh nghiệp (nếu có yêu cầu xuất hóa đơn hoặc mua sỉ).</li>
                <li>Lịch sử mua hàng và các tương tác với bộ phận chăm sóc khách hàng.</li>
                <li>Thông tin tự động thu thập từ trình duyệt web như địa chỉ IP, loại trình duyệt, và lịch sử truy cập (thông qua Cookies).</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <FileText className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">2. Mục đích sử dụng thông tin</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Thông tin cá nhân của bạn sẽ được Trung Sơn Company sử dụng cho các mục đích hợp pháp sau:
              </p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Xử lý đơn hàng, giao hàng và cung cấp các dịch vụ liên quan.</li>
                <li>Hỗ trợ khách hàng, giải đáp thắc mắc và xử lý khiếu nại.</li>
                <li>Cung cấp thông tin về các chương trình khuyến mãi, sản phẩm mới (nếu bạn đăng ký nhận bản tin).</li>
                <li>Cải thiện chất lượng website và trải nghiệm mua sắm của người dùng.</li>
                <li>Ngăn chặn các hoạt động gian lận và bảo vệ quyền lợi hợp pháp của công ty.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Lock className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">3. Bảo mật dữ liệu</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi cam kết bảo mật thông tin cá nhân của bạn bằng mọi biện pháp nghiệp vụ, kỹ thuật và công nghệ hiện có. Hệ thống máy chủ của chúng tôi được bảo vệ bởi tường lửa và các công nghệ mã hóa an toàn (như SSL).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Tuy nhiên, do hạn chế về mặt kỹ thuật, không có dữ liệu nào truyền trên môi trường internet có thể được bảo mật 100%. Do đó, chúng tôi không thể đưa ra một cam kết bảo đảm tuyệt đối rằng thông tin bạn cung cấp cho chúng tôi sẽ được bảo mật một cách tuyệt đối an toàn.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">4. Thời gian lưu trữ thông tin</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <p className="text-muted-foreground leading-relaxed">
                Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự khách hàng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp, thông tin cá nhân khách hàng sẽ được bảo mật an toàn trên máy chủ của hệ thống.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="rounded-2xl bg-primary text-primary-foreground p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Bạn có thắc mắc về bảo mật?</h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, xin vui lòng liên hệ với bộ phận chăm sóc khách hàng của chúng tôi.
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
