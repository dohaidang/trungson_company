import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CTABanner() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#2a1d1b] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/80 mb-4">
          Sẵn sàng bắt đầu?
        </p>
        <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl mb-6">
          Bạn Có Dự Án Cần{" "}
          <span className="text-primary">Báo Giá</span>?
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-300 font-light mb-10 leading-relaxed">
          Đội ngũ kinh doanh của chúng tôi sẵn sàng tư vấn miễn phí, cung cấp báo
          giá cạnh tranh và lên kế hoạch giao hàng cho mọi quy mô công trình.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded bg-primary px-10 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            Liên Hệ Báo Giá
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:0901234567"
            className="inline-flex h-14 items-center justify-center gap-2 rounded border-2 border-white/20 bg-white/5 px-10 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#2a1d1b]"
          >
            <Phone className="size-5" />
            Hotline: 0901 234 567
          </a>
        </div>
      </div>
    </section>
  );
}
