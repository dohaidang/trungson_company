import Image from "next/image";
import { Building2, Target, Eye, Users, Award, Clock, Truck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu | CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN",
  description: "Tìm hiểu về CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN - 15 năm kinh nghiệm cung cấp vật liệu xây dựng cao cấp cho hơn 5000 nhà thầu trên khắp Việt Nam.",
};

// Timeline data
const TIMELINE = [
  { year: "2009", title: "Thành lập công ty", desc: "Khởi đầu với xưởng sản xuất gạch tuynel tại Bình Dương, quy mô 5 công nhân." },
  { year: "2012", title: "Mở rộng sản xuất", desc: "Đầu tư dây chuyền tự động, nâng công suất lên 50.000 viên/ngày. Bắt đầu cung cấp cho các công trình lớn." },
  { year: "2015", title: "Xây dựng thương hiệu", desc: "Đạt chứng nhận ISO 9001:2015. Mở showroom đầu tiên tại TP.HCM." },
  { year: "2018", title: "Mở rộng thị trường", desc: "Phủ sóng 15 tỉnh thành phía Nam. Hợp tác với hơn 50 nhà phân phối." },
  { year: "2022", title: "Chuyển đổi số", desc: "Ra mắt nền tảng đặt hàng trực tuyến, hệ thống quản lý kho thông minh." },
  { year: "2024", title: "Dẫn đầu ngành", desc: "Trở thành Top 5 nhà cung cấp VLXD lớn nhất miền Nam với hơn 5.000 đối tác." },
];

// Team data
const TEAM = [
  { name: "Nguyễn Trung Sơn", role: "Tổng Giám Đốc", avatar: "https://ui-avatars.com/api/?name=NTS&background=b1402f&color=fff&size=200&font-size=0.35&bold=true", desc: "15 năm kinh nghiệm trong ngành VLXD. Định hướng chiến lược phát triển bền vững." },
  { name: "Trần Minh Đức", role: "Giám Đốc Sản Xuất", avatar: "https://ui-avatars.com/api/?name=TMD&background=2a1d1b&color=fff&size=200&font-size=0.35&bold=true", desc: "Chuyên gia công nghệ sản xuất gạch. Quản lý toàn bộ quy trình chất lượng." },
  { name: "Lê Thị Hương", role: "Giám Đốc Kinh Doanh", avatar: "https://ui-avatars.com/api/?name=LTH&background=b1402f&color=fff&size=200&font-size=0.35&bold=true", desc: "Phụ trách mạng lưới phân phối và chăm sóc khách hàng toàn quốc." },
  { name: "Phạm Văn Hùng", role: "Giám Đốc Vận Hành", avatar: "https://ui-avatars.com/api/?name=PVH&background=2a1d1b&color=fff&size=200&font-size=0.35&bold=true", desc: "10 năm kinh nghiệm logistics. Đảm bảo giao hàng đúng hẹn cho mọi dự án." },
];

// Stats
const STATS = [
  { icon: Users, value: "5,000+", label: "Nhà Thầu Tin Dùng" },
  { icon: Building2, value: "200+", label: "Dự Án Hoàn Thành" },
  { icon: Award, value: "15", label: "Năm Kinh Nghiệm" },
  { icon: Truck, value: "24h", label: "Giao Hàng Nhanh" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      {/* === BANNER === */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbAP2lKJ7BC25G14XiZSsAp5ooblqYdTqq-zLA4_PHWPutdZ18C923BLZA25Hl3fmkYnjVCa4B18xlEQsTjLzacK_wcBjmetjGT-LK-pP2YO6gApfJtPzYBjtRRklBOnnobtkfHhZi91GnIH6G97SMnCkZYD4JST3cFi3iGzIStC8aJo0HDJux-oojR_8g50spmxKhXX4NYl6Tm7sysT3e6GpkiJL_uANFqFAJiltVNSRqxWj_zSTjJIYuZNM898Mi4JFd2eZRD8Y"
          alt="CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN Factory"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d1b] via-[#2a1d1b]/70 to-transparent" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">Về Chúng Tôi</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
            CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed">
            15 năm xây dựng niềm tin — Nhà cung cấp vật liệu xây dựng hàng đầu miền Nam Việt Nam.
          </p>
        </div>
      </section>

      {/* === VISION & MISSION === */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Eye className="size-7" />
              </div>
              <h2 className="text-2xl font-black text-foreground">Tầm Nhìn</h2>
              <p className="text-muted-foreground leading-relaxed">
                Trở thành nhà cung cấp vật liệu xây dựng <strong className="text-foreground">số 1 Việt Nam</strong>,
                mang đến giải pháp toàn diện từ tư vấn, cung cấp đến vận chuyển cho mọi quy mô công trình —
                từ nhà dân đến dự án thương mại lớn.
              </p>
            </div>

            {/* Mission */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Target className="size-7" />
              </div>
              <h2 className="text-2xl font-black text-foreground">Sứ Mệnh</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cam kết cung cấp sản phẩm <strong className="text-foreground">chất lượng ISO</strong> với
                giá gốc từ nhà máy. Xây dựng mối quan hệ bền vững với nhà thầu bằng sự tận tâm,
                minh bạch và dịch vụ hậu mãi xuất sắc.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Chất Lượng", desc: "ISO 9001:2015" },
              { icon: Truck, title: "Giao Hàng", desc: "Nhanh trong 24h" },
              { icon: Users, title: "Khách Hàng", desc: "5,000+ đối tác" },
              { icon: Clock, title: "Kinh Nghiệm", desc: "15 năm ngành VLXD" },
            ].map((v) => (
              <div key={v.title} className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-muted/30">
                <v.icon className="size-6 text-primary" />
                <span className="text-sm font-bold text-foreground">{v.title}</span>
                <span className="text-xs text-muted-foreground">{v.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === TIMELINE === */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Hành Trình</p>
            <h2 className="text-3xl font-black text-foreground sm:text-4xl">Câu Chuyện Trung Sơn</h2>
          </div>

          {/* Timeline items */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="flex flex-col gap-12">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{item.year}</span>
                      <h3 className="mt-1 text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === TEAM === */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Ban Lãnh Đạo</p>
            <h2 className="text-3xl font-black text-foreground sm:text-4xl">Đội Ngũ Của Chúng Tôi</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((person) => (
              <div key={person.name} className="group flex flex-col items-center text-center rounded-xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <Image src={person.avatar} alt={person.name} fill className="object-cover" />
                </div>
                <h3 className="text-base font-bold text-foreground">{person.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mt-1">{person.role}</p>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{person.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === STATS BAR === */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#2a1d1b] text-white">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-3 text-center">
              <s.icon className="size-6 text-primary" />
              <span className="text-3xl font-black">{s.value}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
