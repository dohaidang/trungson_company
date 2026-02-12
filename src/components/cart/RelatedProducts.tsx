"use client";

import { Plus } from "lucide-react";
import Image from "next/image";

export function RelatedProducts() {
  const products = [
    {
        name: "Gạch Đỏ Đặc",
        spec: "Truyền thống",
        price: "900đ/viên",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcQ8-fJ2XCj0mHeVcFulFk8_JscrIt0RT8wxX-B2CRkgk94Eu834WC4ZkSpJ5NXUvLHwQ1OsgM05sIh73J8P-IDEzpiYdMmR7uv8cmWk6_u0CGCur05kQVpbp24-yxNXQS1wz-MID7q8CpERA85ByZEN0gPz4dNbHJSL-4vjO6w-k_3p7m0-Ak3Bs_eFNiAkKm8NOk-JGanngrEfHUzfZEmRW51jfhCP6bxfVTC3_Fwmau3KGhWy6XsjgfIG2WF2DiX5ekGuhYMTQ"
    },
    {
        name: "Gạch Con Sâu",
        spec: "Lát sân vườn",
        price: "2,100đ/viên",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNzCte1D6X418EWPtmaLJg_3pK04ZFtlWqMwsbDI39UJs7ld5q4afKfOL_BSeAud_2CmAufamEyFqfwjrHUZgRWG_1wHBHp-Wj4wMzvsrP9RgXjkOd7drc_LWfFMDhVHSGL1bjd5RljR7_ZUciXE0rHATLlah1NRcnMHRgXXv21CDh9gDHhREhvTZlxZl61ex9erxsU_fDuL23TLu_L2Nji_ZqQ5IIk3PYKkLWI7-7lRv9V3TSKvv50yZ3Bj9--X7EQ9M6ijVNkSk"
    },
    {
        name: "Vữa Xây Dựng",
        spec: "Trộn sẵn M75",
        price: "125,000đ/bao",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHIHMqYWbnt4OZL7QXikC8Nc4KgurzSpfK7vytzWQSn-PJ0QBcqvS9fRmHvW_x-TxN0Si5JxdawmXT_h_uhsEqiQUVdRZ0q2ZONot6we0cThXPrq1UA40j2KMIguSLP2_YvpBOzoKO03zT_6cGads3KmZJNts5QOJO63VbaM5E2zSTW1V1Hp719QKuE2eOf9piETZj7n_JwTr61YbgFHmm-dhNFilaCJdNVGYhm-NEQ9LoTW37d1pxlV7PJZljq974woHa1vCD3Po" // Placeholder
    },
    {
        name: "Thép Xây Dựng",
        spec: "Thép D10",
        price: "18,500đ/kg",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2JRMjZdhHqM8Ejd80DoCey0aq0TnSZtUjpIQk4JRnZ1ckQh606-MtIaOkTFBX1i046HIdSUYQc5WRW_5UTRh2OgsUEzj1ieL329fYSLzvSKOgm6y28R0WbidGdJJrS8-nYUvK_li2cBR6VI3cw05jmZqqPnqQRLLX2brIR67AkgaX-Jm2HfB-dpKpgTc4xSDHnbCQQ5LBlodfdi0x-koI7UK2f96rPchFy75IkpF-p-cKMxwCv4z3yE72oOgbDm2O6DrJgOKD760" // Placeholder
    }
  ];

  return (
    <section className="mt-20">
      <div className="mb-8 border-b border-border pb-4">
        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
            Thường Mua Kèm
        </h3>
        <p className="text-sm text-muted-foreground/80 mt-1">
            Những vật liệu thiết yếu cho công trình của bạn.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
            <div key={index} className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden hover:shadow-md transition-all">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                   <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                   />
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-foreground text-sm uppercase">{product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{product.spec}</p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-primary">{product.price}</span>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                            <Plus className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
}
