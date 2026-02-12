import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Calculator, 
  Truck, 
  Tag, 
  ShieldCheck, 
  Star, 
  Plus, 
  ChevronDown
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      
      <main className="flex-1">
        {/* --- CELL 2: Hero Section --- */}
        <section className="relative w-full">
          <div className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden">
             {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
               <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvg_FQlVvHrNWZDoozPRNjibt4jTuJbpIZcldFSWdgj0ZAxgXEaSQXTBFCWNeGh18kC4kfhysut6NgFi_07PODghJJ_3p9imRcUgY8Mq45eabdwtacu05a4Nl9usqni5MkQhFyHy3sqEvSmId7HcqGtvTiCvoqxGkkz_DkKaYGt_OgjahYkyNNiqcjV8sEGOhPPSglX9PNRgEw_ozVSo3pb4ooPp9jyuCLm8yWhz8QLbmEMMthPnJv6n0S6VbQG5pEtnbIGUE5kpU"
                  alt="Modern luxury villa"
                  fill
                  className="object-cover"
                  priority
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
            </div>

            <div className="relative z-10 flex w-full max-w-[960px] flex-col items-center gap-6 px-4 text-center">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-lg">
                  Xây vững niềm tin <br/><span className="text-primary-foreground/90">Dựng bền mái ấm</span>
                </h1>
                <p className="mx-auto max-w-[600px] text-lg font-light leading-relaxed text-gray-200">
                  Cung cấp vật liệu xây dựng cao cấp cho ngôi nhà mơ ước của bạn. 
                  <br className="hidden sm:block"/> Đ trusted by over 5000+ nhà thầu trên khắp Việt Nam.
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                <Link href="#products" className="group flex h-12 min-w-[160px] items-center justify-center gap-2 rounded bg-primary px-8 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <span>Xem Báo Giá</span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="#contact" className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded border-2 border-white/30 bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black">
                  <span>Liên Hệ Ngay</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- CELL 3: Features Section --- */}
        <section className="w-full py-16 px-4 bg-background">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                   Tại Sao Chọn <span className="text-primary">Trung Sơn</span>?
                </h2>
                <p className="text-base text-muted-foreground">Cam kết chất lượng và tiến độ cho mọi quy mô công trình.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="group flex flex-col gap-4 rounded-lg border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Truck className="size-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-foreground">Giao Hàng Thần Tốc</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                       Vận chuyển đến chân công trình trong vòng 24h. Đội xe hùng hậu sẵn sàng phục vụ.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="group flex flex-col gap-4 rounded-lg border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Tag className="size-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-foreground">Giá Gốc Tại Kho</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                       Nhập trực tiếp từ nhà máy, không qua trung gian. Tiết kiệm đến 15% cho đơn hàng lớn.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="group flex flex-col gap-4 rounded-lg border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ShieldCheck className="size-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-foreground">Chất Lượng ISO</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                       Quy trình kiểm soát chất lượng quốc tế. Từng viên gạch đều được kiểm tra độ bền.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CELL 4: Featured Products --- */}
        <section className="w-full bg-secondary/30 py-20" id="products">
          <div className="mx-auto max-w-[1280px] px-4">
            <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold leading-tight text-foreground">Sản Phẩm Bán Chạy</h2>
                <p className="mt-2 text-muted-foreground">Vật liệu được đánh giá cao cho nhà ở và công trình công nghiệp.</p>
              </div>
              <Link href="#" className="group flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                   Xem Tất Cả
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Product 1 */}
              <div className="group flex flex-col overflow-hidden rounded bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbiI0Vk0OhSQce25JTEf_EjY710XrkWZy6PMYIvWN62ZrShUkgZ96FQWEYWlb4ZMue9Fjmqxg2nn8kByBO5R3aan3e9QH5ZTuKWg3Tymq8cfas0Xm74sd7Talbc-ExBIKgP12rWbEqZqO542TOv05KjnC31V_v4DvAEOOuVvogV0gbBc8r-4UeH588SVb9gpXL9rlwqnNVFzqlfjUIiR4MyK76SWMbJNHqJDYkGinOLGLt_I8ZGoZMgCG3WVyLgMRv4lKlnRFtO-s"
                    alt="Gạch Tuynel A1"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute right-2 top-2 rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">-10%</div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Gạch Tuynel A1</h3>
                    <p className="text-xs text-muted-foreground">Chuẩn 2 lỗ</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">1,200đ <span className="text-xs font-normal text-muted-foreground">/viên</span></p>
                    <div className="flex gap-1 text-yellow-500">
                      <Star className="size-4 fill-current" />
                      <span className="text-xs text-muted-foreground">(4.8)</span>
                    </div>
                  </div>
                  <button className="mt-auto flex w-full items-center justify-center gap-2 rounded border border-primary bg-card py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Plus className="size-4" /> Thêm Giỏ Hàng
                  </button>
                </div>
              </div>

               {/* Product 2 */}
              <div className="group flex flex-col overflow-hidden rounded bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjfM0F4abx79MX-E0PurYgsoe4p49tstEiq29Usa6tg7IGstCihzEnaq5nlgne08t3IhC75EyGPqKotafX7r0p85DlP7PxiqdoSbLLyNj1uyW12TTYmhQQ2SBDRNYiFaNJ_PLFFnqU9tOjBKujv1oZJ8sStH7DdZ811NH7YcVBx67jW8Gd_5Zt4PMQjf30C_Y2bV33Z3EUYvcT3xZ4AGn10o78XQNtKbTkSOh-BXfC-4hH5rx1fzYLLxlXPx32_FiGX9g4T3DbkYo"
                    alt="Gạch Block Đặc"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Gạch Block 4 Lỗ</h3>
                    <p className="text-xs text-muted-foreground">Bê tông cốt liệu</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">3,500đ <span className="text-xs font-normal text-muted-foreground">/viên</span></p>
                    <div className="flex gap-1 text-yellow-500">
                      <Star className="size-4 fill-current" />
                      <span className="text-xs text-muted-foreground">(4.5)</span>
                    </div>
                  </div>
                  <button className="mt-auto flex w-full items-center justify-center gap-2 rounded border border-primary bg-card py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Plus className="size-4" /> Thêm Giỏ Hàng
                  </button>
                </div>
              </div>

              {/* Product 3 */}
              <div className="group flex flex-col overflow-hidden rounded bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                   <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcQ8-fJ2XCj0mHeVcFulFk8_JscrIt0RT8wxX-B2CRkgk94Eu834WC4ZkSpJ5NXUvLHwQ1OsgM05sIh73J8P-IDEzpiYdMmR7uv8cmWk6_u0CGCur05kQVpbp24-yxNXQS1wz-MID7q8CpERA85ByZEN0gPz4dNbHJSL-4vjO6w-k_3p7m0-Ak3Bs_eFNiAkKm8NOk-JGanngrEfHUzfZEmRW51jfhCP6bxfVTC3_Fwmau3KGhWy6XsjgfIG2WF2DiX5ekGuhYMTQ"
                    alt="Gạch Đỏ Đặc"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">Bán Chạy</div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Gạch Đỏ Đặc</h3>
                    <p className="text-xs text-muted-foreground">Truyền thống</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">900đ <span className="text-xs font-normal text-muted-foreground">/viên</span></p>
                    <div className="flex gap-1 text-yellow-500">
                      <Star className="size-4 fill-current" />
                      <span className="text-xs text-muted-foreground">(5.0)</span>
                    </div>
                  </div>
                  <button className="mt-auto flex w-full items-center justify-center gap-2 rounded border border-primary bg-card py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Plus className="size-4" /> Thêm Giỏ Hàng
                  </button>
                </div>
              </div>

              {/* Product 4 */}
              <div className="group flex flex-col overflow-hidden rounded bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                   <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNzCte1D6X418EWPtmaLJg_3pK04ZFtlWqMwsbDI39UJs7ld5q4afKfOL_BSeAud_2CmAufamEyFqfwjrHUZgRWG_1wHBHp-Wj4wMzvsrP9RgXjkOd7drc_LWfFMDhVHSGL1bjd5RljR7_ZUciXE0rHATLlah1NRcnMHRgXXv21CDh9gDHhREhvTZlxZl61ex9erxsU_fDuL23TLu_L2Nji_ZqQ5IIk3PYKkLWI7-7lRv9V3TSKvv50yZ3Bj9--X7EQ9M6ijVNkSk"
                    alt="Gạch Vỉa Hè"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Gạch Con Sâu</h3>
                    <p className="text-xs text-muted-foreground">Lát sân vườn vỉa hè</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">2,100đ <span className="text-xs font-normal text-muted-foreground">/viên</span></p>
                    <div className="flex gap-1 text-yellow-500">
                      <Star className="size-4 fill-current" />
                      <span className="text-xs text-muted-foreground">(4.6)</span>
                    </div>
                  </div>
                  <button className="mt-auto flex w-full items-center justify-center gap-2 rounded border border-primary bg-card py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Plus className="size-4" /> Thêm Giỏ Hàng
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- CELL 5: Calculator Widget --- */}
        <section className="w-full bg-muted/30 py-20" id="calculator">
          <div className="mx-auto max-w-[960px] px-4">
            <div className="flex flex-col gap-8 rounded-none border border-border bg-card shadow-xl md:flex-row md:items-stretch md:p-0 overflow-hidden">
              {/* Left: Info & Image */}
              <div className="relative flex flex-col justify-center p-8 text-white md:w-1/3">
                 <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbAP2lKJ7BC25G14XiZSsAp5ooblqYdTqq-zLA4_PHWPutdZ18C923BLZA25Hl3fmkYnjVCa4B18xlEQsTjLzacK_wcBjmetjGT-LK-pP2YO6gApfJtPzYBjtRRklBOnnobtkfHhZi91GnIH6G97SMnCkZYD4JST3cFi3iGzIStC8aJo0HDJux-oojR_8g50spmxKhXX4NYl6Tm7sysT3e6GpkiJL_uANFqFAJiltVNSRqxWj_zSTjJIYuZNM898Mi4JFd2eZRD8Y"
                    alt="Calculator Background"
                    fill
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-[#2a1d1b]/90" />
                 
                 <div className="relative z-10">
                    <div className="mb-4 text-primary">
                      <Calculator className="size-12" />
                    </div>
                    <h2 className="mb-2 text-2xl font-black uppercase tracking-tight">Tính Dự Toán</h2>
                    <p className="text-sm font-light text-gray-300">Lên kế hoạch ngân sách chính xác. Nhập kích thước để ước tính số lượng gạch cần thiết ngay lập tức.</p>
                 </div>
              </div>

              {/* Right: Form */}
              <div className="flex flex-1 flex-col gap-6 p-8 md:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Diện Tích (m²)</label>
                    <div className="relative">
                      <input 
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                        placeholder="VD: 50" 
                        type="number"
                      />
                      <span className="absolute right-4 top-3 text-sm text-muted-foreground">m²</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Loại Gạch</label>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-sm border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                        <option>Gạch Tuynel (Tiêu chuẩn)</option>
                        <option>Gạch Block 4 Lỗ</option>
                        <option>Gạch Đỏ Đặc</option>
                        <option>Gạch Vỉa Hè</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-3 text-muted-foreground">
                        <ChevronDown className="size-5" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="h-px w-full bg-border"></div>
                
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-muted-foreground">Số Lượng Ước Tính</span>
                    <span className="text-3xl font-black text-foreground">0 <span className="text-base font-normal text-muted-foreground">viên</span></span>
                  </div>
                  <button className="flex h-12 w-full sm:w-auto min-w-[180px] items-center justify-center gap-2 rounded-sm bg-primary px-6 font-bold uppercase tracking-wide text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
                      Tính Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

