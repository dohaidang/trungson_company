import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductCard } from "@/components/products/ProductCard";
import { Pagination } from "@/components/ui/pagination";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto w-full px-4 md:px-8 lg:px-12 py-6">
        
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 py-4 items-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Trang Chủ
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <span className="text-foreground font-semibold">Sản Phẩm</span>
        </div>

        {/* Page Heading & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-border pb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-foreground text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Bộ Sưu Tập Gạch
            </h1>
            <p className="text-muted-foreground text-base font-normal max-w-2xl">
              Vật liệu xây dựng cao cấp được thiết kế cho độ bền và thẩm mỹ vượt trội. Hoàn hảo cho cả kết cấu chịu lực và trang trí mặt tiền.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">Sắp xếp theo:</span>
            <div className="relative min-w-[180px]">
              <select className="appearance-none w-full bg-card border border-input text-foreground py-2.5 px-4 pr-10 rounded-sm leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer text-sm font-medium">
                <option>Nổi Bật</option>
                <option>Giá: Thấp đến Cao</option>
                <option>Giá: Cao đến Thấp</option>
                <option>Mới Nhất</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                <ChevronDown className="size-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <ProductFilter />

          {/* Product Grid */}
          <main className="flex-1">
            {/* Active Filters Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-2 bg-card border border-border pl-3 pr-2 py-1 text-sm text-foreground rounded-sm">
                <span>Màu: Đỏ Đất Nung</span>
                <button className="hover:text-primary"><span className="text-lg leading-none">&times;</span></button>
              </div>
              <div className="flex items-center gap-2 bg-card border border-border pl-3 pr-2 py-1 text-sm text-foreground rounded-sm">
                <span>Loại: Gạch 2 Lỗ</span>
                <button className="hover:text-primary"><span className="text-lg leading-none">&times;</span></button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {/* Product 1 */}
              <ProductCard
                id="1"
                name="Gạch Đặc Tiêu Chuẩn - Tuynel Đỏ"
                description="Gạch đỏ đặc truyền thống thích hợp cho tường chịu lực và xây trang trí."
                price={1200}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBOkOJMeXYpJ0f4HbwY7XwdaV1MHUpX0i9poi5ObN_p7Jl7XDVT8OxVOhO7QSsi7BBNM2ggQEJYH4S69HwudQk9KL2qezdCfXZp7vAHkCevvWQamiCjtHArq8O4gTffvZN-3tWcsujN6STEiAi7NZnG73cVf3_DmGaQ4AJD4ihfUgxxGdNt2N_jDWBw4k1aF6yHJZUhuaPlyiKbA9Q20DOioiXmCUluvz9ArqicUBknkLhUT6ktJV3onII0nnFLaA31JIEle2COzU8"
                badges={[{ text: "Bán Chạy", color: "red" }]}
              />
              
              {/* Product 2 */}
              <ProductCard
                id="2"
                name="Gạch 2 Lỗ - Tiêu Chuẩn"
                description="Lựa chọn kinh tế cho tường ngăn. Khả năng cách nhiệt và cách âm tốt."
                price={1050}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBHIHMqYWbnt4OZL7QXikC8Nc4KgurzSpfK7vytzWQSn-PJ0QBcqvS9fRmHvW_x-TxN0Si5JxdawmXT_h_uhsEqiQUVdRZ0q2ZONot6we0cThXPrq1UA40j2KMIguSLP2_YvpBOzoKO03zT_6cGads3KmZJNts5QOJO63VbaM5E2zSTW1V1Hp719QKuE2eOf9piETZj7n_JwTr61YbgFHmm-dhNFilaCJdNVGYhm-NEQ9LoTW37d1pxlV7PJZljq974woHa1vCD3Po"
                badges={[{ text: "Nhẹ", color: "gray" }]}
              />

              {/* Product 3 */}
              <ProductCard
                id="3"
                name="Gạch Ốp Tường Xám Đá"
                description="Bề mặt xám hiện đại cho thiết kế kiến trúc đương đại. Hút nước thấp."
                price={2400}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuABtXUghu4tcdwVOcH6OYPQ_x9U1GaAyBuIshZOxcyVRyQWcxP4W3OatnhE1k86TVBwbdgKV0iGQxjIVBPcmrvjCzOh0IcgTqClN1i8jJ6wTxbouFePUOZmCcb9Ut-D4r80-2KfW40fZ2rH--AuY7jbbz_K6aP1D_VCk2I-rkNdZQyX6v4jzFUlM5d0YrRFg5blfz_chvyxgQ-xkn3GrhWGqsGPhaIAveXQub8qrsu-91ZCbkoaVX3Zi4XPKdidVUYthdmJWwV4NiM"
                badges={[{ text: "Mới Về", color: "gray" }]}
              />

               {/* Product 4 */}
               <ProductCard
                id="4"
                name="Gạch Ốp Cổ Điển"
                description="Mang lại vẻ đẹp cổ điển và ấm cúng với bề mặt giả cổ tự nhiên."
                price={1850}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCO0OQZf20MUW5Ykml8xG4wqM5IzUcZVeolrMnht2HQETk_YnyckuY-R8L_AO-5VKYtLmR7_J488gxit_FbqqFzvlywfql9CMAu270UO_wNhvnO5xQxjwF22IMF6mNdm5q01KTlqsHXzuXOSZB0ZBITf-TwWNiTBhxwToQAxQoqV3Qb5L1hLUeuo3qP1J0xew2SnHfvhcWW6zqLWP5EG7a8s2txqrRqEcpQD_AzQR0K7X_r8-Og7jgltZ0WPb0-xXBmJseRbKDWINc"
                badges={[]}
              />

              {/* Product 5 */}
              <ProductCard
                id="5"
                name="Gạch Chịu Lửa - Công Nghiệp"
                description="Gạch chịu nhiệt chuyên dụng cho lò nung, lò sưởi. Chịu được nhiệt độ cực cao."
                price={5200}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuAhEgoMjZX7Mo0rML9SJaOP1L5ffQehnCih6QbGB8lT7tpjbVNEyG7e7FtYM1v73b27_3sIXLxzgJb0mLs5vCbbEetu85B3VblcPeQX4QVJsnQpLArlil7jE6NzTwYohiJ1dT7ZGJ-qfPOVZ9WuxTUfnqqz2xhwCuxUAbc_o3xNws80HN2TEktFKK9uyksxKTJHccIznzjuAMqFK7Aw5xWqDteLwf9qAjREAF2qvRYK96gE0JtHnAecQz0LXcN1sZKHnbiHxEN3jUE"
                badges={[{ text: "Chịu Nhiệt", color: "gray" }]}
              />

               {/* Product 6 */}
               <ProductCard
                id="6"
                name="Gạch Lát Sân - Đất Nung"
                description="Gạch lát sân vườn, lối đi bền bỉ. Tông màu đất tự nhiên gần gũi."
                price={800}
                originalPrice={950}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuDxo67PKv-6HkxMgn9ATIwRy2E52t6cjqiAzhf9nniA_dNkwgPlfCBHDnIop5MPHhHF8wYSIOKtFp0RXnftERFlvGo6A7_Nd8PZlsngS2lh582ZpisFiAfrXYocxfQVO_cWC4d8tzj-i-e1xDVVxkkU-xpu7sWPtL5Vt7tF21oL7ohCUU9OuYvSmaly5rGAaPyNTNdwUuZQ-jBKN4KQFcDXl4btE7ZXRW7GhQGOnMaORdbKO4NirjUKaDyHqCIfyCZw9tQHFufvmJw"
                badges={[{ text: "-15%", color: "red" }]}
              />
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
                <Pagination />
            </div>

             {/* Load More Hint */}
            <div className="text-center mt-4 text-xs text-muted-foreground/80">
                Hiển thị 6 trong số 140 sản phẩm
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
