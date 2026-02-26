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

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
