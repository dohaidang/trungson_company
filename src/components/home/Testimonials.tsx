import { Star } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Anh Nguyễn Văn Minh",
    role: "Nhà thầu xây dựng",
    avatar: "https://ui-avatars.com/api/?name=NVM&background=b1402f&color=fff&size=80&font-size=0.4&bold=true",
    stars: 5,
    content:
      "Gạch tuynel của Trung Sơn rất đều màu, chất lượng ổn định. Giao hàng đúng hẹn, giá cả hợp lý. Rất hài lòng!",
  },
  {
    name: "Chị Trần Thị Hoa",
    role: "Chủ đầu tư biệt thự",
    avatar: "https://ui-avatars.com/api/?name=TTH&background=b1402f&color=fff&size=80&font-size=0.4&bold=true",
    stars: 5,
    content:
      "Tôi đã dùng gạch Trung Sơn cho 3 dự án liền. Đội ngũ tư vấn nhiệt tình, hỗ trợ tính toán số lượng chính xác. Tiết kiệm được khá nhiều.",
  },
  {
    name: "Anh Lê Hoàng Phúc",
    role: "Kiến trúc sư",
    avatar: "https://ui-avatars.com/api/?name=LHP&background=b1402f&color=fff&size=80&font-size=0.4&bold=true",
    stars: 5,
    content:
      "Dòng gạch trần exposed brick từ Trung Sơn rất đẹp, phù hợp cho các thiết kế industrial và modern. Chất lượng tương đương hàng nhập khẩu.",
  },
  {
    name: "Chị Bùi Bích Phương",
    role: "Giám đốc dự án",
    avatar: "https://ui-avatars.com/api/?name=BBP&background=b1402f&color=fff&size=80&font-size=0.4&bold=true",
    stars: 4,
    content:
      "Làm việc với kho bãi của Trung Sơn rất yên tâm. Lịch xe luôn được báo trước, hàng đi nguyên vẹn, ít bể vỡ.",
  },
  {
    name: "Anh Vũ Thành Đạt",
    role: "Chủ công ty Tường Vàng",
    avatar: "https://ui-avatars.com/api/?name=VTD&background=b1402f&color=fff&size=80&font-size=0.4&bold=true",
    stars: 5,
    content:
      "Gạch lát sân vườn bên này chống trơn trượt cực tốt. Đã giới thiệu cho vài anh em trong nghề và đều phản hồi tích cực.",
  },
  {
    name: "Anh Đinh Nhật",
    role: "Nhà đầu tư Resort",
    avatar: "https://ui-avatars.com/api/?name=DN&background=b1402f&color=fff&size=80&font-size=0.4&bold=true",
    stars: 5,
    content:
      "Chất lượng ISO đúng như cam kết! Vật tư luôn có sẵn số lượng lớn để đẩy nhanh tiến độ hoàn thiện sát dịp cuối năm.",
  },
];

export function Testimonials() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
            Khách hàng nói gì
          </p>
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Được Tin Tưởng Bởi <span className="text-primary">Hàng Ngàn</span> Nhà Thầu
          </h2>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative overflow-hidden w-full py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-r from-secondary/30 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-l from-secondary/30 to-transparent" />

          {/* Scrolling track */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
              <div key={`${t.name}-${index}`} className="w-[300px] sm:w-[400px] shrink-0 pr-6">
                <div className="h-full flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-bold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
