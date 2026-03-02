import { Calculator, Ruler, PenTool, LayoutTemplate, Layers } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng Dẫn Tính Toán Diện Tích Lát Gạch | Trung Sơn Company",
  description: "Cách tính toán số lượng gạch, diện tích ốp lát chuẩn xác cho dự án của bạn",
};

export default function CalculationGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Banner */}
      <div className="bg-muted py-16 md:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Calculator className="mx-auto mb-6 size-16 text-primary" />
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            Hướng Dẫn <span className="text-primary">Tính Toán</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Việc dự tính chính xác lượng gạch ốp lát cần thiết không chỉ giúp bạn tiết kiệm chi phí mà còn tránh tình trạng thiếu hụt hoặc dư thừa vật tư. Dưới đây là công thức cơ bản và một số lưu ý dành cho bạn.
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          {/* Section 1: Diện tích Sàn */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <LayoutTemplate className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">1. Cách tính diện tích nền cần lát (S)</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Đầu tiên, bạn cần đo chiều dài và chiều rộng của căn phòng hoặc khu vực cần lát nền.
              </p>
              <div className="bg-muted/50 p-4 rounded-xl mb-4 text-center">
                <span className="font-mono text-lg font-bold text-foreground">
                  Diện tích nền (S) = Chiều dài (L) × Chiều rộng (W)
                </span>
                <p className="text-sm text-muted-foreground mt-2">Đơn vị đo: mét (m) | Diện tích tính bằng: mét vuông (m²)</p>
              </div>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Lưu ý đối với phòng không vuông vức:</strong> Bạn có thể chia nhỏ diện tích thành các hình chữ nhật/hình vuông nhỏ hơn, tính diện tích từng phần sau đó cộng tổng lại.</li>
                <li><strong className="text-foreground">Trừ đi diện tích các cột bù, bục/bệ:</strong> Đo chiều dài dọc các cạnh, trừ đi diện tích của những khoảng trống dự tính để tủ kệ cố định, chân cầu thang... Không lát tới.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Diện tích Tường */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Layers className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">2. Cách tính diện tích tường cần ốp</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="bg-muted/50 p-4 rounded-xl mb-4 text-center">
                <span className="font-mono text-lg font-bold text-foreground">
                  Diện tích ốp tường = (Chiều dài tường + Chiều rộng tường) × 2 × Chiều cao tường ốp
                </span>
              </div>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Sau khi tính tổng diện tích các vách tường, bạn <strong>bắt buộc phải trừ đi diện tích</strong> của các cửa chính, cửa sổ có trên các vách tường đó.</li>
                <li><strong className="text-foreground">Công thức:</strong> Diện tích cần ốp thực tế = Tổng diện tích tường - Tổng diện tích cửa sổ/cửa chính.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Quy về Số Lượng Gạch */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Ruler className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">3. Cách quy đổi diện tích ra số lượng Thùng/Viên gạch</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Sau khi có diện tích thi công (S), bạn tính toán số lượng gạch cần thiết bằng cách lấy diện tích thi công chia cho <strong>diện tích 1 viên gạch</strong> (hoặc diện tích 1 thùng gạch).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border p-4 rounded-xl">
                  <h3 className="font-bold mb-2">Tính theo viên:</h3>
                  <p className="font-mono text-sm bg-muted p-2 rounded text-center">Số viên = Diện tích cần ốp lát / Diện tích 1 viên gạch</p>
                </div>
                <div className="border border-border p-4 rounded-xl">
                  <h3 className="font-bold mb-2">Tính theo thùng:</h3>
                  <p className="font-mono text-sm bg-muted p-2 rounded text-center">Số thùng = Diện tích cần ốp lát / Diện tích 1 thùng gạch</p>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse border border-border">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="border border-border px-4 py-2">Kích thước gạch</th>
                      <th className="border border-border px-4 py-2">Diện tích 1 viên (m²)</th>
                      <th className="border border-border px-4 py-2">Số viên / 1 Thùng</th>
                      <th className="border border-border px-4 py-2">Diện tích 1 Thùng (m²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">60 x 60 cm</td>
                      <td className="border border-border px-4 py-2">0.36</td>
                      <td className="border border-border px-4 py-2">4</td>
                      <td className="border border-border px-4 py-2">1.44</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">80 x 80 cm</td>
                      <td className="border border-border px-4 py-2">0.64</td>
                      <td className="border border-border px-4 py-2">3</td>
                      <td className="border border-border px-4 py-2">1.92</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">30 x 60 cm</td>
                      <td className="border border-border px-4 py-2">0.18</td>
                      <td className="border border-border px-4 py-2">8</td>
                      <td className="border border-border px-4 py-2">1.44</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-2 italic">* Quy cách đóng gói trên chỉ mang tính chất tham khảo phổ biến, thay đổi tuỳ theo nhà máy sản xuất cụ thể.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Hao hụt */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <PenTool className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">4. Hệ số hao hụt (Rất quan trọng)</h2>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Thực tế thi công luôn phát sinh hao hụt do mạch ghép (đường ron), gạch bị cắt gọt ở các góc mép tường, hoặc rủi ro vỡ mẻ trong quá trình cắt, vận chuyển từ tầng trệt lên lầu.
              </p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Lát thẳng theo kiểu truyền thống:</strong> Nên mua dư thêm khoảng <strong className="text-primary">5% - 7%</strong> so với diện tích thực bề mặt.</li>
                <li><strong className="text-foreground">Kiểu ốp lát đặc biệt (Lát xéo, xương cá...):</strong> Do đòi hỏi cắt gạch dập khuôn liên tục, các đường chéo nên độ hao hụt sẽ rất lớn. Khuyến nghị dự phòng thêm <strong className="text-primary">10% - 15%</strong> diện tích.</li>
                <li><strong className="text-foreground">Lời khuyên:</strong> Việc mua dư một số lượng nhỏ gạch cùng lô sản xuất từ đầu sẽ tốt hơn việc bù thêm gạch khác lô sau này (sẽ dẫn đến lệch tone màu - lệch lô).</li>
              </ul>
            </div>
          </section>

          {/* Section 5: CTA */}
          <section className="space-y-4">
            <div className="rounded-2xl bg-primary text-primary-foreground p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Bạn cần tư vấn trực tiếp từ kiến trúc sư?</h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Gửi bản vẽ mặt bằng cho bộ phận tư vấn để chúng tôi thực hiện bóc tách khối lượng hoàn toàn miễn phí, chính xác đến từng viên góc cho gia đình bạn.
                </p>
              </div>
              <div className="mt-6 sm:mt-0">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Gửi bản vẽ ngay
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
